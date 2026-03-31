### 🌟 Accessible Academy (Engelsiz Akademi)
AI-Powered, Equitable Education Platform for Visually Impaired Individuals.

Accessible Academy is an end-to-end solution platform that eliminates barriers for visually impaired students to access educational materials and connects them with the right instructors.

## 🎯 Silicon Valley SaaS Standard Features

### 🎙️ 1. Voice Guide Context (Sesli Rehber)
- **Insansı Tonla Navigasyon**: Uygulamanın her köşesinde sesli asistan, odaklanan öğeleri doğal bir sesle açıklar
- **Hover/Focus Otomasyonu**: Mouse veya klavye odağı bir buton, kart veya grafiğe geldiğinde otomatik seslendirme
- **Web Speech API Entegrasyonu**: Tarayıcı tabanlı, API'siz ses sentezi

### 🧠 2. Gemini 1.5 Pro & Vision Integration (Dijital Göz)
- **Görsel Yapı Analizi**: PDF'lerdeki tabloları, grafikleri ve mekansal düzenleri anlar
- **Mock AI Simülasyonu**: Gerçek API kullanmadan profesyonel AI deneyimi
- **Sesli Görsel Betimleme**: "Sol tarafta hücre bölünmesi şeması var" gibi detaylı açıklamalar

### 🌊 3. Antigravity UI (Süzülen Arayüz)
- **Framer Motion Animasyonları**: Kartlar ve elementler havada süzülür gibi hareket eder
- **Neubrutalism Tasarım**: Yüksek kontrast (Siyah-Sarı-Mavi) renk paleti
- **Stagger Animasyonları**: Elementler sırayla belirerek görsel hiyerarşi oluşturur

### 📊 4. Smart Statistics & Achievement Stories
- **AI Motivasyon Hikayesi**: Haftalık performans verilerini analiz edip kişiselleştirilmiş başarı hikayesi seslendirir
- **Prisma v7 Entegrasyonu**: Hızlı, güvenli veritabanı sorguları
- **Sesli Başarı Kutlaması**: "Harikasın Ali, dün limitlerini zorladın!" gibi teşvik edici mesajlar

### 🔒 5. Security & Token Saver (Caching)
- **Prisma Önbelleği**: Aynı PDF analizlerini tekrar yapmaz, maliyet düşürür
- **Guardrails**: Hassas verileri işlemez, etik kurallar çerçevesinde çalışır

## 🛠️ Teknolojik Farklar
| Özellik | Bizim Uygulama | Sıradan Uygulamalar |
|---------|----------------|---------------------|
| Hız | Next.js 15 & Turbopack | Standart React |
| Veritabanı | Prisma v7 (TypedSQL) | Klasik SQL |
| Ses | Web Speech API + Mock OpenAI | Sadece tarayıcı desteği |
| Analiz | Mock Multimodal Gemini | Sadece metin tabanlı |
| UI | Framer Motion Antigravity | Statik tasarım |

## 📁 Project Documentation
You can access detailed planning files below:

📄 idea.md - Project vision and problem definition.

📄 prd.md - Product Requirements Document.

📄 tasks.md - Development process task list.

📄 user-flow.md - User experience flow.

📄 tech-stack.md - Detailed technology stack.


## 🛠  Installation & Setup

### 1. Clone the Repository

bash

git clone [[https://github.com/aslihangencer/accessible-academy.git](https://github.com/aslihangencer/accessible-academy.git](https://github.com/aslihangencer/ai-education-platform/tree/main))]
cd accessible-academy 
### 2. Install Dependencie


Bash

npm install
### 3. Environment Configuration:
Create a .env.local file in the root directory and add the following:
# Variable       --------                   Description
-----
DATABASE_URL         ------------------> Supabase PostgreSQL connection string.


NEXTAUTH_SECRET       ------------------> Run openssl rand -base64 32 to generate.


GOOGLE_CLIENT_ID      ------------------>  Google Cloud OAuth Client ID.

GOOGLE_CLIENT_SECRET   ------------------>  Google Cloud OAuth Client Secret.


GOOGLE_GEMINI_API_KEY   ------------------> GOOGLE_GEMINI_API_KEY

## 4. Database Initialization
Sync your Prisma schema and generate the client:

Bash

npx prisma db push

npx prisma generate 

## 5. Run Development Server

Bash

npm run dev


## 💡 Why This Project?
Millions of visually impaired students worldwide face difficulties in accessing academic materials and finding suitable mentors. Accessible Academy aims to turn equal opportunity in education into a reality by positioning AI as both an "eye" and an "assistant."
## 📄 License
MIT License

---
## ⚡ Installation
```
agent-69cc2a51c4a223--mellifluous-granita-a00ae7.netlify.app
```
