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
      outputPath: resolve("lib/adapters.ts"),
      rootPath: resolve("lib/adapters"),
    }),
    moduleList({
      mode: {
        extension: "js",
        language: "ts",
      },
      outputPath: resolve("lib/constants.ts"),
      rootPath: resolve("lib/constants"),
    }),
    moduleList({
      mode: {
        extension: "js",
        language: "ts",
      },
      outputPath: resolve("lib/errors.ts"),
      rootPath: resolve("lib/errors"),
    }),
    moduleList({
      mode: {
        extension: "js",
        language: "ts",
      },
      outputPath: resolve("lib/handlers.ts"),
      rootPath: resolve("lib/handlers"),
    }),
    moduleList({
      mode: {
        extension: "js",
        language: "ts",
      },
      outputPath: resolve("lib/responses.ts"),
      rootPath: resolve("lib/responses"),
    }),
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
        type: true,
      },
      outputPath: resolve("lib/types.ts"),
      rootPath: resolve("lib/types"),
    }),
    preact(),
  ],
});
