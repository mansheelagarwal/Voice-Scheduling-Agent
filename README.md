# Voice Scheduling Agent

A real-time voice assistant that schedules meetings and creates actual Google Calendar events using Vapi, a Node.js backend, and the Google Calendar API.

---

## Overview

This project implements a deployed voice scheduling agent that:

- Initiates a conversation with the user  
- Collects the user's name  
- Collects preferred date and time  
- Optionally collects a meeting title  
- Confirms the final details  
- Creates a real Google Calendar event  

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

## Features

- Real time voice interaction  
- Structured scheduling flow  
- Confirmation before booking  
- Real Google Calendar event creation  
- Publicly accessible deployed backend  

---

## How to Test

### Option 1 — Voice Demo (Recommended)

Watch the Loom demo showing the full real-time interaction:

👉 **[This video link]**

This demonstrates the assistant collecting name, date, and time, confirmation of details, backend tool execution and a real Google Calendar event being created  

---

### Option 2 — Direct API Test

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

This project uses the Google Calendar API with OAuth2 authentication in the following way : 

Flow:
1. User provides scheduling details via voice  
2. Vapi triggers a tool call  
3. Backend receives request at \`/schedule\`  
4. Google Calendar API creates the event  
5. Event link is returned  

---



