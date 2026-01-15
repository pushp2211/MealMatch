import cloudinary from "../../config/cloudinary.js";
import { User } from "../../models/user.model.js";
import bcrypt from "bcryptjs";

/**
 * GET /api/users/me
 * Used by Profile + Settings
 */
export const getMyProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select(
        "-password -sessions.refreshToken -sessions.previousRefreshToken"
    );

    res.json(user);
};

/**
 * PATCH /api/users/me/profile
 */
export const updateMyProfile = async (req, res) => {
    const {
        name,
        phone,
        bio,
        avatar,
        providerType,
        seekerType,
        organizationName,
        location,
    } = req.body;

    // Parse 'location' back into an object if it is a string
    let parsedLocation = location;
    if (typeof location === 'string') {
        try {
            parsedLocation = JSON.parse(location);
        } catch (error) {
            parsedLocation = undefined;
            console.error("Invalid JSON for location:", error);
        }
    }

    if (parsedLocation) {
        if (
            parsedLocation.type !== "Point" ||
            !Array.isArray(parsedLocation.coordinates) ||
            parsedLocation.coordinates.length !== 2
        ) {
            // If invalid, ignore it or throw error. Here we ignore it.
            parsedLocation = undefined;
        }
    }

    const update = {
        name,
        phone,
        bio,
        ...(avatar && { avatar }), // Only update avatar string if provided
        organizationName,
        ...(parsedLocation && { location: parsedLocation }), // Only update location if valid

    };

    // Role-specific safety
    if (req.user.role === "provider") {
        update.providerType = providerType;
        update.seekerType = undefined;
    } else {
        update.seekerType = seekerType;
        update.providerType = undefined;
    }

    // Handle avatar upload
    if (req.file) {
        try {
            const uploadResult = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
                {
                    folder: `mealMatch/avatars/user_${req.user.id}`,
                    // 'auto' detects if it's an image or video (since your middleware allows both)
                    resource_type: "auto",
                    tags: ["mealMatch", "avatar", `user:${req.user.id}`],
                }
            );

            update.avatar = uploadResult.secure_url;
        } catch (uploadError) {
            console.error("Cloudinary upload failed:", uploadError);
            // Optional: return error or proceed without updating avatar
        }
    }

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: update },
        { new: true }
    );

    res.json(user);
};

/**
 * PATCH /api/users/me/settings
 */
export const updateMySettings = async (req, res) => {
    const { settings } = req.body;

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { settings } },
        { new: true }
    );

    res.json(user.settings);
};

/**
 * GET /api/users/me/sessions
 */
export const getMySessions = async (req, res) => {
    const user = await User.findById(req.user.id);

    const sessions = user.sessions.map(s => ({
        id: s._id,
        device: s.userAgent || "Unknown device",
        ip: s.ip,
        role: s.role,
        createdAt: s.createdAt,
        lastActive: s.lastUsedAt,
        current: s._id.toString() === req.user.sessionId,
    }));

    res.json(sessions);
};

export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    const ok = await bcrypt.compare(currentPassword, user.password);
    if (!ok) {
        return res.status(400).json({ message: "Incorrect current password" });
    }

    user.password = await bcrypt.hash(newPassword, 12);

    // SECURITY: invalidate all other sessions
    user.sessions = user.sessions.filter(
        s => s._id.toString() === req.user.sessionId
    );

    await user.save();

    res.json({ message: "Password updated" });
};

export const deleteMyAccount = async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  // Delete user (sessions removed implicitly)
  await User.deleteOne({ _id: req.user.id });

  // Clear auth cookies properly
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: process.env.COOKIE_SAMESITE || "Lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: process.env.COOKIE_SAMESITE || "Lax",
  });

  return res.json({ success: true, message: "Account deleted" });
};


