<template>
  <div class="show-button">
    <section>
      <h3>ChrockButton</h3>
    </section>
    <hr />
    <section class="flex flex-col gap-4">
      <div>
        <h4>Primary</h4>
        <button.default>default button</button.default>
      </div>
      <div>
        <h4>Secondary</h4>
        <button.default color-type="secondary">secondary button</button.default>
      </div>
      <div>
        <h4>Transparent</h4>
        <button.default color-type="transparent">
          transparent button
        </button.default>
      </div>
      <div>
        <h4>Outline</h4>
        <button.default outline color-type="secondary">
          outline button
        </button.default>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { button } from "../../lib/components";
</script>

<style lang="postcss" scoped>
.show-button {
  @apply card;

  & hr {
    @apply my-2;
  }
}
</style>
