import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";

import { fileToBuffer } from "./fileToBuffer";

// NOTE: This function creates a temporary file to work around
// Overview of pdf parsing libraries that could be used in place of pdf2json:
// https://strapi.io/blog/7-best-javascript-pdf-parsing-libraries-nodejs-2025?utm_source=chatgpt.com

export async function extractPdfText(file) {
  const fileName = `${uuidv4()}.pdf`;
  const tempPath = `/tmp/${fileName}`;
  const pdfParser = new PDFParser(null, 1);

  try {
    const buffer = await fileToBuffer(file);
    // Write temporary file
    await fs.writeFile(tempPath, buffer);

    // Parse PDF
    // eslint-disable-next-line no-undef
    const rawText = await new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (err) => reject(err.parserError));
      pdfParser.on("pdfParser_dataReady", () => {
        resolve(pdfParser.getRawTextContent());
      });
      pdfParser.loadPDF(tempPath);
    });

    // Clean and normalize text
    const cleanedText = rawText
      .replace(/\s{2,}/g, " ") // collapse multiple spaces
      .replace(/\n\s*\n/g, "\n") // clean up excessive newlines
      .trim();

    return cleanedText;
  } finally {
    // Always remove temp file
    await fs.unlink(tempPath).catch(() => {});
  }
}
