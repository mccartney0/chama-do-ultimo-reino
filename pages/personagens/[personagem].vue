<!-- Arquivo das Cinzas — dossiês individuais: retrato, testemunho, vínculos de rota e navegação entre sobreviventes. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from "vue";

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
    archiveNote: "O fogo que o escolheu não se comporta como arma. Ele devolve nomes que o mundo tentou enterrar.",
    bonds: [
      { slug: "dharen", person: "Dharen Varenn", sigil: "DV", label: "Laço Astral", type: "peso compartilhado", accent: "gold", text: "Dharen não alivia a carga de Kael; torna impossível que ele a carregue sozinho. Entre os dois, proteção é a forma que a verdade encontra para sobreviver." },
      { slug: "lyra", person: "Lyra", sigil: "LY", label: "Mira de vigília", type: "confiança construída", accent: "moss", text: "Lyra mede o perigo antes de permitir que Kael se aproxime dele. A disciplina dela oferece ao ferreiro um limite que ele raramente concede a si mesmo." },
      { slug: "mira", person: "Mira", sigil: "MI", label: "Arquivo aberto", type: "suspeita produtiva", accent: "ember", text: "Mira desconfia de toda história sem lacunas. Kael aprende com ela que uma resposta incompleta pode ser mais perigosa do que uma porta fechada." },
    ],
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
    archiveNote: "Sob a ironia, Dharen registra cada pessoa que decidiu ficar. A espada não resolve a parte que pede companhia.",
    bonds: [
      { slug: "kael", person: "Kael Auren", sigil: "KA", label: "Laço Astral", type: "confiança escolhida", accent: "blue", text: "O ritual entre os dois tornou impossível fingir que o peso do outro não existe. Dharen protege Kael, mas também o obriga a encarar o que tenta carregar sozinho." },
      { slug: "lyra", person: "Lyra", sigil: "LY", label: "Confiança de rota", type: "leitura do perigo", accent: "moss", text: "Lyra não se deixa distrair pelo humor de Dharen; ele reconhece nela alguém que mede uma sala antes de entrar. Entre os dois, a confiança se constrói em escolhas pequenas e precisas." },
      { slug: "mira", person: "Mira", sigil: "MI", label: "Ironia e sobrevivência", type: "aliança improvável", accent: "ember", text: "Mira gosta da franqueza torta de Dharen. Ele, por sua vez, vê nela uma sobrevivente que entende quando uma porta — ou uma promessa — não merece confiança." },
    ],
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
    archiveNote: "Lyra nunca chama ruína de lar. Ela a lê como um aviso e escolhe, ainda assim, deixar uma rota para quem vier depois.",
    bonds: [
      { slug: "kael", person: "Kael Auren", sigil: "KA", label: "Fogo sob vigília", type: "cuidado sem tutela", accent: "blue", text: "Lyra vê o risco que Kael tenta esconder na chama azul. Sua confiança nasce quando ela percebe que ele aceita ser acompanhado, não conduzido." },
      { slug: "dharen", person: "Dharen Varenn", sigil: "DV", label: "Rota sem evasivas", type: "verdade observada", accent: "gold", text: "Dharen usa humor para deslocar a culpa; Lyra não permite. A arqueira lê os silêncios dele como lê uma trilha: sem pressa, mas sem perder nenhum vestígio." },
      { slug: "mira", person: "Mira", sigil: "MI", label: "Precisão desconfiada", type: "métodos opostos", accent: "ember", text: "Mira abre portas que Lyra preferiria observar por mais tempo. A tensão entre as duas não é ruptura: é o método que impede a companhia de seguir cega." },
    ],
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
    archiveNote: "Mira não coleciona chaves. Coleciona as razões pelas quais alguém decidiu esconder uma porta do resto do mundo.",
    bonds: [
      { slug: "kael", person: "Kael Auren", sigil: "KA", label: "Segredo em brasa", type: "curiosidade cautelosa", accent: "blue", text: "Kael traz perguntas que Mira não consegue abrir com uma gazua. Por isso ela permanece: algumas fechaduras exigem testemunha antes de qualquer ferramenta." },
      { slug: "dharen", person: "Dharen Varenn", sigil: "DV", label: "Cumplicidade calculada", type: "ironia em comum", accent: "gold", text: "Dharen e Mira reconhecem a função de uma frase torta em uma sala perigosa. A confiança entre eles não é simples, mas chega antes que a ameaça precise ser nomeada." },
      { slug: "lyra", person: "Lyra", sigil: "LY", label: "Olhar que percebe", type: "vigilância mútua", accent: "moss", text: "Lyra nota quando Mira decide omitir uma rota. Mira respeita isso: poucos conseguem seguir uma pista sem exigir que ela se torne confissão." },
    ],
  },
] as const;

const profile = computed(() => profiles.find((item) => item.slug === String(route.params.personagem)) ?? profiles[0]);
const companionProfiles = computed(() => profile.value.companions.map((slug) => profiles.find((item) => item.slug === slug)).filter((item): item is (typeof profiles)[number] => Boolean(item)));
const activeBond = ref(0);
const selectedBond = computed(() => profile.value.bonds[activeBond.value] ?? profile.value.bonds[0]);
type ExportFormat = "pdf" | "image";
type ExportStatus = "idle" | "loading" | "success" | "error";
const isBondLoading = ref(false);
const exportStatus = ref<ExportStatus>("idle");
const exportFormat = ref<ExportFormat | null>(null);
let bondLoadingTimer: ReturnType<typeof setTimeout> | undefined;
let exportResetTimer: ReturnType<typeof setTimeout> | undefined;

function selectBond(index: number) {
  if (index === activeBond.value || isBondLoading.value) return;
  if (bondLoadingTimer) window.clearTimeout(bondLoadingTimer);
  isBondLoading.value = true;
  activeBond.value = index;
  bondLoadingTimer = window.setTimeout(() => { isBondLoading.value = false; }, 260);
}

function moveBond(direction: number) {
  const next = (activeBond.value + direction + profile.value.bonds.length) % profile.value.bonds.length;
  selectBond(next);
  window.setTimeout(() => document.getElementById(`bond-tab-${profile.value.slug}-${next}`)?.focus(), 0);
}

function makeFileName(extension: "pdf" | "png") {
  return `dossie-${profile.value.slug}-chama-do-ultimo-reino.${extension}`;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 300);
}

async function exportDossier(format: ExportFormat) {
  if (exportStatus.value === "loading") return;
  exportStatus.value = "loading";
  exportFormat.value = format;
  if (exportResetTimer) window.clearTimeout(exportResetTimer);

  try {
    await nextTick();
    const sheet = document.getElementById("dossier-export-sheet");
    if (!sheet) throw new Error("Folha de exportação não encontrada.");
    if ("fonts" in document) await document.fonts.ready;

    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(sheet, { backgroundColor: "#e9dfca", logging: false, scale: 2, useCORS: true });

    if (format === "image") {
      const image = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Não foi possível compor a imagem.")), "image/png");
      });
      downloadBlob(image, makeFileName("png"));
    } else {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ compress: true, format: [canvas.width, canvas.height], orientation: "portrait", unit: "px" });
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, canvas.width, canvas.height, undefined, "FAST");
      pdf.save(makeFileName("pdf"));
    }

    exportStatus.value = "success";
  } catch (error) {
    console.error("Falha ao exportar dossiê", error);
    exportStatus.value = "error";
  } finally {
    exportResetTimer = window.setTimeout(() => {
      exportStatus.value = "idle";
      exportFormat.value = null;
    }, 4200);
  }
}

onBeforeUnmount(() => {
  if (bondLoadingTimer) window.clearTimeout(bondLoadingTimer);
  if (exportResetTimer) window.clearTimeout(exportResetTimer);
});

useHead(() => ({ title: `${profile.value.name} — A Chama do Último Reino` }));
</script>

<template>
  <main class="profile-shell" :class="`profile-${profile.tone}`">
    <ScrollMotion />
    <div class="profile-route-thread" aria-hidden="true"><img :src="art.logo" alt="" /><i class="route-rune route-rune-one">✦</i><i class="route-rune route-rune-two">✦</i><i class="route-rune route-rune-three">✦</i><i class="route-rune route-rune-four">✦</i></div>
    <header class="profile-header"><NuxtLink class="profile-brand" to="/"><img :src="art.logo" alt="Marca-runa da Chama do Último Reino" /><span><strong>A Chama</strong><small>do Último Reino</small></span></NuxtLink><ArchiveTopNav active="personagens" /></header>

    <section class="profile-hero" data-reveal><div class="profile-title-block"><p class="eyebrow"><span />Registro {{ profile.number }} · {{ profile.archive }}</p><p class="profile-mark">{{ profile.mark }} · {{ profile.sigil }}</p><h1>{{ profile.name }}</h1><p class="profile-role">{{ profile.role }}</p><blockquote>“{{ profile.quote }}”</blockquote></div><figure class="profile-portrait" tabindex="0" :aria-label="`Retrato de ${profile.name}; foco ou cursor revelam uma nota do arquivo`"><img :src="profile.image" :alt="`Retrato de ${profile.name}`" data-parallax="0.026" /><figcaption>TESTEMUNHA VIVA · {{ profile.number }}</figcaption><div class="profile-portrait-note"><small>NOTA À MARGEM · REGISTRO {{ profile.number }}</small><blockquote>{{ profile.archiveNote }}</blockquote></div></figure></section>

    <section class="profile-dossier" data-reveal><aside class="profile-facts"><p class="eyebrow"><span />Ficha de procedência</p><dl><div><dt>Vínculo</dt><dd>{{ profile.affiliation }}</dd></div><div><dt>Instrumento</dt><dd>{{ profile.instrument }}</dd></div><div><dt>Sigilo</dt><dd>{{ profile.sigil }}</dd></div><div><dt>Registro</dt><dd>{{ profile.archive }}</dd></div></dl></aside><article class="profile-biography"><p class="eyebrow"><span />Biografia recuperada</p><h2>Nem todo caminho<br /><em>começa como escolha.</em></h2><div class="profile-copy"><p v-for="paragraph in profile.bio" :key="paragraph">{{ paragraph }}</p></div></article></section>

    <section class="profile-export" data-reveal aria-labelledby="export-heading">
      <div class="profile-export-copy"><p class="eyebrow"><span />Lacre de partilha</p><h2 id="export-heading">Leve este<br /><em>registro consigo.</em></h2><p>Crie uma prancha do dossiê de {{ profile.name }} no seu dispositivo. Nenhum dado é enviado: a composição é feita localmente no navegador.</p></div>
      <div class="profile-export-actions" :class="{ 'is-processing': exportStatus === 'loading' }" :aria-busy="exportStatus === 'loading'">
        <button type="button" class="export-action export-action-image" :disabled="exportStatus === 'loading'" @click="exportDossier('image')"><span class="export-action-rune" aria-hidden="true">✦</span><span><small>Prancha de arquivo</small><strong>{{ exportStatus === 'loading' && exportFormat === 'image' ? 'Preparando imagem' : 'Baixar imagem' }}</strong></span><i v-if="exportStatus === 'loading' && exportFormat === 'image'" class="export-spinner" aria-hidden="true" /><b v-else>PNG</b></button>
        <button type="button" class="export-action export-action-pdf" :disabled="exportStatus === 'loading'" @click="exportDossier('pdf')"><span class="export-action-rune" aria-hidden="true">✦</span><span><small>Registro de uma página</small><strong>{{ exportStatus === 'loading' && exportFormat === 'pdf' ? 'Selando PDF' : 'Baixar em PDF' }}</strong></span><i v-if="exportStatus === 'loading' && exportFormat === 'pdf'" class="export-spinner" aria-hidden="true" /><b v-else>PDF</b></button>
        <p class="export-feedback" :class="`is-${exportStatus}`" role="status" aria-live="polite"><template v-if="exportStatus === 'loading'">O arquivo está sendo composto no seu dispositivo.</template><template v-else-if="exportStatus === 'success'">Registro preparado. O download foi iniciado.</template><template v-else-if="exportStatus === 'error'">Não foi possível preparar o registro. Tente novamente.</template><template v-else>Imagem em PNG ou folha PDF, pronta para partilhar.</template></p>
      </div>
    </section>

    <section class="profile-bonds" data-reveal>
      <div class="profile-bonds-heading"><div><p class="eyebrow"><span />Mesa de vínculos</p><h2>Quem fica<br /><em>muda a rota.</em></h2></div><p>Selecione uma marca para abrir o vínculo de {{ profile.name }}. Cada registro conduz ao dossiê da pessoa que divide esta travessia.</p></div>
      <div class="bond-console">
        <div class="bond-tabs" role="tablist" :aria-label="`Vínculos de ${profile.name}`"><button v-for="(bond, index) in profile.bonds" :id="`bond-tab-${profile.slug}-${index}`" :key="bond.slug" type="button" role="tab" :class="[{ active: activeBond === index }, `bond-${bond.accent}`]" :aria-selected="activeBond === index" :aria-controls="`bond-panel-${profile.slug}`" @click="selectBond(index)" @keydown.right.prevent="moveBond(1)" @keydown.left.prevent="moveBond(-1)" @keydown.down.prevent="moveBond(1)" @keydown.up.prevent="moveBond(-1)"><span>{{ bond.sigil }}</span><strong>{{ bond.person }}</strong><small>{{ bond.type }}</small></button></div>
        <article :id="`bond-panel-${profile.slug}`" class="bond-record" :class="[{ 'is-loading': isBondLoading }, `bond-record-${selectedBond.accent}`]" role="tabpanel" :aria-labelledby="`bond-tab-${profile.slug}-${activeBond}`" tabindex="0" aria-live="polite" :aria-busy="isBondLoading"><div v-if="isBondLoading" class="bond-record-loading"><i class="export-spinner" aria-hidden="true" /><span>Reabrindo registro…</span></div><p>VÍNCULO 0{{ activeBond + 1 }} <span>{{ selectedBond.type }}</span></p><h3>{{ selectedBond.label }}</h3><div class="bond-record-line" aria-hidden="true"><i /><b>{{ profile.mark.split(" · ")[0] }}</b><em>↔</em><b>{{ selectedBond.sigil }}</b><i /></div><p class="bond-record-copy">{{ selectedBond.text }}</p><NuxtLink :to="`/personagens/${selectedBond.slug}`">Abrir dossiê de {{ selectedBond.person }} <span>↗</span></NuxtLink></article>
      </div>
    </section>

    <section class="profile-regions" data-reveal><div class="profile-section-heading"><p class="eyebrow"><span />Vínculos de expedição</p><h2>Regiões que<br /><em>deixaram marca.</em></h2><p>Estas são as geografias que atravessam o registro de {{ profile.name }}. Cada ficha conduz diretamente à carta de Asterion.</p></div><div class="region-links"><NuxtLink v-for="region in profile.regions" :key="region.slug" class="region-link" :to="{ path: '/mapa', query: { regiao: region.slug } }"><img :src="region.image" :alt="region.name" /><span class="region-link-overlay" /><div><small>{{ region.label }} · abrir carta</small><h3>{{ region.name }}</h3><p>{{ region.text }}</p><b>Ver no mapa <i>↗</i></b></div></NuxtLink></div></section>

    <section class="profile-companions" data-reveal><p class="eyebrow"><span />Outros registros</p><div><h2>A companhia<br /><em>não termina aqui.</em></h2><nav aria-label="Dossiês relacionados"><NuxtLink v-for="companion in companionProfiles" :key="companion.slug" :to="`/personagens/${companion.slug}`" class="companion-link" :class="`companion-${companion.tone}`"><img :src="companion.image" :alt="companion.name" /><span><small>{{ companion.role }}</small><strong>{{ companion.name }}</strong></span><i>↗</i></NuxtLink></nav></div></section>

    <section id="dossier-export-sheet" class="dossier-export-sheet" aria-hidden="true">
      <header><img :src="art.logo" alt="" /><div><small>ARQUIVO DAS CINZAS · LIVRO I</small><strong>DOSSIÊ {{ profile.number }} · {{ profile.archive }}</strong></div><span>PRANCHA DE PARTILHA</span></header>
      <div class="export-sheet-hero"><figure><img :src="profile.image" alt="" /><figcaption>{{ profile.sigil }} · {{ profile.mark }}</figcaption></figure><div><p>{{ profile.role }}</p><h1>{{ profile.name }}</h1><blockquote>“{{ profile.quote }}”</blockquote><dl><div><dt>Vínculo</dt><dd>{{ profile.affiliation }}</dd></div><div><dt>Instrumento</dt><dd>{{ profile.instrument }}</dd></div><div><dt>Registro</dt><dd>{{ profile.archive }}</dd></div></dl></div></div>
      <div class="export-sheet-copy"><p class="export-sheet-label">BIOGRAFIA RECUPERADA</p><p v-for="paragraph in profile.bio" :key="`sheet-${paragraph}`">{{ paragraph }}</p></div>
      <div class="export-sheet-bonds"><p>VÍNCULOS DE TRAVESSIA</p><div v-for="bond in profile.bonds" :key="`sheet-${bond.slug}`"><span>{{ bond.sigil }}</span><strong>{{ bond.person }}</strong><small>{{ bond.label }} · {{ bond.type }}</small></div></div>
      <footer><span>O rei foi selado. A memória não.</span><strong>chama-do-ultimo-reino.manus.space</strong></footer>
    </section>

    <footer class="profile-footer"><NuxtLink to="/"><img :src="art.logo" alt="" />Retornar ao arquivo principal</NuxtLink><span>O mundo estava cheio de caminhos.</span></footer>
    <BackToTop />
  </main>
</template>
