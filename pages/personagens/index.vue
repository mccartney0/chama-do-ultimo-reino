<!-- Arquivo das Cinzas — página de personagens: índice cerimonial de registros recuperados. -->
<script setup lang="ts">
useHead({ title: "Personagens — A Chama do Último Reino" });

const art = {
  logo: "/manus-storage/chama-runa-logo_9a8ac0b6.png",
  companhia: "/manus-storage/companhia-asterion_0d53947c.png",
  kael: "/manus-storage/kael-retrato_ae7eda73.png",
  dharen: "/manus-storage/dharen-retrato_4f422802.png",
  lyra: "/manus-storage/lyra-retrato_b043ad7e.png",
  mira: "/manus-storage/mira-retrato_236b1e36.png",
};

const characters = [
  { number: "01", slug: "kael", name: "Kael Auren", role: "O ferreiro da chama azul · Criador de runas", mark: "KA · 19", tone: "blue", image: art.kael, route: "Ferrosul → Nareth", clue: "Uma memória impossível escolhe suas mãos.", description: "Criado entre ferro, carvão e a promessa simples de uma oficina, Kael descobre que a chama azul não pede licença para transformar uma origem em travessia." },
  { number: "02", slug: "dharen", name: "Dharen Varenn", role: "O Caminhante de Prata · O Sangue do Guerreiro", mark: "DV · 39", tone: "ruby", image: art.dharen, route: "Nareth → Casa dos Ecos", clue: "Uma lâmina, uma dívida e uma escolha que não se divide.", description: "Viajante de humor afiado e passado incompleto, Dharen percorre as estradas de Asterion carregando uma espada rúnica e o custo de não abandonar quem ficou." },
  { number: "03", slug: "lyra", name: "Lyra", role: "A arqueira que reconstrói", mark: "LY · CCB", tone: "moss", image: art.lyra, route: "Ferrosul → Asterion", clue: "Toda ruína pode ser um começo recusado.", description: "Da Companhia do Cervo Branco, Lyra traz a paciência de quem lê rastros antes de agir e a decisão de reconstruir caminhos onde a queda deixou apenas silêncio." },
  { number: "04", slug: "mira", name: "Mira", role: "A chave sem dentes", mark: "MI · GC", tone: "ember", image: art.mira, route: "Nareth → Casa dos Ecos", clue: "Nem toda porta precisa de permissão para abrir.", description: "Larápia e leitora de segredos, Mira encontra registros em compartimentos falsos e transforma a suspeita numa arte de sobreviver sem pertencer a nenhuma fechadura." },
  { number: "05", slug: "sarya", name: "Sarya", role: "A voz que recupera a própria história", mark: "SA · 48", tone: "ivory", image: art.lyra, route: "Casa dos Ecos → Casa sem Sol", clue: "Uma história apagada não deixa de existir.", description: "Sarya viveu nas margens da Casa sem Sol. Sua memória foi apagada por decisão de alguém com muito poder. No Livro II, ela recupera parte do que lhe foi tirado e escolhe permanecer — como forma mais firme de testemunho." },
  { number: "06", slug: "varos", name: "Varos", role: "O filósofo da Ruptura", mark: "VA · 71", tone: "ruby", image: art.mira, route: "Nareth → Casa sem Sol", clue: "Observar não é o mesmo que ter permissão para intervir.", description: "Filósofo de campo que acreditava que toda experiência podia ser analisada. No Livro II, viola o consentimento de Dheren e desencadeia a Ruptura — aprendendo tarde que algumas fronteiras não se cruzam sem destruir o que não pode ser reconstruído." },
] as const;
</script>

<template>
  <main class="characters-index-shell">
    <header class="characters-index-header">
      <NuxtLink class="characters-index-brand" to="/" aria-label="Retornar ao arquivo principal"><img :src="art.logo" alt="Marca-runa da Chama do Último Reino" /><span><strong>A Chama</strong><small>do Último Reino</small></span></NuxtLink>
      <ArchiveTopNav active="personagens" />
    </header>

    <section class="characters-index-hero">
      <div class="characters-index-hero-copy"><p class="eyebrow"><span />Índice da Vigília · Livros I &amp; II</p><h1>Seis nomes.<br /><em>Nenhuma rota<br />se atravessa só.</em></h1><p>Os registros recuperados não descrevem heróis escolhidos. Descrevem pessoas que decidiram permanecer quando o mundo pediu que se afastassem.</p><a href="#registros" class="characters-index-scroll">Abrir os registros <span>↓</span></a></div>
      <figure class="characters-index-hero-art"><img :src="art.companhia" alt="Kael, Dharen, Lyra e Mira entre as ruínas de Asterion" /><span class="characters-index-art-top">ARQ. COMP. / 04</span><figcaption><b>Vigília em travessia</b><small>Quatro testemunhas · uma escolha</small></figcaption><i class="characters-index-seal">✦</i></figure>
    </section>

    <section id="registros" class="characters-roster" aria-label="Registros dos personagens principais">
      <div class="characters-roster-heading"><p class="eyebrow"><span />Dossiês disponíveis</p><h2>Não são peças<br /><em>de uma profecia.</em></h2><p>Cada ficha reúne uma marca, uma rota e um nome que a queda de Asterion não conseguiu apagar.</p></div>
      <div class="characters-roster-list">
        <article v-for="character in characters" :key="character.slug" class="roster-dossier" :class="[`roster-${character.tone}`, `roster-${character.slug}`]">
          <span class="roster-number">{{ character.number }}</span><span class="roster-catalog">REG. {{ character.mark }} · VIGÍLIA</span>
          <div class="roster-image"><img :src="character.image" :alt="`Retrato de ${character.name}`" /><span class="roster-image-scrim" /><i>✦</i></div>
          <div class="roster-copy"><p>{{ character.role }}</p><h3>{{ character.name }}</h3><blockquote>“{{ character.clue }}”</blockquote><p class="roster-description">{{ character.description }}</p><div class="roster-route"><span>Rota de registro</span><b>{{ character.route }}</b></div><NuxtLink :to="`/personagens/${character.slug}`">Abrir dossiê <span>↗</span></NuxtLink></div>
        </article>
      </div>
    </section>

    <section class="characters-index-closing"><p class="eyebrow"><span />Mapa de relações</p><h2>O caminho de um<br /><em>muda o de todos.</em></h2><p>As histórias dos seis convergem nas forjas, ruínas e corredores de Asterion — e se estendem até a Casa sem Sol. A carta de expedição guarda as marcas que cada um deixou pelo percurso.</p><NuxtLink to="/mapa">Examinar a carta de Asterion <span>↗</span></NuxtLink></section>

    <footer class="characters-index-footer"><NuxtLink to="/"><img :src="art.logo" alt="" />Retornar à página do livro</NuxtLink><span>O mundo estava cheio de caminhos.</span></footer>
  </main>
</template>
