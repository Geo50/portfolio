// Constellation data — wolf head (abstract, profile facing right)
// Node positions are percentages of viewport width (x) and height (y)
// Designed to sit in the right half of the screen, unobtrusive but present

export interface ConstellationNode {
  x: number; // % of viewport width
  y: number; // % of viewport height
}

export interface ConstellationEdge {
  from: number;
  to: number;
  phase: 1 | 2 | 3 | 4; // which scroll phase reveals this edge
}

export const CONSTELLATION_NODES: ConstellationNode[] = [
  // HEAD / EARS
  { x: 63, y: 22 }, // 0  — left ear tip
  { x: 71, y: 19 }, // 1  — right ear tip
  { x: 67, y: 26 }, // 2  — between ears / head top
  { x: 59, y: 30 }, // 3  — back of head

  // FOREHEAD / BROW
  { x: 73, y: 28 }, // 4  — forehead
  { x: 75, y: 35 }, // 5  — eye area
  { x: 71, y: 41 }, // 6  — cheekbone

  // SNOUT
  { x: 78, y: 42 }, // 7  — snout upper
  { x: 82, y: 47 }, // 8  — snout tip / nose
  { x: 77, y: 51 }, // 9  — upper jaw
  { x: 71, y: 54 }, // 10 — lower jaw
  { x: 65, y: 57 }, // 11 — chin

  // NECK / THROAT
  { x: 61, y: 52 }, // 12 — throat
  { x: 58, y: 45 }, // 13 — lower neck back
  { x: 59, y: 36 }, // 14 — upper neck back

  // CHEST / BODY
  { x: 63, y: 63 }, // 15 — shoulder left
  { x: 70, y: 66 }, // 16 — chest
  { x: 77, y: 62 }, // 17 — shoulder right

  // ACCENT DETAIL STARS
  { x: 68, y: 36 }, // 18 — mid face
  { x: 66, y: 49 }, // 19 — jaw-throat detail
];

export const CONSTELLATION_EDGES: ConstellationEdge[] = [
  // Phase 1 — top of head / ear outline (Profile section)
  { from: 0, to: 2, phase: 1 },
  { from: 1, to: 2, phase: 1 },
  { from: 2, to: 4, phase: 1 },
  { from: 0, to: 3, phase: 1 },
  { from: 3, to: 14, phase: 1 },

  // Phase 2 — face / brow / neck (Stack section)
  { from: 4, to: 5, phase: 2 },
  { from: 5, to: 18, phase: 2 },
  { from: 18, to: 6, phase: 2 },
  { from: 14, to: 13, phase: 2 },
  { from: 13, to: 12, phase: 2 },

  // Phase 3 — snout / jaw (Work section)
  { from: 6, to: 7, phase: 3 },
  { from: 7, to: 8, phase: 3 },
  { from: 8, to: 9, phase: 3 },
  { from: 9, to: 10, phase: 3 },
  { from: 10, to: 19, phase: 3 },
  { from: 19, to: 11, phase: 3 },
  { from: 11, to: 12, phase: 3 },

  // Phase 4 — chest / completion (Contact section)
  { from: 12, to: 15, phase: 4 },
  { from: 15, to: 16, phase: 4 },
  { from: 16, to: 17, phase: 4 },
  { from: 17, to: 10, phase: 4 },
];

// Simplified subset for mobile (head outline only)
export const MOBILE_EDGE_INDICES = [0, 1, 2, 3, 4, 5, 7, 9, 12, 14];
