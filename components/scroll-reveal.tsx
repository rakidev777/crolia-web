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

    // ── Scroll progress bar + parallax ──
    const progressBar = document.getElementById("scroll-progress");
    const chatEl = document.querySelector<HTMLElement>(".chat-mockup");
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (progressBar) {
            const total = document.body.scrollHeight - window.innerHeight;
            progressBar.style.width = `${(window.scrollY / total) * 100}%`;
          }
          if (chatEl) {
            const rect = chatEl.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
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

    // ── Chat replay cada 10s ──
    const chatBody = document.querySelector<HTMLElement>(".chat-mockup-body");
    let replayTimer: ReturnType<typeof setTimeout> | undefined;
    const replayChat = () => {
      if (!chatBody) return;
      const bubbles = chatBody.querySelectorAll<HTMLElement>(".chat-bubble, .chat-typing");
      bubbles.forEach((b) => { b.style.animation = "none"; b.style.opacity = "0"; });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bubbles.forEach((b, i) => {
            b.style.animation = "";
            b.style.opacity = "";
            b.style.animationDelay = `${(i + 1) * 0.28}s`;
          });
        });
      });
      replayTimer = setTimeout(replayChat, 10000);
    };
    replayTimer = setTimeout(replayChat, 10000);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cleanups.forEach((fn) => fn());
      clearTimeout(replayTimer);
    };
  }, []);

  return null;
}
