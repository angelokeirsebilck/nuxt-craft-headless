<template>
  <div>
    <div v-for="block in content">
      <component :is="resolveBlockComponent(block?.__typename)"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  content: Array<any>;
}

defineProps<Props>();

const resolveBlockComponent = (typename) => {
  const instance = getCurrentInstance();
  let blockToResolve = useFirstLetterUppercase({
    text: typename
      .replace("fieldContentBuilder_type", "")
      .replace("_BlockType", ""),
  });

  if (
    typeof instance?.appContext.components === "object" &&
    blockToResolve in instance.appContext.components
  )
    return blockToResolve;

  throw createError({
    message: "No block found with this type.",
    statusMessage: "Internal Server Error",
    name: "Internal Server Error",
    fatal: true,
    statusCode: 500,
  });
};
</script>
