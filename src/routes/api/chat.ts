import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, validateUIMessages, type UIMessage } from "ai";
import { z } from "zod";

import {
  createSupportResponsesProvider,
  getLovableAiGatewayResponseHeaders,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai-gateway.server";

const requestSchema = z.object({
  messages: z.array(z.unknown()).max(40),
});

const SUPPORT_INSTRUCTIONS = `You are Market Strategy's customer support assistant, named Meridian.

You answer business-related questions about Market Strategy using only the verified company information below and the current conversation. Be clear, concise, helpful, and professional. Never invent pricing, client names, performance claims, policies, contact details, office details, or guarantees. If the answer is not in the information below, say that you do not have enough verified information and invite the customer to contact the advisory team at contact@marketstrategy.com.

Company information:
- Market Strategy is a global strategic consulting, investment advisory, and business transformation firm.
- Services include market research and intelligence, corporate strategy, growth consulting, business transformation, investment advisory, risk management, financial planning, digital strategy, mergers and acquisitions, and ESG and sustainability.
- Industries served include banking, financial services, healthcare, manufacturing, retail, technology, real estate, energy, government, education, logistics, and telecommunications.
- The firm's process is Discovery, Market Analysis, Strategic Design, and Execution Support.
- The team supports board-level strategy, portfolio choices, growth programs, operating model redesign, capital allocation, diligence, and measurable transformation.
- Do not provide financial, legal, tax, or investment advice to an individual. Explain that a qualified professional should review those matters.
- For a human conversation, direct customers to the Contact page or contact@marketstrategy.com.

Keep answers under 180 words unless the customer asks for more detail. Use short paragraphs or bullets when useful.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = requestSchema.parse(await request.json());
          const messages = await validateUIMessages({ messages: body.messages });
          const apiKey = process.env["LOVABLE_API_KEY"];

          if (!apiKey) {
            return new Response("The support assistant is not configured yet.", { status: 503 });
          }

          const { gateway, model } = createSupportResponsesProvider(request, apiKey);
          const result = streamText({
            model,
            system: SUPPORT_INSTRUCTIONS,
            messages: await convertToModelMessages(messages as UIMessage[]),
            abortSignal: request.signal,
            providerOptions: {
              openai: {
                forceReasoning: true,
                reasoningEffort: "low",
                reasoningSummary: "auto",
                store: false,
                include: ["reasoning.encrypted_content"],
              },
            },
          });

          const response = result.toUIMessageStreamResponse({
            originalMessages: messages as UIMessage[],
            sendReasoning: true,
            headers: getLovableAiGatewayResponseHeaders(undefined),
          });

          return withLovableAiGatewayRunIdHeader(response, gateway);
        } catch (error) {
          if (error instanceof z.ZodError) {
            return new Response("Please send a valid support question.", { status: 400 });
          }
          if (error instanceof Error && error.name === "AbortError") {
            return new Response(null, { status: 499 });
          }
          console.error("Support assistant request failed", error);
          return new Response("The support assistant could not respond right now.", { status: 500 });
        }
      },
    },
  },
});