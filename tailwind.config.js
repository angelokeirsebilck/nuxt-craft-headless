const formKitTailwind = require("@formkit/themes/tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./formkit.config.js"],
  theme: {
    extend: {
      maxWidth: {
        container: "1536px",
      },
      colors: {
        primary: "#457b9d",
      },
    },
  },
  plugins: [formKitTailwind, require("@tailwindcss/forms")],
};
