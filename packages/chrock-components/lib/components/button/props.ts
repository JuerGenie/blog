import { ButtonHTMLAttributes } from "vue";
import { ColorType } from "../../models/color-type";

export interface ChrockButtonProps extends ButtonHTMLAttributes {
  color?: ColorType;
}
