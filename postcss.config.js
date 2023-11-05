import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import pseudoClasses from "postcss-pseudo-classes";
import tailwindcss from "tailwindcss";
import tailwindcssNesting from "tailwindcss/nesting/index.js";

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: [
    tailwindcssNesting(),
    tailwindcss,
    autoprefixer,
    process.env.NODE_ENV !== "production" &&
      pseudoClasses({
        restrictTo: [":hover", ":active", ":focus", ":focus-within"],
      }),
    process.env.NODE_ENV === "production" && cssnano,
  ].filter(Boolean),
};
