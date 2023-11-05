import { resolve } from "path";

import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import moduleList from "vite-plugin-module-list";

export default defineConfig({
  build: {
    outDir: "dist/demo",
  },
  clearScreen: false,
  plugins: [
    moduleList({
      mode: {
        extension: "js",
        language: "ts",
      },
      outputPath: resolve("lib/tools.ts"),
      rootPath: resolve("lib/tools"),
    }),
    moduleList({
      mode: {
        extension: "js",
        language: "ts",
      },
      outputPath: resolve("src/components.ts"),
      rootPath: resolve("src/components"),
    }),
    preact(),
  ],
});
