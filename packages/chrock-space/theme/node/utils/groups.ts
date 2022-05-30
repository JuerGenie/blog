import { App, createPage, PageData } from "vuepress";
import { Group, GroupFrontmatter } from "../../shared/models/groups";

class GroupMap extends Map<string, Group> {
  get groups() {
    return [...this.values()];
  }
}

export const groupMap = new GroupMap();

export async function extendsPage(app: App, page: PageData) {
  const pathlist = page.path.split("/").filter((p) => !!p);

  let cp = "/";
  for (const p of pathlist) {
    cp += p;
    if (!p.endsWith(".html")) {
      cp += "/";
    }
    let target = app.pages.find((page) => page.path === cp);
    if (!target) {
      target = await createPage(app, {
        path: cp,
        frontmatter: {} as GroupFrontmatter,
      });
    }
  }
}
