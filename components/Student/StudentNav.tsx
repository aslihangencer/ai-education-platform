import Link from 'next/link';

export function StudentNav({ active }: { active: 'dashboard' | 'lesson' }) {
  return (
    <nav aria-label="Student navigation" className="studentNav">
      <Link
        href="/student"
        className="navBtn"
        aria-current={active === 'dashboard' ? 'page' : undefined}
      >
        <svg className="navIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
        Dashboard
      </Link>
      <Link
        href="/student/lesson"
        className="navBtn"
        aria-current={active === 'lesson' ? 'page' : undefined}
      >
        <svg className="navIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
        Lesson
      </Link>
    </nav>
  );
}

