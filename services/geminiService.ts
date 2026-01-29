
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { WritingFeedback, ExamType } from "../types";

// Use VITE_ prefix for client-side env vars
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
// Initialize conditionally or with a dummy key to prevent immediate crash during build/start
// Actual calls will still fail if key is missing, but app won't crash on load.
const ai = new GoogleGenAI({ apiKey: API_KEY || 'PLACEHOLDER_KEY_FOR_BUILD' });

/**
 * Service for Writing Assistance
 */
export const gradeWritingEssay = async (
  essay: string,
  prompt: string,
  examType: ExamType
): Promise<WritingFeedback> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze this ${examType} essay based on the prompt: "${prompt}". 
    Essay: "${essay}"`,
    config: {
      systemInstruction: `You are an expert ${examType} examiner. Grade the essay according to official rubrics. Provide a band score (0-9 for IELTS, 0-30 for TOEFL) and detailed feedback for each criterion. Also provide a corrected version of the essay.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          bandScore: { type: Type.NUMBER },
          overallFeedback: { type: Type.STRING },
          criteria: {
            type: Type.OBJECT,
            properties: {
              taskResponse: {
                type: Type.OBJECT,
                properties: { score: { type: Type.NUMBER }, label: { type: Type.STRING }, feedback: { type: Type.STRING } },
                required: ['score', 'label', 'feedback']
              },
              coherenceCohesion: {
                type: Type.OBJECT,
                properties: { score: { type: Type.NUMBER }, label: { type: Type.STRING }, feedback: { type: Type.STRING } },
                required: ['score', 'label', 'feedback']
              },
              lexicalResource: {
                type: Type.OBJECT,
                properties: { score: { type: Type.NUMBER }, label: { type: Type.STRING }, feedback: { type: Type.STRING } },
                required: ['score', 'label', 'feedback']
              },
              grammaticalRange: {
                type: Type.OBJECT,
                properties: { score: { type: Type.NUMBER }, label: { type: Type.STRING }, feedback: { type: Type.STRING } },
                required: ['score', 'label', 'feedback']
              }
            },
            required: ['taskResponse', 'coherenceCohesion', 'lexicalResource', 'grammaticalRange']
          },
          correctedText: { type: Type.STRING }
        },
        required: ['bandScore', 'overallFeedback', 'criteria', 'correctedText']
      }
    }
  });

  return JSON.parse(response.text);
};

/**
 * Service for Speaking Feedback (Non-Live fallback)
 */
export const analyzeSpeakingTranscript = async (
  transcript: string,
  examType: ExamType
) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze this ${examType} speaking transcript: "${transcript}"`,
    config: {
      systemInstruction: `You are an expert ${examType} speaking examiner. Evaluate the user's speech based on Fluency, Vocabulary, Grammar, and Pronunciation (based on text). Provide a band score and specific improvements.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          bandScore: { type: Type.NUMBER },
          overallFeedback: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          transcription: { type: Type.STRING }
        },
        required: ['bandScore', 'overallFeedback', 'strengths', 'weaknesses', 'transcription']
      }
    }
  });
  return JSON.parse(response.text);
};

// Live API Helpers
export function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
