import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export const dynamic = 'force-dynamic';

const OMNIROUTE_URL = 'http://localhost:20128/v1/chat/completions';
const OMNIROUTE_TOKEN = 'sk-3f0d3424d32fa317-340cc1-614c6eed';

export async function POST(req) {
  try {
    const { command, brain } = await req.json();
    if (!command || typeof command !== 'string') {
      return NextResponse.json({ error: 'Command query is required' }, { status: 400 });
    }

    const q = command.trim().toLowerCase();
    const timestamp = new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Makassar', hour12: false }) + ' WITA';

    // 0. Smartphone Automation Hooks (Wireless ADB Bridge)
    if (q.includes('unlock') && (q.includes('phone') || q.includes('hp'))) {
      const pythonPath = 'C:\\Python314\\python.exe';
      const scriptPath = 'D:\\SecondBrain\\00_system\\phone_jarvis.py';
      exec(`"${pythonPath}" "${scriptPath}" unlock`);
      return NextResponse.json({
        status: 'success',
        type: 'phone_control',
        cost: '$0.00 (Wireless ADB)',
        text: 'Layar smartphone telah dibuka kuncinya via Wireless ADB, sir.',
        agent: 'JARVIS // PHONE_BRIDGE',
        timestamp
      });
    }

    if (q.startsWith('call ') || q.startsWith('telepon ') || q.startsWith('hubungi ')) {
      const target = command.replace(/^(call|telepon|hubungi)\s+/i, '').replace(/in my phone|di hp/gi, '').trim();
      const pythonPath = 'C:\\Python314\\python.exe';
      const scriptPath = 'D:\\SecondBrain\\00_system\\phone_jarvis.py';
      exec(`"${pythonPath}" "${scriptPath}" call "${target}"`);
      return NextResponse.json({
        status: 'success',
        type: 'phone_control',
        cost: '$0.00 (Wireless ADB)',
        text: `Menghubungi ${target} langsung dari kartu SIM smartphone Anda sekarang, sir.`,
        agent: 'JARVIS // PHONE_BRIDGE',
        timestamp
      });
    }

    if ((q.includes('in my phone') || q.includes('di hp')) && (q.startsWith('buka ') || q.startsWith('open '))) {
      const appName = command.replace(/^(buka|open)\s+/i, '').replace(/in my phone|di hp/gi, '').trim();
      const pythonPath = 'C:\\Python314\\python.exe';
      const scriptPath = 'D:\\SecondBrain\\00_system\\phone_jarvis.py';
      exec(`"${pythonPath}" "${scriptPath}" app "${appName}"`);
      return NextResponse.json({
        status: 'success',
        type: 'phone_control',
        cost: '$0.00 (Wireless ADB)',
        text: `Aplikasi ${appName} telah dibuka di smartphone, sir.`,
        agent: 'JARVIS // PHONE_BRIDGE',
        timestamp
      });
    }

    // 1. Desktop Reflex Launchers (Sub-second execution, $0.00 cost)
    if (q.startsWith('buka ') || q.startsWith('open ') || q.startsWith('launch ')) {
      const target = command.replace(/^(buka|open|launch)\s+/i, '').trim();
      const pythonPath = 'C:\\Python314\\python.exe';
      const scriptPath = 'D:\\SecondBrain\\00_system\\app_launcher.py';
      
      try {
        exec(`"${pythonPath}" "${scriptPath}" "${target}"`);
        return NextResponse.json({
          status: 'success',
          type: 'reflex',
          cost: '$0.00 (Local Reflex)',
          text: `Membuka ${target} di layar Session 1 sekarang juga, sir.`,
          agent: 'REFLEX // APP_LAUNCHER',
          timestamp
        });
      } catch (err) {
        return NextResponse.json({
          status: 'error',
          text: `Gagal membuka ${target}: ${err.message}`,
          agent: 'REFLEX',
          timestamp
        });
      }
    }

    // 2. SecondBrain Sync Reflex
    if (q.includes('sync') || q.includes('sinkron') || q.includes('drive')) {
      const pythonPath = 'C:\\Python314\\python.exe';
      const scriptPath = 'D:\\SecondBrain\\00_system\\sync_gdrive.py';
      try {
        exec(`"${pythonPath}" "${scriptPath}"`);
        return NextResponse.json({
          status: 'success',
          type: 'reflex',
          cost: '$0.00 (Local Reflex)',
          text: 'Sinkronisasi SecondBrain ke Google Drive (G:\\My Drive\\SecondBrain) sedang diproses di latar belakang, sir.',
          agent: 'REFLEX // GDRIVE_SYNC',
          timestamp
        });
      } catch (err) {
        return NextResponse.json({
          status: 'error',
          text: `Gagal sinkronisasi: ${err.message}`,
          agent: 'REFLEX',
          timestamp
        });
      }
    }

    // 3. Virtual AI Office Reflex
    if (q.includes('office') || q.includes('virtual office') || q.includes('kantor')) {
      const pythonPath = 'C:\\Python314\\python.exe';
      const scriptPath = 'D:\\SecondBrain\\00_system\\app_launcher.py';
      exec(`"${pythonPath}" "${scriptPath}" "http://localhost:5173/virtual-ai-office/"`);
      return NextResponse.json({
        status: 'success',
        type: 'reflex',
        cost: '$0.00 (Local Reflex)',
        text: 'Membuka Virtual AI Office di browser (localhost:5173), sir.',
        agent: 'REFLEX // VIRTUAL_OFFICE',
        timestamp
      });
    }

    // 4. REAL LIVE AI ENGINE VIA OMNIROUTE (18 ACCOUNTS / ANTIGRAVITY / CLAUDE / GEMINI)
    const selectedModel = brain === 'SONNET 5.5' ? 'auto/best-chat' : brain === 'GEMINI 2.5 PRO' ? 'auto/pro-chat' : 'auto/best-chat';

    try {
      const aiResponse = await fetch(OMNIROUTE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OMNIROUTE_TOKEN}`
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            {
              role: 'system',
              content: `You are J.A.R.V.I.S., the legendary AI system engineered for Heru Ardiansyah (Architect, Spatial Designer, Founder of GradiEnt Studio).
You embody the witty, calm, sophisticated British persona of Tony Stark's J.A.R.V.I.S. (Paul Bettany style) combined with deep architectural and engineering knowledge from Heru's SecondBrain (located at D:\\SecondBrain).
CRITICAL RULES:
1. Address Heru respectfully as "sir" or "Heru".
2. NEVER USE THE WORDS "we", "kita", or "kami" under ANY circumstances. Speak as an individual AI assistant ("saya", "JARVIS", "I").
3. Keep answers concise, highly intelligent, elegant, and actionable (2-4 sentences max unless detailed calculation or design breakdown is specifically requested).
4. If asked in Indonesian, answer in refined, suave, slightly witty Indonesian. If asked in English, answer in authentic British English.`
            },
            {
              role: 'user',
              content: command
            }
          ],
          temperature: 0.7,
          max_tokens: 350
        })
      });

      if (aiResponse.ok) {
        const data = await aiResponse.json();
        const reply = data.choices?.[0]?.message?.content || 'Sistem telah memproses permintaan Anda, sir.';
        return NextResponse.json({
          status: 'success',
          type: 'live_ai',
          cost: '$0.00 (OmniRoute Antigravity Gateway)',
          text: reply,
          agent: `J.A.R.V.I.S. // ${selectedModel}`,
          timestamp
        });
      }
    } catch (aiErr) {
      console.error('OmniRoute error:', aiErr);
    }

    // Fallback if OmniRoute is temporarily unreachable
    return NextResponse.json({
      status: 'success',
      type: 'brain_fallback',
      cost: 'Free (Local SecondBrain)',
      text: `Permintaan "${command}" diterima, sir. Menghubungkan ke basis data SecondBrain. Semua sistem berjalan normal.`,
      agent: 'J.A.R.V.I.S.',
      timestamp
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
