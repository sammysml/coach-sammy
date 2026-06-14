import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
const MODEL = "claude-sonnet-4-20250514";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function callClaude(system, user, maxTokens = 1024) {
  if (!ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY secret is not set on this function");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system: system || "You are a helpful assistant.", messages: [{ role: "user", content: user }] }),
  });
  if (!res.ok) { const e = await res.text(); throw new Error(`Anthropic API ${res.status}: ${e.slice(0,300)}`); }
  const data = await res.json();
  const text = (data?.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
  if (!text) throw new Error("Empty completion from Claude");
  return text;
}

function parseJSON(text) {
  const clean = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  return JSON.parse(clean);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const body = await req.json().catch(() => ({}));
    const action = body?.action || "raw";
    const payload = body?.payload || {};

    if (action === "meal_plan") {
      const cal = payload?.calories || 2000, prot = payload?.protein || 130, carbs = payload?.carbs || 200, fat = payload?.fat || 60;
      const goal = payload?.goal || "", prefs = payload?.preferences || "", excluded = payload?.excluded || "";
      const sys = "Tu es un nutritionniste. Tu reponds UNIQUEMENT en JSON valide, sans texte avant ou apres, sans backticks.";
      const user = `Cree un plan nutritionnel d'une journee. Objectifs: ${cal} kcal, ${prot}g proteines, ${carbs}g glucides, ${fat}g lipides. Objectif client: ${goal}. Preferences: ${prefs}. A exclure: ${excluded}. Ingredients disponibles en Algerie, halal, simples. Le total des calories doit etre a +/- 10% de ${cal} kcal. Reponds en JSON exactement: {"days":[{"day":"Jour 1","meals":[{"name":"PETIT-DEJEUNER","title":"...","foods":[{"name":"...","quantity":"...","calories":0,"protein":0,"carbs":0,"fat":0}],"instructions":"..."}]}]}`;
      const text = await callClaude(sys, user, 3000);
      const json = parseJSON(text);
      return new Response(JSON.stringify({ data: json, ...json }), { headers: { ...cors, "content-type": "application/json" } });
    }

    if (action === "convert_sessions") {
      const prompt = payload?.prompt || payload?.text || "";
      if (!prompt) throw new Error("Missing payload.text");
      const text = await callClaude(payload?.system || "Tu reponds UNIQUEMENT en JSON valide.", prompt, 3000);
      let out; try { out = parseJSON(text); } catch { out = { text }; }
      return new Response(JSON.stringify({ data: out, ...(typeof out === "object" ? out : {}) }), { headers: { ...cors, "content-type": "application/json" } });
    }

    if (action === "coach_message") {
      if (!payload?.prompt) throw new Error("Missing payload.prompt");
      const text = await callClaude("Tu es un coach sportif experimente qui ecrit des messages personnels a ses clients.", payload.prompt, 800);
      return new Response(text, { headers: { ...cors, "content-type": "text/plain" } });
    }

    if (action === "full_program") {
      const prompt = payload?.prompt || payload?.user || "";
      if (!prompt) throw new Error("Missing payload.prompt");
      const text = await callClaude(payload?.system || "You are an expert fitness program designer.", prompt, 4000);
      return new Response(text, { headers: { ...cors, "content-type": "text/plain" } });
    }

    const system = payload?.system || "You are a helpful assistant.";
    const user = payload?.user || payload?.prompt || "";
    if (!user) throw new Error("Missing payload.user or payload.prompt");
    const text = await callClaude(system, user, payload?.maxTokens || 2000);
    return new Response(text, { headers: { ...cors, "content-type": "text/plain" } });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("ai-coach error:", msg);
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { ...cors, "content-type": "application/json" } });
  }
});
