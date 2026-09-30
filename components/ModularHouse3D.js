'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ModularHouse3D() {
  const containerRef = useRef(null);
  const [currentView, setCurrentView] = useState('dusk'); // 'dusk', 'iso', 'interior', 'wireframe'
  const [lightingMode, setLightingMode] = useState('dusk'); // 'dusk', 'day', 'night'
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // References for camera tweening & animation
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const houseGroupRef = useRef(null);
  const targetCamPos = useRef(new THREE.Vector3(0, 1.2, 7.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.4, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.4, 0));
  const interiorLightRef = useRef(null);
  const sunLightRef = useRef(null);
  const ambientLightRef = useRef(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0.0015 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene, Camera, Renderer Setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0e1115);
    scene.fog = new THREE.FogExp2(0x0e1115, 0.045);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 7.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- 2. Lighting System (Dusk Atmosphere) ---
    const ambientLight = new THREE.HemisphereLight(0x4a6572, 0x1a2128, 0.85);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    // Sunset / Dusk directional key light
    const sunLight = new THREE.DirectionalLight(0xe89758, 1.8);
    sunLight.position.set(-6, 4, 6);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Soft cool blue rim light from opposite side
    const rimLight = new THREE.DirectionalLight(0x5c82a6, 0.9);
    rimLight.position.set(7, 5, -5);
    scene.add(rimLight);

    // Warm Interior Point Light (Tungsten Glow through windows)
    const interiorLight = new THREE.PointLight(0xff9d42, 4.2, 14, 1.2);
    interiorLight.position.set(0.2, 0.6, 0);
    interiorLight.castShadow = true;
    scene.add(interiorLight);
    interiorLightRef.current = interiorLight;

    // Exterior facade downlights (sconces)
    const facadeSpot1 = new THREE.SpotLight(0xffb366, 2.5, 4.5, Math.PI / 4, 0.4, 1.5);
    facadeSpot1.position.set(-1.1, 1.1, 1.4);
    facadeSpot1.target.position.set(-1.1, -0.4, 1.4);
    scene.add(facadeSpot1);
    scene.add(facadeSpot1.target);

    const facadeSpot2 = new THREE.SpotLight(0xffb366, 2.5, 4.5, Math.PI / 4, 0.4, 1.5);
    facadeSpot2.position.set(1.4, 1.1, 1.4);
    facadeSpot2.target.position.set(1.4, -0.4, 1.4);
    scene.add(facadeSpot2);
    scene.add(facadeSpot2.target);

    // --- 3. Procedural Architectural Modular Model ---
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);
    houseGroupRef.current = houseGroup;

    // Helper: Procedural Slat Canvas Texture
    function createWoodTexture() {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#221b16';
      ctx.fillRect(0, 0, 512, 512);

      // Slats lines
      ctx.fillStyle = '#342921';
      for (let i = 0; i < 512; i += 16) {
        ctx.fillRect(i, 0, 12, 512);
        ctx.fillStyle = '#18120d';
        ctx.fillRect(i + 12, 0, 4, 512);
        ctx.fillStyle = '#342921';
      }
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 1);
      return tex;
    }

    const woodTex = createWoodTexture();

    // Materials
    const timberMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d3027,
      map: woodTex,
      roughness: 0.65,
      metalness: 0.05
    });

    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x1b1f24,
      roughness: 0.35,
      metalness: 0.8
    });

    const solarPanelMaterial = new THREE.MeshStandardMaterial({
      color: 0x121b29,
      roughness: 0.15,
      metalness: 0.85
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe6f4f8,
      transparent: true,
      opacity: 0.42,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.5,
      reflectivity: 0.9
    });

    const warmInteriorMaterial = new THREE.MeshStandardMaterial({
      color: 0xdeb887,
      roughness: 0.8
    });

    const concretePlinthMaterial = new THREE.MeshStandardMaterial({
      color: 0x22262a,
      roughness: 0.9
    });

    // A. Concrete Base & Deck
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.22, 3.2), concretePlinthMaterial);
    plinth.position.y = -0.55;
    plinth.receiveShadow = true;
    houseGroup.add(plinth);

    // Front Timber Terrace Deck
    const deck = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.12, 1.2), timberMaterial);
    deck.position.set(0, -0.42, 1.8);
    deck.receiveShadow = true;
    houseGroup.add(deck);

    // Minimal Deck Steps
    const step = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 0.45), timberMaterial);
    step.position.set(0, -0.52, 2.5);
    houseGroup.add(step);

    // B. Main Modular Cabin Structure (Walls)
    // Left Box (Private / Bedroom Module)
    const leftCabin = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 2.6), timberMaterial);
    leftCabin.position.set(-1.25, 0.45, 0);
    leftCabin.castShadow = true;
    leftCabin.receiveShadow = true;
    houseGroup.add(leftCabin);

    // Right Box (Living / Kitchen Module with large glass)
    // Back wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 0.15), timberMaterial);
    backWall.position.set(1.0, 0.45, -1.2);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    houseGroup.add(backWall);

    // Right side wall
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.8, 2.6), timberMaterial);
    rightWall.position.set(2.2, 0.45, 0);
    rightWall.castShadow = true;
    houseGroup.add(rightWall);

    // Interior Warm Floor
    const interiorFloor = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.05, 2.4), warmInteriorMaterial);
    interiorFloor.position.set(1.0, -0.42, 0);
    interiorFloor.receiveShadow = true;
    houseGroup.add(interiorFloor);

    // Minimal Interior Furniture (Modern Sofa Silhouette)
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.25, 0.65), new THREE.MeshStandardMaterial({ color: 0xd6c6b2 }));
    sofaBase.position.set(1.0, -0.28, -0.5);
    sofaBase.receiveShadow = true;
    houseGroup.add(sofaBase);

    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.35, 0.18), new THREE.MeshStandardMaterial({ color: 0xc4b29c }));
    sofaBack.position.set(1.0, -0.1, -0.75);
    houseGroup.add(sofaBack);

    // Interior Modern Pendant Light Silhouette
    const pendantCord = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.6), darkMetalMaterial);
    pendantCord.position.set(0.2, 1.05, 0);
    houseGroup.add(pendantCord);

    const pendantShade = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.15, 16), new THREE.MeshStandardMaterial({ color: 0x1f2428 }));
    pendantShade.position.set(0.2, 0.75, 0);
    houseGroup.add(pendantShade);

    // C. Large Front Glass Facade
    const glassPanel = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.7, 0.04), glassMaterial);
    glassPanel.position.set(1.05, 0.45, 1.25);
    houseGroup.add(glassPanel);

    // Slim Aluminum Mullions
    const mullionCenter = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.75, 0.08), darkMetalMaterial);
    mullionCenter.position.set(1.05, 0.45, 1.26);
    houseGroup.add(mullionCenter);

    const frameBottom = new THREE.Mesh(new THREE.BoxGeometry(2.26, 0.08, 0.08), darkMetalMaterial);
    frameBottom.position.set(1.05, -0.4, 1.26);
    houseGroup.add(frameBottom);

    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(2.26, 0.08, 0.08), darkMetalMaterial);
    frameTop.position.set(1.05, 1.3, 1.26);
    houseGroup.add(frameTop);

    // Narrow Bedroom Window on Left Cabin
    const bedWindow = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.3, 0.04), glassMaterial);
    bedWindow.position.set(-1.1, 0.45, 1.31);
    houseGroup.add(bedWindow);

    const bedWindowFrame = new THREE.Mesh(new THREE.BoxGeometry(0.52, 1.36, 0.06), darkMetalMaterial);
    bedWindowFrame.position.set(-1.1, 0.45, 1.3);
    houseGroup.add(bedWindowFrame);

    // D. Cantilevered Standing-Seam Metal Roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(4.7, 0.14, 3.2), darkMetalMaterial);
    roof.position.set(0, 1.42, 0.3);
    roof.castShadow = true;
    houseGroup.add(roof);

    // Roof Eaves Siding
    const roofFascia = new THREE.Mesh(new THREE.BoxGeometry(4.74, 0.06, 3.24), darkMetalMaterial);
    roofFascia.position.set(0, 1.48, 0.3);
    houseGroup.add(roofFascia);

    // Rooftop Solar PV Modules (4 Panels)
    for (let i = 0; i < 4; i++) {
      const solar = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.04, 1.2), solarPanelMaterial);
      solar.position.set(-1.5 + i * 1.0, 1.52, 0.2);
      houseGroup.add(solar);
    }

    // E. Grassy Ground Plane with Fog Blend
    const groundGeo = new THREE.PlaneGeometry(35, 35);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x11161a,
      roughness: 0.95,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.66;
    ground.receiveShadow = true;
    scene.add(ground);

    // Subtle Architectural Grid lines on ground
    const grid = new THREE.GridHelper(24, 24, 0x2b3842, 0x182026);
    grid.position.y = -0.65;
    scene.add(grid);

    setIsLoading(false);

    // --- 4. Interactive Drag / Mouse Controls ---
    const onMouseDown = (e) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging.current || !houseGroupRef.current) {
        // Subtle parallax camera tilt on hover
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetLookAt.current.x = nx * 0.4;
        targetLookAt.current.y = 0.4 + ny * 0.2;
        return;
      }

      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      houseGroupRef.current.rotation.y += deltaX * 0.008;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      rotationVelocity.current.y = deltaX * 0.001;
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    // Touch Support for Mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging.current || e.touches.length !== 1 || !houseGroupRef.current) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      houseGroupRef.current.rotation.y += deltaX * 0.008;
      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging.current = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- 5. Render Loop with Smooth Camera Lerping ---
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Inertia rotation when not dragging
      if (!isDragging.current && houseGroupRef.current) {
        houseGroupRef.current.rotation.y += rotationVelocity.current.y;
        rotationVelocity.current.y *= 0.96; // damping
      }

      // Smooth camera position lerp
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCamPos.current, 0.045);
        currentLookAt.current.lerp(targetLookAt.current, 0.05);
        cameraRef.current.lookAt(currentLookAt.current);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // --- Camera View Mode Switcher ---
  const setCameraPreset = (mode) => {
    setCurrentView(mode);
    if (!targetCamPos.current || !targetLookAt.current) return;

    if (mode === 'dusk') {
      // Front Dusk Hero View
      targetCamPos.current.set(0, 1.2, 7.5);
      targetLookAt.current.set(0, 0.4, 0);
    } else if (mode === 'iso') {
      // GradiEnt Signature 45-degree Isometric View
      targetCamPos.current.set(5.5, 4.5, 6.0);
      targetLookAt.current.set(0, 0.2, 0);
    } else if (mode === 'interior') {
      // Zoom into panoramic glass & interior light
      targetCamPos.current.set(1.2, 0.6, 3.2);
      targetLookAt.current.set(1.0, 0.4, 0);
    } else if (mode === 'terrace') {
      // Low angle timber deck view
      targetCamPos.current.set(-2.8, 0.2, 4.6);
      targetLookAt.current.set(0, 0.5, 0.5);
    }
  };

  // --- Lighting Atmosphere Switcher ---
  const toggleLighting = (mode) => {
    setLightingMode(mode);
    if (!interiorLightRef.current || !sunLightRef.current || !ambientLightRef.current || !sceneRef.current) return;

    if (mode === 'dusk') {
      sceneRef.current.background.set(0x0e1115);
      sceneRef.current.fog.color.set(0x0e1115);
      sunLightRef.current.color.set(0xe89758);
      sunLightRef.current.intensity = 1.8;
      ambientLightRef.current.color.set(0x4a6572);
      ambientLightRef.current.intensity = 0.85;
      interiorLightRef.current.intensity = 4.2;
    } else if (mode === 'day') {
      sceneRef.current.background.set(0x8faec2);
      sceneRef.current.fog.color.set(0x8faec2);
      sunLightRef.current.color.set(0xfffaed);
      sunLightRef.current.intensity = 2.6;
      ambientLightRef.current.color.set(0xc2daf0);
      ambientLightRef.current.intensity = 1.4;
      interiorLightRef.current.intensity = 1.2;
    } else if (mode === 'night') {
      sceneRef.current.background.set(0x050709);
      sceneRef.current.fog.color.set(0x050709);
      sunLightRef.current.intensity = 0.2;
      ambientLightRef.current.intensity = 0.25;
      interiorLightRef.current.intensity = 6.0;
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '560px',
      background: '#0d1014',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 24px 60px rgba(0,0,0,0.45)'
    }}>
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '560px',
          cursor: 'grab',
          position: 'relative',
          zIndex: 1
        }}
      />

      {/* Top Left: Architectural HUD Header */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--mono)',
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#e89758'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }}></span>
          <span>GradiEnt 3D WebGL / Engine</span>
        </div>
        <div style={{
          fontFamily: 'var(--display)',
          fontSize: '22px',
          fontWeight: 500,
          color: '#ffffff',
          marginTop: '4px'
        }}>
          Tropical Modular Pavilion 01
        </div>
        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: '9px',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginTop: '2px'
        }}>
          Dimension: 4.8m x 9.6m • Solar-Ready • Low-Carbon Timber
        </div>
      </div>

      {/* Top Right: Lighting Atmosphere Switcher */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 10,
        display: 'flex',
        gap: '6px',
        background: 'rgba(10,13,16,0.75)',
        padding: '4px',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)'
      }}>
        {[
          { id: 'dusk', label: '🌅 Senja (Dusk)' },
          { id: 'day', label: '☀️ Siang' },
          { id: 'night', label: '🌙 Malam' }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => toggleLighting(btn.id)}
            style={{
              background: lightingMode === btn.id ? '#e89758' : 'transparent',
              color: lightingMode === btn.id ? '#0d1014' : 'rgba(255,255,255,0.7)',
              border: 'none',
              padding: '5px 9px',
              fontFamily: 'var(--mono)',
              fontSize: '9px',
              letterSpacing: '0.06em',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Bottom Left: Camera Angle Presets (Awwwards Style) */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        zIndex: 10,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {[
          { id: 'dusk', label: '01 / Cinematic Front' },
          { id: 'iso', label: '02 / Isometric Axon' },
          { id: 'interior', label: '03 / Glass Interior' },
          { id: 'terrace', label: '04 / Timber Deck' }
        ].map((v) => (
          <button
            key={v.id}
            onClick={() => setCameraPreset(v.id)}
            style={{
              background: currentView === v.id ? 'rgba(232, 151, 88, 0.2)' : 'rgba(10,13,16,0.8)',
              color: currentView === v.id ? '#e89758' : 'rgba(255,255,255,0.75)',
              border: currentView === v.id ? '1px solid #e89758' : '1px solid rgba(255,255,255,0.12)',
              padding: '6px 12px',
              fontFamily: 'var(--mono)',
              fontSize: '9px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s'
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Bottom Right: Floating Spec Card */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 10,
        background: 'rgba(13,16,20,0.85)',
        border: '1px solid rgba(255,255,255,0.12)',
        padding: '10px 14px',
        backdropFilter: 'blur(10px)',
        textAlign: 'right',
        pointerEvents: 'none'
      }}>
        <div style={{ font: '9px var(--mono)', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
          Interactivity
        </div>
        <div style={{ font: '10px var(--mono)', color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>
          Drag to Orbit 360° • Scroll Zoom
        </div>
      </div>
    </div>
  );
}
