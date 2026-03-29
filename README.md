### 🌟 Accessible Academy (Engelsiz Akademi)
AI-Powered, Equitable Education Platform for Visually Impaired Individuals.

Accessible Academy is an end-to-end solution platform that eliminates barriers for visually impaired students to access educational materials and connects them with the right instructors.
## ![Screenshot](./public/screenshot.png)

### 🚀 Key Features
# 1. Voice-Centric Instructor Panel
Audio Profiles: Instructors introduce themselves via audio and upload sample problem-solving recordings.

Select by Hearing: Students choose instructors not just by reading text, but by hearing their voices and teaching styles.

Google Meet Integration: One-click lesson scheduling with automated, accessible meeting links.

# 2. AI-Powered Material Transformation
PDF to Audiobook: Academic PDFs are analyzed, cleaned, and converted into audiobooks using natural-sounding AI voices.

Interactive AI Study Buddy: Students can ask questions to the AI about uploaded materials, solve tests verbally, and get hints for challenging parts.

# 3. Full Accessibility (A11y)
Built in compliance with WCAG 2.1 standards.

Full compatibility with screen readers (NVDA, Jaws, VoiceOver).

100% keyboard-controllable interface.

## 🛠 Tech Stack
Frontend: Next.js 14 (App Router), Tailwind CSS, Radix UI (Accessible Components)

Backend & DB: Supabase (Auth, PostgreSQL, Storage)

Artificial Intelligence:

LLM: Gemini 1.5 Pro (PDF analysis and intelligent assistant)

TTS: OpenAI TTS / Google Cloud Text-to-Speech (Natural narration)

Integration: Google Calendar & Meet API

## 📁 Project Documentation
You can access detailed planning files below:

📄 idea.md - Project vision and problem definition.

📄 prd.md - Product Requirements Document.

📄 tasks.md - Development process task list.

📄 user-flow.md - User experience flow.

📄 tech-stack.md - Detailed technology stack.


## 🛠 Installation (For Developers) 
  ----
 Clone the repository:
 --- 
 Bash git clone https://github.com/your-username/accessible-academy.git 

 Install dependencies:
---
 Bash 
 npm install 

 Create a .env.local file and add the required API keys (Supabase, OpenAI, Google).
 ---
 | Variable | Description |
 
| :--- | :--- |

| `OPENAI_API_KEY` | Your OpenAI API Secret Key |

| `DATABASE_URL` | Supabase or local Postgres connection string |

| `NEXTAUTH_SECRET` | Secret key for session encryption |

 Prisma/Database:
 ---
 Bash
npx prisma db push


 Run the project:
 ---- 
 Bash 
 npm run dev
 
---
## 💡 Why This Project?
Millions of visually impaired students worldwide face difficulties in accessing academic materials and finding suitable mentors. Accessible Academy aims to turn equal opportunity in education into a reality by positioning AI as both an "eye" and an "assistant."
## 📄 License
MIT License
