<!-- Arquivo das Cinzas — bússola lateral: um índice discreto que acompanha a leitura sem competir com o manuscrito. -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const chapters = [
  { id: "historia", number: "01", label: "A história" },
  { id: "vigilia", number: "02", label: "A Vigília" },
  { id: "personagens", number: "03", label: "Personagens" },
  { id: "asterion", number: "04", label: "Asterion" },
  { id: "mapa", number: "05", label: "A rota" },
  { id: "livro1", number: "06", label: "Livro I" },
  { id: "livro2", number: "07", label: "Livro II" },
];

const activeId = ref(chapters[0].id);
const progressTone = ref<"light" | "dark">("dark");
let animationFrame = 0;

function updateActiveChapter() {
  animationFrame = 0;
  const readingLine = window.innerHeight * 0.42;
  let current = chapters[0].id;

  chapters.forEach((chapter) => {
    const section = document.getElementById(chapter.id);
    if (section && section.getBoundingClientRect().top <= readingLine) current = chapter.id;
  });

  activeId.value = current;

  const indicatorLine = window.innerHeight * 0.5;
  const surfaceSection = chapters
    .map((chapter) => document.getElementById(chapter.id))
    .find((section) => {
      if (!section) return false;
      const bounds = section.getBoundingClientRect();
      return bounds.top <= indicatorLine && bounds.bottom >= indicatorLine;
    });

  progressTone.value = surfaceSection?.dataset.progressTone === "light" ? "light" : "dark";
}

function scheduleChapterUpdate() {
  if (!animationFrame) animationFrame = window.requestAnimationFrame(updateActiveChapter);
}

function goToChapter(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

onMounted(() => {
  updateActiveChapter();
  window.addEventListener("scroll", scheduleChapterUpdate, { passive: true });
  window.addEventListener("resize", scheduleChapterUpdate, { passive: true });
});

onBeforeUnmount(() => {
  if (animationFrame) window.cancelAnimationFrame(animationFrame);
  window.removeEventListener("scroll", scheduleChapterUpdate);
  window.removeEventListener("resize", scheduleChapterUpdate);
});
</script>

<template>
  <aside class="narrative-progress" :class="{ 'on-light-surface': progressTone === 'light' }" aria-label="Progresso narrativo da página">
    <p>Leitura</p>
    <nav aria-label="Seções da história">
      <button v-for="chapter in chapters" :key="chapter.id" type="button" :class="{ active: activeId === chapter.id }" :aria-current="activeId === chapter.id ? 'step' : undefined" :title="chapter.label" @click="goToChapter(chapter.id)">
        <span class="narrative-progress-dot" aria-hidden="true" />
        <small>{{ chapter.number }}</small>
        <span class="narrative-progress-label">{{ chapter.label }}</span>
      </button>
    </nav>
  </aside>
</template>
