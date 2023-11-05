import { resolve } from "path";

import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import moduleList from "vite-plugin-module-list";

export default defineConfig({
  plugins: [
    moduleList({
      mode: {
        language: "ts",
        extension: "js",
      },
      rootPath: resolve("lib/tools"),
      outputPath: resolve("lib/tools.ts"),
    }),
    moduleList({
      mode: {
        language: "ts",
        extension: "js",
      },
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
