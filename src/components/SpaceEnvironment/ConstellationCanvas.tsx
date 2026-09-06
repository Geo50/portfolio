import React, { useRef, useEffect } from "react";
import {
  CONSTELLATION_NODES,
  CONSTELLATION_EDGES,
  MOBILE_EDGE_INDICES,
} from "./constellationData";

/**
 * ConstellationCanvas
 *
 * Draws the wolf-head constellation progressively as the user scrolls.
 * Phase 1 → Profile section, Phase 2 → Stack, Phase 3 → Work, Phase 4 → Contact.
 * On mobile: uses a simplified edge subset, thinner lines, lower opacity.
 */

const PHASE_RANGES: Record<1 | 2 | 3 | 4, [number, number]> = {
  1: [0.08, 0.28],
  2: [0.28, 0.48],
  3: [0.48, 0.7],
  4: [0.7, 0.9],
};

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export const ConstellationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const isMobile = useRef(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isMobile.current = window.matchMedia("(max-width: 768px)").matches;
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobile.current = window.matchMedia("(max-width: 768px)").matches;
    };
    resize();
    window.addEventListener("resize", resize);

    // Determine which edges to draw
    const allEdges = CONSTELLATION_EDGES;
    const mobileSet = new Set(MOBILE_EDGE_INDICES);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const progress = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--scroll-progress",
        ) || "0",
      );

      const w = canvas.width;
      const h = canvas.height;

      const isMob = isMobile.current;
      const lineOpacity = isMob ? 0.038 : 0.065;
      const nodeRadius = isMob ? 1.0 : 1.5;
      const nodeOpacity = isMob ? 0.12 : 0.22;
      const activeNodeOpacity = isMob ? 0.28 : 0.52;

      // Group edges by phase; within each phase determine individual draw progress
      const phases = ([1, 2, 3, 4] as const).map((phase) => {
        const [pStart, pEnd] = PHASE_RANGES[phase];
        const phaseProgress = smoothstep(pStart, pEnd, progress);
        return { phase, phaseProgress };
      });

      const phaseEdges = phases.map(({ phase, phaseProgress }) => {
        const edges = allEdges.filter((e) => {
          if (e.phase !== phase) return false;
          if (isMob) return mobileSet.has(allEdges.indexOf(e));
          return true;
        });
        return { edges, phaseProgress };
      });

      // Draw lines
      ctx.lineCap = "round";

      for (const { edges, phaseProgress } of phaseEdges) {
        if (edges.length === 0 || phaseProgress <= 0) continue;

        edges.forEach((edge, i) => {
          const edgeStart = i / edges.length;
          const edgeEnd = (i + 1) / edges.length;
          const edgeProgress = smoothstep(edgeStart, edgeEnd, phaseProgress);
          if (edgeProgress <= 0) return;

          const n1 = CONSTELLATION_NODES[edge.from];
          const n2 = CONSTELLATION_NODES[edge.to];
          const x1 = (n1.x / 100) * w;
          const y1 = (n1.y / 100) * h;
          const x2 = (n2.x / 100) * w;
          const y2 = (n2.y / 100) * h;

          // Draw partial line based on edgeProgress
          const endX = x1 + (x2 - x1) * Math.min(1, edgeProgress);
          const endY = y1 + (y2 - y1) * Math.min(1, edgeProgress);

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${lineOpacity})`;
          ctx.lineWidth = isMob ? 0.4 : 0.55;
          ctx.moveTo(x1, y1);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        });
      }

      // Draw nodes — only those whose phase has started
      CONSTELLATION_NODES.forEach((node, idx) => {
        // Find the minimum phase that references this node
        const referencingPhases = allEdges
          .filter((e) => e.from === idx || e.to === idx)
          .map((e) => e.phase);

        if (referencingPhases.length === 0) return;
        if (isMob) {
          // Skip if not in mobile set
          const edgeIdx = allEdges.findIndex(
            (e) => e.from === idx || e.to === idx,
          );
          if (!mobileSet.has(edgeIdx)) return;
        }

        const minPhase = Math.min(...referencingPhases) as 1 | 2 | 3 | 4;
        const [pStart] = PHASE_RANGES[minPhase];
        const nodeVisibility = smoothstep(pStart, pStart + 0.05, progress);

        if (nodeVisibility <= 0) return;

        const x = (node.x / 100) * w;
        const y = (node.y / 100) * h;

        // Pulse effect for recently-activated nodes
        const [, pEnd] = PHASE_RANGES[minPhase];
        const isRecent = progress >= pStart && progress <= pEnd + 0.08;
        const op = isRecent ? activeNodeOpacity : nodeOpacity;

        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,240,${op * nodeVisibility})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
};
