import { generateClasses } from "@formkit/themes";

export const defaultClasses = {
  defaultInputs: {
    outer: "formkit-disabled:opacity-40 w-full",
    input:
      "w-full border border-black-default  py-2 formkit-invalid:border-red-500 shadow-none focus:ring-0 focus:ring-primary-default focus:border-primary-default text-base text-black-default placeholder-gray-400",
    label: "block mb-1 text-lg font-medium formkit-invalid:text-red-500",
    help: "text-sm text-gray-800 mt-1"
  },
  defaultOptions: {
    wrapper: "flex items-center",
    options:
      "group-[.layout-horizontal]:flex  group-[.layout-horizontal]:flex-wrap group-[.layout-horizontal]:gap-2",
    input:
      "formkit-invalid:border-red-500 checked:bg-primary-default text-primary-default mr-2",
    inner: "transform -translate-y-[2px]"
  }
};

export default {
  config: {
    classes: generateClasses({
      global: {
        // applies to all input types
        messages: "list-none p-0 mt-1 mb-0",
        message: "text-red-500 mb-1 text-xs",
        inner:
          "focus:shadow-none focus:outline-0 focus:ring-0 focus:ring-offset-0",
        input:
          "focus:shadow-none focus:outline-0 focus:ring-0 focus:ring-offset-0",
        legend: "block mb-1 text-lg font-medium formkit-invalid:text-red-500"
      },
      submit: {},
      text: {
        ...defaultClasses.defaultInputs
      },
      email: {
        ...defaultClasses.defaultInputs
      },
      tel: {
        ...defaultClasses.defaultInputs
      },
      checkbox: {
        ...defaultClasses.defaultOptions
      },
      radio: {
        ...defaultClasses.defaultOptions
      },
      file: {
        label: "block mb-1 text-lg font-medium formkit-invalid:text-red-500",
        outer: "w-full",
        noFiles: "pointer-events-none text-gray-400",
        inner:
          "relative py-2 flex items-center border border-black-default px-3 formkit-invalid:border-red-500 shadow-none focus:ring-0 focus:ring-primary-default focus:border-primary-default text-base text-black-default placeholder-gray-400",
        input:
          "absolute w-full h-full inset-0 opacity-0 appearance-none cursor-pointer text-transparent",
        fileItem: "flex items-center",
        fileRemove:
          "flex items-center z-50 text-[0px] appearance-none border-none relative ml-auto group"
      }
    })
  }
};
