import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// ─── Pre-computed bubble layout (deterministic — no Math.random in render) ───
const BUBBLES = Array.from({ length: 16 }, (_, i) => ({
  id:       i,
  size:     28 + ((i * 11.3) % 90),
  left:     (i * 6.25) % 100,
  bottom:   -10 + ((i * 8.7) % 28),
  delay:    (i * 0.11) % 1.0,
  duration: 1.5 + ((i * 0.19) % 1.4),
  hue:      160 + ((i * 6) % 36),
}));

interface BabelTransitionProps {
  label:      string;
  isCreate?:  boolean;
  onComplete: () => void;
  cardRect?:  DOMRect;
}

export function BabelTransition({ label, isCreate = false, onComplete, cardRect }: BabelTransitionProps) {
  // When cardRect is provided we start clipped to the card and expand outward.
  // When not provided we behave exactly as before (full-screen fade-in).
  const [expanded,     setExpanded]     = useState(!cardRect);
  const [panelVisible, setPanelVisible] = useState(!cardRect);
  const [fading,       setFading]       = useState(false);
  const cbRef = useRef(onComplete);
  cbRef.current = onComplete;

  // Trigger expansion on the next two animation frames so the browser
  // has a chance to paint the initial clipped state first.
  useEffect(() => {
    if (!cardRect) return;
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setExpanded(true);
        setTimeout(() => setPanelVisible(true), 220);
      });
    });
    return () => cancelAnimationFrame(raf1);
  }, []);

  // Fade-out and navigate — add 450 ms for the expansion when cardRect is present.
  useEffect(() => {
    const extra = cardRect ? 450 : 0;
    const t1 = setTimeout(() => setFading(true),          1400 + extra);
    const t2 = setTimeout(() => cbRef.current(),          1700 + extra);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // ── clipPath values ──────────────────────────────────────────────────────
  const vw = typeof window !== "undefined" ? window.innerWidth  : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;

  const clipStart = cardRect
    ? `inset(${cardRect.top}px ${vw - cardRect.right}px ${vh - cardRect.bottom}px ${cardRect.left}px round 16px)`
    : "inset(0px 0px 0px 0px round 0px)";
  const clipEnd = "inset(0px 0px 0px 0px round 0px)";

  const overlayAnimation = fading
    ? "bbl-out 0.30s ease forwards"
    : !cardRect
      ? "bbl-in 0.26s ease forwards"
      : undefined;

  const overlayStyle: React.CSSProperties = {
    position:             "fixed",
    inset:                0,
    zIndex:               9000,
    background:           "radial-gradient(ellipse at 50% 60%, rgba(209,250,244,0.88) 0%, rgba(240,253,250,0.78) 100%)",
    backdropFilter:       "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    clipPath:             cardRect ? (expanded ? clipEnd : clipStart) : undefined,
    transition:           cardRect && !fading ? "clip-path 0.45s cubic-bezier(0.22,1,0.36,1)" : undefined,
    animation:            overlayAnimation,
  };

  const overlay = (
    <>
      {/* ── Keyframes ─────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes bbl-rise {
          0%   { transform: translateY(0)      scale(1);    opacity: 0.88; }
          75%  { opacity: 0.65; }
          100% { transform: translateY(-108vh) scale(1.40); opacity: 0;    }
        }
        @keyframes bbl-in  { from { opacity:0 } to { opacity:1 } }
        @keyframes bbl-out { from { opacity:1 } to { opacity:0 } }
        @keyframes bbl-ring {
          0%   { transform: scale(0.65); opacity: 0.75; }
          100% { transform: scale(2.30); opacity: 0;    }
        }
        @keyframes bbl-dot {
          0%,60%,100% { transform:scale(0.85); opacity:0.25; }
          30%          { transform:scale(1.50); opacity:1;    }
        }
        @keyframes bbl-shine {
          0%,100% { opacity: 0.55; }
          50%     { opacity: 1;    }
        }
      `}</style>

      {/* ── Full-screen frosted backdrop ──────────────────────────────────── */}
      <div style={overlayStyle}>

        {/* ── Rising background bubbles ─────────────────────────────────── */}
        {BUBBLES.map(b => (
          <div
            key={b.id}
            style={{
              position:      "absolute",
              left:          `${b.left}%`,
              bottom:        `${b.bottom}%`,
              width:         b.size,
              height:        b.size,
              borderRadius:  "50%",
              background:    `radial-gradient(circle at 32% 28%, hsla(${b.hue},52%,94%,0.92), hsla(${b.hue},82%,62%,0.48) 56%, transparent)`,
              border:        `1px solid hsla(${b.hue + 18},100%,62%,0.58)`,
              pointerEvents: "none",
              animation:     `bbl-rise ${b.duration}s ease-in ${b.delay}s infinite`,
            }}
          >
            <div style={{
              position:     "absolute",
              top:          "18%",
              left:         "20%",
              width:        "26%",
              height:       "26%",
              borderRadius: "50%",
              background:   "rgba(255,255,255,0.85)",
              animation:    `bbl-shine 2.2s ease-in-out ${b.delay}s infinite`,
            }} />
          </div>
        ))}

        {/* ── Center panel ──────────────────────────────────────────────── */}
        <div
          style={{
            position:             "absolute",
            top:                  "50%",
            left:                 "50%",
            transform:            "translate(-50%, -50%)",
            background:           "rgba(255,255,255,0.88)",
            backdropFilter:       "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius:         28,
            border:               "1.5px solid rgba(17,176,159,0.28)",
            boxShadow:            "0 24px 64px -12px rgba(17,176,159,0.28), 0 0 0 1px rgba(255,255,255,0.9)",
            padding:              "38px 48px",
            display:              "flex",
            flexDirection:        "column",
            alignItems:           "center",
            gap:                  20,
            minWidth:             290,
            maxWidth:             390,
            textAlign:            "center",
            opacity:              panelVisible ? 1 : 0,
            transition:           "opacity 0.30s ease",
          }}
        >
          {/* Animated soap-bubble icon with pulse rings */}
          <div style={{ position: "relative", width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[0, 0.55].map(delay => (
              <div key={delay} style={{
                position:     "absolute",
                inset:        0,
                borderRadius: "50%",
                border:       "2px solid rgba(17,176,159,0.42)",
                animation:    `bbl-ring 1.6s ease-out ${delay}s infinite`,
              }} />
            ))}
            <div style={{
              width:        72,
              height:       72,
              borderRadius: "50%",
              background:   "radial-gradient(circle at 32% 28%, hsla(172,52%,94%,0.95), hsla(172,82%,60%,0.65) 55%, transparent)",
              border:       "1.5px solid hsla(178,100%,52%,0.62)",
              boxShadow:    "inset 0 0 18px hsla(172,80%,72%,0.30), 0 0 18px hsla(172,80%,60%,0.22)",
              position:     "relative",
            }}>
              <div style={{
                position:     "absolute",
                top:          "18%",
                left:         "20%",
                width:        "28%",
                height:       "28%",
                borderRadius: "50%",
                background:   "rgba(255,255,255,0.92)",
              }} />
            </div>
          </div>

          {/* Text */}
          <div>
            <p style={{
              color:         "#9ca3af",
              fontSize:      11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily:    "Inter, sans-serif",
              marginBottom:  8,
            }}>
              {isCreate ? "Launching creator" : "Opening Babel"}
            </p>
            <p style={{
              color:      "#111827",
              fontSize:   17,
              fontWeight: 600,
              fontFamily: "Inter, sans-serif",
              lineHeight: 1.4,
              maxWidth:   270,
            }}>
              {label}
            </p>
          </div>

          {/* Animated dots */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width:        9,
                height:       9,
                borderRadius: "50%",
                background:   "#11b09f",
                animation:    `bbl-dot 1.15s ease-in-out ${i * 0.24}s infinite`,
              }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(overlay, document.body);
}
