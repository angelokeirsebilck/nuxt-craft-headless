<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const button = cva("px-6 py-3 relative", {
  variants: {
    intent: {
      primary: "bg-primary-default",
      secondary: "bg-secondary-default",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

type ButtonProps = VariantProps<typeof alert>;

interface IButtonProps {
  intent: ButtonProps["intent"];
  label: string;
  isSubmitting?: boolean;
  loadingIndicator?: string | null;
  loadingIndicatorText?: string | null;
}

withDefaults(defineProps<IButtonProps>(), {
  isSubmitting: false,
});
</script>

<template>
  <div
    :class="[
      button({ intent }),
      {
        'bg-opacity-40': isSubmitting,
      },
    ]"
  >
    <div :class="{ 'opacity-0': isSubmitting }">{{ label }}</div>
    <div class="" v-if="isSubmitting && loadingIndicator == 'text'">
      {{ loadingIndicatorText }}
    </div>
    <div
      class="absolute overflow-hidden transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      v-if="isSubmitting && loadingIndicator == 'spinner'"
    >
      <div class="loader">Loading...</div>
    </div>
  </div>
</template>
<style>
.loader,
.loader:after {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.loader {
  margin: 20px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 4px solid rgba(0, 0, 0, 0.2);
  border-right: 4px solid rgba(0, 0, 0, 0.2);
  border-bottom: 4px solid rgba(0, 0, 0, 0.2);
  border-left: 4px solid #000000;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
