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
}

function scheduleParallax() {
  if (!animationFrame) animationFrame = window.requestAnimationFrame(applyParallax);
}

onMounted(() => {
  const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

  if (prefersReducedMotion()) {
    revealTargets.forEach((target) => target.classList.add("is-revealed"));
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
