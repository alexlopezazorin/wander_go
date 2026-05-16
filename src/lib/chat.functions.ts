import { createServerFn } from "@tanstack/react-start";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";
import { generateText } from "ai";
import { CITIES, type CityKey } from "@/lib/avatars";

interface ChatInput {
  cityKey: CityKey;
  history: { role: "user" | "assistant"; content: string }[];
  message: string;
}

export const askAvatar = createServerFn({ method: "POST" })
  .inputValidator((input: ChatInput) => {
    if (!input || typeof input.message !== "string") throw new Error("Invalid input");
    if (!(input.cityKey in CITIES)) throw new Error("Unknown city");
    return input;
  })
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY missing");
    const profile = CITIES[data.cityKey];
    const gateway = createLovableAiGatewayProvider(key);
    const model = gateway("google/gemini-3-flash-preview");
    const { text } = await generateText({
      model,
      messages: [
        { role: "system", content: profile.systemPrompt + `\nCoordinates: ${profile.coords.join(", ")}.` },
        ...data.history,
        { role: "user", content: data.message },
      ],
    });
    return { reply: text };
  });
