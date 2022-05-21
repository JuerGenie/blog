<template>
  <div class="author-card">
    <div class="author-card-wrapper">
      <div class="author-information">
        <div class="author-name">{{ authorData.name }}</div>
        <div class="author-email">{{ authorData.email }}</div>
        <div class="author-description">{{ authorData.description }}</div>
        <div class="author-skills">
          <el-button
            v-for="skill in authorData.skills"
            round
            color="#0004"
            size="small"
          >
            {{ skill }}
          </el-button>
        </div>
      </div>
      <el-image class="author-avatar" fit="cover" :src="authorData.avatar" />
      <div class="cladding-material" />
    </div>
    <div class="author-links">
      <a
        v-for="(link, index) in authorData.links"
        class="author-link"
        :style="`--delay: ${index * 50}ms`"
        :href="link.href"
        target="_blank"
      >
        <el-tooltip :content="link.name">
          <el-button color="#0004" circle size="large">
            <i :class="[link.icon, 'text-2xl']" />
          </el-button>
        </el-tooltip>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthorData } from "../composables/author-data";

const authorData = useAuthorData();
</script>

<style lang="postcss" scoped>
.author-card {
  @apply flex flex-col items-center justify-center;

  & .author-card-wrapper {
    @apply w-[30rem] h-[20rem];
    @apply bg-slate-100 bg-opacity-0 hover:bg-opacity-80;
    @apply flex flex-row overflow-hidden;
    @apply relative rounded-xl hover:shadow-xl z-10;
    @apply duration-1000 ease-out;
    @apply hover:backdrop-blur;

    & .author-avatar {
      @apply absolute top-0 bottom-0 right-0;
      @apply h-full aspect-square rounded-r-xl;

      mask-image: linear-gradient(to right, #0000, #0004);
    }

    & .author-information {
      @apply relative z-20;
      @apply flex flex-col justify-center gap-2;
      @apply px-8 py-8;

      & .author-name {
        @apply flex flex-row items-end;
        @apply text-5xl text-slate-700;
        @apply flex-1;
        @apply drop-shadow;
        @apply underline underline-offset-4;
      }
      & .author-email {
        @apply flex flex-row items-start;
        @apply flex-1;
        @apply drop-shadow;
        @apply px-2;
        @apply text-slate-600 uppercase;
      }

      & .author-description {
        @apply text-slate-600;
      }
      & .author-skills {
        @apply flex flex-row flex-wrap gap-2;

        & .el-button {
          @apply m-0;
        }
      }
    }

    & .cladding-material {
      @apply absolute z-20 -top-[30%] left-[140%] w-2/5 h-[calc(160%)];
      @apply ease-in-out duration-1000;
      @apply mix-blend-multiply isolate opacity-40;
      @apply rotate-[30deg];

      /* background-image: linear-gradient(
        transparent,
        transparent 30%,
        theme("colors.amber.400") 0,
        theme("colors.amber.400") 70%,
        transparent 0
      ); */
      @apply bg-amber-100;
    }
    &:hover .cladding-material {
      @apply -left-[75%];
    }
  }
  .author-links {
    @apply max-w-[30rem];
    @apply flex flex-row flex-wrap gap-2 p-4;
    @apply relative z-0;

    & .author-link {
      @apply relative -top-12 opacity-0;
      @apply transition-all duration-500 delay-[var(--delay)];
      transition-timing-function: cubic-bezier(0.24, 1.6, 0.4, 0.9);
    }
  }
  .author-card-wrapper:hover ~ .author-links,
  .author-links:hover {
    & .author-link {
      @apply top-0 opacity-100;
    }
  }

  & :deep(.el-button) {
    @apply !border-none;
  }
}
</style>
