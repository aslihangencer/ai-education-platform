# AI Accessibility Backend: PDF Page-Range Analyzer
# Requires: pip install fastapi uvicorn pymupdf google-generativeai

import fitz  # PyMuPDF
from fastapi import FastAPI, UploadFile, File
import google.generativeai as genai
import os

app = FastAPI(title="AI PDF Analyzer Service")
genai.configure(api_key=os.getenv("GEMINI_API_KEY", "YOUR_API_KEY"))

@app.post("/analyze-pdf/")
async def analyze_pdf(
    start_page: int, 
    end_page: int, 
    file: UploadFile = File(...)
):
    """
    1. Read PDF from memory
    2. Extract text from specific page range
    3. Generate proactive narration with Gemini 1.5 Pro
    """
    pdf_content = await file.read()
    doc = fitz.open(stream=pdf_content, filetype="pdf")
    
    extracted_text = ""
    for page_num in range(start_page - 1, min(end_page, doc.page_count)):
        page = doc.load_page(page_num)
        extracted_text += f"--- Page {page_num + 1} ---\n"
        extracted_text += page.get_text()

    model = genai.GenerativeModel('gemini-1.5-pro')
    
    # Advanced "PROACTIVE TEACHER" Prompt (WCAG compliant)
    prompt = f"""
    Sen görme engelli bir öğrenci için özel bir eğitim asistanısın. 
    Aşağıdaki metin bir ders kitabının {start_page} ve {end_page}. sayfaları arasından alınmıştır.
    
    Lütfen:
    1. Bu sayfaların genel bir özetini yap.
    2. Varsa karmaşık tabloları veya formülleri adım adım açıkla.
    3. Metinde grafiklere atıfta bulunuluyorsa (Örn: 'Şekil 1.2'), öğrenciye bu görselin ne hakkında olabileceğine dair mantıksal tahminlerde bulun.
    4. Öğrencinin aklında kalması için 3 önemli anahtar nokta belirt.
    
    Metni bir sesli kitap akıcılığında anlat ve öğretmenin bu konuda ne sormuş olabileceğini simüle et.
    
    Metin: {extracted_text}
    """
    
    response = model.generate_content(prompt)
    
    return {
        "summary": response.text,
        "page_range": f"{start_page}-{end_page}",
        "status": "success"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
