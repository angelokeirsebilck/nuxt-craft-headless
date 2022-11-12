<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
interface IProps {
  fieldData: any;
}

const props = defineProps<IProps>();

const attrs = useAttrs();

const attributes = computed(() => {
  return {
    ...attrs,
    label:
      "WIP hier komt agree label, formie bug (no descriptionHtml field on inline fragment)",
  };
});
</script>

<template>
  <FormKit type="checkbox" v-bind="attributes" />
</template>
