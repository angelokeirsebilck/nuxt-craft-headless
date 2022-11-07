<script lang="ts" setup>
interface IProps {
  fieldData: any;
}

defineProps<IProps>();
</script>

<template>
  <div>
    <FormKit
      type="text"
      :name="fieldData.handle"
      :validation="fieldData.required ? 'required' : ''"
      :validation-messages="{ required: fieldData.errorMessage }"
      :classes="{
        outer: 'mb-5',
        label: 'block mb-1 font-bold text-sm',
        inner:
          'max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-green-300',
        input:
          'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400',
        help: 'text-xs text-gray-500',
      }"
    />
  </div>
</template>
