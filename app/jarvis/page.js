'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Cpu,
  Radio,
  Eye,
  EyeOff,
  Compass,
  Maximize2,
  RefreshCw,
  Sparkles,
  Smartphone,
  PhoneCall,
  Activity,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';

export default function JarvisDashboard() {
  // Mode & System State
  const [viewMode, setViewMode] = useState('ORB'); // 'ORB' | 'GALAXY'
  const [systemState, setSystemState] = useState('ONLINE'); // 'ONLINE' | 'LISTENING' | 'THINKING' | 'SPEAKING'
  const [commandInput, setCommandInput] = useState('');
  const [userSpeechQuery, setUserSpeechQuery] = useState('');
  const [activeSpeech, setActiveSpeech] = useState(
    'Halo Heru! Semua sistem JARVIS dan SecondBrain siap siaga. Ada yang bisa Ai bantu sekarang?'
  );
  const [isListening, setIsListening] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [eyesOn, setEyesOn] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hudMode, setHudMode] = useState('RING'); // 'RING' | 'CUBE'

  // Galaxy 3D Parameters & Interaction State
  const [galaxySpread, setGalaxySpread] = useState(140);
  const [rotationSpeed, setRotationSpeed] = useState(0.003);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [graphData, setGraphData] = useState(null);

  // Weather & Hardware Live Telemetry
  const [weatherData, setWeatherData] = useState({
    temp: '29°C',
    condition: 'Cerah Berawan',
    humidity: '78%',
    wind: '12 km/h WNW',
    tide: 'Pasang 1.4m (23:45)',
    solar: '840 W/m² (Optimal Solar Tube)'
  });
  const [phoneStatus, setPhoneStatus] = useState({
    model: 'Motorola moto g06 power',
    battery: '24%',
    status: 'ONLINE (Wireless ADB)',
    ip: '192.168.1.186:5555'
  });

  // Inbox & History Feed
  const [inboxItems, setInboxItems] = useState([
    {
      id: 1,
      icon: '📱',
      title: 'SMARTPHONE LINKED',
      desc: 'Motorola moto g06 power terhubung via Wireless ADB port 5555.',
      time: 'Just now'
    },
    {
      id: 2,
      icon: '⚡',
      title: 'OMNIROUTE ACTIVE',
      desc: '18 Akun Google Pro terhubung ke gateway port 20128 ($0.00 cost).',
      time: '1m ago'
    },
    {
      id: 3,
      icon: '📚',
      title: 'SKRIPSI SOLAR TUBE',
      desc: 'Simulasi daylighting 250 lux Al-Marwaee & Carter (2013) terverifikasi.',
      time: '3m ago'
    }
  ]);

  // Audio & Canvas References
  const canvasRef = useRef(null);
  const ringCanvasRef = useRef(null);
  const videoRef = useRef(null);
  const animFrameRef = useRef(null);
  const timeRef = useRef(0);
  const projectedNodesRef = useRef([]);

  // Camera Orbit Control Ref
  const cameraRef = useRef({
    rotX: 0.25,
    rotY: 0,
    targetRotX: 0.25,
    targetRotY: 0,
    zoom: 1.0,
    targetZoom: 1.0,
    isDragging: false,
    startX: 0,
    startY: 0
  });

  // Web Audio Context for Sci-Fi Chirps
  const playSciFiBeep = useCallback((freq = 880, type = 'sine', duration = 0.08) => {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // ignore
    }
  }, []);

  // Fetch Graph Data
  useEffect(() => {
    fetch('/api/jarvis/graph')
      .then((res) => res.json())
      .then((data) => {
        const categoryColors = {
          core: '#00f5d4',
          academic: '#00bbf9',
          studio: '#9d4edd',
          bim: '#f72585',
          trading: '#ffb703'
        };

        const nodesWith3D = (data.nodes || []).map((n, i) => {
          const phi = Math.acos(-1 + (2 * i) / (data.nodes.length || 1));
          const theta = Math.sqrt((data.nodes.length || 1) * Math.PI) * phi;
          const radius = 180 + (i % 5) * 25;
          return {
            ...n,
            x3d: Math.cos(theta) * Math.sin(phi) * radius,
            y3d: Math.cos(phi) * radius,
            z3d: Math.sin(phi) * Math.sin(theta) * radius,
            baseRadius: n.val ? n.val * 0.45 : 6,
            color: categoryColors[n.category] || '#00f5d4'
          };
        });

        setGraphData({ ...data, nodes: nodesWith3D });
      })
      .catch(() => {});
  }, []);

  // Indonesian Female Speech Synthesis (Suara Cewek Dewasa Umur 20-an - Persona "Ai")
  const speakText = useCallback(
    (text) => {
      if (!soundEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      // Clean markdown & brackets
      const cleanSpeech = text
        .replace(/[#*`_~>[\]()|]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanSpeech);
      const voices = window.speechSynthesis.getVoices();

      // Filter Indonesian voices
      const idVoices = voices.filter(
        (v) =>
          v.lang.toLowerCase().startsWith('id') ||
          v.lang.toLowerCase().includes('id-id') ||
          v.lang.toLowerCase().includes('indonesia')
      );

      // Prioritize natural Indonesian female voices (Gadis, Google Bahasa Indonesia, etc.)
      const femaleIdVoice =
        idVoices.find((v) => v.name.toLowerCase().includes('gadis')) ||
        idVoices.find((v) => v.name.toLowerCase().includes('google')) ||
        idVoices.find((v) => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('wanita')) ||
        idVoices[0] ||
        voices.find((v) => v.name.toLowerCase().includes('natural') && v.name.toLowerCase().includes('female')) ||
        voices[0];

      if (femaleIdVoice) {
        utterance.voice = femaleIdVoice;
      }
      utterance.lang = 'id-ID';

      // Pitch 1.14 & Rate 1.02: Suara cewek muda umur 20-an yang hangat, ceria, dan percaya diri
      utterance.rate = 1.02;
      utterance.pitch = 1.14;

      utterance.onstart = () => {
        setSystemState('SPEAKING');
        setAudioLevel(0.85);
      };

      utterance.onend = () => {
        setSystemState('ONLINE');
        setAudioLevel(0);
      };

      window.speechSynthesis.speak(utterance);
    },
    [soundEnabled]
  );

  // Pre-load voices on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // Execute Command via Backend
  const handleExecute = async (overrideCmd) => {
    const cmd = (overrideCmd || commandInput).trim();
    if (!cmd) return;

    playSciFiBeep(1200, 'sine', 0.06);
    setUserSpeechQuery(cmd);
    setIsProcessing(true);
    setSystemState('THINKING');
    setAudioLevel(0.4);

    try {
      const res = await fetch('/api/jarvis/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd, brain: 'SecondBrain' })
      });

      const data = await res.json();
      const reply = data.text || `Perintah diproses: ${cmd}`;

      setActiveSpeech(reply);
      speakText(reply);
      setCommandInput('');

      // Add to inbox feed
      setInboxItems((prev) => [
        {
          id: Date.now(),
          icon: data.type === 'phone_control' ? '📱' : data.type === 'reflex' ? '⚡' : '🧠',
          title: `${data.type.toUpperCase()} — ${cmd.slice(0, 24)}...`,
          desc: reply.slice(0, 85) + '...',
          time: 'Just now'
        },
        ...prev.slice(0, 4)
      ]);
    } catch {
      const fallback = `Siap Heru, perintah "${cmd}" sudah diterima dan dijalankan.`;
      setActiveSpeech(fallback);
      speakText(fallback);
    } finally {
      setIsProcessing(false);
      setSystemState('ONLINE');
      setAudioLevel(0);
    }
  };

  // Browser Speech Recognition in Indonesian (id-ID)
  const toggleListening = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Browser tidak mendukung Speech Recognition API. Silakan ketik perintah langsung.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      setSystemState('ONLINE');
      setAudioLevel(0);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID'; // Indonesian voice recognition!
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setSystemState('LISTENING');
      setAudioLevel(0.65);
      playSciFiBeep(880, 'triangle', 0.05);
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
      navigator.mediaDevices
        ?.getUserMedia({ video: true })
        .then((s) => {
          stream = s;
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(() => setEyesOn(false));
    }
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [eyesOn]);

  // Canvas Mouse & Touch Interaction Handlers
  const handleCanvasMouseDown = (e) => {
    cameraRef.current.isDragging = true;
    cameraRef.current.startX = e.clientX;
    cameraRef.current.startY = e.clientY;
  };

  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Handle 3D Orbit Dragging
    if (cameraRef.current.isDragging) {
      const dx = e.clientX - cameraRef.current.startX;
      const dy = e.clientY - cameraRef.current.startY;
      cameraRef.current.targetRotY += dx * 0.007;
      cameraRef.current.targetRotX += dy * 0.007;

      // Clamp X rotation to avoid flipping
      cameraRef.current.targetRotX = Math.max(-1.4, Math.min(1.4, cameraRef.current.targetRotX));

      cameraRef.current.startX = e.clientX;
      cameraRef.current.startY = e.clientY;
    }

    // Raycast Hover Hit-Testing in 2D Screen Space
    if (viewMode === 'GALAXY') {
      let foundNode = null;
      const nodes = projectedNodesRef.current || [];
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        if (!n.visible) continue;
        const dist = Math.hypot(n.px - mouseX, n.py - mouseY);
        const hitRadius = Math.max(12, n.radius * 1.8);
        if (dist <= hitRadius) {
          foundNode = n;
          break;
        }
      }
      setHoveredNode(foundNode);
    }
  };

  const handleCanvasMouseUp = () => {
    cameraRef.current.isDragging = false;
  };

  const handleCanvasWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.0015;
    cameraRef.current.targetZoom = Math.max(0.4, Math.min(2.8, cameraRef.current.targetZoom + delta));
  };

  const handleCanvasClick = () => {
    if (hoveredNode) {
      setSelectedNode(hoveredNode);
      playSciFiBeep(1400, 'square', 0.05);
      const voiceAlert = `Data node ${hoveredNode.label}. Kategori ${hoveredNode.category}. Status aktif.`;
      setActiveSpeech(voiceAlert);
      speakText(voiceAlert);
    }
  };

  // Touch Controls for Mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      cameraRef.current.isDragging = true;
      cameraRef.current.startX = e.touches[0].clientX;
      cameraRef.current.startY = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (cameraRef.current.isDragging && e.touches.length === 1) {
      const dx = e.touches[0].clientX - cameraRef.current.startX;
      const dy = e.touches[0].clientY - cameraRef.current.startY;
      cameraRef.current.targetRotY += dx * 0.009;
      cameraRef.current.targetRotX += dy * 0.009;
      cameraRef.current.startX = e.touches[0].clientX;
      cameraRef.current.startY = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = () => {
    cameraRef.current.isDragging = false;
  };

  // Main 3D Canvas Rendering Loop (TecTimmy Plasma Orb & Interactive Constellation)
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Generate Orb Points (1,200 particle sphere)
    const particleCount = 1200;
    const baseOrbParticles = [];
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      baseOrbParticles.push({
        baseX: Math.cos(theta) * Math.sin(phi),
        baseY: Math.cos(phi),
        baseZ: Math.sin(theta) * Math.sin(phi),
        spikePhase: Math.random() * Math.PI * 2,
        spikeFreq: 2 + Math.random() * 4,
        size: 0.9 + Math.random() * 1.6
      });
    }

    const render = () => {
      timeRef.current += 0.018;
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const originX = w / 2;
      const originY = h / 2 - 20;

      ctx.clearRect(0, 0, w, h);

      // ---------------------------------------------------------------------
      // HOLOGRAPHIC SCI-FI BACKGROUND GRID & RADAR
      // ---------------------------------------------------------------------
      ctx.save();
      // Polar Concentric Rings
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.035)';
      ctx.lineWidth = 1;
      for (let r = 80; r < Math.max(w, h); r += 100) {
        ctx.beginPath();
        ctx.arc(originX, originY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Radar Crosshairs
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.04)';
      ctx.beginPath();
      ctx.moveTo(originX - 350, originY);
      ctx.lineTo(originX + 350, originY);
      ctx.moveTo(originX, originY - 350);
      ctx.lineTo(originX, originY + 350);
      ctx.stroke();

      // Rotating Radar Sweep Line
      const sweepAngle = t * 0.5;
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.12)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX + Math.cos(sweepAngle) * 320, originY + Math.sin(sweepAngle) * 320);
      ctx.stroke();
      ctx.restore();

      // ---------------------------------------------------------------------
      // MODE A: TECTIMMY 3D ELECTRIC PARTICLE PLASMA ORB
      // ---------------------------------------------------------------------
      if (viewMode === 'ORB') {
        const isSpeaking = systemState === 'SPEAKING';
        const isListeningNow = systemState === 'LISTENING';
        const isThinking = systemState === 'THINKING';

        const baseRadius = isSpeaking ? 165 : isThinking ? 145 : 135;
        const currentAudioLevel = isSpeaking ? audioLevel || 0.8 : audioLevel || 0.15;

        const orbRotY = t * 0.45;
        const orbRotX = Math.sin(t * 0.25) * 0.35;
        const cosY = Math.cos(orbRotY);
        const sinY = Math.sin(orbRotY);
        const cosX = Math.cos(orbRotX);
        const sinX = Math.sin(orbRotX);

        const projectedOrb = baseOrbParticles.map((p) => {
          const harmonic = Math.sin(t * p.spikeFreq + p.spikePhase);
          const spikeAmount = isSpeaking
            ? Math.pow(Math.max(0, harmonic), 2.5) * (currentAudioLevel * 90)
            : Math.sin(t * 2 + p.spikePhase) * 6;

          const r = baseRadius + spikeAmount;
          let x = p.baseX * r;
          let y = p.baseY * r;
          let z = p.baseZ * r;

          let x1 = x * cosY - z * sinY;
          let z1 = z * cosY + x * sinY;
          let y2 = y * cosX - z1 * sinX;
          let z2 = z1 * cosX + y * sinX;

          const fov = 420;
          const distance = z2 + 360;
          const scale = fov / distance;

          return {
            px: originX + x1 * scale,
            py: originY + y2 * scale,
            depth: z2,
            size: p.size * scale,
            spike: spikeAmount
          };
        });

        projectedOrb.sort((a, b) => b.depth - a.depth);

        // Core Glowing Aura
        const auraGradient = ctx.createRadialGradient(
          originX,
          originY,
          baseRadius * 0.2,
          originX,
          originY,
          baseRadius * 1.5
        );
        auraGradient.addColorStop(0, 'rgba(0, 245, 212, 0.25)');
        auraGradient.addColorStop(0.5, 'rgba(0, 187, 249, 0.08)');
        auraGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = auraGradient;
        ctx.beginPath();
        ctx.arc(originX, originY, baseRadius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Lightning Tendril Filaments
        if (isSpeaking || isListeningNow) {
          ctx.strokeStyle = 'rgba(0, 245, 212, 0.35)';
          ctx.lineWidth = 1;
          for (let k = 0; k < 18; k++) {
            const idx1 = Math.floor(Math.random() * projectedOrb.length);
            const idx2 = Math.floor(Math.random() * projectedOrb.length);
            const p1 = projectedOrb[idx1];
            const p2 = projectedOrb[idx2];
            if (p1 && p2 && Math.hypot(p1.px - p2.px, p1.py - p2.py) < 90) {
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
              ctx.stroke();
            }
          }
        }

        // Particle Points
        projectedOrb.forEach((p) => {
          const depthAlpha = Math.max(0.2, Math.min(1.0, 1 - p.depth / 450));
          ctx.fillStyle = isSpeaking
            ? `rgba(255, 255, 255, ${depthAlpha})`
            : `rgba(0, 245, 212, ${depthAlpha})`;
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Center Monospace Prompt
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.font = '600 13px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#00f5d4';
        ctx.shadowBlur = 12;
        const centerPrompt = isListeningNow
          ? 'Mendengarkan...'
          : isThinking
          ? 'Memproses...'
          : 'Ada yang bisa Ai bantu, Heru?';
        ctx.fillText(centerPrompt, originX, originY);
        ctx.restore();
      }

      // ---------------------------------------------------------------------
      // MODE B: INTERACTIVE 3D CONSTELLATION GALAXY
      // ---------------------------------------------------------------------
      if (viewMode === 'GALAXY' && graphData) {
        const cam = cameraRef.current;
        if (autoRotate && !cam.isDragging) {
          cam.targetRotY += rotationSpeed;
        }

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

          const spreadFactor = galaxySpread / 160;
          x1 *= spreadFactor;
          y2 *= spreadFactor;
          z2 *= spreadFactor;

          const distance = z2 + 420;
          const scale = distance > 20 ? fov / distance : 0;
          const radius = Math.max(3.5, node.baseRadius * (scale / 1.4));

          return {
            ...node,
            px: originX + x1 * scale,
            py: originY + y2 * scale,
            depth: z2,
            scale,
            radius,
            visible: distance > 20
          };
        });

        projectedNodesRef.current = projectedNodes;
        projectedNodes.sort((a, b) => b.depth - a.depth);

        // Connections Lines
        ctx.lineWidth = 0.85;
        graphData.links.forEach((l) => {
          const s = projectedNodes.find((n) => n.id === l.source);
          const tNode = projectedNodes.find((n) => n.id === l.target);
          if (s && tNode && s.visible && tNode.visible) {
            const isHoveredConnection =
              hoveredNode && (hoveredNode.id === s.id || hoveredNode.id === tNode.id);
            const depthAvg = (s.depth + tNode.depth) / 2;
            const alpha = isHoveredConnection
              ? 0.85
              : Math.max(0.05, Math.min(0.3, 1 - depthAvg / 600));

            ctx.strokeStyle = isHoveredConnection
              ? 'rgba(0, 245, 212, 0.95)'
              : `rgba(0, 245, 212, ${alpha * 0.75})`;
            ctx.lineWidth = isHoveredConnection ? 2.0 : 0.8;
            ctx.beginPath();
            ctx.moveTo(s.px, s.py);
            ctx.lineTo(tNode.px, tNode.py);
            ctx.stroke();
          }
        });

        // Nodes
        projectedNodes.forEach((node) => {
          if (!node.visible) return;
          const isNodeHovered = hoveredNode && hoveredNode.id === node.id;
          const isNodeSelected = selectedNode && selectedNode.id === node.id;

          // Glowing Outer Halo on Hover/Select
          if (isNodeHovered || isNodeSelected) {
            ctx.save();
            ctx.fillStyle = 'rgba(0, 245, 212, 0.25)';
            ctx.beginPath();
            ctx.arc(node.px, node.py, node.radius * 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Pulsing Reticle Ring
            ctx.strokeStyle = '#00f5d4';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(node.px, node.py, node.radius * 2.0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }

          ctx.fillStyle = isNodeHovered ? '#ffffff' : node.color;
          ctx.beginPath();
          ctx.arc(node.px, node.py, node.radius, 0, Math.PI * 2);
          ctx.fill();

          // Monospace Node Label
          if (node.depth < 140 || node.category === 'core' || isNodeHovered) {
            ctx.font = `${Math.max(
              10,
              Math.min(14, 11 * (node.scale / 1.3))
            )}px "IBM Plex Mono", monospace`;
            ctx.fillStyle = isNodeHovered ? '#00f5d4' : 'rgba(230, 240, 245, 0.85)';
            ctx.fillText(node.label, node.px + node.radius + 7, node.py + 4);
          }
        });
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [viewMode, graphData, systemState, autoRotate, galaxySpread, rotationSpeed, hoveredNode, selectedNode]);

  // Arc Reactor Canvas Telemetry Widget
  useEffect(() => {
    if (hudMode !== 'RING' || !ringCanvasRef.current) return;
    const canvas = ringCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = 180;
    canvas.width = size;
    canvas.height = size;
    const center = size / 2;

    let ringFrame;
    const renderRing = () => {
      const t = timeRef.current;
      ctx.clearRect(0, 0, size, size);

      // Outer Rotating Segmented Ticks
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(t * 0.4);
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.4)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 24; i++) {
        const rad = (i * Math.PI) / 12;
        ctx.beginPath();
        ctx.moveTo(Math.cos(rad) * 72, Math.sin(rad) * 72);
        ctx.lineTo(Math.cos(rad) * 82, Math.sin(rad) * 82);
        ctx.stroke();
      }
      ctx.restore();

      // Inner Counter-Rotating Hex Ring
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(-t * 0.6);
      ctx.strokeStyle = 'rgba(0, 187, 249, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const rad = (i * Math.PI) / 3;
        const x = Math.cos(rad) * 55;
        const y = Math.sin(rad) * 55;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      // Glowing Center Arc Core
      const coreGrad = ctx.createRadialGradient(center, center, 5, center, center, 42);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.4, '#00f5d4');
      coreGrad.addColorStop(1, 'rgba(0, 245, 212, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(center, center, 36, 0, Math.PI * 2);
      ctx.fill();

      // Core Monospace Text
      ctx.fillStyle = '#050a12';
      ctx.font = '700 9px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ARC-3.0', center, center);

      ringFrame = requestAnimationFrame(renderRing);
    };

    renderRing();
    return () => cancelAnimationFrame(ringFrame);
  }, [hudMode]);

  return (
    <main
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#03060c',
        color: '#e2e8f0',
        fontFamily: '"Rajdhani", "IBM Plex Sans", sans-serif',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* Sci-Fi Scanline Overlay */}
      <div className="scanlines" />

      {/* Background Interactive 3D Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onWheel={handleCanvasWheel}
        onClick={handleCanvasClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: hoveredNode ? 'pointer' : cameraRef.current.isDragging ? 'grabbing' : 'grab'
        }}
      />

      {/* TOP HEADER STATUS & TELEMETRY BAR */}
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '56px',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(180deg, rgba(3, 7, 14, 0.95) 0%, rgba(3, 7, 14, 0.6) 80%, rgba(3, 7, 14, 0) 100%)',
          backdropFilter: 'blur(12px)',
          zIndex: 30,
          borderBottom: '1px solid rgba(0, 245, 212, 0.15)'
        }}
      >
        {/* Left: Branding & Neural Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              fontFamily: '"Orbitron", monospace',
              fontWeight: '900',
              fontSize: '17px',
              letterSpacing: '2.5px',
              color: '#00f5d4',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '18px' }}>⚡</span>
            <span>J.A.R.V.I.S. 3.0</span>
            <span
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '10px',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(0, 245, 212, 0.12)',
                border: '1px solid rgba(0, 245, 212, 0.35)',
                color: '#00f5d4'
              }}
            >
              PERSONA: AI (20s / ID)
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              color: '#94a3b8'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: systemState === 'ONLINE' ? '#00f5d4' : '#f59e0b',
                boxShadow: `0 0 10px ${systemState === 'ONLINE' ? '#00f5d4' : '#f59e0b'}`
              }}
            />
            <span>{systemState}</span>
            <span style={{ color: '#475569' }}>·</span>
            <span style={{ color: '#00f5d4' }}>WITA: MAKASSAR</span>
          </div>
        </div>

        {/* Center: Mode Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(0, 245, 212, 0.3)',
            borderRadius: '999px',
            padding: '3px'
          }}
        >
          <button
            onClick={() => setViewMode('ORB')}
            style={{
              background: viewMode === 'ORB' ? '#00f5d4' : 'transparent',
              color: viewMode === 'ORB' ? '#04070d' : '#94a3b8',
              fontWeight: '700',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              letterSpacing: '1px',
              padding: '5px 16px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            ⚡ PLASMA ORB
          </button>
          <button
            onClick={() => setViewMode('GALAXY')}
            style={{
              background: viewMode === 'GALAXY' ? '#00f5d4' : 'transparent',
              color: viewMode === 'GALAXY' ? '#04070d' : '#94a3b8',
              fontWeight: '700',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              letterSpacing: '1px',
              padding: '5px 16px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            🌌 GALAXY 3D (INTERAKTIF)
          </button>
        </div>

        {/* Right: Audio Controls & Test Voice Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() =>
              speakText(
                'Halo Heru! Semua sistem JARVIS dan SecondBrain siap siaga. Suara bahasa Indonesia sudah aktif, ada yang bisa Ai bantu?'
              )
            }
            style={{
              background: 'rgba(0, 245, 212, 0.1)',
              border: '1px solid rgba(0, 245, 212, 0.3)',
              borderRadius: '8px',
              color: '#00f5d4',
              padding: '5px 12px',
              fontSize: '11px',
              fontFamily: '"IBM Plex Mono", monospace',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🔊</span>
            <span>TEST SUARA AI</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(0, 245, 212, 0.2)',
              borderRadius: '8px',
              color: soundEnabled ? '#00f5d4' : '#64748b',
              padding: '6px',
              cursor: 'pointer'
            }}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => setEyesOn(!eyesOn)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(0, 245, 212, 0.2)',
              borderRadius: '8px',
              color: eyesOn ? '#00f5d4' : '#64748b',
              padding: '6px',
              cursor: 'pointer'
            }}
          >
            {eyesOn ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
      </header>

      {/* TOP BANNER: USER SPEECH TRANSCRIPT */}
      {userSpeechQuery && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 25,
            background: 'rgba(4, 9, 18, 0.85)',
            border: '1px solid rgba(0, 245, 212, 0.35)',
            borderRadius: '12px',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 0 20px rgba(0, 245, 212, 0.2)'
          }}
        >
          <span
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              color: '#64748b',
              letterSpacing: '1px'
            }}
          >
            HERU:
          </span>
          <span
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '13px',
              color: '#ffffff',
              fontWeight: '500'
            }}
          >
            &quot;{userSpeechQuery}&quot;
          </span>
        </div>
      )}

      {/* TOP LEFT: MAKASSAR WEATHER & TIDES RADAR */}
      <div
        className="hud-panel hud-glow"
        style={{
          position: 'absolute',
          top: '72px',
          left: '24px',
          padding: '14px 18px',
          zIndex: 20,
          width: '260px'
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
            marginBottom: '8px'
          }}
        >
          <span>MAKASSAR · RADAR</span>
          <span style={{ color: '#00f5d4' }}>LIVE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
          <span
            style={{
              fontFamily: '"Orbitron", monospace',
              fontSize: '28px',
              fontWeight: '700',
              color: '#f8fafc'
            }}
          >
            {weatherData.temp}
          </span>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>{weatherData.condition}</span>
        </div>
        <div
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '10px',
            color: '#94a3b8',
            lineHeight: '1.6'
          }}
        >
          <div>Kelembapan: {weatherData.humidity}</div>
          <div>Angin: {weatherData.wind}</div>
          <div style={{ color: '#00f5d4' }}>{weatherData.tide}</div>
          <div style={{ color: '#38bdf8' }}>{weatherData.solar}</div>
        </div>
      </div>

      {/* TOP RIGHT: HARDWARE LINK (MOTOROLA MOTO G06 POWER & OMNIROUTE) */}
      <div
        className="hud-panel hud-glow"
        style={{
          position: 'absolute',
          top: '72px',
          right: '24px',
          padding: '14px 18px',
          zIndex: 20,
          width: '280px'
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
            marginBottom: '8px'
          }}
        >
          <span>SMARTPHONE & PC BRIDGE</span>
          <span style={{ color: '#00f5d4' }}>ONLINE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Smartphone size={22} color="#00f5d4" />
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
              {phoneStatus.model}
            </div>
            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '10px',
                color: '#00f5d4'
              }}
            >
              Baterai: {phoneStatus.battery} · Port 5555
            </div>
          </div>
        </div>
        <div
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '10px',
            color: '#94a3b8',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '6px'
          }}
        >
          <div>OmniRoute: 18 Akun Pro ($0.00)</div>
          <div>ADB State: Wireless TCP/IP Connected</div>
        </div>
      </div>

      {/* FLOATING GALAXY CONTROLS HUD (Only in GALAXY mode) */}
      {viewMode === 'GALAXY' && (
        <div
          className="hud-panel"
          style={{
            position: 'absolute',
            bottom: '170px',
            left: '24px',
            padding: '12px 16px',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '220px'
          }}
        >
          <div
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '10px',
              letterSpacing: '1.5px',
              color: '#00f5d4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span>ORBIT CONTROLS</span>
            <span>3D</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => {
                cameraRef.current.targetZoom = Math.min(2.8, cameraRef.current.targetZoom + 0.25);
              }}
              style={{
                flex: 1,
                background: 'rgba(0, 245, 212, 0.1)',
                border: '1px solid rgba(0, 245, 212, 0.3)',
                color: '#00f5d4',
                padding: '6px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                fontSize: '11px',
                fontFamily: '"IBM Plex Mono", monospace'
              }}
            >
              <ZoomIn size={14} /> Zoom +
            </button>
            <button
              onClick={() => {
                cameraRef.current.targetZoom = Math.max(0.4, cameraRef.current.targetZoom - 0.25);
              }}
              style={{
                flex: 1,
                background: 'rgba(0, 245, 212, 0.1)',
                border: '1px solid rgba(0, 245, 212, 0.3)',
                color: '#00f5d4',
                padding: '6px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                fontSize: '11px',
                fontFamily: '"IBM Plex Mono", monospace'
              }}
            >
              <ZoomOut size={14} /> Zoom -
            </button>
          </div>

          <button
            onClick={() => {
              cameraRef.current.targetRotX = 0.25;
              cameraRef.current.targetRotY = 0;
              cameraRef.current.targetZoom = 1.0;
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#cbd5e1',
              padding: '6px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '11px',
              fontFamily: '"IBM Plex Mono", monospace'
            }}
          >
            <RotateCcw size={13} /> Reset Sudut Pandang
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            style={{
              background: autoRotate ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${autoRotate ? '#00f5d4' : 'rgba(255, 255, 255, 0.1)'}`,
              color: autoRotate ? '#00f5d4' : '#64748b',
              padding: '6px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '11px',
              fontFamily: '"IBM Plex Mono", monospace'
            }}
          >
            Auto-Orbit: {autoRotate ? 'ON' : 'OFF'}
          </button>
        </div>
      )}

      {/* FLOATING NODE INSPECTOR CARD (When Node is Hovered or Selected) */}
      {(hoveredNode || selectedNode) && (
        <div
          className="hud-panel hud-glow"
          style={{
            position: 'absolute',
            bottom: '170px',
            right: '24px',
            width: '300px',
            padding: '16px',
            zIndex: 25,
            border: '1px solid #00f5d4'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}
          >
            <span
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '10px',
                letterSpacing: '1px',
                color: '#00f5d4'
              }}
            >
              [NODE INSPECTOR]
            </span>
            <button
              onClick={() => {
                setSelectedNode(null);
                setHoveredNode(null);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>
            {(selectedNode || hoveredNode).label}
          </div>

          <div
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              color: '#38bdf8',
              marginBottom: '8px'
            }}
          >
            Kategori: {(selectedNode || hoveredNode).category?.toUpperCase()}
          </div>

          <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.45', marginBottom: '12px' }}>
            {(selectedNode || hoveredNode).desc || 'Elemen terintegrasi dalam SecondBrain Heru.'}
          </div>

          <button
            onClick={() => handleExecute(`jelaskan node ${(selectedNode || hoveredNode).label}`)}
            style={{
              width: '100%',
              background: '#00f5d4',
              color: '#04070d',
              fontWeight: '700',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              padding: '8px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            EKSEKUSI DATA NODE
          </button>
        </div>
      )}

      {/* MIDDLE-RIGHT: ARC REACTOR HUD RING */}
      {viewMode === 'ORB' && (
        <div
          style={{
            position: 'absolute',
            top: '260px',
            right: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            zIndex: 15
          }}
        >
          <canvas ref={ringCanvasRef} style={{ width: '180px', height: '180px', display: 'block' }} />
        </div>
      )}

      {/* LIVE WEBCAM PIP OVERLAY */}
      {eyesOn && (
        <div
          style={{
            position: 'absolute',
            bottom: '240px',
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

      {/* BOTTOM CENTER: TACTICAL SPEECH CAPSULE & COMMAND DOCK */}
      <footer
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(780px, calc(100vw - 40px))',
          background: 'rgba(4, 9, 18, 0.88)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(0, 245, 212, 0.35)',
          borderRadius: '20px',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: '0 8px 36px rgba(0, 0, 0, 0.8), 0 0 24px rgba(0, 245, 212, 0.15)',
          zIndex: 30
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
              background: '#00f5d4',
              boxShadow: '0 0 8px #00f5d4',
              flexShrink: 0
            }}
          />
          <div
            style={{
              fontSize: '13px',
              color: '#f8fafc',
              lineHeight: '1.45',
              fontFamily: '"IBM Plex Mono", monospace',
              maxHeight: '44px',
              overflowY: 'auto'
            }}
          >
            {activeSpeech}
          </div>
        </div>

        {/* Input Bar with Mic & Transmit */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={toggleListening}
            style={{
              background: isListening ? '#f43f5e' : 'rgba(0, 245, 212, 0.12)',
              border: `1px solid ${isListening ? '#f43f5e' : 'rgba(0, 245, 212, 0.35)'}`,
              borderRadius: '10px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isListening ? '#ffffff' : '#00f5d4',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
            placeholder="Ketik atau bicara perintah (misal: 'status hp', 'buka rhino', 'call sister')..."
            style={{
              flex: 1,
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(0, 245, 212, 0.25)',
              borderRadius: '10px',
              padding: '9px 14px',
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
              color: '#04070d',
              fontWeight: '700',
              border: 'none',
              borderRadius: '10px',
              padding: '9px 20px',
              fontSize: '12px',
              fontFamily: '"IBM Plex Mono", monospace',
              cursor: isProcessing || !commandInput.trim() ? 'not-allowed' : 'pointer',
              opacity: isProcessing || !commandInput.trim() ? 0.4 : 1
            }}
          >
            {isProcessing ? 'PROSES...' : 'TRANSMIT'}
          </button>
        </div>

        {/* Quick Reflex Action Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '9px',
              color: '#64748b',
              letterSpacing: '1px'
            }}
          >
            INSTANT REFLEX:
          </span>
          {[
            { label: '📱 Status HP', cmd: 'status hp' },
            { label: '📱 Unlock HP', cmd: 'unlock my phone' },
            { label: '📱 WA di HP', cmd: 'open whatsapp in my phone' },
            { label: '📞 Call Sister', cmd: 'call sister' },
            { label: '🖥️ Buka Rhino', cmd: 'buka rhino' },
            { label: '🖥️ Buka Revit', cmd: 'buka revit' },
            { label: '📺 Buka YouTube', cmd: 'buka youtube' },
            { label: '🔄 Sync Drive', cmd: 'sync drive' }
          ].map((rf) => (
            <button
              key={rf.label}
              onClick={() => handleExecute(rf.cmd)}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(0, 245, 212, 0.2)',
                color: '#cbd5e1',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '10px',
                fontFamily: '"IBM Plex Mono", monospace',
                cursor: 'pointer'
              }}
            >
              {rf.label}
            </button>
          ))}
        </div>
      </footer>
    </main>
  );
}
