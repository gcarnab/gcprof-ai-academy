import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_LOCAL_URL ||
    "http://localhost:3000";

  return [
    {
      url: baseUrl,
      priority: 1,
      changeFrequency: "weekly",
    },

    {
      url: `${baseUrl}/courses`,
      priority: 0.9,
      changeFrequency: "daily",
    },

    {
      url: `${baseUrl}/credits`,
      priority: 0.4,
      changeFrequency: "monthly",
    },

    {
      url: `${baseUrl}/contacts`,
      priority: 0.6,
      changeFrequency: "monthly",
    },
  ];
}