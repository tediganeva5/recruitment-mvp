export async function fileToBuffer(file) {
  const maxSize = 10 * 1024 * 1024; // 10MB limit
  if (file.size > maxSize) {
    throw new Error("File too large. Max size is 10MB.");
  }

  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
