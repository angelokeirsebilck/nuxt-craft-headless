<script lang="ts" setup></script>

<template>
  <div class="flex flex-col min-h-screen">
    <LayoutTheHeader :errorTemplate="true" />
    <slot />
    <LayoutTheFooter />
  </div>
</template>
