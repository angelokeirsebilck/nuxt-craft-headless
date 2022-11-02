<script lang="ts" setup>
import { pagesContactQuery } from "~~/graphql/views/pages/contact.gql";
import { useSiteStore } from "~/stores/useSiteStore";
const siteStore = useSiteStore();
const route = useRoute();
const {
  params: { uri },
} = route;

const { data } = await useGraphqlQuery({
  query: pagesContactQuery,
  variables: {
    siteId: 2,
    uri,
  },
  routeQuery: route.query,
  fetchKey: `${siteStore.locale}/${uri}-pagesDefault`,
});
</script>

<template>
  <div>Component: views/PagesContact</div>
</template>

<style scoped></style>
