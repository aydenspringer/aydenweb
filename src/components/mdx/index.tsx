import type { MDXComponents } from "mdx/types"
import { ProjectImage } from "./ProjectImage"
import { ProjectVideo } from "./ProjectVideo"
import { ImageGrid } from "./ImageGrid"
import { PhoneMockupPair } from "./PhoneMockupPair"
import { Highlight } from "./Highlight"
import { CalloutQuote } from "./CalloutQuote"
import { WhispStage } from "./Whisp"
import { YouTubeEmbed } from "./YouTubeEmbed"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim()
}

export const mdxComponents: MDXComponents = {
  ProjectImage,
  ProjectVideo,
  ImageGrid,
  PhoneMockupPair,
  Highlight,
  CalloutQuote,
  WhispStage,
  YouTubeEmbed,
  h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => {
    const text = typeof children === "string" ? children : ""
    const id = slugify(text)
    return (
      <h2
        id={id}
        className="font-heading mt-16 mb-4 text-[24px] font-semibold text-[var(--color-text)] md:text-[28px]"
        {...props}
      >
        {children}
      </h2>
    )
  },
  h3: ({ children, ...props }: React.ComponentPropsWithoutRef<"h3">) => {
    const text = typeof children === "string" ? children : ""
    const id = slugify(text)
    return (
      <h3
        id={id}
        className="font-heading mt-10 mb-3 text-[20px] font-semibold text-[var(--color-text)]"
        {...props}
      >
        {children}
      </h3>
    )
  },
  p: ({ children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p
      className="font-body mb-5 max-w-[680px] text-[16px] leading-[1.7] text-[var(--color-text)]"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ children, href, ...props }: React.ComponentPropsWithoutRef<"a">) => (
    <a
      href={href}
      target={typeof href === "string" && href.startsWith("http") ? "_blank" : undefined}
      rel={typeof href === "string" && href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-[var(--color-link)] underline underline-offset-2 hover:no-underline"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="font-body mb-5 ml-5 max-w-[680px] list-disc space-y-2 text-[16px] leading-[1.7] text-[var(--color-text)]" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="font-body mb-5 ml-5 max-w-[680px] list-decimal space-y-2 text-[16px] leading-[1.7] text-[var(--color-text)]" {...props}>
      {children}
    </ol>
  ),
  hr: () => (
    <hr className="my-12 border-[var(--color-border)]" />
  ),
}
