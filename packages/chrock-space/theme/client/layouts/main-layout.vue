<template>
  <div class="main-layout">
    <header>
      <chrock-logo
        :site-name="siteData.title"
        site-description="POWERED BY @JUERGENIE"
        @click="router.push('/')"
      />
      <chrock-space />
      <!-- <template v-if="pageData.title">
        <div class="page-title">「{{ pageData.title }}」</div>
        <chrock-space />
      </template> -->
      <chrock-icon-btn
        icon="mdi-alpha-h-box"
        description="HOME"
        size="2rem"
        @click="router.push('/')"
      />
      <chrock-icon-btn
        icon="mdi-alpha-p-box"
        description="POSTS"
        size="2rem"
        @click="router.push('/posts')"
      />
      <chrock-icon-btn
        icon="mdi-alpha-t-box"
        description="TAGS"
        size="2rem"
        @click="router.push('/tags')"
      />
      <chrock-icon-btn
        icon="mdi-alpha-l-box"
        description="LINKS"
        size="2rem"
        @click="router.push('/links')"
      />
    </header>
    <main>
      <div class="content">
        <div v-if="pageData.path !== '/'" class="page-information">
          <div class="page-title">{{ pageData.title }}</div>
        </div>
        <main-content />
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script lang="ts" setup>
import {
  Content as MainContent,
  useSiteData,
  usePageData,
} from "@vuepress/client";
import { useRouter } from "vue-router";

const siteData = useSiteData();
const pageData = usePageData();

const router = useRouter();
</script>

<style lang="postcss" scoped>
.main-layout {
  & header {
    @apply fixed top-0 left-0 right-0 h-16 z-20;
    @apply flex flex-row items-center;
    @apply px-4;

    &::before {
      content: "";
      @apply absolute inset-0 -z-10;
      /* mask-image: linear-gradient(#ffff, #ffff, #fff9, #fff5); */
      @apply bg-white bg-opacity-50 backdrop-blur;
    }

    & .page-title {
      @apply text-xl;
    }
  }

  & main {
    @apply mt-24 pb-8;
    @apply flex flex-row justify-center;

    & .page-information {
      @apply bg-black bg-opacity-10;
      @apply h-40;
      @apply flex flex-col justify-end;

      & .page-title {
        @apply text-2xl;
      }
    }

    & .content {
      @apply w-[calc(100%-32rem)];
    }
  }
}
</style>
