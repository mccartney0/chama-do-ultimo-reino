const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || "https://chama-do-ultimo-reino.manus.space";
const socialImage = `${siteUrl}/manus-storage/asterion-archive-banner_ccb0ec7d.jpg`;
const socialDescription =
  "A saga completa de A Chama do Último Reino: o Livro I leva Kael de Ferrosul ao Último Selo; o Livro II — O Sangue do Guerreiro — revela a transformação de Dharen e a jornada até a Casa sem Sol.";

/**
 * Arquivo das Cinzas — configuração estática.
 * O site é entregue como SPA estática, sem renderização no servidor.
 */
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: { siteUrl },
  },
  css: ["~/assets/css/main.css", "~/assets/css/refinements.css", "~/assets/css/newsletter-feedback.css", "~/assets/css/character-gallery.css", "~/assets/css/character-archive.css", "~/assets/css/archive-route-refinement.css", "~/assets/css/asterion-records.css", "~/assets/css/asterion-archive-refinement.css", "~/assets/css/asterion-map.css", "~/assets/css/asterion-atlas-page.css", "~/assets/css/asterion-atlas-refinement.css", "~/assets/css/character-dossier-page.css", "~/assets/css/character-dossier-refinement.css", "~/assets/css/character-dossier-interactivity.css", "~/assets/css/characters-index-page.css", "~/assets/css/internal-navigation.css", "~/assets/css/scroll-motion.css", "~/assets/css/narrative-signals.css", "~/assets/css/ritual-transition.css", "~/assets/css/book-two-ruby.css"],
  app: {
    pageTransition: { name: "archive-page", mode: "out-in" },
    head: {
      htmlAttrs: { lang: "pt-BR" },
      title: "A Chama do Último Reino — Livros I & II · Arquivo da Vigília",
      titleTemplate: "%s",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: socialDescription,
        },
        { name: "theme-color", content: "#111317" },
        { property: "og:locale", content: "pt_BR" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "A Chama do Último Reino" },
        { property: "og:title", content: "A Chama do Último Reino — Livro II · O Sangue do Guerreiro" },
        { property: "og:description", content: socialDescription },
        { property: "og:url", content: siteUrl },
        { property: "og:image", content: socialImage },
        { property: "og:image:alt", content: "As ruínas de Asterion em A Chama do Último Reino" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "A Chama do Último Reino — Livro II · O Sangue do Guerreiro" },
        { name: "twitter:description", content: socialDescription },
        { name: "twitter:image", content: socialImage },
        { name: "twitter:image:alt", content: "As ruínas de Asterion em A Chama do Último Reino" },
      ],
      link: [
        { rel: "canonical", href: siteUrl },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Manrope:wght@400;500;600;700;800&display=swap",
        },
      ],
    },
  },
  nitro: {
    preset: "static",
    prerender: {
      routes: ["/personagens", "/personagens/kael", "/personagens/dharen", "/personagens/lyra", "/personagens/mira", "/personagens/sarya", "/personagens/varos"],
    },
    publicAssets: [
      {
        baseURL: "/manus-storage",
        dir: "/home/ubuntu/webdev-static-assets/nuxt-storage",
      },
    ],
  },
  compatibilityDate: "2025-04-17",
  devtools: { enabled: false },
});
