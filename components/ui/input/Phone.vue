
<script lang="ts">
// export default {
//   inheritAttrs: false
// };
//
</script>
<script lang="ts" setup>
interface IProps {
  fieldData: any;
}

// const attributes = computed(() => {
//   return {
//     ...Attr,
//     validation: "matches:/\+?([\d|\(][\h|\(\d{3}\)|\.|\-|\d]{4,}\d)/$",
//     validationMessages: {
//       matches: "Moet een telefoon nummer zijn."
//     }
//   };
// });

const props = defineProps<IProps>();
</script>

<template>
  <FormKit type="tel"> </FormKit>
</template>
