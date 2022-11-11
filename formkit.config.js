import { generateClasses } from "@formkit/themes";

export default {
  config: {
    classes: generateClasses({
      global: {
        // applies to all input types
        messages: "list-none p-0 mt-1 mb-0",
        message: "text-red-500 mb-1 text-xs",
        inner: "formkit-invalid:border-red-500",
      },
      text: {
        outer: "mb-5 formkit-disabled:opacity-40",
        label: "block mb-1 font-bold text-sm formkit-invalid:text-red-500",
        inner: `
          border border-gray-400
          focus-within:border-green-300
          formkit-invalid:border-red-500
        `,
        input:
          "w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400",
      },
      checkbox: {
        input: "formkit-invalid:border-red-500",
      },
    }),
  },
};
