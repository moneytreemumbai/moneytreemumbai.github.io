import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  company: z.string().trim().min(1, "Company is required").max(150),
  role: z.string().trim().max(100).optional().default(""),
  interest: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(10, "Please add a short message").max(2000),
  // honeypot — must be empty
  website: z.string().max(0).optional().default(""),
});

// Simple in-memory rate limit: 5 requests / 10 min per IP. Best-effort;
// resets on cold start. For strict limits, back with Cloud/KV.
const HITS = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const cur = HITS.get(ip);
  if (!cur || cur.resetAt < now) {
    HITS.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  cur.count += 1;
  return cur.count > MAX_HITS;
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("cf-connecting-ip") ||
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          "unknown";

        if (rateLimited(ip)) {
          return Response.json(
            { ok: false, error: "Too many requests. Please try again later." },
            { status: 429 },
          );
        }

        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json(
            { ok: false, error: "Invalid request body" },
            { status: 400 },
          );
        }

        const parsed = ContactSchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json(
            {
              ok: false,
              error: "Validation failed",
              issues: parsed.error.flatten().fieldErrors,
            },
            { status: 400 },
          );
        }

        // Honeypot silently succeeds
        if (parsed.data.website && parsed.data.website.length > 0) {
          return Response.json({ ok: true });
        }

        // Log the inquiry to server logs. Wire to Lovable Emails / CRM
        // once Lovable Cloud + email domain are provisioned.
        const { website: _hp, ...payload } = parsed.data;
        console.log(
          "[contact-inquiry]",
          JSON.stringify({ ip, ts: new Date().toISOString(), ...payload }),
        );

        return Response.json({ ok: true });
      },
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }),
    },
  },
});
