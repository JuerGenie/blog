<template>
  <div class="site-copyright">
    <div>POWERED BY {{ authorData.name }}</div>
    <el-tooltip :show-arrow="false" placement="top">
      <div @click="openLicensesPage">{{ licenses }}</div>
      <template #content>
        <pre v-text="licensesSummary" />
      </template>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAuthorData } from "../composables/author-data";

const authorData = useAuthorData();
const licenses = "CC BY-NC-SA";

const licensesSummary = computed(() =>
  [
    "若无另外说明，此博客所有作品著作权归作者所有。",
    `本文为 ${authorData.value.name} 原创，依据「CC BY-NC-SA 4.0」许可进行授权，`,
    `商业转载请联系 ${authorData.value.name} 获得授权，非商业转载请注明出处。`,
    `转载请附上出处链接及本声明。`,
  ].join("\n")
);

function openLicensesPage() {
  window.open(
    "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh",
    "_blank"
  );
}
</script>

<style lang="postcss" scoped>
.site-copyright {
  @apply py-0 pl-4;
  @apply flex flex-row gap-2 justify-center items-center;
  @apply rounded-tl-2xl;
  @apply fixed bottom-0 right-0 z-[9999] drop-shadow-xl;
  @apply bg-slate-600 bg-opacity-60 backdrop-blur;
  @apply select-none;

  & > div:nth-of-type(1) {
    @apply text-sm text-slate-200 uppercase;
  }
  & > div:nth-of-type(2) {
    @apply text-xs text-slate-300 uppercase;
    @apply pl-4 pr-2 py-1 bg-slate-800;
    @apply rounded-l-full;
    @apply cursor-pointer;
  }
}
</style>
