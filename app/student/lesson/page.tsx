import { StudentNav } from '../../../components/Student/StudentNav';

export default function StudentLessonPage() {
  return (
    <section aria-labelledby="lesson-page-title">
      <h1 id="lesson-page-title" className="title">
        Lesson
      </h1>
      <p className="subtitle">
        This page is a layout placeholder. The AI-generated lesson content will be rendered
        here after PDF processing is implemented.
      </p>

      <div className="sectionSpacer" />
      <StudentNav active="lesson" />

      <div className="card" aria-label="Lesson transcript placeholder">
        <h2 className="title" style={{ fontSize: 18 }}>
          AI Lesson Transcript (placeholder)
        </h2>
        <p className="placeholderText">
          Step-by-step explanations, key points, Q&amp;A, and notes will appear in this area
          in future iterations.
        </p>

        <div className="sectionSpacer" />
        <p className="helpText">
          Next: connect PDF upload to lesson generation and render sections dynamically.
        </p>
      </div>
    </section>
  );
}

