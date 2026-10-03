'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

export default function JarvisUltimateHUD() {
  // Main Canvas & Mode Refs
  const canvasRef = useRef(null);
  const ringCanvasRef = useRef(null);
  const cubeCanvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const ringAnimRef = useRef(null);
  const cubeAnimRef = useRef(null);
  const videoRef = useRef(null);

  // View Mode: 'ORB' (TecTimmy 3D Electric Core) | 'GALAXY' (Zubair 3D Constellation)
  const [viewMode, setViewMode] = useState('ORB');
  
  // HUD Mode for the Right Dial: 'RING' | 'CUBE' | 'FACE'
  const [hudMode, setHudMode] = useState('RING');
  const [systemState, setSystemState] = useState('ONLINE'); // 'ONLINE' | 'SPEAKING' | 'LISTENING' | 'THINKING'
  const [activeBrain, setActiveBrain] = useState('SONNET 5.5'); // 'SONNET 5.5' | 'GEMINI 2.5 PRO' | 'ANTIGRAVITY'
  
  // Data States
  const [graphData, setGraphData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHub, setActiveHub] = useState('all');
  const [currentTime, setCurrentTime] = useState('');

  // Right Control Stack Toggles
  const [eyesOn, setEyesOn] = useState(false);
  const [watchOn, setWatchOn] = useState(false);
  const [holoOn, setHoloOn] = useState(true);
  const [focusOn, setFocusOn] = useState(false);
  const [showReflexModal, setShowReflexModal] = useState(false);
  const [showWeatherCard, setShowWeatherCard] = useState(true);

  // Audio & Speech States
  const [userSpeechQuery, setUserSpeechQuery] = useState('');
  const [activeSpeech, setActiveSpeech] = useState(
    'All systems nominal, sir. SecondBrain, OmniRoute 18-channel gateway, and phone automation are online. How may I assist you tonight?'
  );
  const [commandInput, setCommandInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0); // 0 to 1 for visualizer spikes

  // Simulation Forces
  const [rotationSpeed, setRotationSpeed] = useState(0.0018);
  const [galaxySpread, setGalaxySpread] = useState(260);

  // Inbox Notifications
  const [inboxItems, setInboxItems] = useState([
    {
      id: 1,
      icon: '⚡',
      title: 'OmniRoute Gateway Online',
      desc: 'Port 20128 aktif terhubung ke 18 akun Google Pro, Antigravity & Copilot.',
      time: 'Just now'
    },
    {
      id: 2,
      icon: '📁',
      title: 'Google Drive Live Sync',
      desc: 'Daemon aktif memantau D:\\SecondBrain → G:\\My Drive\\SecondBrain.',
      time: '2m ago'
    },
    {
      id: 3,
      icon: '📱',
      title: 'Wireless ADB Phone Bridge',
      desc: 'Skrip phone_jarvis.py siaga menerima voice control unlock & call.',
      time: '5m ago'
    }
  ]);

  // 3D Camera / Orbit Coordinates
  const cameraRef = useRef({
    rotX: 0.15,
    rotY: 0.25,
    zoom: 1.1,
    targetRotX: 0.15,
    targetRotY: 0.25,
    targetZoom: 1.1,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0
  });

  // Clock WITA (UTC+8)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('id-ID', {
          timeZone: 'Asia/Makassar',
          hour12: false
        }) + ' WITA'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Graph Data
  useEffect(() => {
    fetch('/api/jarvis/graph')
      .then((res) => res.json())
      .then((data) => {
        const nodesWith3D = data.nodes.map((n, i) => {
          const phi = Math.acos(1 - 2 * (i + 0.5) / data.nodes.length);
          const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
          const radius = (n.category === 'core' ? 80 : 160) + Math.random() * 80;

          const categoryColors = {
            core: '#f43f5e',
            academic: '#00f5d4',
            studio: '#a855f7',
            bim: '#f59e0b',
            trading: '#10b981'
          };

          return {
            ...n,
            x3d: Math.sin(phi) * Math.cos(theta) * radius,
            y3d: Math.cos(phi) * radius * 0.7,
            z3d: Math.sin(phi) * Math.sin(theta) * radius,
            baseRadius: n.val ? n.val * 0.45 : 6,
            color: categoryColors[n.category] || '#38bdf8'
          };
        });

        setGraphData({ ...data, nodes: nodesWith3D });
      })
      .catch(() => {});
  }, []);

  // British Iron Man JARVIS Speech Synthesis (Paul Bettany Style)
  const speakText = useCallback((text) => {
    if (!soundEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    // Clean markdown formatting for smooth speech
    const cleanSpeech = text
      .replace(/[#*`_~>[\]()|]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    
    // Pick the best British English or refined voice
    const voices = window.speechSynthesis.getVoices();
    const britishVoice = voices.find(
      (v) =>
        (v.lang.includes('en-GB') || v.lang.includes('en_GB')) &&
        (v.name.includes('George') || v.name.includes('Ryan') || v.name.includes('Oliver') || v.name.includes('UK') || v.name.includes('Natural'))
    ) || voices.find((v) => v.lang.includes('en-GB')) || voices.find((v) => v.lang.includes('en-US') && v.name.includes('Natural')) || voices[0];

    if (britishVoice) {
      utterance.voice = britishVoice;
    }
    
    // Calm, suave, dignified British butler cadence
    utterance.rate = 1.02;
    utterance.pitch = 0.94;

    utterance.onstart = () => {
      setSystemState('SPEAKING');
      setAudioLevel(0.8);
    };

    utterance.onend = () => {
      setSystemState('ONLINE');
      setAudioLevel(0);
    };

    window.speechSynthesis.speak(utterance);
  }, [soundEnabled]);

  // Execute Command via Live AI Engine
  const handleExecute = async (overrideCmd) => {
    const cmd = (overrideCmd || commandInput).trim();
    if (!cmd) return;

    setUserSpeechQuery(cmd);
    setIsProcessing(true);
    setSystemState('THINKING');
    setAudioLevel(0.4);

    try {
      const res = await fetch('/api/jarvis/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd, brain: activeBrain })
      });
      const data = await res.json();
      
      const reply = data.text || `Processed: ${cmd}`;
      setActiveSpeech(reply);
      speakText(reply);
      setCommandInput('');

      // Add to inbox
      setInboxItems((prev) => [
        {
          id: Date.now(),
          icon: data.type === 'phone_control' ? '📱' : data.type === 'reflex' ? '⚡' : '🧠',
          title: `${data.type.toUpperCase()} — ${cmd.slice(0, 22)}...`,
          desc: reply.slice(0, 80) + '...',
          time: 'Just now'
        },
        ...prev.slice(0, 4)
      ]);
    } catch {
      const fallback = `I am at your disposal, sir. Executing command locally...`;
      setActiveSpeech(fallback);
      speakText(fallback);
    } finally {
      setIsProcessing(false);
      setSystemState('ONLINE');
      setAudioLevel(0);
    }
  };

  // Browser Speech Recognition (Tap to talk)
  const toggleListening = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Browser tidak mendukung Speech Recognition API. Silakan ketik di bar input.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      setSystemState('ONLINE');
      setAudioLevel(0);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // English for Iron Man style, or id-ID
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setSystemState('LISTENING');
      setAudioLevel(0.6);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setCommandInput(transcript);
      setIsListening(false);
      setSystemState('THINKING');
      handleExecute(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setSystemState('ONLINE');
      setAudioLevel(0);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (systemState === 'LISTENING') {
        setSystemState('ONLINE');
        setAudioLevel(0);
      }
    };

    recognition.start();
  };

  // Camera stream for "EYES" toggle
  useEffect(() => {
    let stream = null;
    if (eyesOn && videoRef.current) {
      navigator.mediaDevices?.getUserMedia({ video: { width: 320, height: 240 } })
        .then((s) => {
          stream = s;
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(() => setEyesOn(false));
    }
    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [eyesOn]);

  // =========================================================================
  // MAIN CANVAS RENDER LOOP (ORB 2.0 vs GALAXY)
  // =========================================================================
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Starfield for galaxy & orb ambient
    const stars = Array.from({ length: 150 }, () => ({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * 800 + 100,
      size: Math.random() * 1.5 + 0.5,
      twinkle: Math.random() * Math.PI * 2
    }));

    // 1,200 Particles for the 3D Electric Particle Plasma Orb (TecTimmy Core)
    const orbParticles = Array.from({ length: 1100 }, (_, i) => {
      const phi = Math.acos(1 - 2 * (i + 0.5) / 1100);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const baseR = 120 + (Math.random() - 0.5) * 15;
      return {
        phi,
        theta,
        baseR,
        speed: 0.008 + Math.random() * 0.012,
        spikeFreq: Math.random() * 8 + 2,
        phase: Math.random() * Math.PI * 2,
        size: Math.random() * 1.8 + 0.8
      };
    });

    let t = 0;

    const render = () => {
      t += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Deep space background
      const bgGrad = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 40,
        width * 0.5, height * 0.5, width * 0.85
      );
      bgGrad.addColorStop(0, '#06101d');
      bgGrad.addColorStop(0.5, '#030810');
      bgGrad.addColorStop(1, '#010408');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const originX = width * (focusOn ? 0.5 : 0.44);
      const originY = height * 0.46;

      // Render Ambient Stars
      stars.forEach((s) => {
        s.twinkle += 0.03;
        const alpha = 0.2 + Math.sin(s.twinkle) * 0.18;
        ctx.fillStyle = `rgba(180, 230, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(originX + s.x * (400 / s.z), originY + s.y * (400 / s.z), s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // ---------------------------------------------------------------------
      // MODE A: TECTIMMY 3D ELECTRIC PARTICLE ORB (JARVIS 2.0)
      // ---------------------------------------------------------------------
      if (viewMode === 'ORB') {
        const isSpeaking = systemState === 'SPEAKING';
        const isListeningNow = systemState === 'LISTENING';
        const isThinking = systemState === 'THINKING';

        const dynamicSpike = isSpeaking
          ? 35 + Math.sin(t * 12) * 20
          : isListeningNow
          ? 25 + Math.cos(t * 8) * 15
          : isThinking
          ? 18 + Math.sin(t * 16) * 12
          : 6 + Math.sin(t * 2) * 4;

        // Central Electric Plasma Core Glow
        const coreGlow = ctx.createRadialGradient(originX, originY, 10, originX, originY, 180);
        coreGlow.addColorStop(0, 'rgba(0, 245, 212, 0.45)');
        coreGlow.addColorStop(0.3, 'rgba(0, 210, 255, 0.22)');
        coreGlow.addColorStop(0.7, 'rgba(5, 30, 60, 0.12)');
        coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(originX, originY, 180, 0, Math.PI * 2);
        ctx.fill();

        // Project and Draw 3D Orb Particles
        const cosY = Math.cos(t * 0.4);
        const sinY = Math.sin(t * 0.4);
        const cosX = Math.cos(0.25);
        const sinX = Math.sin(0.25);

        const projectedOrb = orbParticles.map((p) => {
          // Dynamic radius with audio reactive spike modulation
          const currentR =
            p.baseR + Math.sin(p.phi * p.spikeFreq + t * 4 + p.phase) * dynamicSpike;

          // Spherical coordinates to 3D Cartesian
          let x = Math.sin(p.phi) * Math.cos(p.theta + t * p.speed) * currentR;
          let y = Math.cos(p.phi) * currentR;
          let z = Math.sin(p.phi) * Math.sin(p.theta + t * p.speed) * currentR;

          // 3D Rotation
          let x1 = x * cosY - z * sinY;
          let z1 = z * cosY + x * sinY;
          let y2 = y * cosX - z1 * sinX;
          let z2 = z1 * cosX + y * sinX;

          const distance = z2 + 380;
          const scale = 400 / distance;
          return {
            px: originX + x1 * scale,
            py: originY + y2 * scale,
            depth: z2,
            scale,
            size: p.size * scale
          };
        });

        // Depth sort
        projectedOrb.sort((a, b) => b.depth - a.depth);

        // Draw electric connecting arcs between nearby particles
        ctx.lineWidth = 0.65;
        for (let i = 0; i < projectedOrb.length; i += 7) {
          const p1 = projectedOrb[i];
          const p2 = projectedOrb[(i + 14) % projectedOrb.length];
          const dist = Math.hypot(p1.px - p2.px, p1.py - p2.py);
          if (dist < 45) {
            const alpha = (1 - dist / 45) * 0.35;
            ctx.strokeStyle = `rgba(0, 245, 212, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }

        // Draw glowing particle points
        projectedOrb.forEach((p) => {
          const depthAlpha = Math.max(0.25, Math.min(1.0, 1 - p.depth / 500));
          ctx.fillStyle = isSpeaking
            ? `rgba(255, 255, 255, ${depthAlpha})`
            : `rgba(0, 245, 212, ${depthAlpha})`;
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Central Subtle Monospace Text in Orb Center (TecTimmy Style)
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.font = '500 13px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#00f5d4';
        ctx.shadowBlur = 10;
        const centerPrompt = isListeningNow
          ? 'Listening...'
          : isThinking
          ? 'Thinking...'
          : 'How may I help, sir?';
        ctx.fillText(centerPrompt, originX, originY);
        ctx.restore();
      }

      // ---------------------------------------------------------------------
      // MODE B: ZUBAIR 3D CONSTELLATION GALAXY
      // ---------------------------------------------------------------------
      if (viewMode === 'GALAXY' && graphData) {
        const cam = cameraRef.current;
        if (!cam.isDragging) cam.rotY += rotationSpeed;

        cam.rotX += (cam.targetRotX - cam.rotX) * 0.08;
        cam.rotY += (cam.targetRotY - cam.rotY) * 0.08;
        cam.zoom += (cam.targetZoom - cam.zoom) * 0.08;

        const cosX = Math.cos(cam.rotX);
        const sinX = Math.sin(cam.rotX);
        const cosY = Math.cos(cam.rotY);
        const sinY = Math.sin(cam.rotY);
        const fov = 480 * cam.zoom;

        const projectedNodes = graphData.nodes.map((node) => {
          let x1 = node.x3d * cosY - node.z3d * sinY;
          let z1 = node.z3d * cosY + node.x3d * sinY;
          let y2 = node.y3d * cosX - z1 * sinX;
          let z2 = z1 * cosX + node.y3d * sinX;

          const spreadFactor = galaxySpread / 200;
          x1 *= spreadFactor;
          y2 *= spreadFactor;
          z2 *= spreadFactor;

          const distance = z2 + 420;
          const scale = distance > 20 ? fov / distance : 0;
          return {
            ...node,
            px: originX + x1 * scale,
            py: originY + y2 * scale,
            depth: z2,
            scale,
            visible: distance > 20
          };
        });

        projectedNodes.sort((a, b) => b.depth - a.depth);

        // Connections
        ctx.lineWidth = 0.75;
        graphData.links.forEach((l) => {
          const s = projectedNodes.find((n) => n.id === l.source);
          const t = projectedNodes.find((n) => n.id === l.target);
          if (s && t && s.visible && t.visible) {
            const depthAvg = (s.depth + t.depth) / 2;
            const alpha = Math.max(0.04, Math.min(0.28, 1 - depthAvg / 600));
            ctx.strokeStyle = `rgba(0, 245, 212, ${alpha * 0.75})`;
            ctx.beginPath();
            ctx.moveTo(s.px, s.py);
            ctx.lineTo(t.px, t.py);
            ctx.stroke();
          }
        });

        // Nodes
        projectedNodes.forEach((node) => {
          if (!node.visible) return;
          const radius = Math.max(2.5, node.baseRadius * (node.scale / 1.5));
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(node.px, node.py, radius, 0, Math.PI * 2);
          ctx.fill();

          if (node.depth < 120 || node.category === 'core') {
            ctx.font = `${Math.max(9, Math.min(13, 10 * (node.scale / 1.4)))}px "IBM Plex Mono", monospace`;
            ctx.fillStyle = `rgba(230, 240, 245, 0.85)`;
            ctx.fillText(node.label, node.px + radius + 6, node.py + 3.5);
          }
        });
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [viewMode, graphData, systemState, focusOn, galaxySpread, rotationSpeed]);

  // J.A.R.V.I.S. Arc Reactor HUD Canvas Render
  useEffect(() => {
    if (hudMode !== 'RING' || !ringCanvasRef.current) return;

    const canvas = ringCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = 180;
    canvas.width = size * window.devicePixelRatio;
    canvas.height = size * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let angle = 0;
    let pulse = 0;

    const renderRing = () => {
      angle += 0.025;
      pulse += 0.05;
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const r = 74;

      // Radial ticks
      const numTicks = 48;
      ctx.save();
      ctx.translate(cx, cy);
      for (let i = 0; i < numTicks; i++) {
        const rad = (i / numTicks) * Math.PI * 2;
        const tickLen = i % 4 === 0 ? 8 : 4;
        const isAmber = i > 6 && i < 18;
        ctx.strokeStyle = isAmber ? 'rgba(245, 158, 11, 0.75)' : 'rgba(0, 245, 212, 0.45)';
        ctx.lineWidth = i % 4 === 0 ? 1.75 : 1;
        ctx.beginPath();
        ctx.moveTo(Math.cos(rad) * (r + 4), Math.sin(rad) * (r + 4));
        ctx.lineTo(Math.cos(rad) * (r + 4 + tickLen), Math.sin(rad) * (r + 4 + tickLen));
        ctx.stroke();
      }
      ctx.restore();

      // Outer cyan track
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r - 4, angle, angle + Math.PI * 1.3);
      ctx.strokeStyle = '#00f5d4';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00f5d4';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      // Amber accent arc
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r - 4, -angle * 0.8, -angle * 0.8 + Math.PI * 0.5);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();

      // Center text
      ctx.save();
      ctx.fillStyle = 'rgba(4, 10, 18, 0.9)';
      ctx.beginPath();
      ctx.arc(cx, cy, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '600 11px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.letterSpacing = '3px';
      ctx.shadowColor = '#00f5d4';
      ctx.shadowBlur = 8;
      ctx.fillText('J.A.R.V.I.S.', cx, cy);
      ctx.restore();

      ringAnimRef.current = requestAnimationFrame(renderRing);
    };

    renderRing();
    return () => cancelAnimationFrame(ringAnimRef.current);
  }, [hudMode]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#04070d',
        color: '#e2e8f0',
        fontFamily: '"IBM Plex Sans", -apple-system, sans-serif',
        overflow: 'hidden',
        zIndex: 9999,
        userSelect: 'none'
      }}
    >
      {/* Background 3D Engine Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />

      {/* TOP HEADER STATUS BAR */}
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '52px',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(180deg, rgba(3,7,12,0.9) 0%, rgba(3,7,12,0) 100%)',
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', pointerEvents: 'auto' }}>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '12px',
              color: '#94a3b8',
              letterSpacing: '1px'
            }}
          >
            <span style={{ color: '#00f5d4' }}>←</span> GRADIENT STUDIO
          </Link>
          <span style={{ color: '#334155' }}>|</span>

          {/* VIEW MODE TOGGLE (ORB 2.0 vs GALAXY) */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(0, 245, 212, 0.3)',
              borderRadius: '999px',
              padding: '2px'
            }}
          >
            {[
              { id: 'ORB', label: '⚡ ORB 2.0' },
              { id: 'GALAXY', label: '🌌 GALAXY' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setViewMode(m.id)}
                style={{
                  padding: '3px 12px',
                  borderRadius: '999px',
                  fontSize: '10px',
                  fontFamily: '"IBM Plex Mono", monospace',
                  letterSpacing: '1px',
                  background: viewMode === m.id ? '#00f5d4' : 'transparent',
                  color: viewMode === m.id ? '#04070d' : '#94a3b8',
                  fontWeight: viewMode === m.id ? '700' : '500',
                  cursor: 'pointer'
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px #10b981'
              }}
            />
            <span
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '11px',
                letterSpacing: '1.5px',
                color: '#cbd5e1'
              }}
            >
              OMNIROUTE LIVE [18 ACC]
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', pointerEvents: 'auto' }}>
          <div
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              color: '#00f5d4',
              letterSpacing: '1px'
            }}
          >
            {currentTime}
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{
              background: soundEnabled ? 'rgba(0,245,212,0.15)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${soundEnabled ? '#00f5d4' : '#334155'}`,
              color: soundEnabled ? '#00f5d4' : '#64748b',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '10px',
              fontFamily: '"IBM Plex Mono", monospace',
              letterSpacing: '1px',
              cursor: 'pointer'
            }}
          >
            {soundEnabled ? '🔊 BRITISH VOICE' : '🔇 MUTED'}
          </button>
        </div>
      </header>

      {/* TOP USER QUERY BANNER (TecTimmy Style) */}
      {userSpeechQuery && (
        <div
          style={{
            position: 'absolute',
            top: '72px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '10px',
              letterSpacing: '2px',
              color: '#64748b',
              textTransform: 'uppercase'
            }}
          >
            YOU
          </div>
          <div
            style={{
              fontSize: '15px',
              color: '#f8fafc',
              fontWeight: '500',
              marginTop: '2px'
            }}
          >
            &ldquo;{userSpeechQuery}&rdquo;
          </div>
        </div>
      )}

      {/* TECTIMMY WEATHER & TELEMETRY CARD (Top Left) */}
      {showWeatherCard && !focusOn && (
        <div
          style={{
            position: 'absolute',
            top: '68px',
            left: '20px',
            background: 'rgba(5, 10, 18, 0.8)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 245, 212, 0.2)',
            borderRadius: '14px',
            padding: '14px 16px',
            width: '230px',
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '9px',
                letterSpacing: '1.5px',
                color: '#64748b',
                textTransform: 'uppercase'
              }}
            >
              WEATHER · MAKASSAR
            </span>
            <button
              onClick={() => setShowWeatherCard(false)}
              style={{ color: '#64748b', fontSize: '10px', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#f8fafc', marginTop: '4px' }}>
            28°C · Fair
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
            Humidity 78% · Wind 12 km/h WNW
          </div>
          <div
            style={{
              marginTop: '8px',
              paddingTop: '6px',
              borderTop: '1px solid rgba(51,65,85,0.4)',
              fontSize: '10px',
              fontFamily: '"IBM Plex Mono", monospace',
              color: '#00f5d4'
            }}
          >
            ▲ High Tide 23:45 · 1.4m
          </div>
        </div>
      )}

      {/* TOP RIGHT: JARVIS INBOX FEED */}
      <div
        style={{
          position: 'absolute',
          top: '64px',
          right: '20px',
          width: '300px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '10px',
            letterSpacing: '1.5px',
            color: '#64748b',
            padding: '0 4px'
          }}
        >
          <span>JARVIS · INBOX</span>
          <span
            style={{
              background: 'rgba(0, 245, 212, 0.2)',
              color: '#00f5d4',
              padding: '1px 6px',
              borderRadius: '999px',
              fontWeight: '600'
            }}
          >
            {inboxItems.length}
          </span>
        </div>

        {inboxItems.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'rgba(5, 10, 18, 0.8)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0, 245, 212, 0.2)',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#f8fafc'
                }}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </div>
              <span style={{ fontSize: '9px', color: '#64748b' }}>{item.time}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.35' }}>
              {item.desc}
            </div>
            <button
              onClick={() => setInboxItems((prev) => prev.filter((i) => i.id !== item.id))}
              style={{
                alignSelf: 'flex-start',
                marginTop: '4px',
                background: 'rgba(0, 245, 212, 0.1)',
                border: '1px solid rgba(0, 245, 212, 0.3)',
                color: '#00f5d4',
                padding: '2px 10px',
                borderRadius: '6px',
                fontSize: '10px',
                fontFamily: '"IBM Plex Mono", monospace',
                cursor: 'pointer'
              }}
            >
              Dismiss
            </button>
          </div>
        ))}
      </div>

      {/* MIDDLE-RIGHT: ARC REACTOR HUD RING */}
      <div
        style={{
          position: 'absolute',
          top: '300px',
          right: '48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10
        }}
      >
        <div style={{ position: 'relative', width: '180px', height: '180px' }}>
          {hudMode === 'RING' && (
            <canvas ref={ringCanvasRef} style={{ width: '180px', height: '180px', display: 'block' }} />
          )}
        </div>

        {/* Status & Model Pill Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(5, 10, 18, 0.85)',
              border: '1px solid rgba(0, 245, 212, 0.3)',
              borderRadius: '999px',
              padding: '5px 12px',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '10px',
              letterSpacing: '1px',
              color: '#00f5d4'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background:
                  systemState === 'SPEAKING' ? '#00f5d4' : systemState === 'THINKING' ? '#f59e0b' : '#10b981',
                boxShadow: `0 0 8px ${systemState === 'SPEAKING' ? '#00f5d4' : '#10b981'}`
              }}
            />
            {systemState}
          </div>

          <button
            onClick={() => {
              const brains = ['SONNET 5.5', 'GEMINI 2.5 PRO', 'ANTIGRAVITY'];
              const nextIndex = (brains.indexOf(activeBrain) + 1) % brains.length;
              setActiveBrain(brains[nextIndex]);
            }}
            style={{
              background: 'rgba(5, 10, 18, 0.85)',
              border: '1px solid rgba(0, 245, 212, 0.3)',
              borderRadius: '999px',
              padding: '5px 12px',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '10px',
              letterSpacing: '1px',
              color: '#f8fafc',
              cursor: 'pointer'
            }}
          >
            ✦ {activeBrain} ⚡
          </button>
        </div>
      </div>

      {/* LOWER-RIGHT: QUICK CONTROL STACK */}
      <div
        style={{
          position: 'absolute',
          bottom: '120px',
          right: '48px',
          width: '180px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 10
        }}
      >
        {[
          { key: 'EYES', state: eyesOn ? 'live' : 'off', toggle: () => setEyesOn(!eyesOn) },
          { key: 'WATCH', state: watchOn ? 'active' : 'off', toggle: () => setWatchOn(!watchOn) },
          { key: 'FOCUS', state: focusOn ? 'zen' : 'off', toggle: () => setFocusOn(!focusOn) },
          { key: 'REFLEX', state: 'free $0', toggle: () => setShowReflexModal(true) }
        ].map((ctrl) => (
          <button
            key={ctrl.key}
            onClick={ctrl.toggle}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(5, 10, 18, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0, 245, 212, 0.2)',
              borderRadius: '999px',
              padding: '6px 14px',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '10px',
              letterSpacing: '1.5px',
              color: '#cbd5e1',
              cursor: 'pointer'
            }}
          >
            <span>{ctrl.key}</span>
            <span style={{ color: ctrl.state === 'off' ? '#64748b' : '#00f5d4', fontSize: '9px' }}>
              {ctrl.state}
            </span>
          </button>
        ))}
      </div>

      {/* LIVE WEBCAM PIP OVERLAY */}
      {eyesOn && (
        <div
          style={{
            position: 'absolute',
            bottom: '260px',
            right: '250px',
            width: '160px',
            height: '120px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '2px solid #00f5d4',
            boxShadow: '0 0 16px rgba(0, 245, 212, 0.4)',
            zIndex: 20
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* BOTTOM CENTER: FLOATING SPEECH CAPSULE & REFLEX ACTION BAR */}
      <footer
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(760px, calc(100vw - 40px))',
          background: 'rgba(5, 10, 18, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 245, 212, 0.3)',
          borderRadius: '20px',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 245, 212, 0.15)',
          zIndex: 20
        }}
      >
        {/* Real-time Spoken Text Display */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div
            style={{
              marginTop: '4px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: systemState === 'SPEAKING' ? '#00f5d4' : '#10b981',
              boxShadow: '0 0 8px #00f5d4'
            }}
          />
          <div style={{ flex: 1, maxHeight: '110px', overflowY: 'auto' }}>
            <div
              style={{
                fontSize: '13px',
                color: '#f8fafc',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap'
              }}
            >
              {activeSpeech}
            </div>
          </div>
        </div>

        {/* Interactive Prompt & Speech Action Bar */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={toggleListening}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: isListening ? '#f43f5e' : 'rgba(0, 245, 212, 0.15)',
              border: `1px solid ${isListening ? '#f43f5e' : '#00f5d4'}`,
              color: isListening ? '#ffffff' : '#00f5d4',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '11px',
              fontFamily: '"IBM Plex Mono", monospace',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <span>{isListening ? '🔴' : '🎙️'}</span>
            <span>{isListening ? 'Listening...' : 'Tap to talk'}</span>
          </button>

          <input
            type="text"
            placeholder="Ask JARVIS or trigger reflex (e.g., 'give me a status report', 'buka rhino', 'call sister')..."
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
            disabled={isProcessing}
            style={{
              flex: 1,
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(0, 245, 212, 0.25)',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '12px',
              color: '#ffffff',
              outline: 'none',
              fontFamily: '"IBM Plex Mono", monospace'
            }}
          />

          <button
            onClick={() => handleExecute()}
            disabled={isProcessing || !commandInput.trim()}
            style={{
              background: '#00f5d4',
              color: '#050a12',
              fontWeight: '600',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 18px',
              fontSize: '11px',
              fontFamily: '"IBM Plex Mono", monospace',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing || !commandInput.trim() ? 0.5 : 1
            }}
          >
            {isProcessing ? 'Thinking...' : 'TRANSMIT'}
          </button>
        </div>

        {/* Quick Reflex Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '9px',
              color: '#64748b',
              letterSpacing: '1px'
            }}
          >
            INSTANT REFLEXES:
          </span>
          {[
            { label: 'Status Report', cmd: 'give me a system status report, jarvis' },
            { label: 'Buka Rhino', cmd: 'buka rhino' },
            { label: 'Buka Revit', cmd: 'buka revit' },
            { label: 'Sync GDrive', cmd: 'sync drive' },
            { label: '📱 Unlock HP', cmd: 'unlock my phone' },
            { label: '📞 Call Sister', cmd: 'call sister' },
            { label: '📱 WA di HP', cmd: 'open whatsapp in my phone' }
          ].map((rf) => (
            <button
              key={rf.label}
              onClick={() => handleExecute(rf.cmd)}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(51, 65, 85, 0.5)',
                color: '#cbd5e1',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '10px',
                fontFamily: '"IBM Plex Mono", monospace',
                cursor: 'pointer'
              }}
            >
              ⚡ {rf.label}
            </button>
          ))}
          <div
            style={{
              marginLeft: 'auto',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '9px',
              color: '#10b981'
            }}
          >
            AI Engine: Live OmniRoute ($0.00)
          </div>
        </div>
      </footer>

      {/* COST & REFLEX GUIDE MODAL */}
      {showReflexModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 5, 10, 0.85)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px'
          }}
        >
          <div
            style={{
              width: 'min(640px, 95vw)',
              background: '#f7f5ed',
              color: '#1e293b',
              borderRadius: '16px',
              padding: '28px',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    color: '#0f766e',
                    fontWeight: '600'
                  }}
                >
                  THE METER · OMNIROUTE 18-CH
                </div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>
                  JARVIS 2.0 Live Architecture
                </div>
              </div>
              <button
                onClick={() => setShowReflexModal(false)}
                style={{
                  background: '#e2e8f0',
                  color: '#0f172a',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontWeight: '700'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginTop: '20px', borderTop: '2px solid #0f172a', paddingTop: '12px' }}>
              {[
                { task: 'Live AI Brain (OmniRoute Gateway)', desc: '18 Akun Google Pro / Antigravity via port 20128', cost: '$0.00 UNLIMITED' },
                { task: '3D Electric Particle Orb (TecTimmy Core)', desc: '1,100 Partikel plasma audio-reactive 60 FPS', cost: 'GPU Native ($0)' },
                { task: 'British Voice Synthesis (Paul Bettany)', desc: 'Natural English UK / ID cadence synthesizer', cost: 'Free Built-in' },
                { task: 'Wireless ADB Phone Control', desc: 'Unlock, app launch, SIM call otomatis via Wi-Fi', cost: 'Free ($0)' },
                { task: 'Desktop Reflex Engine (150ms)', desc: 'Universal App Launcher di Session 1', cost: 'Local $0.00' }
              ].map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #e2e8f0'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>{r.task}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{r.desc}</div>
                  </div>
                  <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', fontWeight: '700', color: '#059669' }}>
                    {r.cost}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
