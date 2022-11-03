<script lang="ts" setup>
import { pagesDefaultQuery } from "~~/graphql/views/pages/default.gql";
import { useSiteStore } from "~/stores/useSiteStore";
const siteStore = useSiteStore();
const route = useRoute();
const {
  params: { uri },
} = route;

const { data } = await useGraphqlQuery({
  query: pagesDefaultQuery,
  variables: {
    siteId: siteStore.siteId,
    uri,
  },
  routeQuery: route.query,
  fetchKey: `${siteStore.locale}/${uri}-pagesDefault`,
});

const contentBuilderData = computed(() => {
  return data?.value?.data?.entry?.fieldContentBuilder;
});
</script>

<template>
  <div>Component: views/PagesDefault</div>
  <BaseContentBuilder
    :content="contentBuilderData"
    v-show="contentBuilderData"
  />
</template>
