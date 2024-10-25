import { ContentfulContentSource } from "@stackbit/cms-contentful";

import { defineStackbitConfig, type SiteMapEntry } from "@stackbit/types";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  nodeVersion: "18",
  ssgName: "astro",
  contentSources: [
    new ContentfulContentSource({
      spaceId: process.env.CONTENTFUL_SPACE_ID!,
      environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
      previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
    }),
  ],
  postInstallCommand:
    "npm i --no-save @stackbit/types @stackbit/cms-contentful",
  modelExtensions: [
    { name: "root", type: "page", urlPath: "/" },
    { name: "book", type: "page", urlPath: "/books/{slug}" },
    { name: "author", type: "page", urlPath: "/author/{slug}" },
  ],
});
