import * as XLSX from 'xlsx';
import { NextResponse } from 'next/server';

/**
 * GET: /api/template
 * Generates and downloads a standardized Excel template for teachers 
 * to record student lesson progress.
 */
export async function GET() {
  try {
    const templateData = [
      { 
        Date: '2026-03-30', 
        BookName: 'Matematik Soru Bankası', 
        PagesRead: 20, 
        QuestionsSolved: 50, 
        DurationMinutes: 60, 
        StudentId: 'user_id_here' 
      }
    ];
    
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ders_Kayit_Sablonu");
    
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    
    return new NextResponse(buf, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="engelsiz_akademi_sablon.xlsx"'
      }
    });
  } catch (error) {
    console.error("Template Export Error:", error);
    return NextResponse.json({ error: "Could not generate template" }, { status: 500 });
  }
}
