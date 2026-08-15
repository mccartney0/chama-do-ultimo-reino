/**
 * Arquivo das Cinzas — injeta metadados de partilha no HTML estático dos dossiês.
 * Nuxt opera com ssr:false; por isso, as tags precisam existir antes do navegador
 * executar a aplicação para que robôs de redes sociais possam ler cada rota.
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || "https://chama-do-ultimo-reino.manus.space").replace(/\/$/, "");
const outputRoot = resolve(process.cwd(), ".output/public");

const dossiers = [
  { slug: "kael", name: "Kael Auren", role: "O ferreiro da chama azul", summary: "Kael Auren, ferreiro de Ferrosul, carrega uma chama azul que devolve nomes que o mundo tentou enterrar.", image: "/manus-storage/kael-retrato_ae7eda73.png" },
  { slug: "dharen", name: "Dharen Varenn", role: "O Caminhante de Prata", summary: "Dharen Varenn, Caminhante de Prata, atravessa Asterion com uma espada rúnica e um laço que o impede de carregar o peso sozinho.", image: "/manus-storage/dharen-retrato_4f422802.png" },
  { slug: "lyra", name: "Lyra", role: "A arqueira que reconstrói", summary: "Lyra, arqueira do Cervo Branco, lê cada ruína como aviso e escolhe reconstruir rotas para quem ainda precisa de companhia.", image: "/manus-storage/lyra-retrato_b043ad7e.png" },
  { slug: "mira", name: "Mira", role: "A chave sem dentes", summary: "Mira, uma chave sem dentes da Guilda dos Caminhos, transforma suspeita em método para abrir os registros que a Coroa esconde.", image: "/manus-storage/mira-retrato_236b1e36.png" },
];

const socialMetaKeys = new Set([
  "description", "og:type", "og:site_name", "og:title", "og:description", "og:url", "og:image", "og:image:alt",
  "twitter:card", "twitter:title", "twitter:description", "twitter:image", "twitter:image:alt",
]);

function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function attributeValue(tag, attribute) {
  const match = tag.match(new RegExp(`${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? "";
}

function stripGlobalSocialTags(html) {
  const withoutMetas = html.replace(/<meta\b[^>]*>/gi, (tag) => {
    const identity = attributeValue(tag, "property") || attributeValue(tag, "name");
    return socialMetaKeys.has(identity) ? "" : tag;
  });

  return withoutMetas
    .replace(/<link\b[^>]*>/gi, (tag) => attributeValue(tag, "rel").toLowerCase() === "canonical" ? "" : tag)
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<!-- character-social-meta:start -->[\s\S]*?<!-- character-social-meta:end -->\s*/g, "");
}

function buildSocialTags(dossier) {
  const title = `${dossier.name} — A Chama do Último Reino`;
  const url = `${siteUrl}/personagens/${dossier.slug}`;
  const image = new URL(dossier.image, siteUrl).toString();
  const imageAlt = `Retrato de ${dossier.name}, ${dossier.role}`;

  return `<!-- character-social-meta:start -->
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(dossier.summary)}">
    <meta property="og:type" content="profile">
    <meta property="og:site_name" content="A Chama do Último Reino">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(dossier.summary)}">
    <meta property="og:url" content="${escapeHtml(url)}">
    <meta property="og:image" content="${escapeHtml(image)}">
    <meta property="og:image:alt" content="${escapeHtml(imageAlt)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(dossier.summary)}">
    <meta name="twitter:image" content="${escapeHtml(image)}">
    <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}">
    <link rel="canonical" href="${escapeHtml(url)}">
    <!-- character-social-meta:end -->`;
}

async function injectSocialMeta(dossier) {
  const pagePath = resolve(outputRoot, "personagens", dossier.slug, "index.html");
  const html = await readFile(pagePath, "utf8");
  const preparedHtml = stripGlobalSocialTags(html);
  const output = preparedHtml.replace("</head>", `${buildSocialTags(dossier)}\n  </head>`);

  if (output === preparedHtml) throw new Error(`A tag </head> não foi encontrada em ${pagePath}.`);
  await writeFile(pagePath, output);
}

await Promise.all(dossiers.map(injectSocialMeta));
console.log(`Metatags sociais injetadas em ${dossiers.length} dossiês estáticos.`);
