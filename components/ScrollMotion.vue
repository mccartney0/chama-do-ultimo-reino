<!-- Arquivo das Cinzas — movimento de leitura: vestígios surgem por camada e o cenário desloca-se com sobriedade. -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

let revealObserver: IntersectionObserver | null = null;
let animationFrame = 0;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function applyParallax() {
  animationFrame = 0;
  const midpoint = window.innerHeight * 0.52;

  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((layer) => {
    const speed = Number(layer.dataset.parallax || "0.04");
    const rect = layer.getBoundingClientRect();
    const distance = midpoint - (rect.top + rect.height / 2);
    const offset = Math.max(-30, Math.min(30, distance * speed));
    layer.style.setProperty("--scroll-parallax-y", `${offset.toFixed(2)}px`);
  });

  document.querySelectorAll<HTMLElement>(".map-canvas, .route-atlas-canvas").forEach((canvas) => {
    const rect = canvas.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.84 - rect.top) / Math.max(rect.height * 0.7, 1)));
    const segments = Array.from(canvas.querySelectorAll<SVGPathElement>(".route-pulse, .atlas-route"));

    segments.forEach((segment, index) => {
      const segmentProgress = Math.max(0, Math.min(1, progress * segments.length - index));
      const length = Number(segment.dataset.routeLength || segment.getTotalLength());
      segment.dataset.routeLength = String(length);
      segment.style.strokeDasharray = String(length);
      segment.style.strokeDashoffset = String(length * (1 - segmentProgress));
      segment.classList.toggle("route-drawn", segmentProgress > 0.98);
    });
  });
}

function scheduleParallax() {
  if (!animationFrame) animationFrame = window.requestAnimationFrame(applyParallax);
}

onMounted(() => {
  const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

  if (prefersReducedMotion()) {
    revealTargets.forEach((target) => target.classList.add("is-revealed"));
    document.querySelectorAll<SVGPathElement>(".route-pulse, .atlas-route").forEach((segment) => {
      const length = segment.getTotalLength();
      segment.style.strokeDasharray = String(length);
      segment.style.strokeDashoffset = "0";
    });
    return;
  }

  revealTargets.forEach((target, index) => {
    const delay = target.dataset.revealDelay ?? String((index % 3) * 75);
    target.style.setProperty("--reveal-delay", `${delay}ms`);
  });

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        revealObserver?.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8%" },
  );

  revealTargets.forEach((target) => revealObserver?.observe(target));
  applyParallax();
  window.addEventListener("scroll", scheduleParallax, { passive: true });
  window.addEventListener("resize", scheduleParallax, { passive: true });
});

onBeforeUnmount(() => {
  revealObserver?.disconnect();
  if (animationFrame) window.cancelAnimationFrame(animationFrame);
  window.removeEventListener("scroll", scheduleParallax);
  window.removeEventListener("resize", scheduleParallax);
});
</script>

<template><span class="scroll-motion-sentinel" aria-hidden="true" /></template>
