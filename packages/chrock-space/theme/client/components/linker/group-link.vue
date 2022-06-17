<template>
  <div class="group-linker">
    <span
      v-for="group in groups"
      :key="group.to.path"
      class="group-linker-item"
    >
      <router-link :to="`/groups${group.to.path}`">
        <slot v-bind="group">{{ group.label }}</slot>
      </router-link>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { LocationAsPath, RouteLocationRaw, RouterLink } from "vue-router";
import { Post } from "../../composables/posts";

const props = defineProps<{
  post: Post;
}>();

function getPath(to: RouteLocationRaw & LocationAsPath) {
  if (typeof to === "string") {
    return to;
  } else {
    return to?.path ?? "";
  }
}

const groups = computed(() => {
  const pathlist = props.post.path.split("/") ?? [];
  pathlist.pop();

  return pathlist
    .filter((path) => !!path)
    .reduce<{ label: string; to: RouteLocationRaw & LocationAsPath }[]>(
      (total, current, index) => {
        total.push({
          label: current,
          to: {
            path: `${getPath(total[index - 1]?.to) ?? ""}/${current}`,
          },
        });
        return total;
      },
      []
    );
});
</script>

<style lang="postcss" scoped>
.group-linker {
  & .group-linker-item {
    @apply uppercase;
    @apply font-normal;

    &:not(:first-of-type)::before {
      content: "/";
      @apply px-2;
    }

    & a {
      @apply hover:text-blue-500;
    }
  }
}
</style>
