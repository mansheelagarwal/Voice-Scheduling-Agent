# Voice Scheduling Agent

A real-time voice assistant that schedules meetings and creates actual Google Calendar events using Vapi, a Node.js backend, and the Google Calendar API.

## Overview

This project implements a deployed voice scheduling agent that:

- initiates a conversation with the user
- asks for the user's name
- asks for preferred date and time
- optionally collects a meeting title
- confirms the final details
- creates a real Google Calendar event

## Tech Stack

- Vapi for the real-time voice assistant
- OpenAI as the LLM
- Node.js + Express for the backend
- Google Calendar API for calendar event creation
- ngrok for exposing the local backend endpoint

## Architecture

User Voice → Vapi Assistant → Tool Call → ngrok → Express Backend → Google Calendar API

## Features

- Real-time voice interaction
- Structured collection of scheduling details
- Confirmation before booking
- Real Google Calendar event creation
- Publicly accessible voice agent through an agent link

## How to Test

### Voice Agent

Use the deployed voice assistant link:

[PASTE YOUR VAPI / AGENT LINK HERE]

Suggested test flow:
1. Say your full name
2. Provide a preferred date
3. Provide a preferred time
4. Optionally provide a meeting title
5. Confirm the booking

### Expected Behavior

The assistant should:
- collect the required fields
- confirm the final details
- trigger the backend tool
- create a real Google Calendar event

## Local Setup

### 1. Install dependencies

```bash
npm install
