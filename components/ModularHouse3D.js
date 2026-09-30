'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ModularHouse3D() {
  const containerRef = useRef(null);
  const houseGroupRef = useRef(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0.0012 });
  const targetLookAt = useRef(new THREE.Vector3(0, 0.35, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.35, 0));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene & Atmosphere Setup ---
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background to blend seamlessly with website theme
    scene.fog = new THREE.FogExp2(0x0e1115, 0.04);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.3, 7.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- 2. Lighting System (Dusk Architectural Atmosphere) ---
    // Soft twilight hemisphere sky fill
    const ambientLight = new THREE.HemisphereLight(0x4a6572, 0x14181c, 0.95);
    scene.add(ambientLight);

    // Warm setting sun key light
    const sunLight = new THREE.DirectionalLight(0xe89758, 2.0);
    sunLight.position.set(-6, 4.5, 6);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Cool blue-grey twilight rim light
    const rimLight = new THREE.DirectionalLight(0x6088a8, 1.1);
    rimLight.position.set(7, 5, -5);
    scene.add(rimLight);

    // Warm Interior Point Light (Tungsten Glow escaping from windows)
    const interiorLight = new THREE.PointLight(0xffa245, 4.8, 15, 1.2);
    interiorLight.position.set(0.3, 0.6, 0);
    interiorLight.castShadow = true;
    scene.add(interiorLight);

    // Exterior facade sconce downlights
    const facadeSpot1 = new THREE.SpotLight(0xffb366, 2.8, 4.5, Math.PI / 4, 0.4, 1.5);
    facadeSpot1.position.set(-1.1, 1.1, 1.4);
    facadeSpot1.target.position.set(-1.1, -0.4, 1.4);
    scene.add(facadeSpot1);
    scene.add(facadeSpot1.target);

    const facadeSpot2 = new THREE.SpotLight(0xffb366, 2.8, 4.5, Math.PI / 4, 0.4, 1.5);
    facadeSpot2.position.set(1.4, 1.1, 1.4);
    facadeSpot2.target.position.set(1.4, -0.4, 1.4);
    scene.add(facadeSpot2);
    scene.add(facadeSpot2.target);

    // --- 3. Procedural Architectural Model ---
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);
    houseGroupRef.current = houseGroup;

    // Procedural timber slat texture
    function createWoodTexture() {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#221b16';
      ctx.fillRect(0, 0, 512, 512);

      ctx.fillStyle = '#362a22';
      for (let i = 0; i < 512; i += 16) {
        ctx.fillRect(i, 0, 12, 512);
        ctx.fillStyle = '#18120d';
        ctx.fillRect(i + 12, 0, 4, 512);
        ctx.fillStyle = '#362a22';
      }
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 1);
      return tex;
    }

    const woodTex = createWoodTexture();

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

    // Concrete Plinth Base
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.22, 3.2), concretePlinthMaterial);
    plinth.position.y = -0.55;
    plinth.receiveShadow = true;
    houseGroup.add(plinth);

    // Front Timber Terrace Deck
    const deck = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.12, 1.2), timberMaterial);
    deck.position.set(0, -0.42, 1.8);
    deck.receiveShadow = true;
    houseGroup.add(deck);

    // Entrance step
    const step = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 0.45), timberMaterial);
    step.position.set(0, -0.52, 2.5);
    houseGroup.add(step);

    // Private / Bedroom Module (Left)
    const leftCabin = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 2.6), timberMaterial);
    leftCabin.position.set(-1.25, 0.45, 0);
    leftCabin.castShadow = true;
    leftCabin.receiveShadow = true;
    houseGroup.add(leftCabin);

    // Bedroom Vertical Window
    const bedWindow = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.3, 0.04), glassMaterial);
    bedWindow.position.set(-1.1, 0.45, 1.31);
    houseGroup.add(bedWindow);

    const bedWindowFrame = new THREE.Mesh(new THREE.BoxGeometry(0.52, 1.36, 0.06), darkMetalMaterial);
    bedWindowFrame.position.set(-1.1, 0.45, 1.3);
    houseGroup.add(bedWindowFrame);

    // Living / Open Module (Right)
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 0.15), timberMaterial);
    backWall.position.set(1.0, 0.45, -1.2);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    houseGroup.add(backWall);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.8, 2.6), timberMaterial);
    rightWall.position.set(2.2, 0.45, 0);
    rightWall.castShadow = true;
    houseGroup.add(rightWall);

    // Warm Interior Flooring
    const interiorFloor = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.05, 2.4), warmInteriorMaterial);
    interiorFloor.position.set(1.0, -0.42, 0);
    interiorFloor.receiveShadow = true;
    houseGroup.add(interiorFloor);

    // Interior Lounge Silhouette
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.25, 0.65), new THREE.MeshStandardMaterial({ color: 0xd6c6b2 }));
    sofaBase.position.set(1.0, -0.28, -0.5);
    sofaBase.receiveShadow = true;
    houseGroup.add(sofaBase);

    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.35, 0.18), new THREE.MeshStandardMaterial({ color: 0xc4b29c }));
    sofaBack.position.set(1.0, -0.1, -0.75);
    houseGroup.add(sofaBack);

    // Pendant Light
    const pendantCord = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.6), darkMetalMaterial);
    pendantCord.position.set(0.2, 1.05, 0);
    houseGroup.add(pendantCord);

    const pendantShade = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.15, 16), new THREE.MeshStandardMaterial({ color: 0x1f2428 }));
    pendantShade.position.set(0.2, 0.75, 0);
    houseGroup.add(pendantShade);

    // Large Panoramic Front Glass Facade
    const glassPanel = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.7, 0.04), glassMaterial);
    glassPanel.position.set(1.05, 0.45, 1.25);
    houseGroup.add(glassPanel);

    // Aluminum Mullions
    const mullionCenter = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.75, 0.08), darkMetalMaterial);
    mullionCenter.position.set(1.05, 0.45, 1.26);
    houseGroup.add(mullionCenter);

    const frameBottom = new THREE.Mesh(new THREE.BoxGeometry(2.26, 0.08, 0.08), darkMetalMaterial);
    frameBottom.position.set(1.05, -0.4, 1.26);
    houseGroup.add(frameBottom);

    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(2.26, 0.08, 0.08), darkMetalMaterial);
    frameTop.position.set(1.05, 1.3, 1.26);
    houseGroup.add(frameTop);

    // Cantilevered Standing-Seam Roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(4.7, 0.14, 3.2), darkMetalMaterial);
    roof.position.set(0, 1.42, 0.3);
    roof.castShadow = true;
    houseGroup.add(roof);

    const roofFascia = new THREE.Mesh(new THREE.BoxGeometry(4.74, 0.06, 3.24), darkMetalMaterial);
    roofFascia.position.set(0, 1.48, 0.3);
    houseGroup.add(roofFascia);

    // 4 Rooftop Solar PV Modules
    for (let i = 0; i < 4; i++) {
      const solar = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.04, 1.2), solarPanelMaterial);
      solar.position.set(-1.5 + i * 1.0, 1.52, 0.2);
      houseGroup.add(solar);
    }

    // Ground Plane with Architectural Grid
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

    const grid = new THREE.GridHelper(24, 24, 0x2b3842, 0x182026);
    grid.position.y = -0.65;
    scene.add(grid);

    // --- 4. Smooth Mouse Interaction & Parallax ---
    const onMouseDown = (e) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) {
        // Subtle ambient parallax tilt
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetLookAt.current.x = nx * 0.35;
        targetLookAt.current.y = 0.35 + ny * 0.2;
        return;
      }

      const deltaX = e.clientX - previousMousePosition.current.x;
      if (houseGroupRef.current) {
        houseGroupRef.current.rotation.y += deltaX * 0.007;
      }
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      rotationVelocity.current.y = deltaX * 0.0008;
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    // Mobile touch
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging.current || e.touches.length !== 1 || !houseGroupRef.current) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      houseGroupRef.current.rotation.y += deltaX * 0.007;
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

    // Responsive resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- 5. Render Loop with Inertia & LookAt Lerping ---
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging.current && houseGroupRef.current) {
        houseGroupRef.current.rotation.y += rotationVelocity.current.y;
        rotationVelocity.current.y *= 0.96;
      }

      currentLookAt.current.lerp(targetLookAt.current, 0.05);
      camera.lookAt(currentLookAt.current);

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

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '560px',
        position: 'relative',
        cursor: 'grab',
        touchAction: 'none'
      }}
    />
  );
}
