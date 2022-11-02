<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid/index";
import { useSiteStore } from "~/stores/useSiteStore";
const siteStore = useSiteStore();
</script>

<template>
  <Menu as="div" class="relative inline-block ml-8 text-left">
    <div>
      <MenuButton
        class="inline-flex justify-center w-full p-2 text-sm font-medium text-gray-700"
      >
        {{ siteStore.locale.toUpperCase() }}
        <ChevronDownIcon class="w-5 h-5 -mr-1" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem v-slot="{ active }" v-for="loc in siteStore.localized">
            <NuxtLink
              :to="`/${loc.language}/${loc.uri.replace('__home__', '')}`"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-2 py-1 leading-none hover:bg-green-100',
              ]"
              >{{ loc.language.toUpperCase() }}</NuxtLink
            >
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
<style scoped></style>
