import {
  defineConfig,
  presetUno,
  presetIcons,
  presetAttributify,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
  UserConfig,
} from "unocss";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { colors } from "@unocss/preset-uno/colors";

const chrockType = {
  primary: colors.blue,
  secondary: colors.slate,
  warning: colors.amber,
  error: colors.rose,
  success: colors.green,
};

export default defineConfig({
  transformers: [
    transformerCompileClass(),
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  presets: [presetUno(), presetIcons(), presetAttributify()],
  theme: {
    colors: {
      ...chrockType,
    },
  },
  rules: [],
}) as UserConfig;
