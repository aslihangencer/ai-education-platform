# Development Roadmap: Accessible Academy

## Phase 1: Infrastructure & Authentication (Current)
- [ ] **Prisma & Supabase Alignment**:
    - Update `schema.prisma` with `VoiceProfile`, `Material`, and enhanced `User` roles.
    - Provision Supabase DB and execute `db push`.
- [ ] **Auth Consolidation**:
    - Finalize NextAuth with Role-Based Access Control (RBAC).
    - Implement accessible Login/Register forms with auditory feedback.

## Phase 2: AI Summarization & PDF Insights
- [ ] **Gemini 1.5 Pro Integration**:
    - Develop Server Action for PDF-to-Text extraction.
    - Implement the "Insight Extraction" prompt for structured audio content.
- [ ] **OpenAI TTS Pipeline**:
    - Create an API route for streaming TTS generated from AI summaries.
    - Optimize streaming to minimize "Time to First Audio" (TTFA).

## Phase 3: Voice Booking & Mentorship Marketplace
- [ ] **Mentor Profile Management**:
    - Dynamic search/filter based on Accent, Language, and Dialect.
    - Voice preview mechanism for mentor voice samples.
- [ ] **Scheduling Integration**:
    - Real-time booking with Google Calendar sync.
    - ARIA-compliant calendar view for visual/keyboard navigation.

## Phase 4: Proactive Accessibility (Digital Eye)
- [ ] **Spatial Analysis**:
    - Implement PDF spatial VLM (Visual Language Model) analysis for describing image placement.
- [ ] **Global Voice Feedback**:
    - Centralized announcer system for real-time interaction feedback.
- [ ] **Performance & AAA Compliance**:
    - Optimization for high-latency connections.
    - Final WCAG 2.1 AAA audit.