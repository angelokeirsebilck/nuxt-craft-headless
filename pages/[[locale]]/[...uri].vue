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
      <component :is="useResolvePageComponent(pageResolveInfo)"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { uriQuery } from "~~/graphql/uri.gql";
import type { IPageInfo } from "@/composables/useResolvePageComponent";
import { useSiteStore } from "@/stores/useSiteStore";
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

const pageResolveInfo = computed<IPageInfo>(() => {
  return {
    sectionHandle: pageInfo.sectionHandle,
    typeHandle: pageInfo.typeHandle,
    groupHandle: pageInfo.groupHandle,
  };
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

const variables = {
  uri: finalUri,
  siteId: currentSite.siteId,
};

const { data } = await useGraphqlQuery({
  query: uriQuery,
  variables,
  routeQuery: route.query,
  fetchKey: `${locale}/${uri}-uriData`,
});

const pageInfo =
  data?.value?.data?.entry || data?.value?.data?.category || null;

if (data?.value?.data?.globalSet?.fieldMainNav) {
  siteStore.addMainNavigation(data.value.data.globalSet.fieldMainNav);
}

// Render 404
if (pageInfo == null) {
  throw createError({
    message: "This is not the page you're looking for.",
    name: "Not Found",
    fatal: true,
    statusCode: 404,
  });
}

siteStore.addLocale(currentSite.language);
siteStore.addLocalized(pageInfo.localized);
</script>
