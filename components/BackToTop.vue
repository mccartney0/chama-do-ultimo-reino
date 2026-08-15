<!-- Arquivo das Cinzas — atalho discreto que devolve o leitor ao início de cada dossiê. -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const isVisible = ref(false);
const updateVisibility = () => {
  isVisible.value = window.scrollY > 420;
};
const returnToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  updateVisibility();
  window.addEventListener("scroll", updateVisibility, { passive: true });
});

onBeforeUnmount(() => window.removeEventListener("scroll", updateVisibility));
</script>

<template>
  <button v-show="isVisible" class="dossier-top-button" type="button" aria-label="Voltar ao topo do dossiê" @click="returnToTop">
    <span aria-hidden="true">↑</span><small>Topo</small>
  </button>
</template>
