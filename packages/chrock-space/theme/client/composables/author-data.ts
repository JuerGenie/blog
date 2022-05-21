import { ref } from "vue";
import defaultAvatar from "../assets/avatar.png";

export interface AuthorLink {
  name: string;
  icon: string;
  href: string;
}

const authorData = ref({
  name: "",
  description: "",
  email: "",
  avatar: defaultAvatar,

  skills: [] as string[],
  links: [] as AuthorLink[],
});

export function useAuthorData() {
  return authorData;
}
