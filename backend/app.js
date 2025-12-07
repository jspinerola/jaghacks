const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

const {
  MAILCHIMP_API_KEY,
  MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_DC,
  RESEND_API_KEY,
} = process.env;

if (
  !MAILCHIMP_API_KEY ||
  !MAILCHIMP_AUDIENCE_ID ||
  !MAILCHIMP_DC ||
  !RESEND_API_KEY
) {
  throw new Error("Missing environment variables");
}

// Initialize Resend client
const resend = new Resend(RESEND_API_KEY);

/**
 * Send a welcome email to the user using the Resend API
 * @param {string} email - The email address of the user
 * @returns {Promise<Object>} - The response from the Resend API
 */

async function sendWelcomeEmail(email) {
  const response = await resend.emails.send({
    to: email,
    template: {
      id: "jaghacks-confirmation",
    },
  });

  return response;
}

/**
 * Subscribes user to the Mailchimp list and sends them a welcome email
 * @param {string} email - The email address of the user
 * @returns {Promise<Object>} - Result of API call to Mailchimp
 */
async function subscribeToMailchimp(email) {
  const response = await fetch(
    `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Any string as username + your API key as password (Basic Auth)
        Authorization: `Basic ${Buffer.from(
          `anystring:${MAILCHIMP_API_KEY}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to subscribe to Mailchimp: ${response.statusText}`);
  }
  await sendWelcomeEmail(email);
  return response.json();
}

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to JagHacks Backend API",
  });
});

app.post("/api/mailchimp/subscribe", async (req, res) => {
  const { email } = req.body;
  try {
    await subscribeToMailchimp(email);
    res.json({ message: "Subscribed to Mailchimp and sent welcome email" });
  } catch (error) {
    console.error("Error subscribing to Mailchimp:", error);
    res.status(500).json({ error: error.message || "Failed to subscribe" });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Test the API at http://localhost:${PORT}/api/test`);
});

module.exports = app;
