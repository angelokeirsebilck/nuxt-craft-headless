import { resolve } from "path";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-graphql-client"],
  runtimeConfig: {
    // The private keys which are only available server-side
    CRAFT_CMS_GRAPHQL_ENDPOINT: "http://craft-headless-nuxt.ddev.site/api",
    CRAFT_CMS_GRAPHQL_TOKEN: "tAexk1_cXgXaO3s-yYm3ApTBosQ_PdWW",
    // Keys within public are also exposed client-side
    public: {
      CRAFT_CMS_GRAPHQL_ENDPOINT: "http://craft-headless-nuxt.ddev.site/api",
      CRAFT_CMS_GRAPHQL_TOKEN: "tAexk1_cXgXaO3s-yYm3ApTBosQ_PdWW",
      "graphql-client": {
        watch: true,
        silent: true,
        autoImport: true,
        functionPrefix: "Gql",
        onlyOperationTypes: true,
        documentPaths: ["./graphql/"],
        clients: {
          default: {
            host: process.env.CRAFT_CMS_GRAPHQL_ENDPOINT || "",
            token: process.env.CRAFT_CMS_GRAPHQL_TOKEN || "",
            // retainToken: process.env.RETAIN_TOKEN === "true" || false,
          },
        },
      },
    },
  },
});
