import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
import { APIRoute } from "astro";

export const get: APIRoute = () => {
  return {
    body: JSON.stringify({
      name: SITE_TITLE,
      short_name: SITE_TITLE,
      start_url: "/blog/",
      display: "standalone",
      description: SITE_DESCRIPTION,
      background_color: "#fff",
      icons: [
        {
          src: "site-icon.png",
          sizes: "16x16",
          type: "image/png",
        },
      ],
      scope: ".",
    }),
    headers: new Headers({
      "content-type": "application/manifest+json",
    }),
  };
};
