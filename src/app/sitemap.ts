import type { MetadataRoute } from "next"
import { getProjectSlugs } from "@/lib/mdx"

export default function sitemap(): MetadataRoute.Sitemap {
  const projectSlugs = getProjectSlugs()

  const projectEntries: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `https://aydenweb.com/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: "https://aydenweb.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://aydenweb.com/work",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://aydenweb.com/notes/agentic-engineering",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...projectEntries,
  ]
}
