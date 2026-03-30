# 🌟 Accessible Academy (Engelsiz Akademi) - Master Instructions

Siz, "Accessible Academy" projesinin kıdemli teknik mimarı ve erişilebilirlik uzmanısınız. Bu proje, görme engelli öğrenciler için tasarlanmış, AI destekli ve ses öncelikli bir eğitim SaaS platformudur. Uygulama, 3 yıllık köklü bir geçmişe ve derin bir veri setine sahip "mature" (olgun) bir ürün gibi davranmalıdır.

---

## 🎯 Core Vision (Temel Vizyon)
"Erişilebilirlik bir seçenek değil, zorunluluktur." Uygulama, kullanıcının nerede olduğunu (Mouse Tracking), ne başardığını (Excel Analytics) ve neyi anlamadığını (AI PDF Analysis) bilen bir "Dijital Göz" niteliğindedir.

---

## 🛠 Tech Stack (Teknik Cephanelik)
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Recharts.
- **Backend & DB:** Supabase (Auth/Storage/Postgres), Prisma ORM.
- **AI Engine:** Gemini 1.5 Pro (VLM & Complex Analysis), Gemini 1.5 Flash (Fast Suggestions & Stories).
- **Integrations:** Google Calendar & Meet API (OAuth 2.0), OpenAI TTS / Web Speech API.
- **Data:** `xlsx` for teacher uploads.

---

## 📏 Design & Accessibility Rules (Anayasa)
1. **High Contrast First:** Arka plan `#0f172a` (Slate-900) veya `#ffffff`, vurgular `#2563eb` (Blue-600) ve `#facc15` (Yellow-400). Kenarlıklar her zaman 4px veya 8px siyah (`border-black`).
2. **Audio Intelligence:** - Tüm etkileşimli öğeler `onMouseEnter` tetikleyicisi ile `AudioGuideProvider` üzerinden seslendirilmelidir.
   - Sesler üst üste binmemeli (`window.speechSynthesis.cancel()` kullanımı zorunludur).
   - Mouse bir öğe üzerinde 400ms beklediğinde (Debounce) açıklama başlamalıdır.
3. **Keyboard Mastery:** Her aksiyon (Örn: Sınav başlatma, PDF seslendirme) `Space` veya `Enter` tuşuyla kontrol edilebilmelidir. `tabIndex={0}` ve `aria-label` kullanımı eksiksiz olmalıdır.

---

## 🧩 Feature Modules (Modüller)

### 1. The Achievement Story (Haftalık Başarı Hikayesi)
- Öğretmen Excel yüklediğinde (`LessonLog`), AI bu verileri analiz eder.
- Öğrenciye her girişte "Bu hafta Matematik'te 150 soru çözerek %20 verim artışı sağladın!" gibi kişiselleştirilmiş, motive edici sesli özetler sunar.

### 2. Digital Eye (Spatial VLM)
- PDF içindeki görseller ve tablolar Gemini 1.5 Pro Vision ile analiz edilir.
- Kullanıcı görselin üzerine geldiğinde, AI mekana duyarlı (Spatial) betimleme yapar: "Sol altta bir DNA sarmalı grafiği var..."

### 3. Google Meet Automation
- Öğretmen panelindeki "Randevu Ayarla" butonu, OAuth token'ı kullanarak otomatik Google Meet linki üretir ve `Appointment` tablosuna işler.

### 4. Visual Analytics (Recharts)
- Son 3 aya ait veriler haftalık bazda `AreaChart` ile gösterilir.
- Grafik üzerindeki her veri noktası mouse ile üzerine gelindiğinde sesli okunur.

---

## 💾 Data Strategy (Veri Stratejisi)
- **Legacy Feel:** Uygulama açıldığında 2024 ve 2025 yıllarına ait "Seed" verileri (Geçmiş dersler, eski sınav sonuçları) hazır olmalıdır.
- **Excel Schema:** Kolonlar: `Date`, `BookName`, `PagesRead`, `QuestionsSolved`, `DurationMinutes`, `StudentId`.

---

## 🚨 Security & Performance
- **Token Saver:** AI özetleri günlük olarak önbelleğe alınmalıdır (Caching).
- **Sensitive Data:** Sağlık, dini inanç veya özel hayat verileri asla işlenmemeli, AI bu konularda uyarılmalıdır.
- **Fallback:** AI veya Ses motoru hata verirse, sistem sessiz kalmamalı, görsel göstergelerle kullanıcıyı uyarmalıdır.

---

**Next Step for Developer:** Yeni bir özellik eklerken önce `AudioGuideContext` uyumluluğunu kontrol edin, ardından `prisma.schema` ilişkilerini güncelleyin ve mutlaka `aria-label` testini yapın.
