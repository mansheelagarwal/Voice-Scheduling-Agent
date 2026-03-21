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

- Vapi – real-time voice assistant  
- OpenAI (GPT-4.1) – conversational reasoning  
- Node.js + Express – backend server  
- Google Calendar API – event creation  
- ngrok – public deployment of backend  

---

## Architecture

User Voice → Vapi Assistant → Tool Call → ngrok (public URL) → Express Backend → Google Calendar API

---

## Deployed URL

Backend (public via ngrok):

https://leta-ceorlish-semiorientally.ngrok-free.dev

Note: This ngrok URL may change if the server is restarted.

---

## Features

- Real-time voice interaction  
- Structured scheduling flow  
- Confirmation before booking  
- Real Google Calendar event creation  
- Publicly accessible backend endpoint  

---

## How to Test

### Option 1 — Voice Demo (Recommended)

Watch the Loom demo showing the full real-time interaction:

[PASTE YOUR LOOM VIDEO LINK HERE]

This demonstrates:
- The assistant collecting name, date, and time  
- Confirmation of details  
- Backend tool execution  
- A real Google Calendar event being created  

---

### Option 2 — Direct API Test

You can test the deployed backend directly using:

curl -X POST https://leta-ceorlish-semiorientally.ngrok-free.dev/schedule \
-H "Content-Type: application/json" \
-d '{"name":"Test User","date":"tomorrow","time":"3 PM","meetingTitle":"Test Meeting"}'

---

### Expected Result

- A success response is returned  
- A Google Calendar event is created  
- A calendar event link is generated  

---

## Run Locally

### 1. Install dependencies

npm install

### 2. Create a `.env` file

GOOGLE_CLIENT_ID=your_client_id  
GOOGLE_CLIENT_SECRET=your_client_secret  
GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback  
GOOGLE_REFRESH_TOKEN=your_refresh_token  

### 3. Start the backend

node index.js

### 4. (Optional) Expose backend publicly

npx ngrok http 3000

---

## Calendar Integration

This project uses the Google Calendar API with OAuth2 authentication.

Flow:
1. User provides scheduling details via voice  
2. Vapi triggers a tool call  
3. Backend receives request at `/schedule`  
4. Google Calendar API creates the event  
5. Event link is returned  

---

## Notes

- The backend is exposed via ngrok for evaluation purposes  
- In production, this can be deployed using services like Render, Railway, or AWS  
- All events created are real and visible in the connected Google Calendar  

---

## Deliverables

- Deployed backend URL  
- Voice interaction demo (Loom)  
- Working Google Calendar integration  
- Source code and setup instructions  
