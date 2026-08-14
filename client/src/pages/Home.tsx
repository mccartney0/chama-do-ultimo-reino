/**
 * Arquivo das Cinzas — página principal.
 * Estilo: romantismo gótico editorial; carvão, marfim, Azul Vigília e percurso dourado.
 * Pergunta-guia: esta escolha reforça a sensação de um códice recuperado de Asterion?
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Compass,
  Copy,
  Flame,
  MapPin,
  Menu,
  Quote,
  Sparkles,
  Swords,
  X,
} from "lucide-react";

const art = {
  logo: "/manus-storage/chama-runa-logo_a302cb42.png",
  archive: "/manus-storage/asterion-archive-banner_021f31f5.jpg",
  kaelDharen: "/manus-storage/kael-syous-ruinas_7e5cf145.png",
  companhia: "/manus-storage/companhia-asterion_19ba22a6.png",
  grimoire: "/manus-storage/grimorio-vigilia_f8d5944b.jpg",
  north: "/manus-storage/casa-sem-sol_808eab53.jpg",
};

const navigation = [
  ["A história", "historia"],
  ["A Vigília", "vigilia"],
  ["Personagens", "personagens"],
  ["Livro I", "livro"],
] as const;

const characters = [
  {
    name: "Kael Auren",
    role: "O ferreiro da chama azul",
    mark: "KA · 19",
    description:
      "Um aprendiz de ferreiro de Ferrosul que descobre uma chama azul impossível — e vozes que sabem mais sobre ele do que ele próprio. Com um grimório vivo nas mãos, Kael precisa aprender que poder não é o mesmo que destino.",
    detail: "Herança: Memória · Arte: fogo azul · Objeto: grimório",
    tone: "blue",
  },
  {
    name: "Dharen Varenn",
    role: "O Caminhante de Prata",
    mark: "SV · 39",
    description:
      "Viajante, caçador de criaturas e especialista em decisões questionáveis. Dharen luta com energia mística e uma espada rúnica; por trás do humor, carrega a culpa de um passado que a Coroa preferiria enterrar.",
    detail: "Herança: Varenn · Arte: energia mística · Marca: prata",
    tone: "gold",
  },
  {
    name: "Lyra",
    role: "A arqueira que reconstrói",
    mark: "LY · CCB",
    description:
      "Ex-integrante da Companhia do Cervo Branco, Lyra atravessa as ruínas sem conceder ao passado o direito de decidir tudo. Observadora e precisa, encontra uma nova razão para liderar quando Asterion cai.",
    detail: "Arma: arco · Vínculo: Cervo Branco · Norte: reconstrução",
    tone: "moss",
  },
  {
    name: "Mira",
    role: "A chave sem dentes",
    mark: "MI · GC",
    description:
      "Larápia, sobrevivente e dona de uma honestidade seletiva. Mira abre o que ninguém quer que seja aberto — portas, registros e conversas — com uma gazua chamada Chave sem Dentes e humor para enfrentar o impossível.",
    detail: "Arte: infiltração · Objeto: Chave sem Dentes · Guilda: Caminhos",
    tone: "ember",
  },
] as const;

const chapters = [
  {
    id: "01",
    label: "A faísca",
    title: "Coisas que um Ferreiro Não Deveria Fazer",
    text: "Em Ferrosul, Kael aprende que magia, botas incendiadas e segredos de família raramente terminam bem. Quando a Coroa chega, fugir deixa de ser escolha.",
    sigil: "F",
  },
  {
    id: "02",
    label: "A rota",
    title: "Encontre Nareth",
    text: "Uma mensagem impossível aponta para Nareth. Entre arquivos abandonados e estradas caçadas, o grupo descobre que algumas bibliotecas guardam testemunhas — não tesouros.",
    sigil: "N",
  },
  {
    id: "03",
    label: "O vínculo",
    title: "Quatro Caminhos, Uma Vigília",
    text: "Kael e Dharen atravessam um ritual antigo e passam a compartilhar intenção. O Laço Astral não entrega força: torna impossível ignorar o que o outro carrega.",
    sigil: "V",
  },
  {
    id: "04",
    label: "Os fragmentos",
    title: "Memória, Essência e Vontade",
    text: "Com Malgor se erguendo entre ruínas e a Coroa ocupando Asterion, os Fragmentos deixam de ser relíquias. Tornam-se perguntas sobre o que vale ser lembrado.",
    sigil: "M",
  },
  {
    id: "05",
    label: "A escolha",
    title: "O Último Selo",
    text: "A Casa dos Ecos revela a verdade: o último selo não é uma prisão. É uma escolha. E nenhum caminho pertence a um rei quando alguém decide testemunhar.",
    sigil: "S",
  },
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCharacter, setActiveCharacter] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  const selectedCharacter = characters[activeCharacter];
  const selectedChapter = chapters[activeChapter];
  const chapterProgress = useMemo(() => ((activeChapter + 1) / chapters.length) * 100, [activeChapter]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 16);
      setProgress(max > 0 ? Math.min((window.scrollY / max) * 100, 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText("O último selo não é uma prisão. É uma escolha.");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const chooseNavigation = (id: string) => {
    setIsMenuOpen(false);
    window.setTimeout(() => scrollToId(id), 70);
  };

  return (
    <main className="site-shell">
      <div className="reading-progress" style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" />

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); scrollToId("top"); }} aria-label="Voltar ao início">
          <img className="brand-mark" src={art.logo} alt="Marca-runa da Chama do Último Reino" />
          <span className="brand-copy">
            <strong>A Chama</strong>
            <small>do Último Reino</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(([label, id]) => (
            <button key={id} onClick={() => chooseNavigation(id)}>{label}</button>
          ))}
        </nav>

        <button className="nav-cta" onClick={() => chooseNavigation("livro")}>
          Abrir o Livro I <ArrowUpRight size={15} />
        </button>

        <button className="menu-trigger" type="button" aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {isMenuOpen && (
          <div className="mobile-menu">
            {navigation.map(([label, id], index) => (
              <button key={id} onClick={() => chooseNavigation(id)}><span>0{index + 1}</span>{label}<ChevronRight size={17} /></button>
            ))}
          </div>
        )}
      </header>

      <section className="hero" id="top">
        <img className="hero-atmosphere" src={art.archive} alt="Ruínas noturnas de Asterion sob a lua" />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="ember-specks" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>

        <div className="hero-grid">
          <div className="hero-copy reveal-ready">
            <p className="eyebrow"><span /> Arquivo recuperado · Livro I</p>
            <h1><em>A Chama</em><br />do Último Reino</h1>
            <p className="hero-intro">O rei foi selado. A memória não.</p>
            <p className="hero-summary">Oito séculos após a queda de Asterion, uma chama azul desperta nas mãos de um jovem ferreiro — e chama de volta tudo o que o mundo tentou esquecer.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollToId("historia")}><BookOpen size={17} /> Conhecer a história</button>
              <button className="text-action" onClick={() => scrollToId("vigilia")}>Explorar a Vigília <ArrowDownRight size={17} /></button>
            </div>
          </div>

          <div className="hero-art-frame">
            <span className="art-index">ARQ. 00 / VIGÍLIA</span>
            <img src={art.kaelDharen} alt="Kael e Dharen entre as ruínas de Asterion" />
            <div className="art-edge-note">Fogo azul<br />e prata</div>
            <span className="frame-corner corner-tl" /><span className="frame-corner corner-br" />
          </div>
        </div>

        <button className="hero-scroll" onClick={() => scrollToId("historia")} aria-label="Rolar para a história">
          <span>Continue a leitura</span><i />
        </button>
      </section>

      <section className="stat-ribbon" aria-label="Dados sobre o livro">
        <div><strong>800</strong><span>anos de silêncio</span></div>
        <div><strong>12</strong><span>capítulos e epílogo</span></div>
        <div><strong>1</strong><span>rei que não morreu</span></div>
        <div><strong>3</strong><span>fragmentos a proteger</span></div>
      </section>

      <section className="story-section section-pad" id="historia">
        <div className="section-rail"><span>01</span><i /><small>O que foi esquecido</small></div>
        <div className="story-layout">
          <div className="story-lede reveal-ready">
            <p className="eyebrow dark"><span /> A história</p>
            <h2>Quando a chama escolhe<br /><em>um ferreiro.</em></h2>
          </div>
          <div className="story-body">
            <p className="dropcap">Asterion queimou quando Malgor, o Rei das Cinzas, atravessou a morte. Cinco guerreiros o selaram usando um cristal que se partiu em três, jurando esconder os fragmentos antes que o rei pudesse retornar.</p>
            <p>Oito séculos depois, em uma vila pequena demais para guardar segredos, Kael descobre que a magia azul em suas mãos não é acidente. Ao lado de Dharen, um viajante com uma espada rúnica e memórias que não conta, ele parte por estradas onde a Coroa já procura seu nome.</p>
            <p>Entre bibliotecas esquecidas, montanhas construídas para esconder uma Essência e uma cidade que se recusa a obedecer ao seu antigo trono, a travessia de Kael revela que a maior prisão pode ser a história escrita por quem tinha poder para vencê-la.</p>
            <button className="inline-link" onClick={() => scrollToId("livro")}>Ver o percurso do Livro I <ArrowDownRight size={17} /></button>
          </div>
        </div>
      </section>

      <section className="quote-band" aria-label="Citação do livro">
        <div className="quote-ornament"><Quote size={34} /></div>
        <blockquote>“O último selo não é uma prisão.<br /><em>É uma escolha.</em>”</blockquote>
        <div className="quote-tools">
          <span>Casa dos Ecos · Registro final</span>
          <button onClick={copyQuote} aria-label="Copiar citação">{copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copiado" : "Copiar"}</button>
        </div>
      </section>

      <section className="vigil-section section-pad" id="vigilia">
        <div className="section-rail section-rail-light"><span>02</span><i /><small>Entre a memória e o caminho</small></div>
        <div className="vigil-grid">
          <div className="vigil-image-wrap">
            <img src={art.grimoire} alt="Grimório e fragmento do cristal de Asterion" />
            <div className="image-caption"><Sparkles size={14} /> Fragmento de registro — Nareth</div>
          </div>
          <div className="vigil-copy">
            <p className="eyebrow"><span /> A Vigília</p>
            <h2>Nem toda magia<br />quer ser <em>possuída.</em></h2>
            <p>O poder em A Chama do Último Reino não existe para coroar alguém. A Vigília reúne pessoas e vestígios em torno de uma tarefa mais difícil: testemunhar o que aconteceu sem permitir que o passado decida o próximo passo.</p>
            <div className="lore-list">
              <div><span className="lore-icon icon-blue"><Flame size={18} /></span><p><strong>Memória</strong><small>O que ainda pode mudar você.</small></p></div>
              <div><span className="lore-icon icon-gold"><Swords size={18} /></span><p><strong>Essência</strong><small>Aquilo que responde ao que é oferecido.</small></p></div>
              <div><span className="lore-icon icon-ivory"><Compass size={18} /></span><p><strong>Vontade</strong><small>O caminho que alguém escolhe seguir.</small></p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="characters-section section-pad" id="personagens">
        <div className="section-rail"><span>03</span><i /><small>Os que seguem</small></div>
        <div className="characters-heading">
          <div><p className="eyebrow dark"><span /> Personagens</p><h2>Quatro caminhos.<br /><em>Nenhum passa sozinho.</em></h2></div>
          <p>Quando o passado insiste em voltar, a companhia não nasce da profecia — mas da decisão de seguir junto.</p>
        </div>

        <div className="character-display">
          <div className="character-tabs" role="tablist" aria-label="Personagens principais">
            {characters.map((character, index) => (
              <button key={character.name} className={activeCharacter === index ? "selected" : ""} role="tab" aria-selected={activeCharacter === index} onClick={() => setActiveCharacter(index)}>
                <span className="char-number">0{index + 1}</span><span><strong>{character.name}</strong><small>{character.role}</small></span><ChevronRight size={17} />
              </button>
            ))}
          </div>
          <article className={`character-detail tone-${selectedCharacter.tone}`} aria-live="polite">
            <div className="character-detail-top"><span>{selectedCharacter.mark}</span><span className="detail-sigil">{activeCharacter === 0 ? "✦" : activeCharacter === 1 ? "✧" : activeCharacter === 2 ? "◒" : "◇"}</span></div>
            <p className="detail-role">{selectedCharacter.role}</p>
            <h3>{selectedCharacter.name}</h3>
            <p className="detail-description">{selectedCharacter.description}</p>
            <div className="detail-meta"><MapPin size={15} /> {selectedCharacter.detail}</div>
            <div className="character-pip-row" aria-hidden="true">{characters.map((_, index) => <i className={activeCharacter === index ? "active" : ""} key={index} />)}</div>
          </article>
          <div className="companions-art">
            <img src={art.companhia} alt="Kael, Dharen, Lyra e Mira diante das ruínas de Asterion" />
            <div className="companions-label"><span>Companhia em trânsito</span><strong>ASTERION · APÓS A QUEDA</strong></div>
          </div>
        </div>
      </section>

      <section className="book-section section-pad" id="livro">
        <img className="book-backdrop" src={art.archive} alt="" aria-hidden="true" />
        <div className="book-shade" />
        <div className="section-rail section-rail-light"><span>04</span><i /><small>Livro I · A jornada</small></div>
        <div className="book-heading"><p className="eyebrow"><span /> Livro I</p><h2>Todo caminho deixa<br /><em>um fragmento.</em></h2></div>
        <div className="chapter-console">
          <div className="chapter-list" role="tablist" aria-label="Marcos do Livro I">
            {chapters.map((chapter, index) => (
              <button key={chapter.id} className={activeChapter === index ? "selected" : ""} role="tab" aria-selected={activeChapter === index} onClick={() => setActiveChapter(index)}>
                <span>{chapter.id}</span><strong>{chapter.label}</strong><i>{chapter.sigil}</i>
              </button>
            ))}
          </div>
          <article className="chapter-card" aria-live="polite">
            <div className="chapter-card-top"><span>REGISTRO {selectedChapter.id}</span><span>{Math.round(chapterProgress)}% DA TRAVESSIA</span></div>
            <div className="chapter-sigil">{selectedChapter.sigil}</div>
            <p className="chapter-label">{selectedChapter.label}</p>
            <h3>{selectedChapter.title}</h3>
            <p>{selectedChapter.text}</p>
            <button className="chapter-next" onClick={() => setActiveChapter((activeChapter + 1) % chapters.length)}>Próximo fragmento <ArrowDownRight size={17} /></button>
            <div className="chapter-meter"><i style={{ width: `${chapterProgress}%` }} /></div>
          </article>
        </div>
      </section>

      <section className="north-cta">
        <img src={art.north} alt="Estrada rumo a montanhas e à Casa sem Sol" />
        <div className="north-overlay" />
        <div className="north-content">
          <p className="eyebrow"><span /> Após o Livro I</p>
          <h2>A estrada<br />continua <em>ao norte.</em></h2>
          <p>Uma lua escura. Uma linha vertical. E três palavras que ninguém deveria reconhecer: Casa sem Sol.</p>
          <a className="button button-primary" href="mailto:?subject=Quero%20acompanhar%20A%20Chama%20do%20%C3%9Altimo%20Reino&body=Quero%20receber%20novidades%20sobre%20A%20Chama%20do%20%C3%9Altimo%20Reino."><Compass size={17} /> Acompanhar a saga</a>
        </div>
        <div className="north-coordinate">CASA SEM SOL<br />NORTE DESCONHECIDO</div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><img src={art.logo} alt="" /><span><strong>A Chama</strong> do Último Reino</span></div>
        <p>Livro I · Uma fantasia épica sobre memória, ruínas e a liberdade de escolher o próprio caminho.</p>
        <span className="footer-folio">ARQUIVO 01 · 2026</span>
      </footer>
    </main>
  );
}
