/**
 * Arquivo das Cinzas — configuração estática.
 * O site é entregue como SPA estática, sem renderização no servidor.
 */
export default defineNuxtConfig({
  ssr: false,
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: { lang: "pt-BR" },
      title: "A Chama do Último Reino — Livro I",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "A Chama do Último Reino — uma fantasia épica sobre memória, ruínas e a liberdade de escolher o próprio caminho.",
        },
        { name: "theme-color", content: "#111317" },
      ],
      link: [
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
