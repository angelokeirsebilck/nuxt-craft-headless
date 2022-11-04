<script lang="ts" setup>
import { pagesDefaultQuery } from "~~/graphql/views/pages/default.gql";
import { useSiteStore } from "~/stores/useSiteStore";
const siteStore = useSiteStore();

const { data } = await useAsyncGql("categoryProjectsCat", {
  siteId: siteStore.siteId,
  uri: siteStore.finalUri,
});

const contentBuilderData = computed(() => {
  return data?.value?.category?.fieldContentBuilder;
});
</script>

<template>
  <div>Component: views/ProjectsCat</div>
  <BaseContentBuilder
    :content="contentBuilderData"
    v-show="contentBuilderData"
  />
</template>
