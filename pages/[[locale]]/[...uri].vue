<template>
  <div>
    <div class="container">
      <div class="flex flex-col my-16">
        <p>path: {{ path }}</p>
        <p>locale: {{ locale }}</p>
        <p>uri: {{ uri }}</p>
      </div>
      <div class="flex flex-col my-16">
        <h1>Title: {{ entry.title }}</h1>
        <p>Entry Type Handle: {{ entry.typeHandle }}</p>
        <p>Entry Section Handle {{ entry.sectionHandle }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const {
  data: {
    value: { entry },
  },
} = await useAsyncGql("entry", {
  uri: finalUri,
  siteId: currentSite.siteId,
});

// Render 404
if (!entry) {
  throw createError({
    fatal: true,
    statusCode: 404,
  });
}
</script>
