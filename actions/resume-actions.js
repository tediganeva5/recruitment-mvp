"use server";

import { extractCandidateData } from "@/lib/ai/tasks/extractCandidateData";
import { addCandidateDb } from "@/lib/db/candidate";
import { extractPdfText } from "@/lib/helpers/extractPdfText";

export const uploadResume = async (prevState, formData) => {
  try {
    const file = formData.get("resume");
    if (!file) return { success: false, error: "No file provided." };

    // Strict MIME and extension validation
    const validTypes = ["application/pdf"];
    const isPdf =
      validTypes.includes(file.type) ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return {
        success: false,
        error: "Invalid file type. Please upload a PDF file.",
      };
    }

    // Extract text
    const extractedText = await extractPdfText(file);

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
    const candidate = await addCandidateDb(data, "");

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
