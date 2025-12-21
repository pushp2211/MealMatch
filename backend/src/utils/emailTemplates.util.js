// Helper to render a single media item safely in email HTML
// Media is always a URL (Cloudinary)
function renderMediaItem(media) {
  if (!media || !media.url) return "";

  switch (media.type) {
    case "image":
      return `
        <div style="margin: 12px 0;">
          <img
            src="${media.url}"
            alt="Image"
            style="max-width:100%; border-radius:8px; display:block;"
          />
        </div>
      `;

    case "video":
      return `
        <div style="margin: 12px 0;">
          🎥 <a href="${media.url}" target="_blank" rel="noopener noreferrer">
            Watch video
          </a>
        </div>
      `;

    case "pdf":
    case "document":
      return `
        <div style="margin: 12px 0;">
          📄 <a href="${media.url}" target="_blank" rel="noopener noreferrer">
            Download document
          </a>
        </div>
      `;

    default:
      return `
        <div style="margin: 12px 0;">
          🔗 <a href="${media.url}" target="_blank" rel="noopener noreferrer">
            View attachment
          </a>
        </div>
      `;
  }
}

// Helper to render multiple media items
function renderMediaList(mediaList = []) {
  if (!Array.isArray(mediaList) || mediaList.length === 0) {
    return "";
  }

  return `
    <div style="margin-top: 16px;">
      ${mediaList.map(renderMediaItem).join("")}
    </div>
  `;
}

export const emailTemplates = {
  /* -------------------- SIGNUP OTP ------------------ */
  signupOtp({ otp, validityMinutes = 5 }) {
    return {
      subject: "Your OTP for Signup Verification",
      html: `
        <h2>MealMatch Signup Verification</h2>
        <p>Your OTP is:</p>
        <h1 style="letter-spacing:2px;">${otp}</h1>
        <p>
          This OTP is valid for <b>${validityMinutes} minutes</b>.
        </p>
      `,
    };
  },

  /* ------------------- WELCOME EMAIL ---------------- */
  welcomeEmail({ name }) {
    return {
      subject: "Welcome to MealMatch 🎉",
      html: `
        <h2>Welcome, ${name}!</h2>
        <p>
          Thank you for joining <b>MealMatch</b>.
          Together, we reduce food waste and help those in need.
        </p>
        <p>We’re glad to have you onboard!</p>
      `,
    };
  },

  /* -------- FOOD POST / MULTI-MEDIA NOTIFICATION ---- */
  foodPostNotification({
    title,
    description,
    media = [],
    detailsUrl,
  }) {
    const mediaHtml = renderMediaList(media);

    return {
      subject: "New Food Available Near You ",
      html: `
        <h2>${title}</h2>

        ${description ? `<p>${description}</p>` : ""}

        ${mediaHtml}

        ${
          detailsUrl
            ? `
          <p style="margin-top:16px;">
            <a href="${detailsUrl}" target="_blank" rel="noopener noreferrer">
              View full details
            </a>
          </p>
        `
            : ""
        }
      `,
    };
  },

  /* ------------- GENERIC DOCUMENT LINK -------------- */
  documentLink({ title, fileUrl }) {
    return {
      subject: title,
      html: `
        <p>You can access the document using the link below:</p>
        <p>
          <a href="${fileUrl}" target="_blank" rel="noopener noreferrer">
            Download Document
          </a>
        </p>
      `,
    };
  },
};
