# User Flow: Student Interaction Simulation

## Goal: Access PDF Material & Choose Voice Mentor

### 1. Unified Authentication
- **Step**: Student opens the landing page.
- **Auditory Feedback**: "Welcome to Accessible Academy. Please login or say 'Register'."
- **Action**: Student logs in via Google/Email with high-contrast UI and full keyboard support.

### 2. PDF Upload & Analysis
- **Step**: Student navigates to "Ders Materyallerim" (My Lessons).
- **Action**: Student uploads a PDF file (e.g., "Analitik_Geometri.pdf").
- **Auditory Feedback**: "PDF received. Analyzing content for structure and images. Please wait."
- **AI Action**: Gemini 1.5 Pro extracts text and generates an accessibility-first summary.

### 3. Voice Listening
- **Step**: Student hears a prompt: "Summary is ready. Do you want to listen now?"
- **Action**: Student presses `Space` to play.
- **Auditory Feedback**: High-quality TTS voice reads the structured summary, skipping non-essential elements.

### 4. Specialized Mentor Selection
- **Step**: Student selects "Mentor Bul" (Find Mentor).
- **Filters**: Student selects Language (Turkish) -> Dialect (Aegean).
- **Action**: System lists mentors meeting these criteria.
- **Voice Sample**: Student clicks "Listen Sample" on "Dr. Ahmet" -> Hears Ahmet's local Aegean dialect preview.
- **Booking**: "Schedule confirmed for Monday at 10:00 AM."