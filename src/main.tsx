/* global document */

import { render } from "preact";

import { observeDarkMode } from "../lib/tools.ts";

import { App } from "./App.tsx";

import "./main.css";

observeDarkMode((isDark) => {
  document
    .getElementsByTagName("body")[0]
    .classList[isDark ? "add" : "remove"]("dark");
});

render(<App />, document.getElementById("app")!);
