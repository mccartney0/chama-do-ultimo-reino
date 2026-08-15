<!--
  Arquivo das Cinzas — romantismo gótico editorial.
  Carvão, marfim, Azul Vigília e detalhes de brasa estruturam a experiência como um códice encontrado.
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const art = {
  logo: "/manus-storage/chama-runa-logo_9a8ac0b6.png",
  archive: "/manus-storage/asterion-archive-banner_ccb0ec7d.jpg",
  kaelDharen: "/manus-storage/kael-syous-ruinas_f866a354.png",
  companhia: "/manus-storage/companhia-asterion_0d53947c.png",
  grimoire: "/manus-storage/grimorio-vigilia_27affe06.jpg",
  north: "/manus-storage/casa-sem-sol_f47fcdf4.jpg",
  kaelPortrait: "/manus-storage/kael-retrato_ae7eda73.png",
  dharenPortrait: "/manus-storage/dharen-retrato_4f422802.png",
  lyraPortrait: "/manus-storage/lyra-retrato_b043ad7e.png",
  miraPortrait: "/manus-storage/mira-retrato_236b1e36.png",
  nareth: "/manus-storage/asterion-ruinas-circulares_e3e24642.jpg",
  asterion: "/manus-storage/asterion-cidade-quebrada_99e3ed07.jpg",
  ferasCorrompidas: "/manus-storage/asterion-corrompido_a6840b8f.jpg",
  sentinela: "/manus-storage/asterion-sentinela-sombra_c0f8c591.jpg",
  map: "/manus-storage/mapa-asterion-expedicao_984d2fe0.jpg",
  ferrosul: "/manus-storage/ferrosul-forjas_1dd3ffc2.jpg",
  casaDosEcos: "/manus-storage/casa-dos-ecos_84c5ded9.jpg",
};

const navigation = [
  ["A história", "historia"],
  ["A Vigília", "vigilia"],
  ["Personagens", "personagens"],
  ["Livro I", "livro"],
] as const;

const characters = [
  {
    slug: "kael", name: "Kael Auren", role: "O ferreiro da chama azul", mark: "KA · 19", tone: "blue",
    image: art.kaelPortrait,
    sigil: "kael",
    sigilName: "Chama da Memória",
    description: "Um aprendiz de ferreiro de Ferrosul que descobre uma chama azul impossível — e vozes que sabem mais sobre ele do que ele próprio.",
    detail: "Herança: Memória · Arte: fogo azul · Objeto: grimório",
    biography: ["Kael cresceu entre metal quente, carvão e a segurança pequena de Ferrosul. A forja lhe ensinou que toda matéria tem um limite — até a noite em que uma chama azul respondeu às suas mãos.", "O que parecia acidente se torna herança. Ao ouvir vozes que pertencem a uma história selada, Kael precisa decidir se será definido por um passado que não escolheu ou pelo caminho que constrói com a própria vontade."],
    archive: "Ferrosul · testemunha da Memória",
  },
  {
    slug: "dharen", name: "Dharen Varenn", role: "O Caminhante de Prata", mark: "DV · 39", tone: "gold",
    image: art.dharenPortrait,
    sigil: "dharen",
    sigilName: "Lâmina do Caminho",
    description: "Viajante, caçador de criaturas e especialista em decisões questionáveis. Dharen luta com energia mística e uma espada rúnica; por trás do humor, carrega a culpa de um passado que a Coroa preferiria enterrar.",
    detail: "Herança: Varenn · Arte: energia mística · Marca: prata",
    biography: ["Dharen Varenn aprendeu cedo que sobreviver é uma arte de passos curtos e promessas medidas. A espada rúnica em suas mãos carrega prata, percurso e a responsabilidade de escolhas que a Coroa preferia manter enterradas.", "Ele usa humor quando a verdade fica pesada demais, mas não foge do custo das próprias decisões. No Laço Astral com Kael, Dharen encontra algo que não planejava: alguém que torna impossível carregar o peso sozinho."],
    archive: "Estradas de Asterion · arquivo Varenn",
  },
  {
    slug: "lyra", name: "Lyra", role: "A arqueira que reconstrói", mark: "LY · CCB", tone: "moss",
    image: art.lyraPortrait,
    sigil: "lyra",
    sigilName: "Arco do Norte",
    description: "Ex-integrante da Companhia do Cervo Branco, Lyra atravessa as ruínas sem conceder ao passado o direito de decidir tudo.",
    detail: "Arma: arco · Vínculo: Cervo Branco · Norte: reconstrução",
    biography: ["Lyra foi moldada pela Companhia do Cervo Branco, onde aprendeu a ler uma rota, um silêncio e a distância entre ameaça e sobrevivência. Seu arco não é apenas uma arma: é a disciplina de alguém que se recusa a desperdiçar um gesto.", "Ela conhece o que as ruínas tomam de quem tenta reconstruir. Ainda assim, escolhe caminhar, ajudando a companhia a não confundir cautela com paralisia e memória com sentença."],
    archive: "Cervo Branco · rota de reconstrução",
  },
  {
    slug: "mira", name: "Mira", role: "A chave sem dentes", mark: "MI · GC", tone: "ember",
    image: art.miraPortrait,
    sigil: "mira",
    sigilName: "Chave sem Dentes",
    description: "Larápia, sobrevivente e dona de uma honestidade seletiva. Mira abre o que ninguém quer que seja aberto — portas, registros e conversas.",
    detail: "Arte: infiltração · Objeto: Chave sem Dentes · Guilda: Caminhos",
    biography: ["Mira aprendeu nas margens da Guilda dos Caminhos que nenhuma fechadura é tão simples quanto parece. Ela entra onde não foi chamada, lê registros que outros preferem queimar e transforma desconfiança em uma ferramenta afiada.", "Por trás da ironia, Mira guarda a sensibilidade de quem sabe quanto custa depender de uma porta trancada. A Chave sem Dentes é seu lembrete: nem todo acesso precisa ser concedido para ser encontrado."],
    archive: "Guilda dos Caminhos · acesso não autorizado",
  },
] as const;

const conceptArt = [
  { title: "Kael · Fogo azul", note: "Estudo de personagem · 01", image: art.kaelPortrait, tone: "blue", description: "O fogo azul não é arma comum: é uma memória que escolheu responder." },
  { title: "Dharen · Prata errante", note: "Estudo de personagem · 02", image: art.dharenPortrait, tone: "gold", description: "Prata rúnica, estrada longa e a escolha de não atravessar o mundo sozinho." },
  { title: "Lyra · Rota do cervo", note: "Estudo de personagem · 03", image: art.lyraPortrait, tone: "moss", description: "A arqueira lê a mata, as ruínas e os silêncios antes de cada disparo." },
  { title: "Mira · A chave", note: "Estudo de personagem · 04", image: art.miraPortrait, tone: "ember", description: "Nenhuma porta parece definitiva quando Mira decide que um registro precisa ser aberto." },
  { title: "A companhia", note: "Registro de travessia · 05", image: art.companhia, tone: "archive", description: "Quatro caminhos que se encontram diante das ruínas e se recusam a seguir isolados." },
] as const;

const asterionRecords = [
  { title: "Ruínas de Nareth", category: "Cenário", note: "ARQ. NAR · 612", image: art.nareth, tone: "nareth", description: "Um vale circular onde a floresta esconde torres partidas, pontes que terminam no vazio e um templo de pedra negra guardado sob raízes. Os sinos enterrados anunciam que a ruína ainda observa." },
  { title: "Asterion após a queda", category: "Cenário", note: "ARQ. AST · 800", image: art.asterion, tone: "city", description: "Monumentos, arcos e caminhos cerimoniais persistem entre cinzas e água escura. A cidade não é apenas uma lembrança: suas pedras ainda disputam o direito de definir o futuro." },
  { title: "Feras marcadas", category: "Criatura", note: "BEST. C-08", image: art.ferasCorrompidas, tone: "beast", description: "Animais corrompidos surgem além das ruínas antigas, com placas cinzentas no peito e a marca negra da coroa entre três chamas. São rastros de uma corrupção que já não respeita fronteiras." },
  { title: "Sentinela de sombra", category: "Criatura", note: "BEST. S-03", image: art.sentinela, tone: "sentinel", description: "Estudo conceitual de uma presença vista nas rotas seladas: pedra, fumaça e vigília antiga reunidas sob os arcos desabados. Onde ela permanece, a passagem exige cautela." },
] as const;

const mapRegions = [
  { name: "Ferrosul", note: "FORJA · ROTA DE ORIGEM", tooltip: "Onde a chama azul despertou", image: art.ferrosul, x: "22%", y: "31%", tone: "ember", sound: 196, description: "Uma pequena vila de forjas, rio estreito e fumaça de carvão. Foi ali que Kael descobriu que a chama azul não deveria existir — e que nenhuma origem permanece simples quando o passado desperta." },
  { name: "Nareth", note: "RUÍNAS · REGISTRO 612", tooltip: "Sinos enterrados sob as raízes", image: art.nareth, x: "76%", y: "25%", tone: "blue", sound: 264, description: "No vale circular, torres e pontes quebradas desaparecem entre raízes. Nareth guarda bibliotecas, templos e sinos enterrados que respondem a quem se aproxima com a pergunta errada." },
  { name: "Asterion", note: "CIDADE · APÓS A QUEDA", tooltip: "O coração rachado do reino", image: art.asterion, x: "58%", y: "69%", tone: "gold", sound: 220, description: "O coração rachado do reino ainda sustenta arcos, canais e caminhos cerimoniais. Entre cinzas e pedra molhada, a cidade resiste à tentativa de ser reduzida a um único nome ou rei." },
  { name: "Casa dos Ecos", note: "SANTUÁRIO · SELO FINAL", tooltip: "Toda resposta cobra uma memória", image: art.casaDosEcos, x: "26%", y: "73%", tone: "ivory", sound: 308, description: "Um santuário de círculos de pedra, poeira e memória acumulada. A Casa dos Ecos não oferece respostas prontas: exige que cada visitante reconheça a escolha escondida em seu próprio registro." },
] as const;

const allArtwork = [...conceptArt, ...asterionRecords] as const;

const chapters = [
  { id: "01", label: "A faísca", title: "Coisas que um Ferreiro Não Deveria Fazer", text: "Em Ferrosul, Kael aprende que magia, botas incendiadas e segredos de família raramente terminam bem. Quando a Coroa chega, fugir deixa de ser escolha." },
  { id: "02", label: "A rota", title: "Encontre Nareth", text: "Uma mensagem impossível aponta para Nareth. Entre arquivos abandonados e estradas caçadas, o grupo descobre que algumas bibliotecas guardam testemunhas — não tesouros." },
  { id: "03", label: "O vínculo", title: "Quatro Caminhos, Uma Vigília", text: "Kael e Dharen atravessam um ritual antigo e passam a compartilhar intenção. O Laço Astral não entrega força: torna impossível ignorar o que o outro carrega." },
  { id: "04", label: "Os fragmentos", title: "Memória, Essência e Vontade", text: "Com Malgor se erguendo entre ruínas e a Coroa ocupando Asterion, os Fragmentos deixam de ser relíquias. Tornam-se perguntas sobre o que vale ser lembrado." },
  { id: "05", label: "A escolha", title: "O Último Selo", text: "A Casa dos Ecos revela a verdade: o último selo não é uma prisão. É uma escolha. E nenhum caminho pertence a um rei quando alguém decide testemunhar." },
] as const;

const relations = [
  {
    person: "Kael Auren", sigil: "KA", label: "Laço Astral", type: "confiança escolhida",
    text: "O ritual entre os dois tornou impossível fingir que o peso do outro não existe. Dharen protege Kael, mas também o obriga a encarar o que tenta carregar sozinho.",
    accent: "blue",
  },
  {
    person: "Lyra", sigil: "LY", label: "Confiança de rota", type: "leitura do perigo",
    text: "Lyra não se deixa distrair pelo humor de Dharen; ele reconhece nela alguém que mede uma sala antes de entrar. Entre os dois, a confiança se constrói em escolhas pequenas e precisas.",
    accent: "moss",
  },
  {
    person: "Mira", sigil: "MI", label: "Ironia e sobrevivência", type: "aliança improvável",
    text: "Mira gosta da franqueza torta de Dharen. Ele, por sua vez, vê nela uma sobrevivente que entende quando uma porta — ou uma promessa — não merece confiança.",
    accent: "ember",
  },
] as const;

const isMenuOpen = ref(false);
const scrolled = ref(false);
const progress = ref(0);
const activeCharacter = ref(0);
const activeChapter = ref(0);
const activeRelation = ref(0);
const copied = ref(false);
const showChapterModal = ref(false);
const newsletterEmail = ref("");
const newsletterState = ref<"idle" | "invalid" | "submitting" | "success">("idle");
const showBioModal = ref(false);
const activeArtwork = ref<number | null>(null);
const activeMapRegion = ref(0);
const showMapModal = ref(false);
const soundEnabled = ref(true);
let archiveAudioContext: AudioContext | null = null;

const selectedCharacter = computed(() => characters[activeCharacter.value]);
const selectedChapter = computed(() => chapters[activeChapter.value]);
const selectedRelation = computed(() => relations[activeRelation.value]);
const chapterProgress = computed(() => ((activeChapter.value + 1) / chapters.length) * 100);
const selectedArtwork = computed(() => activeArtwork.value === null ? null : allArtwork[activeArtwork.value]);
const selectedMapRegion = computed(() => mapRegions[activeMapRegion.value]);

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function chooseNavigation(id: string) {
  isMenuOpen.value = false;
  window.setTimeout(() => scrollToId(id), 70);
}

async function copyQuote() {
  try {
    await navigator.clipboard.writeText("O último selo não é uma prisão. É uma escolha.");
    copied.value = true;
    window.setTimeout(() => (copied.value = false), 1800);
  } catch {
    copied.value = false;
  }
}

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrolled.value = window.scrollY > 16;
  progress.value = max > 0 ? Math.min((window.scrollY / max) * 100, 100) : 0;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    showChapterModal.value = false;
    showBioModal.value = false;
    activeArtwork.value = null;
    showMapModal.value = false;
  }
}

function playArchiveTone(frequency = 220) {
  if (!soundEnabled.value || typeof window === "undefined" || !window.AudioContext) return;
  archiveAudioContext ??= new window.AudioContext();
  const now = archiveAudioContext.currentTime;
  const gain = archiveAudioContext.createGain();
  const bell = archiveAudioContext.createOscillator();
  const echo = archiveAudioContext.createOscillator();
  bell.type = "sine";
  echo.type = "triangle";
  bell.frequency.setValueAtTime(frequency, now);
  bell.frequency.exponentialRampToValueAtTime(frequency * 1.48, now + 0.34);
  echo.frequency.setValueAtTime(frequency / 2, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.026, now + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
  bell.connect(gain); echo.connect(gain); gain.connect(archiveAudioContext.destination);
  bell.start(now); echo.start(now + 0.05); bell.stop(now + 0.74); echo.stop(now + 0.64);
}

function openArtwork(index: number) {
  activeArtwork.value = index;
  playArchiveTone(246 + index * 13);
}

function selectMapRegion(index: number) {
  activeMapRegion.value = index;
  playArchiveTone(mapRegions[index].sound);
}

function openMapModal() {
  showMapModal.value = true;
  playArchiveTone(selectedMapRegion.value.sound * 1.12);
}

async function submitNewsletter() {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.value.trim());
  if (!isValidEmail) {
    newsletterState.value = "invalid";
    return;
  }

  newsletterState.value = "submitting";
  await new Promise((resolve) => window.setTimeout(resolve, 850));
  window.localStorage.setItem("chama-ultimo-reino-newsletter", "interest-recorded");
  newsletterEmail.value = "";
  newsletterState.value = "success";
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <main class="site-shell">
    <ScrollMotion />
    <div class="reading-progress" :style="{ transform: `scaleX(${progress / 100})` }" aria-hidden="true" />
    <div class="route-spine" aria-hidden="true"><i /><b>✦</b><i /><b>✦</b><i /></div>

    <header class="site-header" :class="{ 'is-scrolled': scrolled }">
      <a class="brand" href="#top" aria-label="Voltar ao início" @click.prevent="scrollToId('top')">
        <img class="brand-mark" :src="art.logo" alt="Marca-runa da Chama do Último Reino" />
        <span class="brand-copy"><strong>A Chama</strong><small>do Último Reino</small></span>
      </a>

      <nav class="desktop-nav" aria-label="Navegação principal">
        <template v-for="([label, id]) in navigation" :key="id"><NuxtLink v-if="id === 'personagens'" to="/personagens">{{ label }}</NuxtLink><button v-else type="button" @click="chooseNavigation(id)">{{ label }}</button></template>
      </nav>

      <button class="nav-cta" type="button" @click="showChapterModal = true">Ler o primeiro capítulo <span>↗</span></button>
      <button class="menu-trigger" type="button" :aria-label="isMenuOpen ? 'Fechar menu' : 'Abrir menu'" :aria-expanded="isMenuOpen" @click="isMenuOpen = !isMenuOpen">{{ isMenuOpen ? '×' : '☰' }}</button>

      <div v-if="isMenuOpen" class="mobile-menu">
        <template v-for="([label, id], index) in navigation" :key="id"><NuxtLink v-if="id === 'personagens'" to="/personagens" @click="isMenuOpen = false"><span>0{{ index + 1 }}</span>{{ label }}<b>→</b></NuxtLink><button v-else type="button" @click="chooseNavigation(id)"><span>0{{ index + 1 }}</span>{{ label }}<b>→</b></button></template>
        <button type="button" class="mobile-read" @click="showChapterModal = true; isMenuOpen = false">Ler o primeiro capítulo</button>
      </div>
    </header>

    <section id="top" class="hero">
      <img class="hero-atmosphere" data-parallax="0.045" :src="art.archive" alt="Ruínas noturnas de Asterion sob a lua" />
      <div class="hero-vignette" aria-hidden="true" />
      <div class="ember-specks" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <div class="hero-grid">
        <div class="hero-copy" data-reveal="left">
          <p class="eyebrow"><span />Arquivo recuperado · Livro I</p>
          <h1><em>A Chama</em><br />do Último Reino</h1>
          <p class="hero-intro">O rei foi selado. A memória não.</p>
          <p class="hero-summary">Oito séculos após a queda de Asterion, uma chama azul desperta nas mãos de um jovem ferreiro — e chama de volta tudo o que o mundo tentou esquecer.</p>
          <div class="hero-actions">
            <button class="button button-primary" type="button" @click="scrollToId('historia')">▣ Conhecer a história</button>
            <button class="text-action" type="button" @click="showChapterModal = true">Ler primeiro capítulo <span>↗</span></button>
          </div>
        </div>
        <div class="hero-art-frame" data-reveal="right" data-reveal-delay="120">
          <span class="art-index">ARQ. 00 / VIGÍLIA</span>
          <img :src="art.kaelDharen" alt="Kael e Dharen entre as ruínas de Asterion" />
          <div class="art-edge-note">Fogo azul<br />e prata</div>
          <span class="frame-corner corner-tl" /><span class="frame-corner corner-br" />
        </div>
      </div>
      <button class="hero-scroll" type="button" @click="scrollToId('historia')"><span>Continue a leitura</span><i /></button>
    </section>

    <section class="stat-ribbon" aria-label="Dados sobre o livro" data-reveal>
      <div><strong>800</strong><span>anos de silêncio</span></div><div><strong>12</strong><span>capítulos e epílogo</span></div><div><strong>1</strong><span>rei que não morreu</span></div><div><strong>3</strong><span>fragmentos a proteger</span></div>
    </section>

    <section id="historia" class="story-section section-pad">
      <div class="section-rail"><span>01</span><i /><small>O que foi esquecido</small></div>
      <div class="story-layout" data-reveal>
        <div class="story-lede"><p class="eyebrow dark"><span />A história</p><h2>Quando a chama escolhe<br /><em>um ferreiro.</em></h2></div>
        <div class="story-body">
          <p class="dropcap">Asterion queimou quando Malgor, o Rei das Cinzas, atravessou a morte. Cinco guerreiros o selaram usando um cristal que se partiu em três, jurando esconder os fragmentos antes que o rei pudesse retornar.</p>
          <p>Oito séculos depois, em uma vila pequena demais para guardar segredos, Kael descobre que a magia azul em suas mãos não é acidente. Ao lado de Dharen, um viajante com uma espada rúnica e memórias que não conta, ele parte por estradas onde a Coroa já procura seu nome.</p>
          <p>Entre bibliotecas esquecidas e uma cidade que se recusa a obedecer ao seu antigo trono, a travessia revela que a maior prisão pode ser a história escrita por quem tinha poder para vencê-la.</p>
          <button class="inline-link" type="button" @click="scrollToId('livro')">Ver o percurso do Livro I <span>↓</span></button>
        </div>
      </div>
    </section>

    <section class="quote-band" aria-label="Citação do livro" data-reveal>
      <div class="quote-ornament">“</div><blockquote>“O último selo não é uma prisão.<br /><em>É uma escolha.</em>”</blockquote>
      <div class="quote-tools"><span>Casa dos Ecos · Registro final</span><button type="button" @click="copyQuote">{{ copied ? '✓ Copiado' : '▣ Copiar' }}</button></div>
    </section>

    <section id="vigilia" class="vigil-section section-pad">
      <div class="section-rail section-rail-light"><span>02</span><i /><small>Entre a memória e o caminho</small></div>
      <div class="vigil-grid" data-reveal>
        <div class="vigil-image-wrap"><img :src="art.grimoire" alt="Grimório e fragmento do cristal de Asterion" /><div class="image-caption">✦ Fragmento de registro — Nareth</div></div>
        <div class="vigil-copy"><p class="eyebrow"><span />A Vigília</p><h2>Nem toda magia<br />quer ser <em>possuída.</em></h2><p>O poder em A Chama do Último Reino não existe para coroar alguém. A Vigília reúne pessoas e vestígios em torno de uma tarefa mais difícil: testemunhar o que aconteceu sem permitir que o passado decida o próximo passo.</p>
          <div class="lore-list"><div><b class="lore-icon blue">✦</b><p><strong>Memória</strong><small>O que ainda pode mudar você.</small></p></div><div><b class="lore-icon gold">⚔</b><p><strong>Essência</strong><small>Aquilo que responde ao que é oferecido.</small></p></div><div><b class="lore-icon ivory">⌁</b><p><strong>Vontade</strong><small>O caminho que alguém escolhe seguir.</small></p></div></div>
        </div>
      </div>
    </section>

    <section id="personagens" class="characters-section section-pad">
      <div class="section-rail"><span>03</span><i /><small>Os que seguem</small></div>
      <div class="characters-heading" data-reveal><div><p class="eyebrow dark"><span />Personagens</p><h2>Quatro caminhos.<br /><em>Nenhum passa sozinho.</em></h2></div><p>Quando o passado insiste em voltar, a companhia não nasce da profecia — mas da decisão de seguir junto.</p></div>
      <div class="character-display" data-reveal data-reveal-delay="110">
        <div class="character-tabs" role="tablist" aria-label="Personagens principais"><button v-for="(character, index) in characters" :key="character.name" type="button" :class="{ selected: activeCharacter === index }" role="tab" :aria-selected="activeCharacter === index" @click="activeCharacter = index"><span class="char-number">0{{ index + 1 }}</span><span><span class="character-name-line"><i class="character-sigil" :class="`sigil-${character.sigil}`" aria-hidden="true"><b /><b /><b /></i><strong>{{ character.name }}</strong></span><small>{{ character.role }}</small></span><b>›</b></button></div>
        <article class="character-detail" :class="`tone-${selectedCharacter.tone}`" aria-live="polite"><div class="character-detail-top"><span>{{ selectedCharacter.mark }}</span><span class="detail-sigil"><i class="character-sigil detail-sigil-art" :class="`sigil-${selectedCharacter.sigil}`" aria-hidden="true"><b /><b /><b /></i></span></div><p class="detail-role">{{ selectedCharacter.role }}</p><h3>{{ selectedCharacter.name }}</h3><p class="detail-description">{{ selectedCharacter.description }}</p><p class="sigil-caption">{{ selectedCharacter.sigilName }}</p><div class="detail-meta">⌖ {{ selectedCharacter.detail }}</div><NuxtLink class="character-dossier-link" :to="`/personagens/${selectedCharacter.slug}`">Abrir dossiê completo <span>↗</span></NuxtLink><div class="character-pip-row" aria-hidden="true"><i v-for="(_, index) in characters" :key="index" :class="{ active: activeCharacter === index }" /></div></article>
        <button class="character-portrait" :class="`portrait-${selectedCharacter.tone}`" type="button" :aria-label="`Ler a biografia de ${selectedCharacter.name}`" @click="showBioModal = true">
          <span class="portrait-seal" aria-hidden="true">✦</span>
          <Transition name="portrait-reveal" mode="out-in">
            <img :key="selectedCharacter.name" :src="selectedCharacter.image" :alt="`Retrato de ${selectedCharacter.name}`" />
          </Transition>
          <div class="portrait-label"><span>Registro individual · clique para abrir</span><strong>{{ selectedCharacter.name }} · {{ selectedCharacter.mark }}</strong></div>
        </button>
      </div>
    </section>

    <section id="galeria" class="concept-gallery section-pad">
      <div class="section-rail section-rail-light"><span>04</span><i /><small>Vestígios de companhia</small></div>
      <div class="gallery-heading" data-reveal><div><p class="eyebrow"><span />Galeria de arquivo</p><h2>Retratos de uma<br /><em>travessia.</em></h2></div><p>Peças conceituais recuperadas da rota entre Ferrosul, Nareth e Asterion. Selecione um estudo para examinar a marca de cada viajante.</p></div>
      <div class="art-grid" data-reveal data-reveal-delay="110"><button v-for="(piece, index) in conceptArt" :key="piece.title" type="button" class="art-tile" :class="`art-${piece.tone}`" @click="openArtwork(index)"><img :src="piece.image" :alt="piece.title" /><span class="art-scrim" /><span class="art-note">{{ piece.note }}</span><strong>{{ piece.title }}</strong><i>↗</i></button></div>
    </section>

    <section id="asterion" class="asterion-gallery section-pad">
      <div class="section-rail"><span>05</span><i /><small>Mapas, ruínas e ameaças</small></div>
      <div class="asterion-heading" data-reveal><div><p class="eyebrow dark"><span />Registros de Asterion</p><h2>O mundo que ainda<br /><em>lembra de queimar.</em></h2></div><p>Quatro peças de arquivo para atravessar as ruínas, reconhecer suas marcas e observar as presenças que a Coroa deixou escapar.</p></div>
      <div class="asterion-records" data-reveal data-reveal-delay="110"><button v-for="(record, index) in asterionRecords" :key="record.title" type="button" class="asterion-card" :class="`record-${record.tone}`" @click="openArtwork(conceptArt.length + index)"><img :src="record.image" :alt="record.title" /><div class="record-copy"><span>{{ record.category }} · {{ record.note }}</span><h3>{{ record.title }}</h3><p>{{ record.description }}</p><b>Examinar registro <i>↗</i></b></div></button></div>
    </section>

    <section id="mapa" class="asterion-map-section section-pad">
      <div class="section-rail section-rail-light"><span>06</span><i /><small>Esquema de expedição · sem escala</small></div>
      <div class="map-heading" data-reveal><div><p class="eyebrow"><span />Mapa da Vigília</p><h2>Quatro pontos.<br /><em>Uma rota impossível.</em></h2></div><div class="map-heading-actions"><NuxtLink class="map-atlas-link" to="/mapa">Abrir carta ampliada <span>↗</span></NuxtLink><div class="map-sound-control"><span>Som de registro</span><button type="button" :class="{ active: soundEnabled }" :aria-pressed="soundEnabled" @click="soundEnabled = !soundEnabled">{{ soundEnabled ? 'Ativado' : 'Silenciado' }} <i>{{ soundEnabled ? '◖' : '○' }}</i></button></div></div></div>
      <div class="map-explorer" data-reveal data-reveal-delay="110">
        <div class="map-canvas"><img data-parallax="0.035" :src="art.map" alt="Mapa de expedição de Asterion com rotas entre Ferrosul, Nareth, Asterion e Casa dos Ecos" /><svg class="map-route-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="route-ghost" d="M22 31 C38 16 63 16 76 25 S70 55 58 69 S37 78 26 73" /><path class="route-pulse route-pulse-one" d="M22 31 C38 16 63 16 76 25" /><path class="route-pulse route-pulse-two" d="M76 25 S70 55 58 69" /><path class="route-pulse route-pulse-three" d="M58 69 S37 78 26 73" /></svg><span class="map-caption">ARQ. VIG · percurso estimado</span><button v-for="(region, index) in mapRegions" :key="region.name" type="button" class="map-hotspot" :class="[{ active: activeMapRegion === index }, `hotspot-${region.tone}`]" :style="{ left: region.x, top: region.y }" :aria-label="`Selecionar ${region.name}`" :aria-describedby="`map-tooltip-${index}`" @click="selectMapRegion(index)"><i /><span class="map-hotspot-label">{{ region.name }}</span><span :id="`map-tooltip-${index}`" class="map-tooltip" role="tooltip"><small>{{ region.note }}</small><b>{{ region.tooltip }}</b><em>Selecionar registro <span>↗</span></em></span></button></div>
        <article class="map-record" :class="`map-${selectedMapRegion.tone}`" aria-live="polite"><img :src="selectedMapRegion.image" :alt="selectedMapRegion.name" /><div><p>{{ selectedMapRegion.note }}</p><h3>{{ selectedMapRegion.name }}</h3><p class="map-description">{{ selectedMapRegion.description }}</p><button type="button" @click="openMapModal">Abrir registro completo <span>↗</span></button></div></article>
      </div>
    </section>

    <section id="relacoes" class="relations-section section-pad">
      <div class="section-rail section-rail-light"><span>07</span><i /><small>Vínculos em movimento</small></div>
      <div class="relations-heading" data-reveal><div><p class="eyebrow"><span />Arquivo de Dharen</p><h2>O caminho de um homem<br />é feito de <em>quem fica.</em></h2></div><p>Selecione uma marca para percorrer os vínculos que Dharen constrói na travessia.</p></div>
      <div class="relation-stage" data-reveal data-reveal-delay="110">
        <figure class="dharen-portrait" tabindex="0" aria-label="Retrato de Dharen; passe o mouse para revelar uma frase">
          <img :src="art.kaelDharen" alt="Dharen Varenn com espada rúnica em Asterion" />
          <figcaption><span>DV · 39</span><strong>Dharen Varenn</strong></figcaption>
          <div class="dharen-hover-quote"><small>Registro de Dharen</small><blockquote>“Uma espada resolve muita coisa.<br /><em>O resto precisa de companhia.</em>”</blockquote></div>
        </figure>
        <div class="relation-console">
          <div class="relation-tabs" role="tablist" aria-label="Relações de Dharen"><button v-for="(relation, index) in relations" :key="relation.person" type="button" :class="[{ active: activeRelation === index }, relation.accent]" role="tab" :aria-selected="activeRelation === index" @click="activeRelation = index"><span>{{ relation.sigil }}</span><strong>{{ relation.person }}</strong><i /></button></div>
          <article class="relation-card" :class="`relation-${selectedRelation.accent}`" aria-live="polite"><p class="relation-index">VÍNCULO 0{{ activeRelation + 1 }} <span>{{ selectedRelation.type }}</span></p><h3>{{ selectedRelation.label }}</h3><p>{{ selectedRelation.text }}</p><div class="relation-line"><i /><b>DHAREN</b><i /></div></article>
        </div>
      </div>
    </section>

    <section id="livro" class="book-section section-pad">
      <div class="section-rail section-rail-light"><span>08</span><i /><small>Livro I · A travessia</small></div>
      <div class="book-heading" data-reveal><div><p class="eyebrow"><span />Livro I</p><h2>Todo caminho deixa<br /><em>um fragmento.</em></h2></div><button type="button" class="button book-read" @click="showChapterModal = true">Ler primeiro capítulo <span>↗</span></button></div>
      <div class="book-layout" data-reveal data-reveal-delay="110"><div class="chapter-list" role="tablist" aria-label="Percurso de capítulos"><button v-for="(chapter, index) in chapters" :key="chapter.id" type="button" :class="{ selected: activeChapter === index }" role="tab" :aria-selected="activeChapter === index" @click="activeChapter = index"><span>{{ chapter.id }}</span><b>{{ chapter.label }}</b><i>↗</i></button></div><article class="chapter-detail" aria-live="polite"><div class="chapter-top"><span>CAPÍTULO {{ selectedChapter.id }}</span><span>{{ selectedChapter.label }}</span></div><h3>{{ selectedChapter.title }}</h3><p>{{ selectedChapter.text }}</p><div class="chapter-progress"><i :style="{ width: `${chapterProgress}%` }" /></div><button type="button" class="chapter-link" @click="showChapterModal = true">Ler o início <span>↗</span></button></article></div>
    </section>

    <section class="north-section"><img :src="art.north" alt="Estrada sombria seguindo para o norte" /><div class="north-overlay" /><div class="north-content"><img class="closing-rune" :src="art.logo" alt="" /><p class="eyebrow"><span />Após o Livro I</p><h2>A estrada<br />continua <em>ao norte.</em></h2><p>Uma nova rota, uma ferida impossível e três pessoas que já não podem fingir que não ouviram a chama.</p><button class="button button-primary" type="button" @click="showChapterModal = true">Ler o primeiro capítulo</button></div></section>

    <section id="novidades" class="newsletter-section section-pad">
      <div class="newsletter-stamp" aria-hidden="true">✦<span>VIGÍLIA</span>✦</div>
      <div class="newsletter-copy"><p class="eyebrow dark"><span />Correspondência da Vigília</p><h2>Quando a estrada<br />seguir, <em>saiba primeiro.</em></h2><p>Receba notícias do Livro I, novos trechos e os próximos registros recuperados de Asterion.</p></div>
      <form class="newsletter-form" novalidate @submit.prevent="submitNewsletter">
        <label for="newsletter-email">Seu endereço de e-mail</label>
        <div class="newsletter-field"><input id="newsletter-email" v-model="newsletterEmail" type="email" name="email" autocomplete="email" placeholder="seu@email.com" :aria-invalid="newsletterState === 'invalid'" :disabled="newsletterState === 'submitting' || newsletterState === 'success'" required /><button type="submit" :disabled="newsletterState === 'submitting' || newsletterState === 'success'"><span v-if="newsletterState === 'submitting'" class="newsletter-spinner" aria-hidden="true" />{{ newsletterState === 'submitting' ? 'Registrando...' : newsletterState === 'success' ? 'Registro marcado' : 'Entrar na Vigília' }}<span v-if="newsletterState !== 'submitting'">{{ newsletterState === 'success' ? '✓' : '↗' }}</span></button></div>
        <p v-if="newsletterState === 'invalid'" class="form-feedback is-error" aria-live="polite">Informe um endereço de e-mail válido.</p>
        <p v-else-if="newsletterState === 'submitting'" class="form-feedback is-loading" aria-live="polite">Selando seu registro no arquivo…</p>
        <p v-else-if="newsletterState === 'success'" class="form-feedback is-success" aria-live="polite">✓ Seu interesse foi registrado. Quando o provedor de newsletter for conectado, esta é a rota que receberá as próximas inscrições.</p>
        <p v-else class="form-note">Formulário estático. Nenhuma mensagem é enviada sem sua confirmação.</p>
      </form>
    </section>

    <footer><a href="#top" @click.prevent="scrollToId('top')"><img :src="art.logo" alt="" />A Chama do Último Reino</a><span>Livro I · arquivo recuperado</span><button type="button" @click="scrollToId('top')">Voltar ao início ↑</button></footer>

    <div v-if="showBioModal" class="chapter-modal-backdrop bio-backdrop" role="presentation" @click.self="showBioModal = false"><section class="chapter-modal bio-modal" :class="`bio-${selectedCharacter.tone}`" role="dialog" aria-modal="true" :aria-labelledby="`bio-${selectedCharacter.sigil}`"><button class="modal-close" type="button" aria-label="Fechar biografia" @click="showBioModal = false">×</button><div class="bio-modal-head"><i class="character-sigil bio-sigil" :class="`sigil-${selectedCharacter.sigil}`" aria-hidden="true"><b /><b /><b /></i><div><p class="eyebrow dark"><span />Registro individual</p><p class="modal-kicker">{{ selectedCharacter.archive }}</p></div></div><h2 :id="`bio-${selectedCharacter.sigil}`">{{ selectedCharacter.name }}</h2><p class="bio-role">{{ selectedCharacter.role }} · {{ selectedCharacter.sigilName }}</p><div class="bio-layout"><img :src="selectedCharacter.image" :alt="`Retrato de ${selectedCharacter.name}`" /><div class="bio-copy"><p v-for="paragraph in selectedCharacter.biography" :key="paragraph">{{ paragraph }}</p><div class="bio-fact">{{ selectedCharacter.detail }}</div></div></div><button class="modal-end" type="button" @click="showBioModal = false">Fechar registro <span>×</span></button></section></div>

    <div v-if="selectedArtwork" class="chapter-modal-backdrop artwork-backdrop" role="presentation" @click.self="activeArtwork = null"><figure class="artwork-modal" role="dialog" aria-modal="true" :aria-labelledby="`artwork-${activeArtwork}`"><button class="modal-close" type="button" aria-label="Fechar obra" @click="activeArtwork = null">×</button><img :src="selectedArtwork.image" :alt="selectedArtwork.title" /><figcaption><span>{{ 'category' in selectedArtwork ? `${selectedArtwork.category} · ${selectedArtwork.note}` : selectedArtwork.note }}</span><h2 :id="`artwork-${activeArtwork}`">{{ selectedArtwork.title }}</h2><p>{{ selectedArtwork.description }}</p></figcaption></figure></div>

    <div v-if="showMapModal" class="chapter-modal-backdrop map-modal-backdrop" role="presentation" @click.self="showMapModal = false"><section class="map-modal" role="dialog" aria-modal="true" :aria-labelledby="`map-record-${activeMapRegion}`"><button class="modal-close" type="button" aria-label="Fechar registro" @click="showMapModal = false">×</button><img :src="selectedMapRegion.image" :alt="selectedMapRegion.name" /><div class="map-modal-copy"><p class="eyebrow"><span />Registro de expedição</p><p class="modal-kicker">{{ selectedMapRegion.note }}</p><h2 :id="`map-record-${activeMapRegion}`">{{ selectedMapRegion.name }}</h2><p>{{ selectedMapRegion.description }}</p><div class="map-modal-actions"><button type="button" @click="selectMapRegion((activeMapRegion + mapRegions.length - 1) % mapRegions.length)">← Anterior</button><button type="button" @click="selectMapRegion((activeMapRegion + 1) % mapRegions.length)">Próximo →</button></div></div></section></div>

    <div v-if="showChapterModal" class="chapter-modal-backdrop" role="presentation" @click.self="showChapterModal = false"><section class="chapter-modal" role="dialog" aria-modal="true" aria-labelledby="chapter-modal-title"><button class="modal-close" type="button" aria-label="Fechar leitura" @click="showChapterModal = false">×</button><p class="eyebrow dark"><span />Leitura de amostra</p><p class="modal-kicker">Capítulo I · Coisas que um Ferreiro Não Deveria Fazer</p><h2 id="chapter-modal-title">Uma bota incendiada<br />é um mau começo.</h2><div class="modal-rule"><i />Ferrosul · Registro inicial<i /></div><div class="chapter-excerpt"><p class="dropcap">Kael sabia três coisas sobre magia.</p><p>A primeira era que magos de verdade usavam cajados. A segunda era que magos de verdade passavam anos estudando em torres distantes, cercados por livros, velas e professores extremamente velhos.</p><p>E a terceira era que magos de verdade definitivamente não incendiavam as próprias botas tentando esquentar uma caneca de chá.</p><p>— Está queimando.</p><p>Kael continuou olhando para as próprias mãos.</p><p>— Eu sei.</p><p>— Sua bota.</p></div><button class="modal-end" type="button" @click="showChapterModal = false">Fechar a leitura <span>×</span></button></section></div>
  </main>
</template>
