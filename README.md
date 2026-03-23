# Voice Scheduling Agent

This project is a real-time voice scheduling agent that can have a natural conversation with a user and turn that interaction into an actual Google Calendar event. It walks through a simple flow whicb includes asking for the user’s name, preferred date and time, and an optional meeting title and then creates the event through a deployed backend after confirming the details. 

---

## Tech Stack

- **Vapi** — real-time voice assistant  
- **OpenAI (GPT-4.1)** — conversational reasoning  
- **Node.js + Express** — backend server  
- **Google Calendar API** — event creation  
- **Render** — backend deployment  

---

## Architecture

User Voice → Vapi Assistant → Tool Call → Render (public URL) → Express Backend → Google Calendar API

---

## Deployed URL

Backend (hosted on Render):

https://voice-scheduling-agent-npu9.onrender.com

Endpoint used by the voice agent:

https://voice-scheduling-agent-npu9.onrender.com/schedule

> Note: Free Render instances may take ~30–50 seconds to wake up on the first request.

---


## Voice Demo

This Loom demo shows the full real-time interaction:

https://www.loom.com/share/a739f11d96874e108b27e8c08139621a


---

## Direct API Test

You can test the deployed backend directly using:

```bash
curl -X POST https://voice-scheduling-agent-npu9.onrender.com/schedule \
-H "Content-Type: application/json" \
-d '{
  "name": "Test User",
  "date": "tomorrow",
  "time": "3 PM",
  "meetingTitle": "Test Meeting"
}'
```

## Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Create a \`.env\` file

```bash
GOOGLE_CLIENT_ID=your_client_id  
GOOGLE_CLIENT_SECRET=your_client_secret  
GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback  
GOOGLE_REFRESH_TOKEN=your_refresh_token
```

### 3. Start the backend

```bash
node index.js
```

---

## Calendar Integration

This project integrates with the Google Calendar API using OAuth2 authentication to create real calendar events based on the user’s voice input.

When a user interacts with the assistant, their inputs (name, date, time, and an optional meeting title) are structured and sent to a deployed Node.js backend via the `/schedule` endpoint. The backend handles all calendar-related logic.

Authentication is managed using Google OAuth2. A refresh token is stored in environment variables, allowing the backend to generate access tokens automatically without requiring the user to log in each time. This keeps the experience seamless while still being secure.

Once the request reaches the backend, the date and time are parsed and converted into a proper RFC3339 datetime format to ensure the event is created accurately with respect to the correct timezone.

The backend then uses the Google Calendar API to create an event in the user’s primary calendar. Each event includes:
- A summary (either the provided meeting title or a default title)
- A description indicating it was scheduled via the voice agent
- Start and end times (default duration of 30 minutes)

After the event is successfully created, the API returns a confirmation along with a direct Google Calendar event link. This link can be used to verify that the event was created correctly.




