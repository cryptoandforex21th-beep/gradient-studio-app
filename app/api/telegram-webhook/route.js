import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// System Prompts for each Agent Persona
const AGENT_PERSONAS = {
  ai: {
    name: 'Ai (Executive PM)',
    systemPrompt: `Kamu adalah Ai (berarti Cinta / 愛), asisten pribadi dan sahabat masa kecil Heru Ardiansyah (Arsitek, Founder GradiEnt Studio di Makassar).
Gaya komunikasi: Hangat, santai, akrab, suportif, dan solutif.
ATURAN MUTLAK: JANGAN PERNAH MENGGUNAKAN KATA "WE". Berbicaralah dengan bahasa santai teman akrab tanpa kata "we".
Kamu memahami seluruh arsitektur SecondBrain Heru, proyek GradiEnt Studio, skripsi pencahayaan Unhas, dan bisnisnya. Jawab dengan ringkas, tajam, dan langsung ke solusi.`
  },
  luna: {
    name: 'Prof. LUNA (Akademik & Skripsi)',
    systemPrompt: `Kamu adalah Profesor LUNA, Kepala Penasihat Akademik Skripsi S1 Arsitektur Universitas Hasanuddin (Unhas).
Karakter: Kritis, berbobot, berbasis bukti ilmiah (evidence-based), tanpa penjilat (zero sycophancy).
Fokus: Standar SNI 03-6197 (pencahayaan alami & hemat energi), jurnal Scopus Q1 (Al-Marwaee & Carter, Mayhoub, Zhang et al.), sains pencahayaan Solar Tube, dan iklim tropis Makassar.
Berikan masukan akademik yang presisi, logis, dan selalu cantumkan argumen teknis/metodologis yang tajam.`
  },
  mochi: {
    name: 'Mochi (Lead Architect GradiEnt Studio)',
    systemPrompt: `Kamu adalah Mochi, Lead Web Architect & Creative Developer GradiEnt Studio.
Spesialisasi: Next.js 14 App Router, Three.js / React Three Fiber 3D interactive web, Supabase Auth/DB, Tailwind CSS, dan estetika visual modern (Cult-UI, palette warm earthy terracotta & paper).
Bantu Heru dalam merancang fitur web, arsitektur database, dan pengalaman digital kelas dunia.`
  },
  kaktus: {
    name: 'Kaktus (BIM & Konstruksi Lead)',
    systemPrompt: `Kamu adalah Kaktus, BIM Manager dan Ahli Konstruksi AEC (Architecture, Engineering, Construction).
Spesialisasi: Autodesk Revit 2027, Rhinoceros 3D, Dynamo visual programming, klasifikasi BIM LOD 300-350, audit tabrakan geometri (Clash Detection), dan perhitungan estimasi anggaran biaya konstruksi (RAB AHSP Makassar).
Jawab pertanyaan teknis konstruksi dengan presisi teknis tinggi.`
  },
  masamba: {
    name: 'MasAmba (Lead Quant & Chartist)',
    systemPrompt: `Kamu adalah MasAmba, Lead Quantitative Trader & Smart Money Concepts (SMC) Specialist.
Spesialisasi: Pembacaan struktur market (Bullish/Bearish Order Blocks, Fair Value Gap - FVG, Liquidity Sweeps, RSI divergence), analisa makro Crypto (BTC/ETH/SOL) dan Forex.
Aturan Mutlak: Selalu terapkan guardrail manajemen risiko ketat (maksimal risiko 1-2% per trade, stop loss disiplin). Jangan pernah memberikan rekomendasi tanpa batas risiko!`
  }
};

// Function to call Gemini 2.5 Flash API
async function callGemini(systemPrompt, userMessage) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables.');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const payload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: userMessage }]
      }
    ],
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    }
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API Error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return candidate || 'Maaf, tidak ada respons yang dihasilkan oleh model AI.';
}

// Function to send message back to Telegram
async function sendTelegramMessage(chatId, text, replyToMessageId = null) {
  if (!TELEGRAM_BOT_TOKEN) return;

  const endpoint = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  // Truncate to Telegram's 4096 max length if needed
  const chunks = [];
  let remaining = text;
  while (remaining.length > 0) {
    chunks.push(remaining.substring(0, 4000));
    remaining = remaining.substring(4000);
  }

  for (const chunk of chunks) {
    const payload = {
      chat_id: chatId,
      text: chunk,
      parse_mode: 'Markdown',
      ...(replyToMessageId ? { reply_to_message_id: replyToMessageId } : {})
    };

    // Try Markdown first, fallback to plain text if Markdown syntax fails
    let res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      delete payload.parse_mode;
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
  }
}

export async function POST(req) {
  try {
    const update = await req.json();
    const message = update.message || update.edited_message;
    if (!message || !message.text) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const isGroup = message.chat.type === 'group' || message.chat.type === 'supergroup';
    const text = message.text.trim();
    const messageId = message.message_id;

    // Handle /start or /help
    if (text === '/start' || text === '/help') {
      const welcome = `✨ *Selamat datang di Hub Agen AI SecondBrain!*

Hub ini terhubung 24/7 di Cloud Vercel, jadi kamu bisa memanggil seluruh divisi agen kapan saja langsung dari HP, bahkan saat laptop kamu mati.

🤖 *Daftar Agen & Perintah Panggilan:*
• \`/ai [pesan]\` 👉 *Ai (Executive PM & Sahabat Heru)*
• \`/luna [topik]\` 👉 *Prof. LUNA (Skripsi & Sains Pencahayaan SNI)*
• \`/mochi [fitur]\` 👉 *Mochi (Lead Web & Software GradiEnt)*
• \`/kaktus [BIM/RAB]\` 👉 *Kaktus (Revit 2027 & Analisis Konstruksi)*
• \`/masamba [market]\` 👉 *MasAmba (SMC Trading & Manajemen Risiko)*
• \`/status\` 👉 *Cek Status Server & Sistem Cloud*

💡 *Di Chat Pribadi:* Kamu bisa langsung ketik pertanyaan apa saja tanpa perintah, otomatis akan dijawab oleh Ai!
👥 *Di Grup:* Tag nama bot atau gunakan perintah di atas untuk mengaktifkan agen yang kamu butuhkan.`;
      
      await sendTelegramMessage(chatId, welcome, messageId);
      return NextResponse.json({ ok: true });
    }

    // Handle /status
    if (text === '/status') {
      const statusMsg = `🟢 *STATUS SISTEM SECONDBRAIN CLOUD*
• *Platform:* Vercel Cloud Serverless (Always ON 24/7)
• *AI Engine:* Google Gemini 2.5 Flash
• *Workspace:* GradiEnt Studio & SecondBrain Heru
• *Active Agents:* 5 Divisi (@Ai, @Luna, @Mochi, @Kaktus, @MasAmba)
• *Database:* Supabase PostgreSQL Active
• *Laptop Local Status:* Independent (Cloud bot tetap aktif meski laptop mati)`;
      
      await sendTelegramMessage(chatId, statusMsg, messageId);
      return NextResponse.json({ ok: true });
    }

    // Determine target agent
    let targetAgent = 'ai';
    let cleanPrompt = text;

    const lower = text.toLowerCase();
    if (lower.startsWith('/luna') || lower.startsWith('@luna')) {
      targetAgent = 'luna';
      cleanPrompt = text.replace(/^(\/luna|@luna)\s*/i, '');
    } else if (lower.startsWith('/mochi') || lower.startsWith('@mochi')) {
      targetAgent = 'mochi';
      cleanPrompt = text.replace(/^(\/mochi|@mochi)\s*/i, '');
    } else if (lower.startsWith('/kaktus') || lower.startsWith('@kaktus')) {
      targetAgent = 'kaktus';
      cleanPrompt = text.replace(/^(\/kaktus|@kaktus)\s*/i, '');
    } else if (lower.startsWith('/masamba') || lower.startsWith('@masamba')) {
      targetAgent = 'masamba';
      cleanPrompt = text.replace(/^(\/masamba|@masamba)\s*/i, '');
    } else if (lower.startsWith('/ai') || lower.startsWith('@ai')) {
      targetAgent = 'ai';
      cleanPrompt = text.replace(/^(\/ai|@ai)\s*/i, '');
    } else if (isGroup) {
      // In a group, if no command was used and bot wasn't tagged, ignore to avoid spamming
      return NextResponse.json({ ok: true });
    }

    if (!cleanPrompt) {
      cleanPrompt = 'Halo! Ada yang bisa saya bantu sekarang?';
    }

    const persona = AGENT_PERSONAS[targetAgent];
    const aiResponse = await callGemini(persona.systemPrompt, cleanPrompt);
    const replyText = `*[${persona.name}]*\n\n${aiResponse}`;

    await sendTelegramMessage(chatId, replyText, messageId);
    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error('[TELEGRAM_WEBHOOK_ERROR]', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    service: 'SecondBrain Multi-Agent Telegram Webhook',
    timestamp: new Date().toISOString()
  });
}
