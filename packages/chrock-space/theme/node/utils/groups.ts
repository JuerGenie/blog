// import { pages } from "./pages";
// import { keypages } from "./../keypage";
// import { App, createPage, Page } from "vuepress";

// export type PathTreeNode = {
//   name: string;
//   children?: PathTreeNode[];
// };

// export interface GroupNode {
//   key: Page["key"];
//   path: string;
//   children: GroupNode[];
//   pages: Page["key"][];
// }

// export const groups: GroupNode[] = [];

// type Groups = typeof groups;

// declare global {
//   var groups: Groups;
// }

// export async function processPages(app: App) {
//   const pages = [...app.pages]
//     .filter((page) => !keypages.find((keypage) => keypage[0] === page.path))
//     .sort((a, b) => a.path.localeCompare(b.path));

//   const pageTree: PathTreeNode[] = [];

//   pages.forEach((page) => {
//     const pathlist = page.path.split("/").filter((p) => !!p);
//     let currentTree = pageTree;
//     pathlist.forEach((child, index) => {
//       let node = currentTree.find((tree) => tree.name === child);
//       if (!node) {
//         currentTree.push(
//           (node = {
//             name: child,
//             children: [],
//           })
//         );
//       }
//       if (index === pages.length - 1) {
//         delete node.children;
//       } else {
//         currentTree = node.children!;
//       }
//     });
//   });

//   await groupTreeNode(app, pageTree);
// }

// async function groupTreeNode(
//   app: App,
//   nodes: PathTreeNode[],
//   parent?: GroupNode
// ) {
//   for (const node of nodes) {
//     let targetPath = `${parent?.path ?? "/"}${node.name}`;
//     const isPage = targetPath.endsWith(".html");
//     if (!isPage) {
//       targetPath += "/";
//     }

//     let currentPage = app.pages.find((page) => page.path === targetPath);
//     if (!currentPage) {
//       app.pages.push(
//         (currentPage = await createPage(app, {
//           path: targetPath,
//           frontmatter: {
//             title: node.name,
//             layout: "GroupLayout",
//           },
//         }))
//       );
//     } else if (!isPage) {
//       currentPage.frontmatter.layout = "GroupLayout";
//     }

//     if (isPage) {
//       if (parent) {
//         parent.pages.push(currentPage.key);
//       }
//     } else {
//       currentPage.frontmatter.group = true;

//       const data = {
//         key: currentPage.key,
//         path: currentPage.path,
//         children: [],
//         pages: [],
//       };
//       if (parent) {
//         parent.children.push(data);
//       }

//       groups.push(data);

//       if (node.children) {
//         await groupTreeNode(app, node.children, data);
//       }
//     }

//     pages[currentPage.path] = currentPage.data;
//   }
// }
