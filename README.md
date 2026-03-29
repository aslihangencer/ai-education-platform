# AI Education Platform 🎓

A modern, student-centric learning platform that uses AI to transform PDF study materials into interactive, multimodal lessons. 

## 🚀 Overview
This platform allows students to upload PDFs, which are then processed using AI to generate structured lessons, key points, and Q&A sessions. It also features AI-powered audio narration to support different learning styles and accessibility.

## ✨ Core Features
- **Student Dashboard**: 
  - **PDF to Lesson**: Upload academic PDFs and get AI-generated study guides.
  - **Audio Narration**: Listen to your lessons with accessible playback controls.
  - **Structured Learning**: Clear steps, key points, and Q&A for better retention.
- **Teacher Panel** (In Development):
  - **Teaching Guidelines**: Manage curriculum-aligned instructions for the AI.
  - **Practice Mode**: Configure specialized learning paths.
  - **Weekly Scheduling**: Organize study sessions.

## 🛠 Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **AI Integration**: OpenAI (GPT-4o / GPT-4o-mini)
- **Audio**: OpenAI TTS (Text-to-Speech)
- **Parsing**: `pdf-parse` for document extraction
- **Styling**: Vanilla CSS with Accessibility-first design

## 🛠 Setup & Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env.local` and add your OpenAI API Key.
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure
- `/app`: Next.js App Router pages and API routes.
- `/components`: Reusable UI components (Student, Teacher, Accessibility).
- `/lib`: Core logic including AI prompt engineering and server utilities.
- `/lib/server`: Server-side only logic for secure API calls.

## 📄 License
MIT License
