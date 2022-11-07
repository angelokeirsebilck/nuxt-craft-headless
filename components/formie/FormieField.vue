<script lang="ts" setup>
interface IProps {
  field: [Object];
}

const props = defineProps<IProps>();

const field = computed(() => {
  return props.field[0];
});
</script>

<template>
  <div>
    <component :fieldData="field" :is="`${field.displayName}`"></component>
  </div>
</template>
