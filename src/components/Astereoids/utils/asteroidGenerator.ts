import * as THREE from "three";

export const createAsteroidGeometry = (radius = 1.5, detail = 1) => {
  // detail = 1 or 2 gives bold, chiseled rock planes instead of micro-shards
  const geom = new THREE.IcosahedronGeometry(radius, detail);
  const pos = geom.attributes.position;
  const v = new THREE.Vector3();

  // Random phase offsets so every asteroid has craters in different spots
  const phaseX = Math.random() * 10;
  const phaseY = Math.random() * 10;
  const phaseZ = Math.random() * 10;

  // Potato asymmetry
  const stretchX = 0.85 + Math.random() * 0.3;
  const stretchY = 0.85 + Math.random() * 0.3;
  const stretchZ = 0.85 + Math.random() * 0.3;

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);

    // 1. Oblong shape
    v.x *= stretchX;
    v.y *= stretchY;
    v.z *= stretchZ;

    // 2. Coherent harmonic noise:
    // Low-frequency wave = broad boulders and craters (big lumps)
    const bigLumps =
      Math.sin(v.x * 1.5 + phaseX) *
      Math.cos(v.y * 1.5 + phaseY) *
      Math.sin(v.z * 1.5 + phaseZ) *
      0.35;

    // High-frequency wave = subtle rocky surface texture (small chips)
    const smallChippings = Math.sin(v.x * 4.0) * Math.cos(v.z * 4.0) * 0.08;

    const totalDisplacement = bigLumps + smallChippings;

    // Displace outward/inward along its radius
    v.addScaledVector(v.clone().normalize(), totalDisplacement);

    pos.setXYZ(i, v.x, v.y, v.z);
  }

  // Recalculate normals for proper lighting reflections
  geom.computeVertexNormals();

  return geom;
};
