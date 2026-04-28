import { Inngest, eventType, staticSchema } from "inngest";

export const appUserCreated = eventType("app/user.created", {
  schema: staticSchema<{
    email: string;
    name: string;
    country: string;
    investmentGoals: string;
    riskTolerance: string;
    preferredIndustry: string;
  }>(),
});

export const inngest = new Inngest({
  id: "signalist",
  ai: { gemini: { apiKey: process.env.GEMINI_API_KEY! } },
});