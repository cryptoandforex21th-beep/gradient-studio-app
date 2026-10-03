'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

export default function JarvisZubairHUD() {
  // Canvas & Simulation Refs
  const canvasRef = useRef(null);
  const ringCanvasRef = useRef(null);
  const cubeCanvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const ringAnimRef = useRef(null);
  const cubeAnimRef = useRef(null);
  const videoRef = useRef(null);

  // System States
  const [telemetry, setTelemetry] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHub, setActiveHub] = useState('all');
  const [currentTime, setCurrentTime] = useState('');

  // Zubair UI Modes & Toggles
  const [hudMode, setHudMode] = useState('RING'); // 'RING' | 'CUBE' | 'FACE'
  const [systemState, setSystemState] = useState('ONLINE'); // 'ONLINE' | 'SPEAKING' | 'LISTENING' | 'THINKING'
  const [activeBrain, setActiveBrain] = useState('SONNET 5.5'); // 'SONNET 5.5' | 'GEMINI 2.5 PRO' | 'ANTIGRAVITY'
  
  // Right Control Stack Toggles
  const [eyesOn, setEyesOn] = useState(false);
  const [watchOn, setWatchOn] = useState(false);
  const [holoOn, setHoloOn] = useState(true);
  const [focusOn, setFocusOn] = useState(false);
  const [showReflexModal, setShowReflexModal] = useState(false);
  const [showForces, setShowForces] = useState(false);

  // Simulation Forces
  const [rotationSpeed, setRotationSpeed] = useState(0.0018);
  const [linkDistance, setLinkDistance] = useState(140);
  const [galaxySpread, setGalaxySpread] = useState(260);

  // Inbox Notifications (matching Zubair)
  const [inboxItems, setInboxItems] = useState([
    {
      id: 1,
      icon: '⚡',
      title: 'Tool run — via Google Drive',
      desc: 'Live sync daemon aktif memantau D:\\SecondBrain → G:\\My Drive\\SecondBrain (100% synced).',
      time: 'Just now'
    },
    {
      id: 2,
      icon: '📞',
      title: 'Telegram — SecondBrain Bot',
      desc: 'Webhook Supabase siaga menerima voice note & pesan kilat mobile Heru.',
      time: '2m ago'
    },
    {
      id: 3,
      icon: '🏢',
      title: 'Virtual AI Office — 4 Agents',
      desc: 'Prof. Luna, Mochi, Kaktus, dan MasAmba tersinkronisasi di localhost:5173.',
      time: '5m ago'
    }
  ]);

  // Speech & Interaction
  const [activeSpeech, setActiveSpeech] = useState(
    'Halo Heru. Seluruh SecondBrain, Google Drive Live Sync, dan 4 divisi agent sudah siap. Apa instruksi berikutnya?'
  );
  const [commandInput, setCommandInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // 3D Camera / Orbit Coordinates
  const cameraRef = useRef({
    rotX: 0.15,
    rotY: 0.25,
    zoom: 1.1,
    targetRotX: 0.15,
    targetRotY: 0.25,
    targetZoom: 1.1,
    focusX: 0,
    focusY: 0,
    focusZ: 0,
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

  // Fetch Telemetry & Graph Data
  useEffect(() => {
    fetch('/api/jarvis/status')
      .then((res) => res.json())
      .then((data) => setTelemetry(data))
      .catch(() => {});

    fetch('/api/jarvis/graph')
      .then((res) => res.json())
      .then((data) => {
        // Distribute nodes in a 3D spherical galaxy
        const nodesWith3D = data.nodes.map((n, i) => {
          // Golden ratio spherical distribution
          const phi = Math.acos(1 - 2 * (i + 0.5) / data.nodes.length);
          const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
          const radius = (n.category === 'core' ? 80 : 160) + Math.random() * 80;

          const categoryColors = {
            core: '#f43f5e',      // Rose Pink
            academic: '#00f5d4',  // Teal Cyan (Luna)
            studio: '#a855f7',    // Electric Violet (Mochi)
            bim: '#f59e0b',       // Amber Gold (Kaktus)
            trading: '#10b981'    // Emerald Green (MasAmba)
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

        setGraphData({
          ...data,
          nodes: nodesWith3D
        });
      })
      .catch(() => {});
  }, []);

  // Text-To-Speech function
  const speakText = useCallback((text) => {
    if (!soundEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onstart = () => setSystemState('SPEAKING');
    utterance.onend = () => setSystemState('ONLINE');
    window.speechSynthesis.speak(utterance);
  }, [soundEnabled]);

  // Execute Command or Reflex
  const handleExecute = async (overrideCmd) => {
    const cmd = (overrideCmd || commandInput).trim();
    if (!cmd) return;

    setIsProcessing(true);
    setSystemState('THINKING');

    try {
      const res = await fetch('/api/jarvis/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd })
      });
      const data = await res.json();
      
      const reply = data.text || `Reflex dieksekusi: ${cmd}`;
      setActiveSpeech(reply);
      speakText(reply);
      setCommandInput('');

      // Add to inbox if action performed
      if (data.type === 'reflex') {
        setInboxItems((prev) => [
          {
            id: Date.now(),
            icon: '⚡',
            title: `Reflex Action — ${cmd}`,
            desc: data.text,
            time: 'Just now'
          },
          ...prev.slice(0, 4)
        ]);
      }
    } catch {
      const fallback = `Mengeksekusi reflex "${cmd}" secara lokal...`;
      setActiveSpeech(fallback);
    } finally {
      setIsProcessing(false);
      setSystemState('ONLINE');
    }
  };

  // Browser Speech Recognition (Tap to talk)
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
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setSystemState('LISTENING');
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
    };

    recognition.onend = () => {
      setIsListening(false);
      if (systemState === 'LISTENING') setSystemState('ONLINE');
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

  // Main 3D Constellation Galaxy Canvas Render Loop
  useEffect(() => {
    if (!graphData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Stars background
    const stars = Array.from({ length: 140 }, () => ({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * 800 + 100,
      size: Math.random() * 1.5 + 0.5,
      twinkle: Math.random() * Math.PI * 2
    }));

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Deep space ambient gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.45, height * 0.5, 50,
        width * 0.45, height * 0.5, width * 0.8
      );
      bgGrad.addColorStop(0, '#060d16');
      bgGrad.addColorStop(0.5, '#04080e');
      bgGrad.addColorStop(1, '#020407');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const cam = cameraRef.current;

      // Auto-drift rotation when idle
      if (!cam.isDragging) {
        cam.rotY += rotationSpeed;
      }

      // Smooth interpolation to target
      cam.rotX += (cam.targetRotX - cam.rotX) * 0.08;
      cam.rotY += (cam.targetRotY - cam.rotY) * 0.08;
      cam.zoom += (cam.targetZoom - cam.zoom) * 0.08;

      const cosX = Math.cos(cam.rotX);
      const sinX = Math.sin(cam.rotX);
      const cosY = Math.cos(cam.rotY);
      const sinY = Math.sin(cam.rotY);

      const fov = 480 * cam.zoom;
      const originX = width * (focusOn ? 0.5 : 0.42);
      const originY = height * 0.5;

      // Render stars
      stars.forEach((s) => {
        s.twinkle += 0.03;
        const alpha = 0.25 + Math.sin(s.twinkle) * 0.2;
        ctx.fillStyle = `rgba(200, 235, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(originX + s.x * (400 / s.z), originY + s.y * (400 / s.z), s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Filtered nodes
      let nodes = graphData.nodes;
      if (activeHub !== 'all') {
        nodes = nodes.filter((n) => n.category === activeHub || n.category === 'core');
      }
      if (searchQuery.trim()) {
        const sq = searchQuery.toLowerCase();
        nodes = nodes.filter(
          (n) => n.label.toLowerCase().includes(sq) || (n.desc && n.desc.toLowerCase().includes(sq))
        );
      }

      // Project nodes in 3D
      const projectedNodes = nodes.map((node) => {
        // Rotate around Y axis
        let x1 = node.x3d * cosY - node.z3d * sinY;
        let z1 = node.z3d * cosY + node.x3d * sinY;

        // Rotate around X axis
        let y2 = node.y3d * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y3d * sinX;

        // Spread adjustment
        const spreadFactor = galaxySpread / 200;
        x1 *= spreadFactor;
        y2 *= spreadFactor;
        z2 *= spreadFactor;

        // Translate to camera focus
        const distance = z2 + 420;
        const scale = distance > 20 ? fov / distance : 0;
        const px = originX + x1 * scale;
        const py = originY + y2 * scale;

        return {
          ...node,
          px,
          py,
          depth: z2,
          scale,
          visible: distance > 20
        };
      });

      // Sort by depth (painters algorithm)
      projectedNodes.sort((a, b) => b.depth - a.depth);

      // Draw Connections (Lasers)
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

      // Draw Nodes
      projectedNodes.forEach((node) => {
        if (!node.visible) return;

        const isSelected = selectedNode && selectedNode.id === node.id;
        const depthAlpha = Math.max(0.35, Math.min(1.0, 1 - node.depth / 800));
        const radius = Math.max(2.5, node.baseRadius * (node.scale / 1.5));

        // Soft outer glow
        const glowRad = radius * (isSelected ? 3.5 : 2.2);
        const glow = ctx.createRadialGradient(node.px, node.py, radius * 0.2, node.px, node.py, glowRad);
        glow.addColorStop(0, node.color);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.px, node.py, glowRad, 0, Math.PI * 2);
        ctx.fill();

        // Solid core
        ctx.fillStyle = isSelected ? '#ffffff' : node.color;
        ctx.beginPath();
        ctx.arc(node.px, node.py, radius, 0, Math.PI * 2);
        ctx.fill();

        // Halo ring on selected
        if (isSelected) {
          ctx.strokeStyle = '#00f5d4';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(node.px, node.py, radius + 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Monospace Labels (only for closer nodes or core or selected)
        if (node.depth < 120 || node.category === 'core' || isSelected) {
          ctx.font = `${Math.max(9, Math.min(13, 10 * (node.scale / 1.4)))}px "IBM Plex Mono", monospace`;
          ctx.fillStyle = isSelected ? '#00f5d4' : `rgba(230, 240, 245, ${depthAlpha * 0.85})`;
          ctx.fillText(node.label, node.px + radius + 6, node.py + 3.5);
        }
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    // Mouse Interaction Handlers
    const handleMouseDown = (e) => {
      // Don't drag if clicking buttons or inputs
      if (e.target.closest('button, input, a, .interactive-card')) return;
      cam.isDragging = true;
      cam.lastMouseX = e.clientX;
      cam.lastMouseY = e.clientY;
    };

    const handleMouseMove = (e) => {
      if (!cam.isDragging) return;
      const dx = e.clientX - cam.lastMouseX;
      const dy = e.clientY - cam.lastMouseY;
      cam.targetRotY += dx * 0.005;
      cam.targetRotX += dy * 0.005;
      cam.lastMouseX = e.clientX;
      cam.lastMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      cam.isDragging = false;
    };

    const handleWheel = (e) => {
      if (e.target.closest('.scrollable-pane')) return;
      e.preventDefault();
      const zoomDelta = e.deltaY * -0.001;
      cam.targetZoom = Math.max(0.4, Math.min(2.8, cam.targetZoom + zoomDelta));
    };

    // Click to select node
    const handleClick = (e) => {
      if (e.target.closest('button, input, a, .interactive-card')) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Project current nodes to hit test
      const cosX = Math.cos(cam.rotX);
      const sinX = Math.sin(cam.rotX);
      const cosY = Math.cos(cam.rotY);
      const sinY = Math.sin(cam.rotY);
      const fov = 480 * cam.zoom;
      const originX = width * (focusOn ? 0.5 : 0.42);
      const originY = height * 0.5;

      let found = null;
      let minDistance = 25;

      graphData.nodes.forEach((node) => {
        let x1 = node.x3d * cosY - node.z3d * sinY;
        let z1 = node.z3d * cosY + node.x3d * sinY;
        let y2 = node.y3d * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y3d * sinX;
        const spreadFactor = galaxySpread / 200;
        x1 *= spreadFactor;
        y2 *= spreadFactor;
        z2 *= spreadFactor;
        const distance = z2 + 420;
        if (distance > 20) {
          const scale = fov / distance;
          const px = originX + x1 * scale;
          const py = originY + y2 * scale;
          const d = Math.hypot(clickX - px, clickY - py);
          if (d < minDistance) {
            minDistance = d;
            found = node;
          }
        }
      });

      if (found) {
        setSelectedNode(found);
        setActiveSpeech(`SecondBrain Note: ${found.label} (${found.category.toUpperCase()}). ${found.desc || ''}`);
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('click', handleClick);
    };
  }, [graphData, activeHub, searchQuery, focusOn, galaxySpread, rotationSpeed, selectedNode]);

  // J.A.R.V.I.S. Arc Reactor Ring Canvas HUD Render
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

      // 1. Outer Speedometer Radial Ticks (Zubair signature)
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

      // 2. Cyan Segmented Outer Track
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r - 4, angle, angle + Math.PI * 1.3);
      ctx.strokeStyle = '#00f5d4';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00f5d4';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      // 3. Dynamic Amber / Orange Accent Arc (Zubair top-right accent)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r - 4, -angle * 0.8, -angle * 0.8 + Math.PI * 0.5);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();

      // 4. Concentric Thin Cyan Inner Rings
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.35)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, r - 16, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = 'rgba(0, 245, 212, 0.2)';
      ctx.beginPath();
      ctx.arc(cx, cy, r - 26, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 5. Rotating Radar Sweep Line
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.6)';
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle * 1.5) * (r - 28), cy + Math.sin(angle * 1.5) * (r - 28));
      ctx.stroke();
      ctx.restore();

      // 6. Center Hub Background & Glowing Text "J.A.R.V.I.S."
      ctx.save();
      const centerPulse = Math.sin(pulse) * 2;
      ctx.fillStyle = 'rgba(4, 10, 18, 0.9)';
      ctx.beginPath();
      ctx.arc(cx, cy, 38 + centerPulse, 0, Math.PI * 2);
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

  // 3D Wireframe Tesseract Cube (when hudMode === 'CUBE')
  useEffect(() => {
    if (hudMode !== 'CUBE' || !cubeCanvasRef.current) return;

    const canvas = cubeCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = 180;
    canvas.width = size * window.devicePixelRatio;
    canvas.height = size * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let t = 0;
    const vertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ];
    const edges = [
      [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7]
    ];

    const renderCube = () => {
      t += 0.02;
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const rad = 42;

      const cosA = Math.cos(t);
      const sinA = Math.sin(t);
      const cosB = Math.cos(t * 0.7);
      const sinB = Math.sin(t * 0.7);

      const projected = vertices.map(([x, y, z]) => {
        // Rotations
        let x1 = x * cosA - z * sinA;
        let z1 = z * cosA + x * sinA;
        let y2 = y * cosB - z1 * sinB;
        let z2 = z1 * cosB + y * sinB;

        const distance = z2 + 3.5;
        const scale = 140 / distance;
        return [cx + x1 * scale, cy + y2 * scale];
      });

      // Draw Edges
      ctx.strokeStyle = '#00f5d4';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#00f5d4';
      ctx.shadowBlur = 8;
      edges.forEach(([i, j]) => {
        ctx.beginPath();
        ctx.moveTo(projected[i][0], projected[i][1]);
        ctx.lineTo(projected[j][0], projected[j][1]);
        ctx.stroke();
      });

      // Center text
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 10px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('DATA CUBE', cx, cy + 55);

      cubeAnimRef.current = requestAnimationFrame(renderCube);
    };

    renderCube();
    return () => cancelAnimationFrame(cubeAnimRef.current);
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
      {/* Background 3D Galaxy Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: cameraRef.current.isDragging ? 'grabbing' : 'grab'
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
          background: 'linear-gradient(180deg, rgba(3,7,12,0.85) 0%, rgba(3,7,12,0) 100%)',
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
              OMNIROUTE :20128 [18 ACC]
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
            {soundEnabled ? '🔊 VOICE ON' : '🔇 VOICE MUTED'}
          </button>
        </div>
      </header>

      {/* LEFT PANEL: SECOND BRAIN / AI WORKSHOP DOCK */}
      {!focusOn && (
        <aside
          className="scrollable-pane"
          style={{
            position: 'absolute',
            top: '64px',
            left: '20px',
            bottom: '120px',
            width: '280px',
            background: 'rgba(5, 10, 18, 0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 245, 212, 0.15)',
            borderRadius: '16px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            zIndex: 10,
            overflowY: 'auto'
          }}
        >
          {/* Header */}
          <div>
            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '11px',
                letterSpacing: '2px',
                color: '#64748b',
                textTransform: 'uppercase'
              }}
            >
              AI WORKSHOP
            </div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#f8fafc',
                letterSpacing: '0.5px'
              }}
            >
              SecondBrain Galaxy
            </div>
            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '10px',
                color: '#00f5d4',
                marginTop: '2px'
              }}
            >
              612 notes · GDrive Live Sync OK
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.65)',
                border: '1px solid rgba(0, 245, 212, 0.25)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                color: '#f1f5f9',
                outline: 'none',
                fontFamily: '"IBM Plex Mono", monospace'
              }}
            />
          </div>

          {/* INSPECT CARD (Zubair Signature) */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(51, 65, 85, 0.6)',
              borderRadius: '10px',
              padding: '12px'
            }}
          >
            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '9px',
                letterSpacing: '1.5px',
                color: '#64748b',
                textTransform: 'uppercase',
                marginBottom: '6px'
              }}
            >
              INSPECT NOTE
            </div>
            {selectedNode ? (
              <div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: selectedNode.color || '#00f5d4',
                    marginBottom: '4px'
                  }}
                >
                  {selectedNode.label}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#94a3b8',
                    lineHeight: '1.4',
                    marginBottom: '8px'
                  }}
                >
                  {selectedNode.desc || 'Catatan terhubung dalam SecondBrain.'}
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '9px',
                    color: '#00f5d4',
                    background: 'rgba(0, 245, 212, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}
                >
                  CATEGORY: {selectedNode.category.toUpperCase()}
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic' }}>
                Klik salah satu orb/bintang di galaksi untuk melihat data catatan...
              </div>
            )}
          </div>

          {/* TOP HUBS (Zubair Signature) */}
          <div>
            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '9px',
                letterSpacing: '1.5px',
                color: '#64748b',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}
            >
              TOP HUBS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { id: 'all', label: 'All Constellation', color: '#cbd5e1' },
                { id: 'core', label: 'SecondBrain Core', color: '#f43f5e' },
                { id: 'academic', label: '01_luna_academic (Skripsi)', color: '#00f5d4' },
                { id: 'studio', label: '02_gradient_dev (Software)', color: '#a855f7' },
                { id: 'bim', label: '03_bim_construction (Revit)', color: '#f59e0b' },
                { id: 'trading', label: '04_trading_quant (Market)', color: '#10b981' }
              ].map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => setActiveHub(hub.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    background:
                      activeHub === hub.id ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${activeHub === hub.id ? 'rgba(0, 245, 212, 0.3)' : 'transparent'}`,
                    color: activeHub === hub.id ? '#ffffff' : '#94a3b8',
                    fontSize: '11px',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: hub.color
                    }}
                  />
                  {hub.label}
                </button>
              ))}
            </div>
          </div>

          {/* FORCES COLLAPSIBLE (Zubair) */}
          <div style={{ borderTop: '1px solid rgba(51, 65, 85, 0.4)', paddingTop: '10px' }}>
            <button
              onClick={() => setShowForces(!showForces)}
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '9px',
                letterSpacing: '1.5px',
                color: '#64748b',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                cursor: 'pointer'
              }}
            >
              <span>FORCES & PHYSICS</span>
              <span>{showForces ? '▲' : '▼'}</span>
            </button>
            {showForces && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '2px' }}>Spread:</div>
                  <input
                    type="range"
                    min="120"
                    max="400"
                    value={galaxySpread}
                    onChange={(e) => setGalaxySpread(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '2px' }}>Rotation:</div>
                  <input
                    type="range"
                    min="0"
                    max="0.006"
                    step="0.0005"
                    value={rotationSpeed}
                    onChange={(e) => setRotationSpeed(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* TOP RIGHT: JARVIS INBOX FEED (Zubair Signature) */}
      <div
        style={{
          position: 'absolute',
          top: '64px',
          right: '20px',
          width: '310px',
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
            className="interactive-card"
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
              Got it
            </button>
          </div>
        ))}
      </div>

      {/* MIDDLE-RIGHT: THE J.A.R.V.I.S. ARC REACTOR RING HUD (Exact Zubair) */}
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
        {/* Arc Reactor Canvas or Mode Display */}
        <div style={{ position: 'relative', width: '180px', height: '180px' }}>
          {hudMode === 'RING' && (
            <canvas
              ref={ringCanvasRef}
              style={{ width: '180px', height: '180px', display: 'block' }}
            />
          )}
          {hudMode === 'CUBE' && (
            <canvas
              ref={cubeCanvasRef}
              style={{ width: '180px', height: '180px', display: 'block' }}
            />
          )}
          {hudMode === 'FACE' && (
            <div
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 245, 212, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle, rgba(0,245,212,0.15) 0%, rgba(5,10,18,0.9) 70%)'
              }}
            >
              <div
                style={{
                  fontSize: '36px',
                  filter: 'drop-shadow(0 0 12px #00f5d4)',
                  animation: 'pulse 2s infinite'
                }}
              >
                愛
              </div>
              <div
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '9px',
                  color: '#00f5d4',
                  letterSpacing: '2px',
                  marginTop: '4px'
                }}
              >
                PERSONA &apos;AI&apos;
              </div>
            </div>
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
            title="Click to switch AI Brain"
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

        {/* Mode Switcher Buttons [ RING ] [ CUBE ] [ FACE ] */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            background: 'rgba(5, 10, 18, 0.65)',
            border: '1px solid rgba(51, 65, 85, 0.6)',
            borderRadius: '999px',
            padding: '3px'
          }}
        >
          {['RING', 'CUBE', 'FACE'].map((mode) => (
            <button
              key={mode}
              onClick={() => setHudMode(mode)}
              style={{
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '9px',
                fontFamily: '"IBM Plex Mono", monospace',
                letterSpacing: '1px',
                background: hudMode === mode ? 'rgba(0, 245, 212, 0.25)' : 'transparent',
                color: hudMode === mode ? '#00f5d4' : '#64748b',
                border: hudMode === mode ? '1px solid rgba(0, 245, 212, 0.4)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* LOWER-RIGHT: QUICK CONTROL STACK (Zubair Exact) */}
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
          { key: 'HOLO', state: holoOn ? 'active' : 'off', toggle: () => setHoloOn(!holoOn) },
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
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{ctrl.key}</span>
            <span
              style={{
                color: ctrl.state === 'off' ? '#64748b' : '#00f5d4',
                fontSize: '9px'
              }}
            >
              {ctrl.state}
            </span>
          </button>
        ))}
      </div>

      {/* LIVE WEBCAM PIP OVERLAY (When EYES is on) */}
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
          <div
            style={{
              position: 'absolute',
              top: '4px',
              left: '6px',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '8px',
              color: '#00f5d4',
              background: 'rgba(0,0,0,0.7)',
              padding: '1px 4px',
              borderRadius: '3px'
            }}
          >
            LIVE VISION
          </div>
        </div>
      )}

      {/* BOTTOM CENTER: FLOATING SPEECH CAPSULE & REFLEX ACTION BAR */}
      <footer
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(720px, calc(100vw - 40px))',
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
        {/* Live Spoken Thought & Waveform */}
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
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '13px',
                color: '#f8fafc',
                lineHeight: '1.45',
                fontWeight: '400'
              }}
            >
              {activeSpeech}
            </div>
          </div>
        </div>

        {/* Interactive Prompt & Reflex Bar */}
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
            placeholder="Ketik instruksi atau reflex (contoh: 'buka rhino', 'sync drive')..."
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
            {isProcessing ? 'Thinking...' : 'SEND'}
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
            FAST REFLEXES:
          </span>
          {[
            { label: 'Buka Rhino', cmd: 'buka rhino' },
            { label: 'Buka Revit', cmd: 'buka revit' },
            { label: 'Sync GDrive', cmd: 'sync drive' },
            { label: 'Virtual Office', cmd: 'buka virtual office' },
            { label: 'Cek Skripsi', cmd: 'skripsi' }
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
            Reflex Cost: $0.00 (Local Free)
          </div>
        </div>
      </footer>

      {/* ZUBAIR COST & REFLEX GUIDE MODAL (Exact from Video Chapter 10:21) */}
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
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    color: '#0f766e',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}
                >
                  THE METER · EVERYDAY
                </div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginTop: '2px' }}>
                  Your Everyday Assistant
                </div>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>
                  Setup: Sonnet 5.5 / Gemini / Antigravity Gateway + SecondBrain local memory.
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

            {/* Cost Table (From Zubair's real sheet) */}
            <div style={{ marginTop: '20px', borderTop: '2px solid #0f172a', paddingTop: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '10px',
                  fontWeight: '700',
                  color: '#64748b',
                  letterSpacing: '1px',
                  marginBottom: '10px'
                }}
              >
                <span>WHAT JARVIS DOES</span>
                <span>TYPICAL COST</span>
              </div>

              {[
                {
                  task: 'Answers you, from your own notes',
                  desc: 'The galaxy flies to the note while he speaks.',
                  cost: 'FREE (Local SecondBrain)'
                },
                {
                  task: 'Instant reflexes (App launcher, desktop actions)',
                  desc: 'Simple commands decided in 150ms before big brain wakes up.',
                  cost: '$0.00 / <0.01¢'
                },
                {
                  task: 'Google actions & Drive sync',
                  desc: 'Drive sync daemon runs locally in background.',
                  cost: 'FREE'
                },
                {
                  task: 'Telegram texts and voice notes',
                  desc: 'Heru talks from his pocket. Webhook delivery free.',
                  cost: 'FREE'
                },
                {
                  task: 'Long-term memory and the 3D galaxy',
                  desc: 'Remembers what you tell him and grows the galaxy.',
                  cost: 'FREE'
                },
                {
                  task: 'Antigravity Route / OmniRoute Multi-Account',
                  desc: '18 active accounts connected with zero token billing.',
                  cost: '$0.00 UNLIMITED'
                }
              ].map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '9px 0',
                    borderBottom: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ paddingRight: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                      {row.task}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{row.desc}</div>
                  </div>
                  <div
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '11px',
                      fontWeight: '700',
                      color: row.cost.includes('FREE') || row.cost.includes('0.00') ? '#059669' : '#0f172a',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {row.cost}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom summary note */}
            <div
              style={{
                marginTop: '16px',
                background: '#fef3c7',
                border: '1px solid #fde68a',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '11px',
                color: '#92400e'
              }}
            >
              💡 <strong>Heru&apos;s Setup Advantage:</strong> Zubair membayar ~$0.50 per hari di Sonnet 5.5,
              tetapi Heru mendapatkan biaya <strong>$0.00 (Gratis)</strong> karena routing berjalan lewat
              OmniRoute Gateway (port 20128) yang memanfaatkan Google Pro &amp; Antigravity route!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
