"use server";

import { createClient } from "@/utils/supabase/server";

import { extractCandidateData } from "@/lib/helpers/tasks/extractCandidateData";
import { addCandidateDb } from "@/lib/db/candidate";
import { extractPdfText } from "@/lib/helpers/extractPdfText";

export const uploadResume = async (prevState, formData) => {
  const file = formData.get("resume");
  if (!file) return { success: false, error: "No file provided." };

  // Strict MIME and extension validation
  const validTypes = ["application/pdf"];
  const isPdf =
    validTypes.includes(file.type) || file.name.toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    return {
      success: false,
      error: "Invalid file type. Please upload a PDF file.",
    };
  }

  try {
    // Get recruiter (logged in user)
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
        success: false,
        error: "Failed to extract readable text from the PDF.",
      };
    }

    const { data } = await extractCandidateData(extractedText);

    // Store the CV in storage and save the candidate data to the database
    console.log("Extracted Candidate Data:", data);
    // const testCVUrl = "https://example.com/test-cv.pdf"; // Placeholder URL
    const candidateData = {
      ...data,
      cvUrl: "test.pdf",
      userId: user.id,
    };
    const candidate = await addCandidateDb(candidateData);

    return {
      sucess: true,
      text: extractedText, // full text for next AI processing step
    };
  } catch (err) {
    console.error("uploadResume error:", err);
    return {
      success: false,
      error: "Failed to extract data from document",
    };
  }
};
