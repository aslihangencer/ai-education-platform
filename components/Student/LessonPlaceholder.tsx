import Link from 'next/link';

export function LessonPlaceholder() {
  return (
    <section className="card" aria-labelledby="lesson-preview-title">
      <h2 id="lesson-preview-title" className="title">
        Lesson content
      </h2>
      <p className="subtitle">
        This area will display your AI-generated, step-by-step lesson, key points, Q&amp;A,
        and notes after PDF processing is added.
      </p>

      <div className="sectionSpacer" />

      <div className="lessonPlaceholderGrid" aria-label="Lesson sections placeholder">
        <div>
          <h3 className="placeholderHeading">Step-by-step explanation</h3>
          <p className="placeholderText">Placeholder for structured explanation blocks.</p>
        </div>
        <div>
          <h3 className="placeholderHeading">Key points</h3>
          <p className="placeholderText">Placeholder for highlighted “must know” items.</p>
        </div>
        <div>
          <h3 className="placeholderHeading">Student Q&amp;A</h3>
          <p className="placeholderText">Placeholder for questions and AI answers.</p>
        </div>
        <div>
          <h3 className="placeholderHeading">Generated notes</h3>
          <p className="placeholderText">Placeholder for study notes and summaries.</p>
        </div>
      </div>

      <div className="sectionSpacer" />
      <p className="helpText">
        For now, you can open the lesson page to see how the layout will look.
      </p>
      <div className="buttonGrid" style={{ marginTop: 12, gridTemplateColumns: '1fr' }}>
        <Link className="btnLink btnPrimary" href="/student/lesson">
          Open lesson page
        </Link>
      </div>
    </section>
  );
}

