import openai from "@/lib/ai/openai";

const model = "deepseek/deepseek-r1-distill-llama-70b:free";

const promptModel = async (prompt, timeoutMs) => {
  const controller = new AbortController();
  const timer = timeoutMs
    ? setTimeout(() => controller.abort(), timeoutMs)
    : null;

  try {
    const completion = await openai.chat.completions.create(
      {
        model,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      },
      { signal: controller.signal }
    );

    const content = completion.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty AI response");

    const data = JSON.parse(content);

    return { data };
  } catch (err) {
    return { error: err };
  } finally {
    if (timer) clearTimeout(timer);
  }
};

export default promptModel;
