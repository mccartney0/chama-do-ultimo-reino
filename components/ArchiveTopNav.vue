<!-- Arquivo das Cinzas — navegação superior compartilhada para manter os registros conectados. -->
<script setup lang="ts">
withDefaults(defineProps<{ active?: "personagens" | "mapa" }>(), { active: undefined });

const entries = [
  { id: "historia", label: "A história", to: "/#historia" },
  { id: "vigilia", label: "A Vigília", to: "/#vigilia" },
  { id: "personagens", label: "Personagens", to: "/personagens" },
  { id: "mapa", label: "Mapa", to: "/mapa" },
  { id: "livro", label: "Livro I", to: "/#livro" },
] as const;
</script>

<template>
  <nav class="archive-top-nav" aria-label="Navegação principal">
    <NuxtLink v-for="entry in entries" :key="entry.id" :to="entry.to" :class="{ active: active === entry.id }" :aria-current="active === entry.id ? 'page' : undefined">{{ entry.label }}</NuxtLink>
  </nav>
</template>
