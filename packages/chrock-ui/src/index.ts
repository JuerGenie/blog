import { Component, Plugin } from "vue";

import "uno.css";
import "./styles/defaults.css";
import "@mdi/font/css/materialdesignicons.css";

const components = import.meta.glob("./**/*.vue", { eager: true });

export default ((app) => {
  Object.entries(components).forEach(([path, mod]) => {
    const name = path.split("/").slice(-1)[0].split(".")[0];
    if (!!mod && typeof mod === "object" && "default" in mod) {
      try {
        app.component(name, (mod as { default: Component }).default);
      } catch (e) {
        console.error("register component failed:", path, mod);
      }
    }
  });
}) as Plugin;
