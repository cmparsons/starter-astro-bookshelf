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
    { name: "bookReferencePage", type: "page", urlPath: "/books/{slug}" },
    { name: "bookAuthor", type: "page", urlPath: "/author/{slug}" },
  ],
});
