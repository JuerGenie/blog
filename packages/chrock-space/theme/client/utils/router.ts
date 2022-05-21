import { ref } from "vue";
import { RouteLocationRaw, Router } from "vue-router";

export type RouteTarget = "groups" | "tags" | "home" | "links";

export const routeTarget = {
  groups: "/groups/",
  tags: "/tags/",
  links: "/links/",
  home: "/",
};

const instance = ref<Router>();
export function initialize(router: Router) {
  instance.value = router;
}

export function goto(
  target: RouteTarget,
  params: Exclude<RouteLocationRaw, string> = {}
) {
  instance.value?.push({
    path: routeTarget[target],
    ...params,
  });
}

export function onBack() {
  if (!instance.value?.options.history.state.position) {
    goto("home");
  } else {
    instance.value?.back();
  }
}
