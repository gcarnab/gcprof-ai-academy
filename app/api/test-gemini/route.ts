import { testGoogleGeminiDirect } from "@/lib/ai/geminiTest";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const responseText = await testGoogleGeminiDirect(
      "Rispondi con una frase confermando che il collegamento a Google AI Studio è attivo."
    );

    return NextResponse.json({
      success: true,
      response: responseText,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}