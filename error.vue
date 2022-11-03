<template>
  <NuxtLayout name="error">
    <div class="container flex items-center justify-center grow">
      <div class="mx-auto max-w-max">
        <main class="sm:flex">
          <p class="text-4xl font-extrabold text-green-400 sm:text-5xl">
            {{ error.statusCode }}
          </p>
          <div class="sm:ml-6">
            <div class="sm:u-border-gray-200 sm:border-l sm:pl-6">
              <h1
                class="text-4xl font-semibold tracking-tight u-text-gray-900 sm:text-5xl"
                v-show="error.statusMessage"
              >
                {{ error.statusMessage }}
              </h1>
              <p class="mt-1 text-xl">
                {{ error.message }}
              </p>
            </div>
            <div
              @click="handleError"
              class="flex mt-10 space-x-3 sm:border-l sm:border-transparent sm:pl-6"
            >
              <a
                class="px-8 py-4 font-medium uppercase bg-green-400 cursor-pointer"
                ><!---->
                Go back home
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
onMounted(() => {
  console.log("TODO: slack error message integration");
});

const {
  params: { locale },
} = useRoute();
const matchingSite = useGetCurrentSiteData({ locale: locale as string });
const primarySite = useGetPrimarySiteData();
const currentSite = matchingSite ? matchingSite : primarySite;

defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: `/${currentSite.language}` });
</script>
