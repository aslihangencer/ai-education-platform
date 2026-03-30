# Product Requirement Document (PRD): Accessible Academy

## 1. Overview
Accessible Academy is a voice-prioritized educational platform designed for visually impaired students. It focuses on PDF material accessibility and specialized mentor selection based on vocal attributes.

## 2. User Roles & Flows

### 2.1 Student Flow
1. **Onboarding**: Voice-guided registration with accessibility preference setup (High Contrast, TTS Speed).
2. **Material Interaction**:
   - Upload PDF or select from library.
   - AI Analysis: Gemini 1.5 Pro processes the PDF to extract text, describe images (VLM), and summarize content.
   - Listen: Stream high-quality audio summary via OpenAI TTS.
3. **Mentor Booking**: 
   - Search for mentors using voice-first filters: Language (TR/EN), Accent (e.g., British), Dialect (e.g., Aegean).
   - Listen to mentor voice samples before booking.
   - Schedule sessions integrated with Google Calendar.

### 2.2 Teacher/Mentor Flow
1. **Profile Setup**: Record voice samples, specify accents/dialects, and set availability.
2. **Content Management**: Upload PDFs for students; the system automatically generates audio versions.
3. **Session Management**: Conduct live audio/video calls with built-in accessibility features (e.g., ARIA-compliant call controls).

## 3. Core Features & Functional Requirements

### 3.1 AI PDF Analysis (Gemini 1.5 Pro)
- **Requirement**: Must extract hierarchical headings to allow students to skip sections.
- **Requirement**: Must provide alt-text for complex diagrams and charts within the PDF.
- **Requirement**: Must generate a "Quick Summary" (under 2 minutes) and a "Deep Dive" version.

### 3.2 Voice Selection Engine
- **Criteria**: Accent, Language, Dialect, and Vocal Tone (Calm, Energetic, Professional).
- **Technology**: OpenAI TTS (shimmer, alloy, nova models) for AI voices; recorded samples for real mentors.

### 3.3 A11y Standards (WCAG 2.1 AAA)
- **Navigation**: Full keyboard focus management; logical tab order.
- **Feedback**: Immediate auditory confirmation for every button click (e.g., "PDF Uploaded", "Mentor Selected").
- **Contrast**: 7:1 ratio minimum; support for high-contrast dark mode.

## 4. Technical Constraints
- Real-time audio streaming with low latency.
- Secure storage for sensitive educational materials in Supabase.
- Next.js 15 App Router for optimized performance and SEO.