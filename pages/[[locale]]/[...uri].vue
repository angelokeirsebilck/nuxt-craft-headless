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
    sectionHandle: pageInfo?.sectionHandle || null,
    typeHandle: pageInfo?.typeHandle || null,
    groupHandle: pageInfo?.groupHandle || null,
  };
});

// Set preview headers if using useAsyncGql

const {
  token,
  "x-craft-preview": xCraftPreview,
  "x-craft-live-preview": xCraftLivePreview,
} = route.query;

if (token && xCraftPreview) {
  useGqlHeaders({ "X-Craft-Token": `${token}` });
  useGqlHeaders({ "x-craft-live-preview": `${xCraftPreview}` });
}

if (token && xCraftLivePreview) {
  useGqlHeaders({ "X-Craft-Token": `${token}` });
  useGqlHeaders({ "x-craft-live-preview": `${xCraftLivePreview}` });
}

const [
  { data: entry },
  { data: category },
  {
    data: {
      value: {
        globalSet: { fieldMainNav },
      },
    },
  },
] = await Promise.all([
  useAsyncGql("entry", {
    uri: finalUri,
    siteId: currentSite.siteId,
  }),
  useAsyncGql("category", {
    uri: finalUri,
    siteId: currentSite.siteId,
  }),
  useAsyncGql("mainNavigation", {
    siteId: currentSite.siteId,
  }),
]);

const pageInfo = entry?.value?.entry || category?.value?.category || null;

if (fieldMainNav) {
  siteStore.addMainNavigation(fieldMainNav);
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
siteStore.addSiteId(currentSite.siteId);
siteStore.addFinalUri(finalUri);
if (pageInfo?.localized) siteStore.addLocalized(pageInfo.localized);
</script>
