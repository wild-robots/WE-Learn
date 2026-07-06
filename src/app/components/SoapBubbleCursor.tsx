import { useEffect, useRef } from "react";

// ─── Bubble data ─────────────────────────────────────────────────────────────
interface Bubble {
  x: number;
  y: number;
  size: number;
  targetSize: number;
  growing: boolean;
  growRate: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeRate: number;
  hue: number;
  type: "trail" | "burst";
}

function spawnBubble(x: number, y: number, type: "trail" | "burst"): Bubble {
  const angle = Math.random() * Math.PI * 2;
  if (type === "burst") {
    const speed = 1.8 + Math.random() * 3.4;
    return {
      x: x + (Math.random() - 0.5) * 12,
      y: y + (Math.random() - 0.5) * 12,
      size: 4,
      targetSize: 20 + Math.random() * 42,   // 20–62 px, grows on click
      growing: true,
      growRate: 0.5 + Math.random() * 0.6,
      speedX: Math.cos(angle) * speed,
      speedY: Math.sin(angle) * speed - 0.7, // upward bias
      opacity: 0.78 + Math.random() * 0.18,
      fadeRate: 0.0032,
      hue: 158 + Math.random() * 38,         // turquoise palette
      type: "burst",
    };
  }
  // trail: gentle float upward
  return {
    x,
    y,
    size: 3 + Math.random() * 10,
    targetSize: 5 + Math.random() * 15,
    growing: true,
    growRate: 0.07 + Math.random() * 0.08,
    speedX: (Math.random() - 0.5) * 0.85,
    speedY: -(0.3 + Math.random() * 1.1),
    opacity: 0.5 + Math.random() * 0.32,
    fadeRate: 0.005,
    hue: 158 + Math.random() * 38,
    type: "trail",
  };
}

function paintBubble(ctx: CanvasRenderingContext2D, b: Bubble) {
  const { x, y, size, hue, opacity } = b;
  if (size < 0.5 || opacity <= 0) return;

  ctx.save();

  // soap-film iridescent radial gradient
  const g = ctx.createRadialGradient(
    x - size * 0.30, y - size * 0.30, size * 0.06,
    x, y, size
  );
  g.addColorStop(0,    `hsla(${hue},      50%, 93%, ${opacity * 0.88})`);
  g.addColorStop(0.32, `hsla(${hue},      82%, 70%, ${opacity * 0.68})`);
  g.addColorStop(0.68, `hsla(${hue + 28}, 90%, 54%, ${opacity * 0.42})`);
  g.addColorStop(1,    `hsla(${hue + 55}, 100%, 38%, 0)`);

  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();

  // thin iridescent rim — makes bubble pop on light backgrounds
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.strokeStyle = `hsla(${hue + 18}, 100%, 60%, ${opacity * 0.68})`;
  ctx.lineWidth = Math.max(0.7, size * 0.042);
  ctx.stroke();

  // offset white glint (top-left)
  ctx.beginPath();
  ctx.arc(x - size * 0.30, y - size * 0.30, size * 0.20, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,255,255,${opacity * 0.72})`;
  ctx.fill();

  ctx.restore();
}

// ─── Component ────────────────────────────────────────────────────────────────
export function SoapBubbleCursor() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const rafRef     = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Mouse move → gentle trail ─────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      if (Math.random() > 0.70) return; // ~30 % spawn for a light trail
      bubblesRef.current.push(spawnBubble(e.clientX, e.clientY, "trail"));
    };

    // ── Click → spread-and-grow burst ────────────────────────────────────
    const onClick = (e: MouseEvent) => {
      const n = 18 + Math.floor(Math.random() * 10); // 18-27 bubbles
      for (let i = 0; i < n; i++) {
        bubblesRef.current.push(spawnBubble(e.clientX, e.clientY, "burst"));
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    // ── Animation loop ────────────────────────────────────────────────────
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const list = bubblesRef.current;
      for (let i = list.length - 1; i >= 0; i--) {
        const b = list[i];

        // physics
        b.x      += b.speedX;
        b.y      += b.speedY;
        b.speedX *= 0.993;
        b.speedY *= 0.993;

        // grow phase — burst bubbles only fade AFTER finishing growth
        if (b.growing) {
          b.size += b.growRate;
          if (b.size >= b.targetSize) {
            b.size    = b.targetSize;
            b.growing = false;
          }
        }

        if (!b.growing || b.type === "trail") {
          b.opacity -= b.fadeRate;
        }

        if (b.opacity <= 0 || b.size < 0.4) {
          list.splice(i, 1);
          continue;
        }

        paintBubble(ctx, b);
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        inset:         0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",
        zIndex:        9999,
      }}
    />
  );
}
