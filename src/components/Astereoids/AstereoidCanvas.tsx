import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { createAsteroidGeometry } from "./utils/asteroidGenerator";

interface AsteroidInstance {
  mesh: THREE.Mesh;
  rotX: number;
  rotY: number;
  rotZ: number;
  speedX: number;
  speedY: number;
}

export const AstereoidCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ─────────────────────────────────────────────────────────────
    // 1. SETUP: Full-screen camera, scene & Atmospheric Fog
    // ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // Fog: Blends distant rocks into the cosmic void
    scene.fog = new THREE.FogExp2(0x06080d, 0.028);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ─────────────────────────────────────────────────────────────
    // 2. LIGHTING: Grounded & Cinematic
    // ─────────────────────────────────────────────────────────────
    const sunLight = new THREE.DirectionalLight(0xfff5ea, 2.0);
    sunLight.position.set(12, 8, 8);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 0.9);
    rimLight.position.set(-10, -6, -4);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x111827, 0.6);
    scene.add(ambientLight);

    // ─────────────────────────────────────────────────────────────
    // 3. MATERIAL & 6 PROTOTYPE GEOMETRIES
    // ─────────────────────────────────────────────────────────────
    const material = new THREE.MeshStandardMaterial({
      color: 0x334155, // Deep basalt charcoal
      roughness: 0.92,
      metalness: 0.05,
      flatShading: true,
    });

    const prototypeGeometries = [
      createAsteroidGeometry(0.8, 2),
      createAsteroidGeometry(1.0, 2),
      createAsteroidGeometry(1.2, 2),
      createAsteroidGeometry(0.7, 2),
      createAsteroidGeometry(1.4, 2),
      createAsteroidGeometry(0.9, 2),
    ];

    // ─────────────────────────────────────────────────────────────
    // 4. SPAWN 100 ASTEROIDS
    // ─────────────────────────────────────────────────────────────
    const asteroidCount = 100;
    const asteroids: AsteroidInstance[] = [];
    const spawnWidth = 46;

    for (let i = 0; i < asteroidCount; i++) {
      const geom = prototypeGeometries[i % prototypeGeometries.length];
      const mesh = new THREE.Mesh(geom, material);

      const z = -22 + Math.random() * 28;
      const x = (Math.random() - 0.5) * spawnWidth;
      const beltCenterY = -3.5 + x * 0.16;

      const tubeRadius = 2.4;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * tubeRadius;

      const y = beltCenterY + Math.sin(angle) * distance;
      const finalZ = z + Math.cos(angle) * (distance * 1.5);

      mesh.position.set(x, y, finalZ);

      const isForegroundBoulder = Math.random() < 0.07 && finalZ > 0;
      let scale: number;
      if (isForegroundBoulder) {
        scale = 0.8 + Math.random() * 0.45;
      } else {
        const depthRatio = (finalZ + 22) / 28;
        scale = 0.1 + depthRatio * 0.32 + Math.random() * 0.15;
      }
      mesh.scale.set(scale, scale, scale);

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      );

      scene.add(mesh);

      const parallaxSpeed = 0.005 + ((finalZ + 22) / 28) * 0.007;

      asteroids.push({
        mesh,
        rotX: (Math.random() - 0.5) * 0.012,
        rotY: (Math.random() - 0.5) * 0.012,
        rotZ: (Math.random() - 0.5) * 0.008,
        speedX: -parallaxSpeed,
        speedY: -parallaxSpeed * 0.16,
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 5. COSMIC SPACE DUST PARTICLES (THREE.Points)
    // ─────────────────────────────────────────────────────────────
    const dustCount = 160;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustVelocities: { x: number; y: number }[] = [];

    for (let i = 0; i < dustCount; i++) {
      const x = (Math.random() - 0.5) * spawnWidth;
      const y = -3.5 + x * 0.16 + (Math.random() - 0.5) * 4.0;
      const z = -18 + Math.random() * 24;

      dustPositions[i * 3] = x;
      dustPositions[i * 3 + 1] = y;
      dustPositions[i * 3 + 2] = z;

      const speed = 0.006 + Math.random() * 0.008;
      dustVelocities.push({ x: -speed, y: -speed * 0.16 });
    }

    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3),
    );

    const dustMaterial = new THREE.PointsMaterial({
      color: 0x93c5fd, // Glowing soft blue cosmic dust
      size: 0.14,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const dustParticles = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustParticles);

    // ─────────────────────────────────────────────────────────────
    // 6. MOUSE PARALLAX TRACKER
    // ─────────────────────────────────────────────────────────────
    let targetCamX = 0;
    let targetCamY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -1 .. 1
      targetCamX = (e.clientX / window.innerWidth - 0.5) * 1.6;
      targetCamY = -(e.clientY / window.innerHeight - 0.5) * 0.9;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // ─────────────────────────────────────────────────────────────
    // 7. ANIMATION LOOP
    // ─────────────────────────────────────────────────────────────
    let animationFrameId: number;

    const animate = () => {
      // 1. Mouse Camera Parallax (smooth interpolation)
      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;

      // 2. Animate Asteroids
      for (let i = 0; i < asteroids.length; i++) {
        const item = asteroids[i];
        item.mesh.rotation.x += item.rotX;
        item.mesh.rotation.y += item.rotY;
        item.mesh.rotation.z += item.rotZ;

        item.mesh.position.x += item.speedX;
        item.mesh.position.y += item.speedY;

        if (item.mesh.position.x < -spawnWidth / 2) {
          item.mesh.position.x = spawnWidth / 2;
          const newCenterY = -3.5 + item.mesh.position.x * 0.16;
          item.mesh.position.y = newCenterY + (Math.random() - 0.5) * 3.5;
        }
      }

      // 3. Animate Space Dust
      const posAttr = dustGeometry.attributes.position;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < dustCount; i++) {
        posArray[i * 3] += dustVelocities[i].x;
        posArray[i * 3 + 1] += dustVelocities[i].y;

        if (posArray[i * 3] < -spawnWidth / 2) {
          posArray[i * 3] = spawnWidth / 2;
          posArray[i * 3 + 1] =
            -3.5 + posArray[i * 3] * 0.16 + (Math.random() - 0.5) * 4.0;
        }
      }
      posAttr.needsUpdate = true; // Tell GPU buffer to refresh positions

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // ─────────────────────────────────────────────────────────────
    // 8. RESIZE & CLEANUP
    // ─────────────────────────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      prototypeGeometries.forEach((g) => g.dispose());
      material.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}
    />
  );
};
