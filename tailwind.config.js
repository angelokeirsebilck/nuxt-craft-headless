const formKitTailwind = require("@formkit/themes/tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./formkit.config.js"],
  theme: {
    fontSize: {
      xs: "0.6rem",
      sm: "0.875rem",
      base: "1rem",
      lg: [
        "clamp(1.2rem, 1.1708rem + 0.1299vw, 1.3125rem)",
        {
          lineHeight: "1.33"
        }
      ],
      xl: [
        "clamp(1.25rem, 1.1851rem + 0.2886vw, 1.5rem)",
        {
          lineHeight: "1.17"
        }
      ],
      "2xl": [
        "clamp(1.25rem, 1.1851rem + 0.2886vw, 1.5rem)",
        {
          lineHeight: "1.17"
        }
      ],
      "3xl": [
        "clamp(1.5rem, 1.2078rem + 1.2987vw, 2.625rem)",
        {
          lineHeight: "1.1"
        }
      ],
      "4xl": [
        "clamp(1.5rem, 1.2078rem + 1.2987vw, 2.625rem)",
        {
          lineHeight: "1.19"
        }
      ],
      "5xl": [
        "clamp(2rem, 0.9286rem + 4.7619vw, 6.125rem)",
        {
          lineHeight: "1.02"
        }
      ]
    },
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
      },
      typography: (theme) => {
        const fontSize = (size) => {
          const result = theme(`fontSize.${size}`);
          return Array.isArray(result) ? result[0] : result;
        };

        const lineHeight = (size) => {
          const result = theme(`fontSize.${size}`);

          return Array.isArray(result) ? result[1]["lineHeight"] : "1.33";
        };

        const letterSpacing = (size) => {
          const result = theme(`fontSize.${size}`);

          return Array.isArray(result) ? result[1]["letterSpacing"] : "normal";
        };

        return {
          DEFAULT: {
            css: {
              "--tw-prose-headings": theme("colors.black.default"),
              "--tw-prose-links": theme("colors.black.default"),
              lineHeight: 1.56,

              a: {
                transitionDuration: "300ms",
                transitionProperty: "color",
                textDecoration: "underline",
                fontWeight: 400,
                "&:hover": {
                  color: theme("colors.primary.default")
                }
              },
              p: {
                fontWeight: 300,
                fontSize: fontSize("base"),
                lineHeight: lineHeight("base"),
                letterSpacing: letterSpacing("base")
              },
              h1: {
                fontWeight: 600,
                fontSize: fontSize("5xl"),
                lineHeight: lineHeight("5xl"),
                letterSpacing: letterSpacing("5xl")
              },
              h2: {
                fontWeight: 600,
                fontSize: fontSize("4xl"),
                lineHeight: lineHeight("4xl"),
                letterSpacing: letterSpacing("4xl")
              },
              h3: {
                fontWeight: 300,
                fontSize: fontSize("3xl"),
                lineHeight: lineHeight("3xl"),
                letterSpacing: letterSpacing("3xl")
              },
              h4: {
                fontWeight: 600,
                fontSize: fontSize("2xl"),
                lineHeight: lineHeight("2xl"),
                letterSpacing: letterSpacing("2xl")
              },
              h5: {
                fontWeight: 300,
                fontSize: fontSize("xl"),
                lineHeight: lineHeight("xl"),
                letterSpacing: letterSpacing("xl"),
                color: theme("colors.black.default")
              },
              h6: {
                fontWeight: 600,
                fontSize: fontSize("lg"),
                lineHeight: lineHeight("lg"),
                letterSpacing: letterSpacing("lg"),
                color: theme("colors.black.default")
              },
              ul: {
                listStyleType: "none",
                paddingLeft: 0
              }
            }
          }
        };
      }
    }
  },
  plugins: [
    formKitTailwind,
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography")
  ]
};
