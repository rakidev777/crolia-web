"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    // ── Scroll reveals ──
    const revealTargets = document.querySelectorAll(".reveal, .reveal-left, .reveal-scale");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    for (const el of revealTargets) io.observe(el);

    // ── Ambient cursor glow ──
    const glow = document.createElement("div");
    glow.setAttribute("aria-hidden", "true");
    glow.style.cssText = [
      "position:fixed", "pointer-events:none", "z-index:9998",
      "width:520px", "height:520px", "border-radius:50%",
      "background:radial-gradient(circle, rgba(138,100,72,0.06) 0%, transparent 68%)",
      "transform:translate(-50%,-50%)",
      "top:0", "left:0", "will-change:left,top",
    ].join(";");
    document.body.appendChild(glow);

    let mx = -1000, my = -1000, gx = -1000, gy = -1000;
    let glowRaf: number;
    const onMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    const animateGlow = () => {
      gx += (mx - gx) * 0.07;
      gy += (my - gy) * 0.07;
      glow.style.left = `${gx}px`;
      glow.style.top = `${gy}px`;
      glowRaf = requestAnimationFrame(animateGlow);
    };
    animateGlow();

    // ── Magnetic buttons ──
    const magneticBtns = document.querySelectorAll<HTMLElement>(".magnetic-btn");
    const cleanups: (() => void)[] = [];

    magneticBtns.forEach((btn) => {
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.24;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.24;
        btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.02)`;
        btn.style.transition = "transform 160ms ease";
      };
      const onLeave = () => {
        btn.style.transform = "";
        btn.style.transition = "transform 480ms cubic-bezier(0.34, 1.56, 0.64, 1)";
      };
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      });
    });

    // ── 3D card tilt ──
    const tiltCards = document.querySelectorAll<HTMLElement>(".card-surface, .card-featured");
    tiltCards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateZ(4px)`;
        card.style.transition = "transform 100ms ease";
      };
      const onLeave = () => {
        card.style.transform = "";
        card.style.transition = "transform 520ms cubic-bezier(0.34, 1.56, 0.64, 1)";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    // ── Parallax en chat mockup ──
    const chatEl = document.querySelector<HTMLElement>(".chat-mockup");
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (chatEl) {
            const rect = chatEl.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            if (inView) {
              const offset = (rect.top - window.innerHeight / 2) * 0.032;
              chatEl.style.transform = `translateY(${offset}px)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(glowRaf);
      window.removeEventListener("scroll", onScroll);
      cleanups.forEach((fn) => fn());
      if (document.body.contains(glow)) document.body.removeChild(glow);
    };
  }, []);

  return null;
}
