import { generateClasses } from "@formkit/themes";

export const defaultClasses = {
  defaultInputs: {
    outer: "mb-5 formkit-disabled:opacity-40 w-full",
    input:
      "w-full h-10 px-3 formkit-invalid:border-red-500 shadow-none focus:ring-0 focus:ring-primary-default focus:border-primary-default text-base text-black-default placeholder-gray-400",
    label: "block mb-1 font-medium formkit-invalid:text-red-500",
    help: "text-sm text-gray-800 mt-1"
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
          "focus:shadow-none focus:outline-0 focus:ring-0 focus:ring-offset-0"
      },
      submit: {},
      text: {
        ...defaultClasses.defaultInputs
      },
      email: {
        ...defaultClasses.defaultInputs
      },
      checkbox: {
        wrapper: "flex items-center",
        input:
          "formkit-invalid:border-red-500 checked:bg-primary-default text-primary-default mr-2"
      }
    })
  }
};
