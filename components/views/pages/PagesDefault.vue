<script lang="ts" setup>
import { useSiteStore } from "~/stores/useSiteStore";
const siteStore = useSiteStore();

const { data } = await useAsyncGql("pagesDefault", {
  siteId: siteStore.siteId,
  uri: siteStore.finalUri
});

const contentBuilderData = computed(() => {
  return data?.value?.entry?.fieldContentBuilder;
});
</script>

<template>
  <div>Component: views/PagesDefault</div>
  <BaseContentBuilder
    :content="contentBuilderData"
    v-show="contentBuilderData"
  />
</template>
