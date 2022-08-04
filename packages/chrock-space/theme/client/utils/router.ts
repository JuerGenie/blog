import { PageFrontmatter } from "@vuepress/client";
import { computed, ref, shallowRef } from "vue";
import { RouteLocationRaw, Router, RouteRecordNormalized } from "vue-router";

export type RouteTarget = keyof typeof routeTarget;

export interface GroupTree {
  route: RouteRecordNormalized;
  children?: GroupTree[];
}

export const routeTarget = {
  groups: "/?tab=groups",
  tags: "/?tab=tags",
  links: "/?tab=links",
  home: "/",
};

const instance = shallowRef<Router>();
export const groups = ref<
  Record<Exclude<RouteRecordNormalized["name"], undefined>, GroupTree>
>({});
export const groupTree = computed(() => {
  const routes = instance.value?.getRoutes() ?? [];

  const root = routes.find((route) => route.path === "/");
  if (root) {
    const result: GroupTree = {
      route: root,
      children: getChildren(root),
    };

    groups.value[result.route.name!] = result;

    return result;
  }

  function getChildren(group: RouteRecordNormalized): GroupTree[] {
    return routes
      .filter((route) => route.meta.parentGroup === group.name)
      .map((route) => {
        const result = {
          route,
        } as GroupTree;
        if (!route.path.endsWith(".html")) {
          result.children = getChildren(route);
          groups.value[result.route.name!] = result;
        }
        return result;
      });
  }
});

export const pages = computed(() =>
  (instance.value?.getRoutes() ?? []).filter(
    (route) =>
      route.path.endsWith(".html") &&
      !route.path.endsWith("index.html") &&
      route.path !== "/404.html" &&
      !route.redirect
  )
);

export const tags = computed(() =>
  (instance.value?.getRoutes() ?? []).reduce((total, route) => {
    (
      ((route.meta.frontmatter as PageFrontmatter)?.tags as string[]) ?? []
    ).forEach((tag) => {
      total[tag] ??= [];
      total[tag].push(route);
    });
    return total;
  }, {} as Record<string, RouteRecordNormalized[]>)
);

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
