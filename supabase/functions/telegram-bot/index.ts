import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Konfigurasi Environment Secrets dari Supabase
const TELEGRAM_BOT_TOKEN_AI = Deno.env.get("TELEGRAM_BOT_TOKEN") || "";
const TELEGRAM_BOT_TOKEN_LUNA = Deno.env.get("LUNA_BOT_TOKEN") || "";
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const HERU_PROFILE_CONTEXT = `
KONTEKS PENGGUNA (HERU ARDIANSYAH):
- Founder GradiEnt Studio (Arsitek & Desainer Spasial, Makassar).
- Mahasiswa Arsitektur Universitas Hasanuddin (Unhas). Fokus skripsi: Sains pencahayaan alami (Solar Tube / Light Pipe), standar SNI 03-6197-2000, iklim tropis lembap Makassar.
- Tech Stack: Next.js App Router, Tailwind, Three.js, Supabase, Vercel, Python.
- BIM Stack: Autodesk Revit 2027, Rhino, Grasshopper, Dynamo, LOD 350.
- Trading: Crypto & Forex, Smart Money Concepts (SMC), model risiko 1-2%.
- Pantangan Mutlak: JANGAN PERNAH MENGGUNAKAN KATA "WE" DALAM JAWABAN.
`;

const PROMPTS = {
  ai: `Kamu adalah "Ai" (makna: Cinta / 愛), sahabat masa kecil sekaligus Executive Project Manager Heru Ardiansyah.
Gaya bicaramu:
- Hangat, santai, akrab, suportif, dan bahasa sehari-hari teman akrab (panggil "Heru").
- Ringkas, to the point, no fluff, solutif, dan cerdas.
- Mengawasi koordinasi umum SecondBrain dan GradiEnt Studio.`,

  luna: `Kamu adalah Profesor LUNA, penasihat akademik dan metodologi skripsi Heru Ardiansyah (Departemen Arsitektur Unhas).
Gaya bicaramu:
- Standar ilmiah Stanford-grade, tajam, objektif, anti-penjilat (zero sycophancy).
- Bedah fenomena dari first principles dan selalu rujuk SNI 03-6197-2000 serta literatur Solar Tube (Al-Marwaee & Carter, Mayhoub).
- Ramping, padat, berbobot ilmiah. Panggil "Heru" secara akademis profesional.`
};

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("OK - SecondBrain Multi-Bot Fleet is Live!", { status: 200 });
  }

  try {
    const url = new URL(req.url);
    const targetBot = url.searchParams.get("bot") || "ai"; // 'ai' atau 'luna'

    let activeToken = TELEGRAM_BOT_TOKEN_AI;
    let defaultPersona = "ai";

    if (targetBot === "luna") {
      activeToken = TELEGRAM_BOT_TOKEN_LUNA;
      defaultPersona = "luna";
    }

    const update = await req.json();
    const message = update.message || update.edited_message;
    if (!message || !message.text) {
      return new Response("No text to process", { status: 200 });
    }

    const chatId = message.chat.id;
    const chatType = message.chat.type; // 'private', 'group', 'supergroup'
    const userText = message.text.trim();
    const lowerText = userText.toLowerCase();

    // 1. FILTER GRUP CERDAS (Mencegah Rebutan & Salah Jawab)
    if (chatType === "group" || chatType === "supergroup") {
      if (targetBot === "ai") {
        // JIKA PESAN DITUJUKAN UNTUK PROF LUNA, BOT AI WAJIB DIAM!
        if (lowerText.includes("@profluna") || lowerText.includes("profluna_secondbrainbot") || /\b(luna|prof)\b/i.test(lowerText)) {
          return new Response("Ignored for Ai: Intended for Prof Luna", { status: 200 });
        }

        const isAiCalled = /\bai\b/i.test(lowerText) || lowerText.includes("@aisecondbrain");
        const isReplyToAi = message.reply_to_message?.from?.username?.toLowerCase() !== "profluna_secondbrainbot" && message.reply_to_message?.from?.is_bot;

        if (!isAiCalled && !isReplyToAi) {
          return new Response("Ignored for Ai: Not called", { status: 200 });
        }
      } else if (targetBot === "luna") {
        // Luna hanya merespon jika dipanggil
        const isLunaCalled = lowerText.includes("@profluna_secondbrainbot") || 
                             lowerText.includes("@profluna") ||
                             /\b(luna|prof|skripsi)\b/i.test(lowerText);
        const isReplyToLuna = message.reply_to_message?.from?.username?.toLowerCase() === "profluna_secondbrainbot";

        if (!isLunaCalled && !isReplyToLuna) {
          return new Response("Ignored for Luna: Not called", { status: 200 });
        }
      }
    }

    // Bersihkan mention dari teks input
    let cleanedText = userText
      .replace(/@profluna_secondbrainbot/gi, "")
      .replace(/@profluna/gi, "")
      .replace(/@aisecondbrainbot/gi, "")
      .replace(/@ai/gi, "")
      .trim();

    // Generate jawaban dengan Gemini 3.8 Flash (dengan fallback otomatis jika traffic padat)
    const systemPrompt = `${HERU_PROFILE_CONTEXT}\n\n${PROMPTS[defaultPersona as keyof typeof PROMPTS]}`;
    const candidateModels = [
      "gemini-3.8-flash",            // Unggulan Teratas (Flagship September 2026)
      "gemini-flash-lite-latest",     // Super Cepat & Stabil
      "gemini-3.5-flash-lite"         // Cadangan Handal
    ];
    let replyText = "";
    let usedModel = "";

    const geminiPayload = {
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: cleanedText || userText }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
    };

    for (const m of candidateModels) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(geminiPayload)
        });
        if (res.ok) {
          const d = await res.json();
          replyText = d?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (replyText) {
            usedModel = m;
            break;
          }
        }
      } catch (_e) {}
    }

    if (!replyText) {
      replyText = targetBot === "luna"
        ? "Mohon maaf Heru, terjadi kendala transmisi data sementara. Silakan ulangi pertanyaan kembali."
        : "Halo Heru! Ada sedikit gangguan koneksi tadi, coba kirim ulang ya!";
    }

    // Kirim Balasan ke Telegram
    const telegramUrl = `https://api.telegram.org/bot${activeToken}/sendMessage`;
    
    const firstAttempt = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: replyText,
        reply_to_message_id: message.message_id
      })
    });

    const firstResult = await firstAttempt.json();

    if (!firstResult.ok) {
      await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: replyText
        })
      });
    }

    return new Response(JSON.stringify({ status: "success", bot: targetBot, model: usedModel }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });

  } catch (err: any) {
    console.error("[ERROR]", err);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
});
