import { resolve } from "path";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-graphql-client",
    ["@pinia/nuxt", { autoImports: ["defineStore"] }],
  ],
  runtimeConfig: {
    // The private keys which are only available server-side
    CRAFT_CMS_GRAPHQL_ENDPOINT: "",
    CRAFT_CMS_GRAPHQL_TOKEN: "",

    // Keys within public are also exposed client-side
    public: {
      CRAFT_CMS_GRAPHQL_ENDPOINT: "",
      CRAFT_CMS_GRAPHQL_TOKEN: "",
      "graphql-client": {
        documentPaths: ["./graphql/"],
        clients: {
          default: {
            host: "https://test.headless.boawebdesign.be/api",
            token: "tAexk1_cXgXaO3s-yYm3ApTBosQ_PdWW",
            // retainToken: process.env.RETAIN_TOKEN === "true" || false,
          },
        },
      },
    },
  },
});
