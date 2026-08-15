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
};

const navigation = [
  ["A história", "historia"],
  ["A Vigília", "vigilia"],
  ["Personagens", "personagens"],
  ["Livro I", "livro"],
] as const;

const characters = [
  {
    name: "Kael Auren", role: "O ferreiro da chama azul", mark: "KA · 19", tone: "blue",
    description: "Um aprendiz de ferreiro de Ferrosul que descobre uma chama azul impossível — e vozes que sabem mais sobre ele do que ele próprio.",
    detail: "Herança: Memória · Arte: fogo azul · Objeto: grimório",
  },
  {
    name: "Dharen Varenn", role: "O Caminhante de Prata", mark: "DV · 39", tone: "gold",
    description: "Viajante, caçador de criaturas e especialista em decisões questionáveis. Dharen luta com energia mística e uma espada rúnica; por trás do humor, carrega a culpa de um passado que a Coroa preferiria enterrar.",
    detail: "Herança: Varenn · Arte: energia mística · Marca: prata",
  },
  {
    name: "Lyra", role: "A arqueira que reconstrói", mark: "LY · CCB", tone: "moss",
    description: "Ex-integrante da Companhia do Cervo Branco, Lyra atravessa as ruínas sem conceder ao passado o direito de decidir tudo.",
    detail: "Arma: arco · Vínculo: Cervo Branco · Norte: reconstrução",
  },
  {
    name: "Mira", role: "A chave sem dentes", mark: "MI · GC", tone: "ember",
    description: "Larápia, sobrevivente e dona de uma honestidade seletiva. Mira abre o que ninguém quer que seja aberto — portas, registros e conversas.",
    detail: "Arte: infiltração · Objeto: Chave sem Dentes · Guilda: Caminhos",
  },
] as const;

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
const newsletterState = ref<"idle" | "invalid" | "ready">("idle");

const selectedCharacter = computed(() => characters[activeCharacter.value]);
const selectedChapter = computed(() => chapters[activeChapter.value]);
const selectedRelation = computed(() => relations[activeRelation.value]);
const chapterProgress = computed(() => ((activeChapter.value + 1) / chapters.length) * 100);

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
  if (event.key === "Escape") showChapterModal.value = false;
}

function submitNewsletter() {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.value.trim());
  newsletterState.value = isValidEmail ? "ready" : "invalid";
  if (isValidEmail) newsletterEmail.value = "";
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
    <div class="reading-progress" :style="{ transform: `scaleX(${progress / 100})` }" aria-hidden="true" />
    <div class="route-spine" aria-hidden="true"><i /><b>✦</b><i /><b>✦</b><i /></div>

    <header class="site-header" :class="{ 'is-scrolled': scrolled }">
      <a class="brand" href="#top" aria-label="Voltar ao início" @click.prevent="scrollToId('top')">
        <img class="brand-mark" :src="art.logo" alt="Marca-runa da Chama do Último Reino" />
        <span class="brand-copy"><strong>A Chama</strong><small>do Último Reino</small></span>
      </a>

      <nav class="desktop-nav" aria-label="Navegação principal">
        <button v-for="([label, id]) in navigation" :key="id" type="button" @click="chooseNavigation(id)">{{ label }}</button>
      </nav>

      <button class="nav-cta" type="button" @click="showChapterModal = true">Ler o primeiro capítulo <span>↗</span></button>
      <button class="menu-trigger" type="button" :aria-label="isMenuOpen ? 'Fechar menu' : 'Abrir menu'" :aria-expanded="isMenuOpen" @click="isMenuOpen = !isMenuOpen">{{ isMenuOpen ? '×' : '☰' }}</button>

      <div v-if="isMenuOpen" class="mobile-menu">
        <button v-for="([label, id], index) in navigation" :key="id" type="button" @click="chooseNavigation(id)"><span>0{{ index + 1 }}</span>{{ label }}<b>→</b></button>
        <button type="button" class="mobile-read" @click="showChapterModal = true; isMenuOpen = false">Ler o primeiro capítulo</button>
      </div>
    </header>

    <section id="top" class="hero">
      <img class="hero-atmosphere" :src="art.archive" alt="Ruínas noturnas de Asterion sob a lua" />
      <div class="hero-vignette" aria-hidden="true" />
      <div class="ember-specks" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="eyebrow"><span />Arquivo recuperado · Livro I</p>
          <h1><em>A Chama</em><br />do Último Reino</h1>
          <p class="hero-intro">O rei foi selado. A memória não.</p>
          <p class="hero-summary">Oito séculos após a queda de Asterion, uma chama azul desperta nas mãos de um jovem ferreiro — e chama de volta tudo o que o mundo tentou esquecer.</p>
          <div class="hero-actions">
            <button class="button button-primary" type="button" @click="scrollToId('historia')">▣ Conhecer a história</button>
            <button class="text-action" type="button" @click="showChapterModal = true">Ler primeiro capítulo <span>↗</span></button>
          </div>
        </div>
        <div class="hero-art-frame">
          <span class="art-index">ARQ. 00 / VIGÍLIA</span>
          <img :src="art.kaelDharen" alt="Kael e Dharen entre as ruínas de Asterion" />
          <div class="art-edge-note">Fogo azul<br />e prata</div>
          <span class="frame-corner corner-tl" /><span class="frame-corner corner-br" />
        </div>
      </div>
      <button class="hero-scroll" type="button" @click="scrollToId('historia')"><span>Continue a leitura</span><i /></button>
    </section>

    <section class="stat-ribbon" aria-label="Dados sobre o livro">
      <div><strong>800</strong><span>anos de silêncio</span></div><div><strong>12</strong><span>capítulos e epílogo</span></div><div><strong>1</strong><span>rei que não morreu</span></div><div><strong>3</strong><span>fragmentos a proteger</span></div>
    </section>

    <section id="historia" class="story-section section-pad">
      <div class="section-rail"><span>01</span><i /><small>O que foi esquecido</small></div>
      <div class="story-layout">
        <div class="story-lede"><p class="eyebrow dark"><span />A história</p><h2>Quando a chama escolhe<br /><em>um ferreiro.</em></h2></div>
        <div class="story-body">
          <p class="dropcap">Asterion queimou quando Malgor, o Rei das Cinzas, atravessou a morte. Cinco guerreiros o selaram usando um cristal que se partiu em três, jurando esconder os fragmentos antes que o rei pudesse retornar.</p>
          <p>Oito séculos depois, em uma vila pequena demais para guardar segredos, Kael descobre que a magia azul em suas mãos não é acidente. Ao lado de Dharen, um viajante com uma espada rúnica e memórias que não conta, ele parte por estradas onde a Coroa já procura seu nome.</p>
          <p>Entre bibliotecas esquecidas e uma cidade que se recusa a obedecer ao seu antigo trono, a travessia revela que a maior prisão pode ser a história escrita por quem tinha poder para vencê-la.</p>
          <button class="inline-link" type="button" @click="scrollToId('livro')">Ver o percurso do Livro I <span>↓</span></button>
        </div>
      </div>
    </section>

    <section class="quote-band" aria-label="Citação do livro">
      <div class="quote-ornament">“</div><blockquote>“O último selo não é uma prisão.<br /><em>É uma escolha.</em>”</blockquote>
      <div class="quote-tools"><span>Casa dos Ecos · Registro final</span><button type="button" @click="copyQuote">{{ copied ? '✓ Copiado' : '▣ Copiar' }}</button></div>
    </section>

    <section id="vigilia" class="vigil-section section-pad">
      <div class="section-rail section-rail-light"><span>02</span><i /><small>Entre a memória e o caminho</small></div>
      <div class="vigil-grid">
        <div class="vigil-image-wrap"><img :src="art.grimoire" alt="Grimório e fragmento do cristal de Asterion" /><div class="image-caption">✦ Fragmento de registro — Nareth</div></div>
        <div class="vigil-copy"><p class="eyebrow"><span />A Vigília</p><h2>Nem toda magia<br />quer ser <em>possuída.</em></h2><p>O poder em A Chama do Último Reino não existe para coroar alguém. A Vigília reúne pessoas e vestígios em torno de uma tarefa mais difícil: testemunhar o que aconteceu sem permitir que o passado decida o próximo passo.</p>
          <div class="lore-list"><div><b class="lore-icon blue">✦</b><p><strong>Memória</strong><small>O que ainda pode mudar você.</small></p></div><div><b class="lore-icon gold">⚔</b><p><strong>Essência</strong><small>Aquilo que responde ao que é oferecido.</small></p></div><div><b class="lore-icon ivory">⌁</b><p><strong>Vontade</strong><small>O caminho que alguém escolhe seguir.</small></p></div></div>
        </div>
      </div>
    </section>

    <section id="personagens" class="characters-section section-pad">
      <div class="section-rail"><span>03</span><i /><small>Os que seguem</small></div>
      <div class="characters-heading"><div><p class="eyebrow dark"><span />Personagens</p><h2>Quatro caminhos.<br /><em>Nenhum passa sozinho.</em></h2></div><p>Quando o passado insiste em voltar, a companhia não nasce da profecia — mas da decisão de seguir junto.</p></div>
      <div class="character-display">
        <div class="character-tabs" role="tablist" aria-label="Personagens principais"><button v-for="(character, index) in characters" :key="character.name" type="button" :class="{ selected: activeCharacter === index }" role="tab" :aria-selected="activeCharacter === index" @click="activeCharacter = index"><span class="char-number">0{{ index + 1 }}</span><span><strong>{{ character.name }}</strong><small>{{ character.role }}</small></span><b>›</b></button></div>
        <article class="character-detail" :class="`tone-${selectedCharacter.tone}`" aria-live="polite"><div class="character-detail-top"><span>{{ selectedCharacter.mark }}</span><span class="detail-sigil">{{ activeCharacter === 0 ? '✦' : activeCharacter === 1 ? '✧' : activeCharacter === 2 ? '◒' : '◇' }}</span></div><p class="detail-role">{{ selectedCharacter.role }}</p><h3>{{ selectedCharacter.name }}</h3><p class="detail-description">{{ selectedCharacter.description }}</p><div class="detail-meta">⌖ {{ selectedCharacter.detail }}</div><div class="character-pip-row" aria-hidden="true"><i v-for="(_, index) in characters" :key="index" :class="{ active: activeCharacter === index }" /></div></article>
        <div class="companions-art"><img :src="art.companhia" alt="Kael, Dharen, Lyra e Mira diante das ruínas de Asterion" /><div class="companions-label"><span>Companhia em trânsito</span><strong>ASTERION · APÓS A QUEDA</strong></div></div>
      </div>
    </section>

    <section id="relacoes" class="relations-section section-pad">
      <div class="section-rail section-rail-light"><span>04</span><i /><small>Vínculos em movimento</small></div>
      <div class="relations-heading"><div><p class="eyebrow"><span />Arquivo de Dharen</p><h2>O caminho de um homem<br />é feito de <em>quem fica.</em></h2></div><p>Selecione uma marca para percorrer os vínculos que Dharen constrói na travessia.</p></div>
      <div class="relation-stage">
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
      <div class="section-rail section-rail-light"><span>05</span><i /><small>Livro I · A travessia</small></div>
      <div class="book-heading"><div><p class="eyebrow"><span />Livro I</p><h2>Todo caminho deixa<br /><em>um fragmento.</em></h2></div><button type="button" class="button book-read" @click="showChapterModal = true">Ler primeiro capítulo <span>↗</span></button></div>
      <div class="book-layout"><div class="chapter-list" role="tablist" aria-label="Percurso de capítulos"><button v-for="(chapter, index) in chapters" :key="chapter.id" type="button" :class="{ selected: activeChapter === index }" role="tab" :aria-selected="activeChapter === index" @click="activeChapter = index"><span>{{ chapter.id }}</span><b>{{ chapter.label }}</b><i>↗</i></button></div><article class="chapter-detail" aria-live="polite"><div class="chapter-top"><span>CAPÍTULO {{ selectedChapter.id }}</span><span>{{ selectedChapter.label }}</span></div><h3>{{ selectedChapter.title }}</h3><p>{{ selectedChapter.text }}</p><div class="chapter-progress"><i :style="{ width: `${chapterProgress}%` }" /></div><button type="button" class="chapter-link" @click="showChapterModal = true">Ler o início <span>↗</span></button></article></div>
    </section>

    <section class="north-section"><img :src="art.north" alt="Estrada sombria seguindo para o norte" /><div class="north-overlay" /><div class="north-content"><img class="closing-rune" :src="art.logo" alt="" /><p class="eyebrow"><span />Após o Livro I</p><h2>A estrada<br />continua <em>ao norte.</em></h2><p>Uma nova rota, uma ferida impossível e três pessoas que já não podem fingir que não ouviram a chama.</p><button class="button button-primary" type="button" @click="showChapterModal = true">Ler o primeiro capítulo</button></div></section>

    <section id="novidades" class="newsletter-section section-pad">
      <div class="newsletter-stamp" aria-hidden="true">✦<span>VIGÍLIA</span>✦</div>
      <div class="newsletter-copy"><p class="eyebrow dark"><span />Correspondência da Vigília</p><h2>Quando a estrada<br />seguir, <em>saiba primeiro.</em></h2><p>Receba notícias do Livro I, novos trechos e os próximos registros recuperados de Asterion.</p></div>
      <form class="newsletter-form" novalidate @submit.prevent="submitNewsletter">
        <label for="newsletter-email">Seu endereço de e-mail</label>
        <div class="newsletter-field"><input id="newsletter-email" v-model="newsletterEmail" type="email" name="email" autocomplete="email" placeholder="seu@email.com" :aria-invalid="newsletterState === 'invalid'" required /><button type="submit">Entrar na Vigília <span>↗</span></button></div>
        <p v-if="newsletterState === 'invalid'" class="form-feedback is-error" aria-live="polite">Informe um endereço de e-mail válido.</p>
        <p v-else-if="newsletterState === 'ready'" class="form-feedback is-success" aria-live="polite">Interesse registrado nesta prévia. Conecte um serviço de e-mail para receber novas inscrições.</p>
        <p v-else class="form-note">Formulário estático. Nenhuma mensagem é enviada sem sua confirmação.</p>
      </form>
    </section>

    <footer><a href="#top" @click.prevent="scrollToId('top')"><img :src="art.logo" alt="" />A Chama do Último Reino</a><span>Livro I · arquivo recuperado</span><button type="button" @click="scrollToId('top')">Voltar ao início ↑</button></footer>

    <div v-if="showChapterModal" class="chapter-modal-backdrop" role="presentation" @click.self="showChapterModal = false"><section class="chapter-modal" role="dialog" aria-modal="true" aria-labelledby="chapter-modal-title"><button class="modal-close" type="button" aria-label="Fechar leitura" @click="showChapterModal = false">×</button><p class="eyebrow dark"><span />Leitura de amostra</p><p class="modal-kicker">Capítulo I · Coisas que um Ferreiro Não Deveria Fazer</p><h2 id="chapter-modal-title">Uma bota incendiada<br />é um mau começo.</h2><div class="modal-rule"><i />Ferrosul · Registro inicial<i /></div><div class="chapter-excerpt"><p class="dropcap">Kael sabia três coisas sobre magia.</p><p>A primeira era que magos de verdade usavam cajados. A segunda era que magos de verdade passavam anos estudando em torres distantes, cercados por livros, velas e professores extremamente velhos.</p><p>E a terceira era que magos de verdade definitivamente não incendiavam as próprias botas tentando esquentar uma caneca de chá.</p><p>— Está queimando.</p><p>Kael continuou olhando para as próprias mãos.</p><p>— Eu sei.</p><p>— Sua bota.</p></div><button class="modal-end" type="button" @click="showChapterModal = false">Fechar a leitura <span>×</span></button></section></div>
  </main>
</template>
