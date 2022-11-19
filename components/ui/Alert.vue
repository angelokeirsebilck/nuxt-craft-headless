<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const show = ref(true);

const alert = cva("p-2 bg-opacity-20", {
  variants: {
    intent: {
      success: "bg-success-default  border-success-default border",
      danger: "bg-error-default  border-error-default border"
    }
  },
  defaultVariants: {
    intent: "danger"
  }
});

type AlertProps = VariantProps<typeof alert>;

const props = defineProps<{
  intent: AlertProps["intent"];
  autoClose: null | undefined | number | boolean;
}>();

onMounted(() => {
  show.value = true;
  if (props.autoClose && props.autoClose !== 0) {
    setTimeout(() => {
      show.value = false;
    }, props.autoClose * 1000);
  }
});
</script>

<template>
  <div v-if="show" :class="alert({ intent })">
    <slot />
  </div>
</template>
