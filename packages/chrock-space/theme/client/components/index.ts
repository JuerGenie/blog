import ChrockBtn from "./chrock-btn.vue";
import ChrockIconBtn from "./chrock-icon-btn.vue";
import ChrockLogo from "./chrock-logo.vue";
import ChrockSpace from "./chrock-space.vue";

export const components = {
  ChrockBtn,
  ChrockIconBtn,
  ChrockLogo,
  ChrockSpace,
};

type Components = typeof components;

declare module "vue" {
  interface GlobalComponents extends Components {}
}
