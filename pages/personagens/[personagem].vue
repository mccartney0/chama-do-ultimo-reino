<!-- Arquivo das Cinzas — dossiês individuais: retrato, testemunho, vínculos de rota e navegação entre sobreviventes. -->
<script setup lang="ts">
import { computed } from "vue";

const route = useRoute();

const art = {
  logo: "/manus-storage/chama-runa-logo_9a8ac0b6.png",
  kael: "/manus-storage/kael-retrato_ae7eda73.png",
  dharen: "/manus-storage/dharen-retrato_4f422802.png",
  lyra: "/manus-storage/lyra-retrato_b043ad7e.png",
  mira: "/manus-storage/mira-retrato_236b1e36.png",
  ferrosul: "/manus-storage/ferrosul-forjas_1dd3ffc2.jpg",
  nareth: "/manus-storage/asterion-ruinas-circulares_e3e24642.jpg",
  asterion: "/manus-storage/asterion-cidade-quebrada_99e3ed07.jpg",
  casaDosEcos: "/manus-storage/casa-dos-ecos_84c5ded9.jpg",
};

const profiles = [
  {
    slug: "kael", number: "01", name: "Kael Auren", role: "O ferreiro da chama azul", mark: "KA · 19", tone: "blue", image: art.kael, archive: "FERROSUL · TESTEMUNHA DA MEMÓRIA", sigil: "Chama da Memória", instrument: "Grimório vivo · fogo azul", affiliation: "Oficina Auren · Vigília", quote: "A memória não voltou para obedecer. Voltou para ser testemunhada.",
    bio: ["Kael cresceu entre o calor controlado das forjas de Ferrosul, sob a orientação silenciosa de Darion Auren. Para ele, o ferro era uma promessa simples: toda matéria cede quando se conhece o tempo e a temperatura certos.", "A chama azul desfez essa certeza. Ela não aquece como o fogo comum, responde como uma lembrança e traz vozes que Kael não pediu para ouvir. Com o grimório vivo em mãos, o jovem ferreiro passa a carregar rastros de Maelis e de uma história que a Coroa preferiria chamar de lenda.", "O que começa como fuga torna-se escolha. Ao atravessar Nareth e encarar Asterion, Kael aprende que herança não é sentença: é a matéria de que se faz o próximo gesto."],
    regions: [
      { slug: "ferrosul", name: "Ferrosul", label: "Origem", image: art.ferrosul, text: "A oficina, o pai e a primeira faísca impossível." },
      { slug: "nareth", name: "Nareth", label: "Testemunho", image: art.nareth, text: "O grimório responde onde bibliotecas guardam testemunhas." },
      { slug: "asterion", name: "Asterion", label: "Herança", image: art.asterion, text: "A cidade obriga Kael a escolher o que fará da própria memória." },
    ],
    companions: ["dharen", "lyra", "mira"],
  },
  {
    slug: "dharen", number: "02", name: "Dharen Varenn", role: "O Caminhante de Prata", mark: "DV · 39", tone: "gold", image: art.dharen, archive: "ESTRADAS DE ASTERION · ARQUIVO VARENN", sigil: "Lâmina do Caminho", instrument: "Espada rúnica · energia mística", affiliation: "Caminhante de Prata · Vigília", quote: "A vontade não comanda o homem. Comanda o caminho que ele escolhe.",
    bio: ["Dharen Varenn aprendeu a sobreviver entre contratos, estradas e promessas que raramente chegam inteiras ao destino. Antes de se tornar o Caminhante de Prata, ele já conhecia o preço de atravessar uma sala sem revelar tudo o que sabia.", "A energia mística e a espada rúnica o tornam perigoso, mas não explicam por que ele escolhe ficar quando seria mais simples partir. Seu passado toca a Coroa e o nome Varenn guarda ausências que ele trata com ironia, como se humor fosse uma lâmina capaz de afastar qualquer culpa.", "O Laço Astral com Kael desloca sua rota. Dharen não recebe a força do ferreiro; recebe a impossibilidade de fingir que o peso do outro não existe. É essa mudança que transforma proteção em testemunho."],
    regions: [
      { slug: "nareth", name: "Nareth", label: "Vigília", image: art.nareth, text: "Nas ruínas, Dharen aprende que cautela não substitui testemunho." },
      { slug: "asterion", name: "Asterion", label: "Dívida", image: art.asterion, text: "A cidade concentra os nomes e as escolhas que o caminho Varenn não apagou." },
      { slug: "casa-dos-ecos", name: "Casa dos Ecos", label: "Escolha", image: art.casaDosEcos, text: "O último selo exige dele mais que uma espada: exige decisão." },
    ],
    companions: ["kael", "lyra", "mira"],
  },
  {
    slug: "lyra", number: "03", name: "Lyra", role: "A arqueira que reconstrói", mark: "LY · CCB", tone: "moss", image: art.lyra, archive: "CERVO BRANCO · ROTA DE RECONSTRUÇÃO", sigil: "Arco do Norte", instrument: "Arco longo · leitura de trilhas", affiliation: "Companhia do Cervo Branco", quote: "Reconstruir não é esquecer a ruína. É recusar que ela decida tudo.",
    bio: ["Lyra foi moldada pela Companhia do Cervo Branco, onde um rastro na lama, um galho deslocado ou um silêncio inesperado valiam mais que qualquer proclamação. Seu arco é precisão, mas também disciplina: nada em sua mira é gasto por acaso.", "A queda da companhia não a transformou em alguém que procura glória. Transformou-a em alguém que mede o perigo antes de permitir que ele engula o grupo. Ela percebe o que Dharen esconde atrás da ironia e o que Kael tenta resolver sozinho antes de pedir ajuda.", "Depois da travessia, Lyra escolhe reconstruir o Cervo Branco. É uma escolha voltada para o norte, mas começa no presente: criar rotas seguras, preservar nomes e não abandonar quem ainda precisa de uma companhia."],
    regions: [
      { slug: "ferrosul", name: "Ferrosul", label: "Chamado", image: art.ferrosul, text: "A vila mostra que até uma origem quieta pode pedir defesa." },
      { slug: "nareth", name: "Nareth", label: "Leitura", image: art.nareth, text: "Nas raízes e torres partidas, Lyra encontra uma rota que não perdoa distrações." },
      { slug: "asterion", name: "Asterion", label: "Reconstrução", image: art.asterion, text: "A cidade caída dá à arqueira um motivo para o Cervo Branco voltar a existir." },
    ],
    companions: ["kael", "dharen", "mira"],
  },
  {
    slug: "mira", number: "04", name: "Mira", role: "A chave sem dentes", mark: "MI · GC", tone: "ember", image: art.mira, archive: "GUILDA DOS CAMINHOS · ACESSO NÃO AUTORIZADO", sigil: "Chave sem Dentes", instrument: "Gazua · infiltração", affiliation: "Guilda dos Caminhos", quote: "Se uma porta não quer abrir, ela provavelmente está escondendo um bom registro.",
    bio: ["Mira aprendeu nas margens da Guilda dos Caminhos que fechaduras têm caráter. Algumas pedem paciência; outras pedem que alguém pare de tratá-las como autoridade. Sua Chave sem Dentes não é apenas ferramenta: é uma recusa a aceitar que todo acesso precisa ser concedido.", "Rápida, sarcástica e seletivamente honesta, Mira lê uma sala com a mesma facilidade com que encontra um compartimento falso. Ela não confia em instituições que escondem registros — talvez porque saiba quanto custa ficar do lado de fora de uma porta trancada.", "A companhia encontra nela alguém que transforma suspeita em método. Ao seguir os fios da Guilda, Mira ajuda a provar que os caminhos também podem ser usados para esconder uma Coroa."],
    regions: [
      { slug: "nareth", name: "Nareth", label: "Arquivo", image: art.nareth, text: "Ruínas e bibliotecas são fechaduras em escala de reino." },
      { slug: "asterion", name: "Asterion", label: "Conspiração", image: art.asterion, text: "Entre registros e corredores, Mira reconhece quem lucra com o silêncio." },
      { slug: "casa-dos-ecos", name: "Casa dos Ecos", label: "Acesso", image: art.casaDosEcos, text: "Nem toda porta precisa de permissão para revelar o que guarda." },
    ],
    companions: ["kael", "dharen", "lyra"],
  },
] as const;

const profile = computed(() => profiles.find((item) => item.slug === String(route.params.personagem)) ?? profiles[0]);
const companionProfiles = computed(() => profile.value.companions.map((slug) => profiles.find((item) => item.slug === slug)).filter((item): item is (typeof profiles)[number] => Boolean(item)));

useHead(() => ({ title: `${profile.value.name} — A Chama do Último Reino` }));
</script>

<template>
  <main class="profile-shell" :class="`profile-${profile.tone}`">
    <header class="profile-header"><NuxtLink class="profile-brand" to="/"><img :src="art.logo" alt="Marca-runa da Chama do Último Reino" /><span><strong>A Chama</strong><small>do Último Reino</small></span></NuxtLink><ArchiveTopNav active="personagens" /></header>

    <section class="profile-hero"><div class="profile-title-block"><p class="eyebrow"><span />Registro {{ profile.number }} · {{ profile.archive }}</p><p class="profile-mark">{{ profile.mark }} · {{ profile.sigil }}</p><h1>{{ profile.name }}</h1><p class="profile-role">{{ profile.role }}</p><blockquote>“{{ profile.quote }}”</blockquote></div><figure class="profile-portrait"><img :src="profile.image" :alt="`Retrato de ${profile.name}`" /><figcaption>TESTEMUNHA VIVA · {{ profile.number }}</figcaption></figure></section>

    <section class="profile-dossier"><aside class="profile-facts"><p class="eyebrow"><span />Ficha de procedência</p><dl><div><dt>Vínculo</dt><dd>{{ profile.affiliation }}</dd></div><div><dt>Instrumento</dt><dd>{{ profile.instrument }}</dd></div><div><dt>Sigilo</dt><dd>{{ profile.sigil }}</dd></div><div><dt>Registro</dt><dd>{{ profile.archive }}</dd></div></dl></aside><article class="profile-biography"><p class="eyebrow"><span />Biografia recuperada</p><h2>Nem todo caminho<br /><em>começa como escolha.</em></h2><div class="profile-copy"><p v-for="paragraph in profile.bio" :key="paragraph">{{ paragraph }}</p></div></article></section>

    <section class="profile-regions"><div class="profile-section-heading"><p class="eyebrow"><span />Vínculos de expedição</p><h2>Regiões que<br /><em>deixaram marca.</em></h2><p>Estas são as geografias que atravessam o registro de {{ profile.name }}. Cada ficha conduz diretamente à carta de Asterion.</p></div><div class="region-links"><NuxtLink v-for="region in profile.regions" :key="region.slug" class="region-link" :to="{ path: '/mapa', query: { regiao: region.slug } }"><img :src="region.image" :alt="region.name" /><span class="region-link-overlay" /><div><small>{{ region.label }} · abrir carta</small><h3>{{ region.name }}</h3><p>{{ region.text }}</p><b>Ver no mapa <i>↗</i></b></div></NuxtLink></div></section>

    <section class="profile-companions"><p class="eyebrow"><span />Outros registros</p><div><h2>A companhia<br /><em>não termina aqui.</em></h2><nav aria-label="Dossiês relacionados"><NuxtLink v-for="companion in companionProfiles" :key="companion.slug" :to="`/personagens/${companion.slug}`" class="companion-link" :class="`companion-${companion.tone}`"><img :src="companion.image" :alt="companion.name" /><span><small>{{ companion.role }}</small><strong>{{ companion.name }}</strong></span><i>↗</i></NuxtLink></nav></div></section>

    <footer class="profile-footer"><NuxtLink to="/"><img :src="art.logo" alt="" />Retornar ao arquivo principal</NuxtLink><span>O mundo estava cheio de caminhos.</span></footer>
  </main>
</template>
