import { Plugin } from "vue";

import ImageContainer from "./image-container.vue";

const containers = {
  ImageContainer,
};
type Containers = typeof containers;

export default (function (app) {
  Object.entries(containers).forEach(([key, component]) => {
    app.component(key, component);
  });
} as Plugin);

declare module "vue" {
  interface GlobalComponents extends Containers {}
}
