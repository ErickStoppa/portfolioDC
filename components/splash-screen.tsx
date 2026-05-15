"use client";

import { useEffect, useRef } from "react";

const SPLASH_CSS = `
  #dc-splash {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: #020810;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: opacity 0.9s ease, filter 0.9s ease;
    overflow: hidden;
  }
  #dc-splash.dc-out {
    opacity: 0;
    filter: blur(16px);
    pointer-events: none;
  }
  #dc-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  #dc-brand {
    position: relative;
    z-index: 2;
    text-align: center;
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.7s ease, transform 0.7s ease;
    margin-top: 18px;
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  #dc-brand.dc-show {
    opacity: 1;
    transform: translateY(0);
  }
  #dc-brand h1 {
    font-size: clamp(26px, 4.5vw, 52px);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #F0F6FF;
    line-height: 1.1;
    margin: 0;
  }
  #dc-brand h1 span { color: #00E5FF; }
  #dc-brand p {
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
    font-size: clamp(9px, 1.2vw, 12px);
    letter-spacing: 0.22em;
    color: rgba(0,229,255,0.5);
    margin-top: 10px;
    text-transform: uppercase;
  }
  #dc-progress {
    position: absolute;
    bottom: 38px;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  #dc-progress.dc-show { opacity: 1; }
  #dc-track {
    height: 1px;
    background: rgba(0,229,255,0.1);
    border-radius: 2px;
    overflow: hidden;
  }
  #dc-fill {
    height: 100%;
    width: 0%;
    background: #00E5FF;
    box-shadow: 0 0 8px #00E5FF;
    transition: width 0.08s linear;
  }
  #dc-pct {
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
    font-size: 10px;
    color: rgba(0,229,255,0.38);
    text-align: right;
    margin-top: 6px;
    letter-spacing: 0.08em;
  }
`;

type Seg = {
  x1: number; y1: number; x2: number; y2: number;
  s: number; d: number; c: string; lw: number;
};

export function SplashScreen() {
  const splashRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const brandRef  = useRef<HTMLDivElement>(null);
  const progRef   = useRef<HTMLDivElement>(null);
  const fillRef   = useRef<HTMLDivElement>(null);
  const pctRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Non-null: React guarantees refs are set when useEffect runs
    const splash = splashRef.current!;
    const canvas = canvasRef.current!;
    const brand  = brandRef.current!;
    const prog   = progRef.current!;
    const fill   = fillRef.current!;
    const pct    = pctRef.current!;

    if (sessionStorage.getItem("dc-splash-seen")) {
      splash.style.display = "none";
      return;
    }

    const ctx   = canvas.getContext("2d")!;
    const CYAN  = "#00E5FF";
    const BLUE  = "#1d6df0";
    const TOTAL = 295;

    let W = 0, H = 0, CX = 0, CY = 0, TW = 0, TH = 0, TX = 0, TY = 0;
    let fr = 0, raf = 0;

    function resize() {
      W  = canvas.width  = window.innerWidth;
      H  = canvas.height = window.innerHeight;
      CX = W / 2; CY = H / 2;
      TW = Math.min(W * 0.22, 260);
      TH = TW * 0.68;
      TX = CX - TW / 2;
      TY = CY - TH / 2 - H * 0.06;
    }
    resize();
    window.addEventListener("resize", resize);

    const lerp      = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp     = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const easeOut   = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    function segs(): Seg[] {
      const bc = TH * 0.14;
      return [
        { x1: TX,                  y1: TY,               x2: TX + TW,                   y2: TY,               s: 0,   d: 28, c: CYAN,                   lw: 1.8 },
        { x1: TX + TW,             y1: TY,               x2: TX + TW,                   y2: TY + TH,          s: 25,  d: 28, c: BLUE,                   lw: 1.8 },
        { x1: TX + TW,             y1: TY + TH,          x2: TX,                        y2: TY + TH,          s: 50,  d: 28, c: CYAN,                   lw: 1.8 },
        { x1: TX,                  y1: TY + TH,          x2: TX,                        y2: TY,               s: 75,  d: 28, c: BLUE,                   lw: 1.8 },
        { x1: TX,                  y1: TY + TH * 0.2,    x2: TX + TW,                   y2: TY + TH * 0.2,    s: 100, d: 20, c: "rgba(0,229,255,0.3)",  lw: 0.8 },
        { x1: TX + TW * 0.09,      y1: TY + TH * 0.42,   x2: TX + TW * 0.15,            y2: TY + TH * 0.52,   s: 118, d: 12, c: CYAN,                   lw: 1.6 },
        { x1: TX + TW * 0.15,      y1: TY + TH * 0.52,   x2: TX + TW * 0.09,            y2: TY + TH * 0.62,   s: 128, d: 12, c: CYAN,                   lw: 1.6 },
        { x1: TX + TW * 0.19,      y1: TY + TH * 0.52,   x2: TX + TW * 0.72,            y2: TY + TH * 0.52,   s: 138, d: 22, c: "rgba(0,229,255,0.7)",  lw: 1.2 },
        { x1: TX + TW * 0.19,      y1: TY + TH * 0.69,   x2: TX + TW * 0.55,            y2: TY + TH * 0.69,   s: 158, d: 18, c: "rgba(0,229,255,0.35)", lw: 1.0 },
        { x1: TX - 8,              y1: TY - 8 + bc,      x2: TX - 8,                    y2: TY - 8,           s: 175, d: 10, c: CYAN,                   lw: 1.8 },
        { x1: TX - 8,              y1: TY - 8,           x2: TX - 8 + bc,               y2: TY - 8,           s: 175, d: 10, c: CYAN,                   lw: 1.8 },
        { x1: TX + TW + 8,         y1: TY - 8 + bc,      x2: TX + TW + 8,               y2: TY - 8,           s: 178, d: 10, c: CYAN,                   lw: 1.8 },
        { x1: TX + TW + 8,         y1: TY - 8,           x2: TX + TW + 8 - bc,          y2: TY - 8,           s: 178, d: 10, c: CYAN,                   lw: 1.8 },
        { x1: TX - 8,              y1: TY + TH + 8 - bc, x2: TX - 8,                    y2: TY + TH + 8,      s: 181, d: 10, c: CYAN,                   lw: 1.8 },
        { x1: TX - 8,              y1: TY + TH + 8,      x2: TX - 8 + bc,               y2: TY + TH + 8,      s: 181, d: 10, c: CYAN,                   lw: 1.8 },
        { x1: TX + TW + 8,         y1: TY + TH + 8 - bc, x2: TX + TW + 8,               y2: TY + TH + 8,      s: 184, d: 10, c: CYAN,                   lw: 1.8 },
        { x1: TX + TW + 8,         y1: TY + TH + 8,      x2: TX + TW + 8 - bc,          y2: TY + TH + 8,      s: 184, d: 10, c: CYAN,                   lw: 1.8 },
        { x1: TX - 8 - TW * 0.15,  y1: TY - 8,           x2: TX - 8,                    y2: TY - 8,           s: 192, d: 14, c: "rgba(0,229,255,0.25)", lw: 0.8 },
        { x1: TX + TW + 8,         y1: TY + TH + 8,      x2: TX + TW + 8 + TW * 0.15,   y2: TY + TH + 8,      s: 192, d: 14, c: "rgba(0,229,255,0.25)", lw: 0.8 },
      ];
    }

    function drawSeg(seg: Seg, f: number) {
      const e = f - seg.s;
      if (e < 0) return;
      const t  = clamp(e / seg.d, 0, 1);
      const et = easeOut(t);
      const ex = lerp(seg.x1, seg.x2, et);
      const ey = lerp(seg.y1, seg.y2, et);
      ctx.save();
      ctx.strokeStyle = seg.c;
      ctx.lineWidth   = seg.lw;
      ctx.lineCap     = "round";
      ctx.shadowColor = seg.c;
      ctx.shadowBlur  = 10;
      ctx.beginPath();
      ctx.moveTo(seg.x1, seg.y1);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      if (t < 0.96) {
        ctx.fillStyle   = "rgba(255,255,255,0.95)";
        ctx.shadowBlur  = 22;
        ctx.shadowColor = CYAN;
        ctx.beginPath();
        ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const f    = fr;
      const list = segs();

      if (f > 5) {
        const ga = clamp((f - 5) / 30, 0, 1) * 0.045;
        ctx.save();
        ctx.strokeStyle = `rgba(0,229,255,${ga})`;
        ctx.lineWidth   = 0.5;
        const gs = Math.floor(Math.min(W, H) / 20);
        for (let x = 0; x < W; x += gs) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
        }
        for (let y = 0; y < H; y += gs) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }
        ctx.restore();
      }

      if (f > 40) {
        const gt    = clamp((f - 40) / 80, 0, 1);
        const pulse = f > 195
          ? Math.sin((f - 195) * 0.09) * 0.06 + 0.14
          : gt * 0.14;
        const gr = ctx.createRadialGradient(CX, CY - H * 0.06, 0, CX, CY - H * 0.06, TW * 2.2);
        gr.addColorStop(0,    `rgba(0,229,255,${pulse})`);
        gr.addColorStop(0.45, `rgba(29,109,240,${pulse * 0.4})`);
        gr.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, W, H);
      }

      list.forEach((s) => drawSeg(s, f));

      if (f > 100) {
        const da = clamp((f - 100) / 15, 0, 1);
        const dots: [number, string, number][] = [
          [0.12, CYAN,                     8],
          [0.22, "rgba(29,109,240,0.8)",   0],
          [0.32, "rgba(29,109,240,0.35)",  0],
        ];
        dots.forEach(([dx, dc, db]) => {
          ctx.save();
          ctx.globalAlpha = da;
          ctx.fillStyle   = dc;
          ctx.shadowColor = dc;
          ctx.shadowBlur  = db;
          ctx.beginPath();
          ctx.arc(TX + TW * dx, TY + TH * 0.1, TH * 0.048, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      const p = Math.min(100, Math.round((f / TOTAL) * 100));
      fill.style.width = `${p}%`;
      pct.textContent  = `${p}%`;

      if (f === 200) {
        brand.classList.add("dc-show");
        prog.classList.add("dc-show");
      }

      if (f > 220) {
        const bt = clamp((f - 220) / 75, 0, 1);
        const be = easeInOut(bt);
        canvas.style.opacity = `${1 - be * 0.85}`;
        canvas.style.filter  = `blur(${be * 18}px)`;
        brand.style.opacity  = `${1 - be}`;

        if (bt >= 1) {
          cancelAnimationFrame(raf);
          splash.classList.add("dc-out");
          sessionStorage.setItem("dc-splash-seen", "1");
          setTimeout(() => { splash.style.display = "none"; }, 950);
          return;
        }
      }

      fr++;
      raf = requestAnimationFrame(draw);
    }

    const timer = setTimeout(() => { draw(); }, 80);

    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: SPLASH_CSS }} />
      <div id="dc-splash" ref={splashRef}>
        <canvas id="dc-canvas" ref={canvasRef} />
        <div id="dc-brand" ref={brandRef}>
          <h1>Development <span>Consulting</span></h1>
          <p>Technology Solutions</p>
        </div>
        <div id="dc-progress" ref={progRef}>
          <div id="dc-track">
            <div id="dc-fill" ref={fillRef} />
          </div>
          <div id="dc-pct" ref={pctRef}>0%</div>
        </div>
      </div>
    </>
  );
}
