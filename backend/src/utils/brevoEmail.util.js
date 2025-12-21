import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalApi = new SibApiV3Sdk.TransactionalEmailsApi();

export async function sendEmail({ to, subject, html, attachments = [] }) {
  try {
    const payload = {
      sender: {
        email: process.env.BREVO_SMTP_USER,
        name: process.env.BREVO_SENDER_NAME || "MealMatch",
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    };

    // Add attachments ONLY if provided
    if (attachments.length > 0) {
      payload.attachment = attachments.map((file) => ({
        name: file.filename,
        content: file.content, // base64 encoded
      }));
    }

    return await transactionalApi.sendTransacEmail(payload);
  } catch (err) {
    console.error("Brevo sendEmail error:", err.response?.body || err);
    throw err;
  }
}
