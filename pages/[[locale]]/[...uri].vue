<template>
  <div>
    <div class="container">
      <div class="flex flex-col my-16">
        <p>path: {{ path }}</p>
        <p>locale: {{ locale }}</p>
        <p>uri: {{ uri }}</p>
      </div>
      <div class="flex flex-col my-16" v-show="pageInfo">
        <h1>Title: {{ pageInfo?.title }}</h1>
        <div class="" v-if="pageInfo?.typeHandle">
          <p>Entry Type Handle: {{ pageInfo?.typeHandle }}</p>
          <p>Entry Section Handle: {{ pageInfo?.sectionHandle }}</p>
        </div>
        <div class="" v-else>
          <p>Category Group Handle: {{ pageInfo?.groupHandle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { entryQuery } from "@/graphql/entry.gql";
import { categoryQuery } from "@/graphql/category.gql";
import { mainNavQuery } from "@/graphql/nav/mainnav.gql";
import { combinedQuery } from "@/graphql/combined.gql";

import { useSiteStore } from "~/stores/useSiteStore";
import { use } from "h3";
const siteStore = useSiteStore();

const route = useRoute();
const {
  path,
  params: { locale, uri },
} = route;

const matchingSite = useGetCurrentSiteData({ locale: locale as string });
const primarySite = useGetPrimarySiteData();
const currentSite = matchingSite ? matchingSite : primarySite;

const finalUri = useGetUri({
  matchingSite,
  uri,
  locale,
  path,
});

// Set preview headers if using useAsyncGql

// const {
//   token,
//   "x-craft-preview": xCraftPreview,
//   "x-craft-live-preview": xCraftLivePreview,
// } = route.query;

// if (token && xCraftPreview) {
//   useGqlHeaders({ "X-Craft-Token": `${token}` });
//   useGqlHeaders({ "x-craft-live-preview": `${xCraftPreview}` });
// }

// if (token && xCraftLivePreview) {
//   useGqlHeaders({ "X-Craft-Token": `${token}` });
//   useGqlHeaders({ "x-craft-live-preview": `${xCraftLivePreview}` });
// }

//------------------------NUXT GRAPHQL CLIENT----------------------------
// Probleem: Als je op de category page start werkt alles, maar als je op een entry page start en dan naar category gaat is category undefined

// const [
//   { data: entry },
//   { data: category },
//   {
//     data: {
//       value: {
//         globalSet: { fieldMainNav },
//       },
//     },
//   },
// ] = await Promise.all([
//   useAsyncGql("entry", {
//     uri: finalUri,
//     siteId: currentSite.siteId,
//   }),
//   useAsyncGql("category", {
//     uri: finalUri,
//     siteId: currentSite.siteId,
//   }),
//   useAsyncGql("mainNavigation", {
//     siteId: currentSite.siteId,
//   }),
// ]);

// const pageInfo = entry?.value?.entry || category?.value?.category || null;

// if (fieldMainNav) {
//   siteStore.addMainNavigation(fieldMainNav);
// }

//------------- Enkel $fetch------------------------
// Pagina's laden traag, moeten alle 3 die calls doen vooraleer de pagina veranderd, geen optie om lazy load (pending state) te gebruiken

const variables = {
  uri: finalUri,
  siteId: currentSite.siteId,
};

// const { data: entry } = await useGraphqlQuery({
//   query: entryQuery,
//   variables,
//   routeQuery: route.query,
//   fetchKey: `${locale}/${uri}-entry`,
// });

// const { data: category } = await useGraphqlQuery({
//   query: categoryQuery,
//   variables,
//   routeQuery: route.query,
//   fetchKey: `${locale}/${uri}-category`,
// });

// const { data: mainNav } = await useGraphqlQuery({
//   query: mainNavQuery,
//   variables,
//   routeQuery: route.query,
//   fetchKey: `mainNav`,
// });

// console.log(entry);
// console.log(category);
// console.log(mainNav);

// if (mainNav?.globalSet?.fieldMainNav) {
//   siteStore.addMainNavigation(mainNav.globalSet.fieldMainNav);
// }

// const pageInfo = entry?.entry || category?.category || null;

// -----------------Using Async Data $fetch with fetchkey--------------------

// if (mainNav?.value?.data?.globalSet?.fieldMainNav) {
//   siteStore.addMainNavigation(mainNav.value.data.globalSet.fieldMainNav);
// }

// const pageInfo =
//   entry?.value?.data?.entry || category?.value?.data?.category || null;

const { data } = await useGraphqlQuery({
  query: combinedQuery,
  variables,
  routeQuery: route.query,
  fetchKey: `${locale}/${uri}-combined`,
});

const pageInfo =
  data?.value?.data?.entry || data?.value?.data?.category || null;

if (data?.value?.data?.globalSet?.fieldMainNav) {
  siteStore.addMainNavigation(data.value.data.globalSet.fieldMainNav);
}

// const pageInfo = computed(() => {
//   if (entry?.value?.data?.entry !== null) return entry.value.data.entry;
//   if (category?.value?.data?.entry !== null)
//     return category.value.data.category;
//   return null;
// });

// let pageInfo = null;

// Get page content
// const {
//   data: {
//     value: { entry },
//   },
// } = await useAsyncGql("entry", {
//   uri: finalUri,
//   siteId: currentSite.siteId,
// });

// pageContent = entry;

// if (pageContent == null) {
//   const {
//     data: {
//       value: { category },
//     },
//   } = await useAsyncGql("category", {
//     uri: finalUri,
//     siteId: currentSite.siteId,
//   });

//   pageContent = category;
// }

// const [{ data: category }, { data: entry }] = await Promise.all([
//   useAsyncGql("category", {
//     uri: finalUri,
//     siteId: currentSite.siteId,
//   }),
//   useAsyncGql("entry", {
//     uri: finalUri,
//     siteId: currentSite.siteId,
//   }),
// ]);

// const { data } = await useAsyncData("categoryQuery", () =>
//   GqlCategory({ uri: finalUri, siteId: currentSite.siteId })
// );

// const { data: category, refresh: refreshCat } = await useGraphqlQuery({
//   key: "category",
//   query: categoryQuery,
//   routeQuery: {},
//   variables: {
//     uri: finalUri,
//     siteId: currentSite.siteId,
//   },
// });

// refreshCat();

// const { data: entry, refresh } = await useGraphqlQuery({
//   key: "entry",
//   query: entryQuery,
//   routeQuery: {},
//   variables: {
//     uri: finalUri,
//     siteId: currentSite.siteId,
//   },
// });

// refresh();

// const pageInfo = computed(() => {
//   if (entry.value.data.entry !== null) return entry.value.data.entry;
//   if (category.value.data.entry !== null) return category.value.data.category;
//   return null;
// });

// const { data: mainNav } = await useGraphqlQuery({
//   key: "mainNav",
//   query: mainNavQuery,
//   routeQuery: {},
//   variables: {
//     siteId: currentSite.siteId,
//   },
// });

// if (mainNav.value.data.globalSet.fieldMainNav) {
//   siteStore.addMainNavigation(mainNav.value.data.globalSet.fieldMainNav);
// }

// const pageInfo = entry.value.data.entry || category.value.data.category || null;

// const { data: category } = await useFetch(
//   "http://craft-headless-nuxt.ddev.site/api",
//   {
//     key: "category",
//     method: "POST",
//     body: {
//       query: categoryQuery,
//       variables: {
//         uri: finalUri,
//         siteId: currentSite.siteId,
//       },
//     },
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer tAexk1_cXgXaO3s-yYm3ApTBosQ_PdWW`,
//     },
//   }
// );

// const { data: entry } = await useFetch(
//   "http://craft-headless-nuxt.ddev.site/api",
//   {
//     key: "entry",
//     method: "POST",
//     body: {
//       query: entryQuery,
//       variables: {
//         uri: finalUri,
//         siteId: currentSite.siteId,
//       },
//     },
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer tAexk1_cXgXaO3s-yYm3ApTBosQ_PdWW`,
//     },
//   }
// );

// const pageInfo = entry.value.data.entry || category.value.data.category || null;

// const GqlInstance = useGql();
// const data = await GqlInstance("combined", {
//   uri: finalUri,
//   siteId: currentSite.siteId,
// });

// console.log();

// const { data } = await useAsyncGql("combined", {
//   uri: finalUri,
//   siteId: currentSite.siteId,
// });

// const pageInfo = computed(() => {
//   if (data?.value?.entry) return data?.value?.entry;
//   if (data?.value?.category) return data?.value?.category;

//   return null;
// });

// const pageInfo = data?.value?.entry || data?.value?.category || null;

// const pageInfo = entry?.value?.entry || category?.value?.category || null;

// Get Navigation
// const {
//   data: {
//     value: {
//       globalSet: { fieldMainNav },
//     },
//   },
// } = await useAsyncGql("mainNavigation", {
//   siteId: currentSite.siteId,
// });

// Render 404
// if (pageInfo == null) {
//   throw createError({
//     fatal: true,
//     statusCode: 404,
//   });
// }

// if (fieldMainNav) {
//   siteStore.addMainNavigation(fieldMainNav);
// }

siteStore.addLocale(currentSite.language);
</script>
