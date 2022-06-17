import { EMPTY_STRING } from "./../constants";
import dayjs from "dayjs";
import { isNil } from "lodash";

export function dateFormatter(
  value?: dayjs.ConfigType,
  pattern = "YYYY/MM/DD",
  emptyString = EMPTY_STRING
) {
  return !isNil(value) ? dayjs(value).format(pattern) : emptyString;
}
