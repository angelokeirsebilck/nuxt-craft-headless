<script lang="ts">
// export default {
//   inheritAttrs: false
// };
</script>
<script lang="ts" setup>
// import { useAttrs } from "vue";

interface IProps {
  fieldData: any;
}
const props = defineProps<IProps>();
// const attrs = useAttrs();

// const attributes = computed(() => {
//   return {
//     ...attrs,
//     label: ""
//   };
// });
</script>

<template>
  <FormKit type="checkbox">
    <template #label>
      <div class="prose" v-html="props.fieldData.descriptionHtml"></div>
    </template>
  </FormKit>
</template>
