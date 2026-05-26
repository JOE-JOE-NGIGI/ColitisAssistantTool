export const analyzeSymptoms = async (rawText) => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: `You are a clinical AI assistant specialized in Ulcerative Colitis (UC).
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
  - If urgency is urgent, first recommendation must be to contact a doctor today`
            }]
          },
          contents: [{
            parts: [{ text: rawText }]
          }]
        })
      }
    );
  
    const data = await response.json();
  
    // Log full Gemini response to see what's coming back
    console.log("Gemini response:", JSON.stringify(data, null, 2));
  
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error(`Gemini error: ${JSON.stringify(data)}`);
    }
  
    const text = data.candidates[0].content.parts[0].text;
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  };