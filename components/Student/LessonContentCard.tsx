import type { Lesson } from '../../lib/lessonTypes';

export function LessonContentCard({ lesson }: { lesson: Lesson }) {
  return (
    <section className="card" aria-labelledby="lesson-content-title">
      <h2 id="lesson-content-title" className="title" style={{ fontSize: 18 }}>
        {lesson.title}
      </h2>
      <p className="subtitle">Generated lesson (placeholder rendering for now).</p>

      <div className="sectionSpacer" />

      <div className="lessonPlaceholderGrid" style={{ gridTemplateColumns: '1fr' }}>
        <div>
          <h3 className="placeholderHeading">Key points</h3>
          <ul style={{ margin: 10, paddingLeft: 18, lineHeight: 1.7 }}>
            {lesson.keyPoints.map((kp, idx) => (
              <li key={`${kp}-${idx}`}>{kp}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="placeholderHeading">Step-by-step</h3>
          <ol style={{ margin: 10, paddingLeft: 18, lineHeight: 1.7 }}>
            {lesson.steps.map((s, idx) => (
              <li key={`${s.stepTitle}-${idx}`}>
                <strong>{s.stepTitle}:</strong> {s.explanation}
                {s.keyPoints.length > 0 ? (
                  <ul style={{ marginTop: 6, lineHeight: 1.7 }}>
                    {s.keyPoints.map((p, pIdx) => (
                      <li key={`${p}-${pIdx}`}>{p}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="placeholderHeading">Q&amp;A</h3>
          <div style={{ marginTop: 10, display: 'grid', gap: 10 }}>
            {lesson.qna.map((item, idx) => (
              <div key={`${item.question}-${idx}`} className="card" style={{ boxShadow: 'none' }}>
                <p style={{ margin: 0, fontWeight: 950 }}>Q: {item.question}</p>
                <p style={{ margin: '6px 0 0 0', color: 'var(--muted)', lineHeight: 1.6 }}>
                  A: {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="placeholderHeading">Notes</h3>
          <ul style={{ margin: 10, paddingLeft: 18, lineHeight: 1.7 }}>
            {lesson.notes.map((n, idx) => (
              <li key={`${n}-${idx}`}>{n}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

