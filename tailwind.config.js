const formKitTailwind = require("@formkit/themes/tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./formkit.config.js"],
  theme: {
    extend: {
      maxWidth: {
        container: "1536px"
      },
      colors: {
        primary: {
          default: "#4ade80"
        },
        secondary: {
          default: "#ffb703"
        },
        success: {
          default: "#198754"
        },
        error: {
          default: "#dc3545"
        },
        black: {
          default: "#000"
        }
      }
    }
  },
  plugins: [formKitTailwind, require("@tailwindcss/forms")]
};
