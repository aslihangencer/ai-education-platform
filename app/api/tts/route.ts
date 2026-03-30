import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, languageCode = "tr-TR", voiceName = "tr-TR-Wavenet-A" } = await req.json();

    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "GOOGLE_API_KEY is not set in environment variables." }, { status: 500 });
    }

    const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode, name: voiceName },
        audioConfig: { audioEncoding: "MP3" },
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData.error?.message || "Google TTS API error" }, { status: res.status });
    }

    const data = await res.json();
    
    // Google Cloud TTS returns base64 encoded string in data.audioContent
    const audioContent = data.audioContent;
    const buffer = Buffer.from(audioContent, 'base64');

    return new NextResponse(buffer, {
      headers: { 
        "Content-Type": "audio/mpeg",
        "Content-Length": buffer.length.toString()
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
