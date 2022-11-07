<template>
  <div>
    <div v-for="block in content">
      <component
        :is="resolveBlockComponent(block?.__typename)"
        :blockData="{ ...block }"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  content: Array<any>;
}

defineProps<IProps>();

const resolveBlockComponent = (typename: string) => {
  const instance = getCurrentInstance();
  let blockToResolve: any = useFirstLetterUppercase({
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
    message: `No block found with type: ${blockToResolve}`,
    statusMessage: "Internal Server Error",
    name: "Internal Server Error",
    fatal: true,
    statusCode: 500,
  });
};
</script>
