<script lang="ts" setup>
import { useSiteStore } from "~/stores/useSiteStore";
const siteStore = useSiteStore();

const { data } = await useAsyncGql("home", {
  siteId: siteStore.siteId
});

const contentBuilderData = computed(() => {
  return data?.value?.entry?.fieldContentBuilder;
});
</script>

<template>
  <div>Component: views/Home</div>
  <BaseContentBuilder
    :content="contentBuilderData"
    v-show="contentBuilderData"
  />
</template>
