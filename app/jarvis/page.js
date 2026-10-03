'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function JarvisOfficeHUD() {
  const canvasRef = useRef(null);
  const [telemetry, setTelemetry] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [commandInput, setCommandInput] = useState('');
  const [commandLog, setCommandLog] = useState([]);
  const [activeTab, setActiveTab] = useState('graph'); // 'graph' | 'agents'
  const [currentTime, setCurrentTime] = useState('');

  // Clock WITA (UTC+8)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('id-ID', { timeZone: 'Asia/Makassar', hour12: false }) + ' WITA');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch telemetry & graph
  useEffect(() => {
    fetch('/api/jarvis/status')
      .then(res => res.json())
      .then(data => {
        setTelemetry(data);
        if (data.logs) {
          setCommandLog(data.logs.map(l => `[${l.time}] ${l.agent}: ${l.text}`));
        }
      })
      .catch(() => {});

    fetch('/api/jarvis/graph')
      .then(res => res.json())
      .then(data => setGraphData(data))
      .catch(() => {});
  }, []);

  // Canvas Force-Directed Graph Simulation
  useEffect(() => {
    if (!graphData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight || 550;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Color mapper
    const categoryColors = {
      core: '#f43f5e',      // Rose
      academic: '#00f0ff',  // Cyan (Prof. Luna)
      studio: '#a855f7',    // Violet (Mochi)
      bim: '#f59e0b',       // Amber (Kaktus)
      trading: '#00ff9d'    // Emerald (MasAmba)
    };

    // Initialize node positions in a radial layout
    const nodes = graphData.nodes.map((n, i) => {
      const angle = (i / graphData.nodes.length) * Math.PI * 2;
      const radius = 120 + (n.val * 4);
      return {
        ...n,
        x: width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 40,
        y: height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 40,
        vx: 0,
        vy: 0,
        color: categoryColors[n.category] || '#ffffff'
      };
    });

    const links = graphData.links.map(l => ({
      ...l,
      sourceNode: nodes.find(n => n.id === l.source) || nodes[0],
      targetNode: nodes.find(n => n.id === l.target) || nodes[0]
    }));

    let isDragging = false;
    let draggedNode = null;
    let hoveredNode = null;

    // Mouse handlers
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseDown = (e) => {
      const pos = getPos(e);
      const clicked = nodes.find(n => {
        const dx = n.x - pos.x;
        const dy = n.y - pos.y;
        return Math.sqrt(dx * dx + dy * dy) < (n.val + 8);
      });
      if (clicked) {
        isDragging = true;
        draggedNode = clicked;
        setSelectedNode(clicked);
      }
    };

    const handleMouseMove = (e) => {
      const pos = getPos(e);
      if (isDragging && draggedNode) {
        draggedNode.x = pos.x;
        draggedNode.y = pos.y;
      } else {
        const found = nodes.find(n => {
          const dx = n.x - pos.x;
          const dy = n.y - pos.y;
          return Math.sqrt(dx * dx + dy * dy) < (n.val + 8);
        });
        hoveredNode = found || null;
        canvas.style.cursor = found ? 'pointer' : 'crosshair';
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      draggedNode = null;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Simulation loop
    let t = 0;
    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Force simulation step
      // 1. Repulsion between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 180) {
            const force = (180 - dist) / 180 * 0.45;
            nodes[i].vx -= (dx / dist) * force;
            nodes[i].vy -= (dy / dist) * force;
            nodes[j].vx += (dx / dist) * force;
            nodes[j].vy += (dy / dist) * force;
          }
        }
      }

      // 2. Spring force along links
      for (const link of links) {
        const dx = link.targetNode.x - link.sourceNode.x;
        const dy = link.targetNode.y - link.sourceNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = 90;
        const force = (dist - targetDist) * 0.015 * (link.strength || 0.8);
        link.sourceNode.vx += (dx / dist) * force;
        link.sourceNode.vy += (dy / dist) * force;
        link.targetNode.vx -= (dx / dist) * force;
        link.targetNode.vy -= (dy / dist) * force;
      }

      // 3. Center gravity & damping
      const cx = width / 2;
      const cy = height / 2;
      for (const n of nodes) {
        if (n !== draggedNode) {
          n.vx += (cx - n.x) * 0.002;
          n.vy += (cy - n.y) * 0.002;
          n.vx *= 0.88;
          n.vy *= 0.88;
          n.x += n.vx;
          n.y += n.vy;
        }
      }

      // Draw background grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw edges / links
      for (const link of links) {
        const isConnectedToSelected = selectedNode && 
          (link.sourceNode.id === selectedNode.id || link.targetNode.id === selectedNode.id);
        const isHovered = hoveredNode && 
          (link.sourceNode.id === hoveredNode.id || link.targetNode.id === hoveredNode.id);

        ctx.beginPath();
        ctx.moveTo(link.sourceNode.x, link.sourceNode.y);
        ctx.lineTo(link.targetNode.x, link.targetNode.y);

        if (isConnectedToSelected || isHovered) {
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 8;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      for (const n of nodes) {
        const matchesFilter = activeFilter === 'all' || n.category === activeFilter;
        const matchesSearch = !searchQuery || n.label.toLowerCase().includes(searchQuery.toLowerCase());
        const isHighlighted = matchesFilter && matchesSearch;
        const isSelected = selectedNode?.id === n.id;
        const isHover = hoveredNode?.id === n.id;

        const radius = n.val / 2 + (isSelected ? 4 : isHover ? 2 : 0);

        // Halo glow
        if (isHighlighted || isSelected) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius + (isSelected ? 10 : 5) + Math.sin(t * 3 + n.val) * 2, 0, Math.PI * 2);
          ctx.fillStyle = isSelected 
            ? 'rgba(0, 240, 255, 0.25)' 
            : `${n.color}15`;
          ctx.fill();
        }

        // Main node circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? n.color : 'rgba(80, 95, 110, 0.4)';
        ctx.fill();

        ctx.strokeStyle = isSelected ? '#ffffff' : isHighlighted ? n.color : 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = isSelected ? 2.5 : 1;
        ctx.stroke();

        // Node Label
        if (isHighlighted || isSelected || isHover) {
          ctx.font = isSelected ? '600 11px IBM Plex Mono' : '400 9px IBM Plex Mono';
          ctx.fillStyle = isSelected ? '#ffffff' : '#cbd5e1';
          ctx.textAlign = 'center';
          ctx.fillText(n.label, n.x, n.y + radius + 14);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [graphData, activeFilter, searchQuery, selectedNode]);

  // Handle command execution
  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const time = new Date().toLocaleTimeString('id-ID', { hour12: false });
    const userMsg = `[${time}] HERU: ${commandInput}`;
    setCommandLog(prev => [...prev, userMsg]);

    const input = commandInput.toLowerCase();
    setCommandInput('');

    setTimeout(() => {
      let reply = '';
      if (input.includes('luna') || input.includes('skripsi') || input.includes('solar')) {
        reply = `[${time}] PROF. LUNA: "Parameter Solar Tube kampus Samata terverifikasi. Sesuai SNI 03-6197 target 250 lux tercapai. Jurnal Al-Marwaee & Carter valid!"`;
      } else if (input.includes('mochi') || input.includes('web') || input.includes('3d')) {
        reply = `[${time}] MOCHI: "Canvas Three.js HUD berjalan stabil di 60 FPS. Model California Modulars siap deploy ke production."`;
      } else if (input.includes('kaktus') || input.includes('revit') || input.includes('bim')) {
        reply = `[${time}] KAKTUS: "Model fasad menara Dynamo telah diinspeksi. 0 benturan pipa vs struktur. AHSP Makassar siap diekstrak."`;
      } else if (input.includes('trading') || input.includes('market') || input.includes('amba')) {
        reply = `[${time}] MAS AMBA: "Likuiditas BTC/USDT dan Gold 4H stabil. Stop-loss maksimal 1.5% modal aktif. Disiplin risk plan!"`;
      } else {
        reply = `[${time}] JARVIS // AI: "Perintah '${input}' diterima. Seluruh 4 divisi agen siap mengeksekusi!"`;
      }
      setCommandLog(prev => [...prev, reply]);
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#070a0e',
      color: '#e2e8f0',
      fontFamily: 'var(--mono, "IBM Plex Mono", monospace)',
      position: 'relative',
      overflowX: 'hidden',
      padding: '16px',
      margin: '-20px -20px 0 -20px' // counter body padding
    }}>
      {/* Subtle Scanlines & Grid Overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02))',
        backgroundSize: '100% 3px, 6px 100%',
        zIndex: 50,
        opacity: 0.8
      }} />

      {/* TOPBAR HUD */}
      <header style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        backgroundColor: 'rgba(10, 16, 26, 0.85)',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        borderRadius: '4px',
        marginBottom: '16px',
        boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#00f0ff',
            boxShadow: '0 0 12px #00f0ff',
            animation: 'pulse 2s infinite'
          }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.12em', color: '#00f0ff', textShadow: '0 0 8px rgba(0, 240, 255, 0.6)' }}>
              J.A.R.V.I.S. // SECOND BRAIN OS
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', letterSpacing: '0.08em' }}>
              AUTONOMOUS AGENT COMMAND & VIEWGRAPH SYNC
            </div>
          </div>
        </div>

        {/* Telemetry quick stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '11px' }}>
          <div>
            <span style={{ color: '#64748b' }}>WAKTU: </span>
            <span style={{ color: '#38bdf8', fontWeight: 600 }}>{currentTime}</span>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>GATEWAY: </span>
            <span style={{ color: '#00ff9d', fontWeight: 600 }}>OMNIROUTE :20128 [ON]</span>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>CLOUD: </span>
            <span style={{ color: '#00f0ff', fontWeight: 600 }}>SUPABASE REALTIME</span>
          </div>
          <Link
            href="/"
            style={{
              padding: '6px 12px',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              color: '#00f0ff',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              borderRadius: '2px',
              transition: 'all 0.2s',
              backgroundColor: 'rgba(0, 240, 255, 0.05)'
            }}
          >
            ← Kembali ke Studio
          </Link>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <button
          onClick={() => setActiveTab('graph')}
          style={{
            padding: '8px 18px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            backgroundColor: activeTab === 'graph' ? 'rgba(0, 240, 255, 0.2)' : 'rgba(15, 23, 42, 0.6)',
            color: activeTab === 'graph' ? '#00f0ff' : '#94a3b8',
            border: `1px solid ${activeTab === 'graph' ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: '2px',
            cursor: 'pointer',
            boxShadow: activeTab === 'graph' ? '0 0 12px rgba(0, 240, 255, 0.25)' : 'none'
          }}
        >
          🕸️ SECONDBRAIN VIEWGRAPH SYNC
        </button>
        <button
          onClick={() => setActiveTab('agents')}
          style={{
            padding: '8px 18px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            backgroundColor: activeTab === 'agents' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(15, 23, 42, 0.6)',
            color: activeTab === 'agents' ? '#a855f7' : '#94a3b8',
            border: `1px solid ${activeTab === 'agents' ? '#a855f7' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: '2px',
            cursor: 'pointer',
            boxShadow: activeTab === 'agents' ? '0 0 12px rgba(168, 85, 247, 0.25)' : 'none'
          }}
        >
          🏢 AGENT OFFICE LIVE PODS (4 DIVISI)
        </button>
      </div>

      {/* TAB 1: VIEWGRAPH SYNC */}
      {activeTab === 'graph' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px', marginBottom: '16px' }}>
          {/* Main Visualizer Window */}
          <div style={{
            position: 'relative',
            height: '560px',
            backgroundColor: 'rgba(10, 16, 26, 0.75)',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 30px rgba(0, 240, 255, 0.05)'
          }}>
            {/* Visualizer Header Bar */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              right: '12px',
              zIndex: 10,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              pointerEvents: 'none'
            }}>
              {/* Category Filter Pills */}
              <div style={{ display: 'flex', gap: '6px', pointerEvents: 'auto' }}>
                {[
                  { id: 'all', label: 'SEMUA', color: '#ffffff' },
                  { id: 'academic', label: 'AKADEMIK (LUNA)', color: '#00f0ff' },
                  { id: 'studio', label: 'STUDIO (MOCHI)', color: '#a855f7' },
                  { id: 'bim', label: 'BIM (KAKTUS)', color: '#f59e0b' },
                  { id: 'trading', label: 'TRADING (AMBA)', color: '#00ff9d' },
                  { id: 'core', label: 'INTI (PROFILE)', color: '#f43f5e' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    style={{
                      padding: '4px 10px',
                      fontSize: '9px',
                      letterSpacing: '0.06em',
                      backgroundColor: activeFilter === f.id ? `${f.color}25` : 'rgba(15, 23, 42, 0.7)',
                      color: activeFilter === f.id ? f.color : '#94a3b8',
                      border: `1px solid ${activeFilter === f.id ? f.color : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '2px',
                      cursor: 'pointer'
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Node Search Bar */}
              <div style={{ pointerEvents: 'auto' }}>
                <input
                  type="text"
                  placeholder="CARI NODE SECONDBRAIN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(7, 10, 15, 0.8)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    color: '#00f0ff',
                    padding: '5px 12px',
                    fontSize: '10px',
                    fontFamily: 'inherit',
                    borderRadius: '2px',
                    outline: 'none',
                    width: '190px'
                  }}
                />
              </div>
            </div>

            {/* Canvas */}
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

            {/* Bottom Watermark Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '12px',
              fontSize: '9px',
              color: 'rgba(0, 240, 255, 0.5)',
              letterSpacing: '0.08em',
              pointerEvents: 'none'
            }}>
              LIVE PHYSICS ENGINE: 60 FPS // DRAG TO MOVE // CLICK TO INSPECT
            </div>
          </div>

          {/* Node Dossier / Inspector Panel */}
          <div style={{
            backgroundColor: 'rgba(10, 16, 26, 0.85)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '4px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)'
          }}>
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#64748b',
                letterSpacing: '0.1em',
                marginBottom: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                paddingBottom: '8px'
              }}>
                DOSSIER NODE TERCATAT
              </div>

              {selectedNode ? (
                <div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: selectedNode.color || '#00f0ff',
                    marginBottom: '4px',
                    textShadow: `0 0 8px ${selectedNode.color}50`
                  }}>
                    {selectedNode.label}
                  </div>
                  <div style={{ display: 'inline-block', fontSize: '9px', padding: '2px 6px', backgroundColor: `${selectedNode.color}20`, color: selectedNode.color, border: `1px solid ${selectedNode.color}60`, borderRadius: '2px', marginBottom: '14px' }}>
                    STATUS: {selectedNode.status}
                  </div>

                  <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '16px' }}>
                    {selectedNode.desc}
                  </div>

                  <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '8px', fontWeight: 600 }}>
                    KATEGORI: <span style={{ color: '#f8fafc' }}>{selectedNode.category?.toUpperCase()}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '8px', fontWeight: 600 }}>
                    BOBOT ENTITAS: <span style={{ color: '#f8fafc' }}>{selectedNode.val} KONEKSI</span>
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic', padding: '20px 0' }}>
                  Klik salah satu node di graph untuk membedah data dan relasi naskah/arsitektur.
                </div>
              )}
            </div>

            {selectedNode && (
              <button
                onClick={() => {
                  setCommandInput(`Tolong jelaskan secara mendalam tentang ${selectedNode.label}`);
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: 'rgba(0, 240, 255, 0.15)',
                  border: '1px solid #00f0ff',
                  color: '#00f0ff',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 0 10px rgba(0, 240, 255, 0.2)'
                }}
              >
                ⚡ TANYA JARVIS TENTANG INI
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: AGENT OFFICE LIVE PODS */}
      {activeTab === 'agents' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          {(telemetry?.agents || []).map(agent => (
            <div
              key={agent.id}
              style={{
                backgroundColor: 'rgba(10, 16, 26, 0.85)',
                border: `1px solid ${agent.color}50`,
                borderRadius: '4px',
                padding: '16px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 0 20px ${agent.color}15`,
                backdropFilter: 'blur(8px)'
              }}
            >
              {/* Corner Glow Accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '60px',
                height: '60px',
                background: `radial-gradient(circle at top right, ${agent.color}30, transparent 70%)`
              }} />

              {/* Agent Division Badge */}
              <div style={{ fontSize: '9px', color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                {agent.division}
              </div>

              {/* Agent Name */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, color: agent.color, textShadow: `0 0 10px ${agent.color}60` }}>
                  {agent.name}
                </span>
                <span style={{
                  fontSize: '9px',
                  padding: '3px 8px',
                  backgroundColor: `${agent.color}20`,
                  color: agent.color,
                  border: `1px solid ${agent.color}`,
                  borderRadius: '2px',
                  fontWeight: 600
                }}>
                  {agent.status}
                </span>
              </div>

              <div style={{ fontSize: '10px', color: '#cbd5e1', marginBottom: '12px' }}>
                <span style={{ color: '#64748b' }}>Staf/Subagen: </span>
                {agent.subordinate}
              </div>

              {/* Animated Waveform Simulation */}
              <div style={{
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                marginBottom: '14px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                padding: '0 8px',
                borderRadius: '2px'
              }}>
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      backgroundColor: agent.color,
                      height: `${15 + Math.sin(i * 0.8) * 12 + Math.random() * 8}px`,
                      opacity: 0.75,
                      borderRadius: '1px'
                    }}
                  />
                ))}
              </div>

              {/* Directive */}
              <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '10px', lineHeight: 1.5 }}>
                <strong style={{ color: '#f8fafc' }}>MANDAT:</strong> {agent.directive}
              </div>

              {/* Active Task */}
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '8px',
                borderRadius: '2px',
                fontSize: '10px',
                color: '#e2e8f0',
                lineHeight: 1.4,
                marginBottom: '10px'
              }}>
                <span style={{ color: agent.color, fontWeight: 700 }}>TUGAS AKTIF: </span>
                {agent.current_task}
              </div>

              <div style={{ fontSize: '9px', color: '#64748b' }}>
                Terakhir: {agent.last_action}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BOTTOM TACTICAL CONSOLE & COMMAND TICKER */}
      <div style={{
        backgroundColor: 'rgba(10, 16, 26, 0.9)',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        borderRadius: '4px',
        padding: '14px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)'
      }}>
        {/* Terminal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '6px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#00f0ff', letterSpacing: '0.1em' }}>
            TERMINAL TELEMETRI & LOG OTOMATIS
          </span>
          <span style={{ fontSize: '9px', color: '#64748b' }}>
            STATUS BUFFER: REALTIME
          </span>
        </div>

        {/* Log Ticker Feed */}
        <div style={{
          height: '110px',
          overflowY: 'auto',
          backgroundColor: 'rgba(5, 8, 12, 0.7)',
          padding: '8px 12px',
          borderRadius: '2px',
          fontSize: '10px',
          lineHeight: 1.6,
          marginBottom: '10px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          {commandLog.map((log, index) => (
            <div key={index} style={{
              color: log.includes('HERU') ? '#38bdf8' : log.includes('LUNA') ? '#00f0ff' : log.includes('MOCHI') ? '#a855f7' : log.includes('KAKTUS') ? '#f59e0b' : log.includes('AMBA') ? '#00ff9d' : '#94a3b8'
            }}>
              {log}
            </div>
          ))}
        </div>

        {/* Command Input Bar */}
        <form onSubmit={handleCommandSubmit} style={{ display: 'flex', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', color: '#00f0ff', fontSize: '12px', fontWeight: 700 }}>
            &gt;
          </div>
          <input
            type="text"
            placeholder="Ketik instruksi ke JARVIS (misal: 'Tanya Luna soal Solar Tube' / 'Mochi render 3D')..."
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: 'rgba(5, 8, 12, 0.8)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              color: '#00f0ff',
              padding: '8px 12px',
              fontSize: '11px',
              fontFamily: 'inherit',
              borderRadius: '2px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '8px 20px',
              backgroundColor: 'rgba(0, 240, 255, 0.2)',
              border: '1px solid #00f0ff',
              color: '#00f0ff',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '2px',
              cursor: 'pointer'
            }}
          >
            KIRIM
          </button>
        </form>
      </div>
    </div>
  );
}
