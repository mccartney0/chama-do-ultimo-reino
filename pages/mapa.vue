<!-- Arquivo das Cinzas — carta de expedição em página própria; carvão, marfim, Azul Vigília e rotas cerimoniais. -->
<script setup lang="ts">
import { computed, ref, watch } from "vue";

useHead({ title: "Mapa de Asterion — A Chama do Último Reino" });

const art = {
  logo: "/manus-storage/chama-runa-logo_9a8ac0b6.png",
  map: "/manus-storage/mapa-asterion-expedicao_984d2fe0.jpg",
  ferrosul: "/manus-storage/ferrosul-forjas_1dd3ffc2.jpg",
  nareth: "/manus-storage/asterion-ruinas-circulares_e3e24642.jpg",
  asterion: "/manus-storage/asterion-cidade-quebrada_99e3ed07.jpg",
  casaDosEcos: "/manus-storage/casa-dos-ecos_84c5ded9.jpg",
  casaSemSol: "/manus-storage/casa-sem-sol_f47fcdf4.jpg",
};

const route = useRoute();

const regions = [
  { slug: "ferrosul", name: "Ferrosul", number: "01", note: "FORJA · ROTA DE ORIGEM", tooltip: "Onde a chama azul despertou", image: art.ferrosul, x: "22%", y: "31%", tone: "ember", description: "Uma pequena vila de forjas, rio estreito e fumaça de carvão. Foi ali que Kael descobriu que a chama azul não deveria existir — e que nenhuma origem permanece simples quando o passado desperta." },
  { slug: "nareth", name: "Nareth", number: "02", note: "RUÍNAS · REGISTRO 612", tooltip: "Sinos enterrados sob as raízes", image: art.nareth, x: "76%", y: "25%", tone: "blue", description: "No vale circular, torres e pontes quebradas desaparecem entre raízes. Nareth guarda bibliotecas, templos e sinos enterrados que respondem a quem se aproxima com a pergunta errada." },
  { slug: "asterion", name: "Asterion", number: "03", note: "CIDADE · APÓS A QUEDA", tooltip: "O coração rachado do reino", image: art.asterion, x: "58%", y: "69%", tone: "gold", description: "O coração rachado do reino ainda sustenta arcos, canais e caminhos cerimoniais. Entre cinzas e pedra molhada, a cidade resiste à tentativa de ser reduzida a um único nome ou rei." },
  { slug: "casa-dos-ecos", name: "Casa dos Ecos", number: "04", note: "SANTUÁRIO · SELO FINAL", tooltip: "Toda resposta cobra uma memória", image: art.casaDosEcos, x: "26%", y: "73%", tone: "ivory", description: "Um santuário de círculos de pedra, poeira e memória acumulada. A Casa dos Ecos não oferece respostas prontas: exige que cada visitante reconheça a escolha escondida em seu próprio registro." },
  { slug: "casa-sem-sol", name: "Casa sem Sol", number: "05", note: "DESTINO · LIVRO II", tooltip: "Onde o vermelho e o dourado aprendem a dividir o caminho", image: art.casaSemSol, x: "45%", y: "12%", tone: "ruby", description: "O destino da jornada do Livro II. Um lugar que não aparece nos mapas oficiais e cuja existência a Coroa prefere ignorar. Ali, o vampirismo revela ser muito anterior a Asterion — e a Convergência estabiliza a Lâmina Rubra sem apagar custos ou riscos." },
] as const;

const findRegionIndex = (slug: unknown) => Math.max(0, regions.findIndex((region) => region.slug === String(slug)));
const activeRegion = ref(findRegionIndex(route.query.regiao));
const selectedRegion = computed(() => regions[activeRegion.value]);

watch(() => route.query.regiao, (slug) => { activeRegion.value = findRegionIndex(slug); });
</script>

<template>
  <main class="map-page-shell">
    <ScrollMotion />
    <header class="map-page-header"><NuxtLink class="map-page-brand" to="/"><img :src="art.logo" alt="Marca-runa da Chama do Último Reino" /><span><strong>A Chama</strong><small>do Último Reino</small></span></NuxtLink><ArchiveTopNav active="mapa" /></header>

    <section class="map-page-intro" data-reveal><div><p class="eyebrow"><span />Carta de expedição · Livros I &amp; II</p><h1>A rota não aponta<br />o destino. <em>Ela o convoca.</em></h1></div><p>Um registro ampliado da travessia entre as forjas de Ferrosul, as ruínas de Nareth, a cidade quebrada de Asterion, a Casa dos Ecos — e, ao norte, a Casa sem Sol.</p></section>

    <section class="route-atlas" aria-label="Carta interativa das rotas de Asterion" data-reveal data-reveal-delay="90">
      <div class="route-atlas-canvas"><img data-parallax="0.035" :src="art.map" alt="Carta ampliada de Asterion com a rota de Ferrosul à Casa dos Ecos" /><div class="atlas-grain" data-parallax="0.018" aria-hidden="true" /><svg class="atlas-route-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><mask id="atlas-route-reveal"><path class="route-mask" d="M22 31 C38 16 63 16 76 25" /><path class="route-mask" d="M76 25 S70 55 58 69" /><path class="route-mask" d="M58 69 S37 78 26 73" /></mask></defs><g mask="url(#atlas-route-reveal)"><path class="atlas-route-underlay" d="M22 31 C38 16 63 16 76 25 S70 55 58 69 S37 78 26 73" /><path class="atlas-route atlas-route-one" d="M22 31 C38 16 63 16 76 25" /><path class="atlas-route atlas-route-two" d="M76 25 S70 55 58 69" /><path class="atlas-route atlas-route-three" d="M58 69 S37 78 26 73" /></g></svg><span class="atlas-index">ARQ. VIG · 05 pontos</span><button v-for="(region, index) in regions" :key="region.name" type="button" class="atlas-hotspot" :class="[{ active: activeRegion === index }, `hotspot-${region.tone}`]" :style="{ left: region.x, top: region.y }" :aria-label="`Ler o registro de ${region.name}`" :aria-describedby="`atlas-tooltip-${index}`" @click="activeRegion = index"><i /><span class="atlas-hotspot-label"><b>{{ region.number }}</b>{{ region.name }}</span><span :id="`atlas-tooltip-${index}`" class="atlas-tooltip" role="tooltip"><small>{{ region.note }}</small><strong>{{ region.tooltip }}</strong><em>Selecionar registro <span>↗</span></em></span></button></div>
      <article :key="selectedRegion.name" class="atlas-record" :class="`atlas-${selectedRegion.tone}`" aria-live="polite"><img :src="selectedRegion.image" :alt="selectedRegion.name" /><div><p>ROTA {{ selectedRegion.number }} · {{ selectedRegion.note }}</p><h2>{{ selectedRegion.name }}</h2><p class="atlas-description">{{ selectedRegion.description }}</p><div class="atlas-controls"><button type="button" @click="activeRegion = (activeRegion + regions.length - 1) % regions.length">← Ponto anterior</button><button type="button" @click="activeRegion = (activeRegion + 1) % regions.length">Próximo ponto →</button></div></div></article>
    </section>

    <section class="route-ledger" data-reveal><p class="eyebrow"><span />Ordem de travessia</p><ol><li v-for="(region, index) in regions" :key="region.name" :class="{ active: activeRegion === index }"><button type="button" @click="activeRegion = index"><span>0{{ index + 1 }}</span><strong>{{ region.name }}</strong><small>{{ region.tooltip }}</small></button></li></ol></section>

    <footer class="map-page-footer"><NuxtLink to="/"><img :src="art.logo" alt="" />Retornar à página do livro</NuxtLink><span>O rei foi selado. A memória não.</span></footer>
  </main>
</template>
