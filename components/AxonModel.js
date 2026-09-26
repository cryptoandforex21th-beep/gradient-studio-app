'use client';

import { useEffect, useRef } from 'react';

export default function AxonModel() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const wrap = canvas.parentElement;

    let w = 0, h = 0, rx = -0.22, ry = 0.52, targetX = 0.52, targetY = -0.22, raf;
    const points = [
      [-1, -0.75, -0.8], [1, -0.75, -0.8], [1, -0.75, 0.8], [-1, -0.75, 0.8],
      [-1, 0.85, -0.8], [1, 0.85, -0.8], [1, 0.85, 0.8], [-1, 0.85, 0.8],
      [-0.45, 0.85, -0.38], [0.45, 0.85, -0.38], [0.45, 0.85, 0.38], [-0.45, 0.85, 0.38],
      [-0.45, -0.75, -0.38], [0.45, -0.75, -0.38], [0.45, -0.75, 0.38], [-0.45, -0.75, 0.38]
    ];
    const edges = [
      [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7],
      [8,9],[9,10],[10,11],[11,8],[12,13],[13,14],[14,15],[15,12],
      [8,12],[9,13],[10,14],[11,15],[4,8],[5,9],[6,10],[7,11]
    ];

    function resize() {
      const d = window.devicePixelRatio || 1;
      w = wrap.clientWidth;
      h = canvas.clientHeight || 520;
      canvas.width = w * d;
      canvas.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    }

    function project(p) {
      let [x, y, z] = p;
      let cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
      let x1 = x * cy - z * sy, z1 = x * sy + z * cy;
      let y1 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
      let scale = 220 / (z2 + 4.7);
      return [w / 2 + x1 * scale, h / 2 + y1 * scale];
    }

    function draw() {
      rx += (targetX - rx) * 0.035;
      ry += (targetY - ry) * 0.035;
      ctx.clearRect(0, 0, w, h);
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue('--accent').trim() || '#cf6b42';
      const blue = style.getPropertyValue('--blueprint').trim() || '#a6c3c3';

      ctx.lineWidth = 1;
      edges.forEach((e, i) => {
        const a = project(points[e[0]]);
        const b = project(points[e[1]]);
        ctx.beginPath();
        ctx.moveTo(...a);
        ctx.lineTo(...b);
        ctx.strokeStyle = i > 11 ? accent : blue;
        ctx.globalAlpha = i > 11 ? 0.9 : 0.7;
        ctx.stroke();
      });

      points.forEach((p, i) => {
        const q = project(p);
        ctx.beginPath();
        ctx.arc(q[0], q[1], i > 7 ? 2 : 2.7, 0, Math.PI * 2);
        ctx.fillStyle = i > 7 ? accent : blue;
        ctx.globalAlpha = 0.95;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    const onPointerMove = (e) => {
      const r = canvas.getBoundingClientRect();
      targetY = (e.clientX - r.left) / r.width * 1.5 - 0.75;
      targetX = (e.clientY - r.top) / r.height * 0.8 - 0.4;
    };

    const onPointerLeave = () => {
      targetX = -0.22;
      targetY = 0.52;
    };

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', resize);

    resize();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={{
      position: 'relative',
      minHeight: '520px',
      background: 'var(--canvas)',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(166,195,195,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(166,195,195,.08) 1px,transparent 1px)',
        backgroundSize: '34px 34px',
        transform: 'perspective(580px) rotateX(57deg) scale(1.5)',
        transformOrigin: 'center 85%',
        opacity: 0.65
      }}></div>
      <div style={{
        position: 'absolute',
        top: '18px',
        left: '18px',
        color: 'var(--blueprint)',
        opacity: 0.8,
        font: '10px var(--mono)',
        letterSpacing: '.1em',
        zIndex: 1
      }}>LIVE STUDY / 03</div>
      <div style={{
        position: 'absolute',
        bottom: '18px',
        right: '18px',
        color: 'var(--blueprint)',
        opacity: 0.8,
        font: '10px var(--mono)',
        letterSpacing: '.1em',
        zIndex: 1
      }}>GRADI-ENT / 3D AXON</div>
      <canvas ref={canvasRef} style={{
        position: 'relative',
        width: '100%',
        height: '520px',
        display: 'block',
        zIndex: 2,
        cursor: 'grab'
      }}></canvas>
      <span style={{
        position: 'absolute',
        left: '20px',
        bottom: '18px',
        color: 'var(--blueprint)',
        font: '10px var(--mono)',
        letterSpacing: '.1em',
        zIndex: 3
      }}>COURTYARD HOUSE / AXONOMETRIC STUDY</span>
    </div>
  );
}
