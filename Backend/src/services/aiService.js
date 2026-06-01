export const analyzeSymptoms = async (rawText) => {
  const Anthropic = (await import("@anthropic-ai/sdk")).default;

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });

  const response = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    system: `You are a clinical AI assistant specialized in Ulcerative Colitis (UC).
Analyze the patient's symptom description and return ONLY valid JSON, no other text:
{
  "status": "remission" | "mild_flare" | "active_flare",
  "confidence": "low" | "moderate" | "high",
  "summary": "1-2 sentence warm plain-language assessment",
  "recommendations": ["step1", "step2", "step3"],
  "urgency": "routine" | "soon" | "urgent"
}
Rules:
- active_flare: bloody stool, fever, frequency >6/day, severe pain
- mild_flare: some symptoms, frequency 3-6/day, mild-moderate pain
- remission: minimal or no symptoms, normal frequency
- Be warm, supportive and non-alarming
- If urgency is urgent, first recommendation must be to contact a doctor today`,
    messages: [{ role: "user", content: rawText }]
  });

  const text = response.content.map(c => c.text || "").join("");
  return JSON.parse(text.replace(/```json|```/g, "").trim());
};