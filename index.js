const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

if (process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
}

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

app.get("/", (req, res) => {
  res.send("Voice Agent Backend Running");
});

app.get("/auth/google", async (req, res) => {
  try {
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: ["https://www.googleapis.com/auth/calendar"],
    });

    res.json({
      message: "Open this URL in your browser to authorize Google Calendar access.",
      authUrl: url,
    });
  } catch (error) {
    console.error("Auth URL error:", error.message);
    res.status(500).send("Failed to start Google auth");
  }
});

app.get("/oauth2callback", async (req, res) => {
  try {
    const code = req.query.code;
    const { tokens } = await oauth2Client.getToken(code);

    console.log("\n=== GOOGLE TOKENS ===");
    console.log(tokens);
    console.log("=== COPY refresh_token into your .env or Render env vars as GOOGLE_REFRESH_TOKEN ===\n");

    res.send("Google auth successful. Copy the refresh_token from logs into your environment variables.");
  } catch (error) {
    console.error("OAuth callback error:", error.message);
    res.status(500).send("OAuth failed");
  }
});

function parseDateTime(date, time) {
  const now = new Date();
  let baseDate = new Date(now);

  const d = String(date).toLowerCase().trim();

  if (d === "tomorrow") {
    baseDate.setDate(baseDate.getDate() + 1);
  } else if (d === "today") {
    // keep current date
  } else {
    const parsed = new Date(`${date} ${now.getFullYear()}`);
    if (!isNaN(parsed.getTime())) {
      baseDate = parsed;
    }
  }

  const match = String(time).trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (!match) {
    throw new Error("Could not parse time");
  }

  let hour = parseInt(match[1], 10);
  const minute = match[2] ? parseInt(match[2], 10) : 0;
  const meridiem = match[3] ? match[3].toLowerCase() : null;

  if (meridiem === "pm" && hour !== 12) hour += 12;
  if (meridiem === "am" && hour === 12) hour = 0;

  baseDate.setHours(hour, minute, 0, 0);

  const endDate = new Date(baseDate.getTime() + 30 * 60 * 1000);

  return {
    start: baseDate.toISOString(),
    end: endDate.toISOString(),
  };
}

app.post("/schedule", async (req, res) => {
  try {
    const { name, date, time, meetingTitle } = req.body;

    console.log("Received request:");
    console.log(req.body);

    if (!name || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (!process.env.GOOGLE_REFRESH_TOKEN) {
      return res.status(500).json({
        success: false,
        message: "Google Calendar is not connected yet",
      });
    }

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const { start, end } = parseDateTime(date, time);

    const event = {
      summary: meetingTitle || `Meeting with ${name}`,
      description: `Scheduled by voice agent for ${name}`,
      start: {
        dateTime: start,
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: end,
        timeZone: "America/Los_Angeles",
      },
    };

    const result = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    console.log("Event created:", result.data.htmlLink);

    return res.json({
      success: true,
      message: `Calendar event created for ${name}`,
      eventLink: result.data.htmlLink,
      eventId: result.data.id,
    });
  } catch (error) {
    console.error("Schedule error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create calendar event",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
