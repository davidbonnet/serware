import { resolve } from "path";

import moduleList from "vite-plugin-module-list";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [
    moduleList({
      mode: "named-static-no-extension",
      rootPath: resolve("lib/tools"),
      outputPath: resolve("lib/tools.ts"),
    }),
    moduleList({
      mode: "named-static-no-extension",
      rootPath: resolve("src/components"),
      outputPath: resolve("src/components.ts"),
    }),
    preact(),
  ],
  clearScreen: false,
  build: {
    outDir: "dist/demo",
  },
});
