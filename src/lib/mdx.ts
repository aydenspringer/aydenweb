import fs from "fs"
import path from "path"
import matter from "gray-matter"

const PROJECTS_DIR = path.join(process.cwd(), "content/projects")

export type ProjectCategory = "featured" | "web-development" | "game-development"

export interface ProjectFrontmatter {
  title: string
  subtitle: string
  slug: string
  color: string
  thumbnail: string
  thumbnailFit?: "cover" | "contain"
  heroImage?: string
  thumbnailSecondary?: string
  splitHero?: boolean
  role: string
  timeline: string
  team: string[]
  collaborators?: string
  tools: string[]
  description?: string
  summary?: string
  order: number
  featured: boolean
  category: ProjectCategory
  noindex?: boolean
}

export interface Project {
  frontmatter: ProjectFrontmatter
  content: string
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return []
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  return {
    frontmatter: data as ProjectFrontmatter,
    content,
  }
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs()
  return slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => p !== null)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order)
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.frontmatter.featured)
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return getAllProjects().filter((p) => p.frontmatter.category === category)
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  featured: "Featured",
  "web-development": "Website Development",
  "game-development": "Game Development",
}

export const CATEGORY_ORDER: ProjectCategory[] = [
  "featured",
  "web-development",
  "game-development",
]
