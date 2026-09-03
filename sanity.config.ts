/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/studio` route
 */
"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "performad",
  title: "Perfomad Studio",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Blog Posts")
              .child(S.documentTypeList("blogPost").title("Blog Posts")),
            S.listItem()
              .title("Job Listings")
              .child(S.documentTypeList("jobListing").title("Job Listings")),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
