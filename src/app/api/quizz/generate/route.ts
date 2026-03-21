import { NextRequest, NextResponse } from "next/server";

import { ChatGoogle } from "@langchain/google/node";
import { HumanMessage } from "@langchain/core/messages";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import saveQuizz from "./saveToDb";
import { auth } from "@/auth";


export async function POST(request: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.formData();
  const document = body.get("pdf");

  if (!(document instanceof Blob) || document.size === 0) {
    return NextResponse.json({ error: "Please upload a valid PDF file" }, { status: 400 });
  }

  try {
    const pdfLoader = new PDFLoader(document, {
      parsedItemSeparator: "",
    });
    const docs = await pdfLoader.load();

    const selectedDocuments = docs.filter((doc) => doc.pageContent !== undefined);
    const texts = selectedDocuments.map((doc) => doc.pageContent);

    const prompt = "given the text which is a summary of the document, generate a quiz based on the text. Return json only that contains a quizz object with fields: name, description and questions. The questions is an array of objects with fields: questionText, answers. The answers is an array of objects with fields: answerText, isCorrect.";

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key is not set" }, { status: 500 });
    }

    const model = new ChatGoogle({
      apiKey: process.env.GEMINI_API_KEY,
      model: "gemini-2.5-flash",
    });

    const result = await model.invoke([
      new HumanMessage(prompt + "\n" + texts.join("\n")),
    ]);

    const cleaned = result.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);
    if (!parsed?.quizz) {
      return NextResponse.json({ error: "Invalid quiz payload returned by model" }, { status: 502 });
    }

    const { quizzId } = await saveQuizz(parsed.quizz, userId);

    return NextResponse.json({ quizzId }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

