import { LinkButton } from '../components/ui/LinkButton';
export default function Home() {
  return (
    <div className="homeContainer" style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 24px', textAlign: 'center' }}>
      <header className="heroSection">
        <div className="badge" style={{ display: 'inline-block', padding: '6px 16px', background: 'var(--primary-soft)', color: 'var(--primary)', borderRadius: 20, fontSize: 13, fontWeight: 700, marginBottom: 24, border: '1px solid var(--primary)' }}>
          YENİ: GEMINI 1.5 PRO DESTEKLİ
        </div>
        <h1 className="title" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em' }}>
          Eğitimde <span style={{ color: 'var(--primary)', background: 'linear-gradient(45deg, var(--primary), #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Erişilebilir</span> Gelecek
        </h1>
        <p className="subtitle" style={{ fontSize: 20, maxWidth: 640, margin: '0 auto 40px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Görme engelli öğrenciler ve öğretmenler için tasarlanmış, yapay zeka destekli, tam erişilebilir akıllı eğitim asistanı.
        </p>
        
        <div className="ctaGroup" style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 60 }}>
          <a href="/student" className="btn btnPrimary" style={{ padding: '16px 32px', fontSize: 16 }}>Öğrenci Girişi</a>
          <a href="/teacher" className="btn btnSecondary" style={{ padding: '16px 32px', fontSize: 16 }}>Eğitmen Girişi</a>
        </div>
      </header>

      <div className="featureGrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginTop: 100 }}>
        {[
          { icon: '🎙️', title: 'Akıllı Seslendirme', desc: 'Ders kitaplarını anında yüksek kaliteli podcastlere dönüştürün.' },
          { icon: '🤖', title: 'Proaktif Koçluk', desc: 'Yapay zeka asistanınız dersleri özetler ve sorularınızı yanıtlar.' },
          { icon: '📅', title: 'Otomatik Planlama', desc: 'Google Meet entegrasyonu ile derslerinizi kolayca yönetin.' },
        ].map((f, i) => (
          <div key={i} className="card" style={{ padding: 32, textAlign: 'left', border: '1px solid var(--border)', transition: 'transform 0.2s', cursor: 'default' }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
            <h3 className="placeholderHeading" style={{ fontSize: 20, marginBottom: 12 }}>{f.title}</h3>
            <p className="helpText" style={{ fontSize: 15, lineHeight: 1.5 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <footer style={{ marginTop: 120, paddingTop: 40, borderTop: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 14 }}>
        © 2026 Smart Ed: Accessible Learning. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
