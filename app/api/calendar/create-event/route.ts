import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return NextResponse.json({ error: 'Google Calendar izni bulunamadı. Lütfen tekrar giriş yapın.' }, { status: 401 });
    }

    const { teacherEmail, studentEmail, startTime, title, durationMinutes = 60 } = await req.json();

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    
    auth.setCredentials({ 
      access_token: session.accessToken,
      refresh_token: session.refreshToken
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Etkinlik detayları
    const event = {
      summary: `Erişilebilir Ders: ${title || 'Mentorluk Seansı'}`,
      description: 'Bu ders AI Education Platform üzerinden otomatik olarak oluşturulmuştur. Görme engelli dostu bir eğitim seansıdır.',
      start: { 
        dateTime: new Date(startTime).toISOString(), 
        timeZone: 'Europe/Istanbul' 
      },
      end: { 
        dateTime: new Date(new Date(startTime).getTime() + durationMinutes * 60 * 1000).toISOString(), 
        timeZone: 'Europe/Istanbul' 
      },
      attendees: [
        { email: teacherEmail },
        { email: studentEmail }
      ],
      conferenceData: {
        createRequest: {
          requestId: `lesson-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1, // Meet linki oluşturmak için zorunlu
    });

    return NextResponse.json({ 
      success: true, 
      eventLink: response.data.htmlLink,
      meetLink: response.data.conferenceData?.entryPoints?.[0]?.uri,
      eventId: response.data.id
    });

  } catch (error: any) {
    console.error('Google Calendar Error:', error);
    return NextResponse.json({ 
      error: 'Takvim etkinliği oluşturulamadı.', 
      details: error.message 
    }, { status: 500 });
  }
}
