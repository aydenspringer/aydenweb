import type { Metadata } from "next"
import { FadeIn } from "@/components/FadeIn"
import { ArrowDown, ArrowUpRightFromSquareIcon } from "lucide-react"
import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import rockyImg from "@/assets/rocky.webp"
import michaelImg from "@/assets/michael.webp"
import manishImg from "@/assets/manish.webp"
import { HorizontalProjects } from "@/components/HorizontalProjects"
import { Highlight } from "@/components/mdx/Highlight"
import { getFeaturedProjects } from "@/lib/mdx"

export const metadata: Metadata = {
  title: "Ayden Springer — Developer",
  description:
    "Developer building frontend products and design systems. Won the Stacks embedded wallet hackathon, shipped production apps across the Stacks ecosystem, and built a pixel art platform with 600+ users.",
  alternates: {
    canonical: "https://aydenweb.com",
  },
  openGraph: {
    title: "Ayden Springer — Developer",
    description:
      "Developer building frontend products and design systems. Won the Stacks embedded wallet hackathon, shipped production apps across the Stacks ecosystem, and built a pixel art platform with 600+ users.",
    url: "https://aydenweb.com",
  },
  twitter: {
    title: "Ayden Springer — Developer",
    description:
      "Developer building frontend products and design systems. Won the Stacks embedded wallet hackathon, shipped production apps across the Stacks ecosystem, and built a pixel art platform with 600+ users.",
  },
}

export default function HomePage() {
  const featured = getFeaturedProjects()

  return (
    <main className="min-h-full bg-(--color-bg)">
      {/* Hero — white */}
      <FadeIn>
        <section className="mx-auto flex w-full max-w-7xl flex-col px-6 pt-11 pb-15 md:flex-row md:items-center md:justify-between md:gap-12 md:px-12 md:pt-18 md:pb-25 lg:px-20 lg:pt-24 lg:pb-35 min-h-[80vh]">
          <div className="flex flex-col gap-5 md:gap-6">
            <Image
              src="/images/selfie.jpeg"
              alt="Ayden Springer"
              width={160}
              height={160}
              className="rounded-full object-cover md:hidden"
              priority
            />
            <h1 className="font-heading max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-(--color-text)">
            I design, build, and ship.
            </h1>
            <p className="font-body max-w-xl text-[15px] leading-[1.6] text-(--color-muted) md:text-base">
              <Highlight>Published a game at 16</Highlight>, built an AI product assistant at Elysium Health, and <Highlight>won the Stacks embedded wallet hackathon</Highlight>.
            </p>
            <p className="font-body text-[15px] leading-[1.6] text-(--color-muted) md:text-base">Computer Science student at UNF, graduating Spring 2027.  <br/>Available for full-time roles starting Summer 2027 or contract work.</p>
            <div className="mt-2 flex flex-wrap items-center gap-4 md:gap-8">
              <Link
                href="#contact"
                className="font-body flex items-center gap-2 text-[15px] font-medium text-(--color-link) hover:underline"
              >
                Contact <ArrowDown size={16} />
              </Link>
              <Link
                href="https://aydenweb.com/ayden-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body flex items-center gap-2 text-[15px] font-medium text-(--color-link) hover:underline"
              >
                Resume <ArrowUpRightFromSquareIcon size={14} />
              </Link>
            </div>
          </div>
          <Image
            src="/images/selfie.jpeg"
            alt="Ayden Springer"
            width={240}
            height={240}
            className="hidden shrink-0 rounded-full object-cover md:block"
            priority
          />
        </section>
      </FadeIn>

      {/* What I'm learning — soft orange band */}
      <div className="bg-[#faf2ee]">
      <FadeIn>
        <section id="learning" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <h2 className="font-heading mb-8 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-(--color-text) md:mb-10">
            What I&apos;m learning
          </h2>

          <Link
            href="/notes/agentic-engineering"
            className="group flex max-w-200 flex-col gap-3 rounded-xl border border-(--color-border) p-6 transition-colors hover:bg-(--color-surface) md:p-8"
          >
            <span className="font-body text-[13px] font-medium tracking-[0.08em] text-(--color-muted) uppercase">
              Notes
            </span>
            <h3 className="font-heading text-[clamp(1.35rem,3vw,2rem)] font-bold leading-[1.1] tracking-[-0.02em] text-(--color-text)">
              The 4 agentic engineering skills to know
            </h3>
            <p className="font-body text-[16px] leading-[1.7] text-(--color-muted)">
              Context, containment, loop, and graph engineering. Recreating Super Mario Bros.
              taught me to set testable goals and divide agent work around system dependencies.
            </p>
            <span className="font-body mt-1 flex items-center gap-2 text-[15px] font-medium text-(--color-link) group-hover:underline">
              Read the write-up <ArrowUpRightFromSquareIcon size={14} />
            </span>
          </Link>
        </section>
      </FadeIn>
      </div>

      {/* Selected Work — dark band */}
      <HorizontalProjects
        projects={featured.map((p) => ({
          title: p.frontmatter.title,
          slug: p.frontmatter.slug,
          color: p.frontmatter.color,
          thumbnail: p.frontmatter.thumbnail,
          thumbnailFit: p.frontmatter.thumbnailFit,
          description: p.frontmatter.description,
          category: p.frontmatter.category,
          order: p.frontmatter.order,
        }))}
      />

      {/* About — warm surface band */}
      <div className="bg-(--color-surface)">
        <FadeIn>
          <section id="about" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36">
            <h2 className="font-heading mb-8 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-(--color-text) md:mb-10">
              Background
            </h2>

            <p className="font-body mb-16 max-w-200 text-[16px] leading-[1.7] text-(--color-muted) md:mb-20">
              The journey through high school to graduating college.
            </p>

            <div className="flex flex-col gap-20 md:gap-28 lg:gap-32">
              <BackgroundRow
                title="Game Development"
                image="/images/godot-editor.png"
                imageAlt="Godot editor — level design in Everplast"
                imagePosition="left"
              >
                <p className="text-(--color-text)">
                  In high school, I started teaching myself GDScript and the Godot engine to build{" "}
                  <Highlight>a full-length action-adventure game that I shipped to Steam at sixteen</Highlight>.
                  Eight months of solo development: four worlds, five weapons, boss AI, a rank-based progression system, and the entire Steam publishing pipeline. Later, I transitioned to web development.
                </p>
              </BackgroundRow>
              
              <BackgroundRow
                title="Red Block Labs"
                image="/images/rbl-hero.png"
                imageAlt="Red Block Labs agency site"
                imagePosition="right"
              >
                <p className="text-(--color-text)">
                  Throughout my four years of college, I worked as a developer on the team at{" "}
                  <Link
                    href="https://redblocklabs-aydentest.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-(--color-link) hover:underline"
                  >
                    Red Block Labs
                  </Link>
                  , I work alongside designers and engineers to ship <Highlight>brand systems, product interfaces, and production websites</Highlight> for technology clients. Over 2 years I have contributed to over 10+ projects.
                </p>
              </BackgroundRow>


              <BackgroundRow
                title="Elysium Health"
                image="/projects/elysium-health/consumer-facing-elyse-ai.png"
                imageAlt="Elysium Health — Elyse AI product screens"
                imagePosition="left"
              >
                <p className="text-(--color-text)">
                  In my second year of college, I joined Elysium Health as an intern to build an <Highlight>AI product assistant with health safeguards</Highlight>, knowledge retrieval, and tool-calling functionality across web and mobile.
                </p>
              </BackgroundRow>

            </div>


          </section>
        </FadeIn>
      </div>

      {/* Testimonials — dark band */}
      <div className="bg-(--color-text)">
        <section id="testimonials" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36">
          <FadeIn>
            <h2 className="font-heading mb-16 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-white md:mb-24">
              Testimonials
            </h2>
          </FadeIn>

          <div className="flex flex-col gap-24 md:gap-32">
            <FadeIn>
              <Testimonial
                quote="Ayden Springer is the kind of Full Stack Developer every team dreams of having. His dedication to the craft and consistent success in delivering exceptional digital products makes him a valuable asset."
                name="Rocky Nguyen"
                image={rockyImg}
                link="https://www.linkedin.com/in/rockynhatnguyen/"
                role="Engineering Manager at Elysium Health"
              />
            </FadeIn>
            <FadeIn>
              <Testimonial
                quote="If you need a Dev who talks with their keyboard instead of prolonging the Zoom call, Ayden will kick out your project faster than 90% of the over-confident 'code crafters' out there. Ayden gets it DONE."
                name="Michael Jagdeo"
                image={michaelImg}
                link="https://www.linkedin.com/in/jagdeoholdings/"
                role="Recruiter at Delmi Training"
              />
            </FadeIn>
            <FadeIn>
              <Testimonial
                quote="Ayden is an amazingly talented developer. His contribution to the project Avalanche from The New Dev Order was crucial to completing the most difficult task that saw the team home. He is gonna be the best find for any Hiring Manager."
                name="Manish Andankar"
                image={manishImg}
                link="https://www.linkedin.com/in/manishandankar/"
                role="Founder & CEO at Worthum"
              />
            </FadeIn>
          </div>
        </section>
      </div>
    </main>
  )
}

function BackgroundRow({
  title,
  image,
  imageAlt,
  imagePosition,
  children,
}: {
  title: string
  image: string
  imageAlt: string
  imagePosition: "left" | "right"
  children: React.ReactNode
}) {
  const imageBlock = (
    <div className="aspect-[16/10] overflow-hidden rounded-xl bg-(--color-border)">
      <Image
        src={image}
        alt={imageAlt}
        width={640}
        height={400}
        className="h-full w-full object-cover"
      />
    </div>
  )

  const textBlock = (
    <div className="flex flex-col justify-center gap-4">
      <h3 className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-(--color-text)">
        {title}
      </h3>
      <div className="font-body text-[16px] leading-[1.7]">{children}</div>
    </div>
  )

  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
      <div className={imagePosition === "right" ? "md:order-2" : undefined}>
        {imageBlock}
      </div>
      <div className={imagePosition === "right" ? "md:order-1" : undefined}>
        {textBlock}
      </div>
    </div>
  )
}

function Testimonial({
  quote,
  name,
  image,
  link,
  role,
}: {
  quote: string
  name: string
  image: StaticImageData
  link: string
  role: string
}) {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="font-heading pointer-events-none absolute -top-8 left-10 select-none text-[clamp(4rem,10vw,8rem)] font-bold leading-none text-white/6 md:-top-10 md:-left-3"
      >
        &ldquo;
      </span>

      <blockquote className="font-heading relative max-w-4xl text-[clamp(1.25rem,2.8vw,2rem)] font-semibold leading-[1.3] tracking-[-0.01em] text-white/90">
        {quote}
      </blockquote>

      <div className="mt-8 flex items-center gap-4 md:mt-10">
        <Image
          src={image}
          alt={name}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col gap-0.5">
          <a href={link} target="_blank" rel="noopener noreferrer" className="font-body flex items-center gap-2 text-[15px] font-semibold text-white hover:underline">
            {name} <ArrowUpRightFromSquareIcon size={14} />
          </a>
          <span className="font-body text-[14px] text-white/40">
            {role}
          </span>
        </div>
      </div>
    </div>
  )
}
