"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";

import { extractCandidateData } from "@/lib/helpers/tasks/extractCandidateData";
import { addCandidateDb } from "@/lib/db/candidate";
import { extractPdfText } from "@/lib/helpers/extractPdfText";

export const uploadResume = async (prevState, formData) => {
  const file = formData.get("resume");

  if (!file || !file.size) return { error: "No file provided." };

  const validTypes = ["application/pdf"];
  const isPdf =
    validTypes.includes(file.type) || file.name.toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    return {
      error: "Invalid file type. Please upload a PDF file.",
    };
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    // Extract text
    const extractedText = await extractPdfText(file);

    // Pre-screening
    if (!extractedText || extractedText.length < 50) {
      return {
        error: "Failed to extract readable text from the PDF.",
      };
    }

    const { data } = await extractCandidateData(extractedText);

    // Store the CV in storage and save the candidate data to the database
    const candidateData = {
      ...data,
      cvUrl: "test.pdf",
      userId: user.id,
    };

    await addCandidateDb(candidateData);

    revalidatePath("/candidate");
  } catch (err) {
    console.error("uploadResume error:", err);
    return {
      error: "Failed to extract data from document. Try again later.",
    };
  }
};
