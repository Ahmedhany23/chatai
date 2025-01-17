import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

type ApiKey = string | undefined;


const apiKey : ApiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('API key is required but not provided.');
}
const genAI  = new GoogleGenerativeAI(apiKey || '');

const model = genAI?.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt : string) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  const { response } = await chatSession.sendMessage(prompt);
  return response.text();
}

export default run;
