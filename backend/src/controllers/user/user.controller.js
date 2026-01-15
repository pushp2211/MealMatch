import cloudinary from "../../config/cloudinary.js";
import { User } from "../../models/user.model.js";

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
        lastActive: s.lastUsedAt,
        current: s._id.toString() === req.user.sessionId,
    }));

    res.json(sessions);
};
