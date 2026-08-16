<!-- Arquivo das Cinzas — navegação superior compartilhada: aberta como um pequeno índice em telas móveis. -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = withDefaults(defineProps<{ active?: "personagens" | "mapa" }>(), { active: undefined });
const route = useRoute();
const menuOpen = ref(false);
const entries = [
  { id: "historia", label: "A história", to: "/#historia" },
  { id: "vigilia", label: "A Vigília", to: "/#vigilia" },
  { id: "personagens", label: "Personagens", to: "/personagens" },
  { id: "mapa", label: "Mapa", to: "/mapa" },
  { id: "livro2", label: "Livro II", to: "/#livro2" },
] as const;

const closeMenu = () => {
  menuOpen.value = false;
};
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") closeMenu();
};

watch(() => route.fullPath, closeMenu);
onMounted(() => window.addEventListener("keydown", handleKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", handleKeydown));
</script>

<template>
  <div class="archive-nav-wrap">
    <button class="archive-menu-trigger" :class="{ 'is-open': menuOpen }" type="button" :aria-expanded="menuOpen" aria-controls="archive-mobile-menu" @click="toggleMenu">
      <span>Menu</span><span class="archive-menu-icon" aria-hidden="true"><i /><i /><i /></span>
    </button>
    <Transition name="archive-menu">
      <nav v-show="menuOpen" id="archive-mobile-menu" class="archive-top-nav archive-top-nav-mobile" aria-label="Navegação principal">
        <NuxtLink v-for="entry in entries" :key="entry.id" :to="entry.to" :class="{ active: props.active === entry.id }" :aria-current="props.active === entry.id ? 'page' : undefined" @click="closeMenu">{{ entry.label }}</NuxtLink>
      </nav>
    </Transition>
    <nav class="archive-top-nav archive-top-nav-desktop" aria-label="Navegação principal">
      <NuxtLink v-for="entry in entries" :key="entry.id" :to="entry.to" :class="{ active: props.active === entry.id }" :aria-current="props.active === entry.id ? 'page' : undefined">{{ entry.label }}</NuxtLink>
    </nav>
  </div>
</template>
