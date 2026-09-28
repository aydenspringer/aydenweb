import type { Metadata } from "next"
import { FadeIn } from "@/components/FadeIn"
import { ArrowDown, ArrowRight, ArrowUpRightFromSquareIcon } from "lucide-react"
import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import rockyImg from "@/assets/rocky.webp"
import michaelImg from "@/assets/michael.webp"
import manishImg from "@/assets/manish.webp"
import { HorizontalProjects } from "@/components/HorizontalProjects"
import { Highlight } from "@/components/mdx/Highlight"
import { YouTubeEmbed } from "@/components/mdx/YouTubeEmbed"
import { getFeaturedProjects } from "@/lib/mdx"

const DESCRIPTION =
  "I design and build web and mobile products for founders and small teams, from the first product flow to a working release."

export const metadata: Metadata = {
  title: "Ayden Springer — Product Design & Development",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://aydenweb.com",
  },
  openGraph: {
    title: "Ayden Springer — Product Design & Development",
    description: DESCRIPTION,
    url: "https://aydenweb.com",
  },
  twitter: {
    title: "Ayden Springer — Product Design & Development",
    description: DESCRIPTION,
  },
}

const SERVICES = [
  {
    title: "Design and build an MVP",
    body: "You have an idea and need a first version people can use. I take it from the core product flow to a working web or iOS release. Lucid Lock went from first screen to the App Store in six weeks.",
  },
  {
    title: "Improve an existing product flow",
    body: "Onboarding, checkout, or a core screen is losing people. I redesign the flow and ship the changes in your codebase, so the fix doesn't stall in a handoff.",
  },
  {
    title: "Build a production website",
    body: "A fast marketing site or web app front end, designed and developed by one person. You get a site that matches the design and is ready to launch.",
  },
]

const PIXELART_FACTS = [
  { value: "9 days", label: "From first prototype to live Stripe billing" },
  { value: "True pixel grid", label: "Every output rebuilt with a fixed palette" },
  { value: "End to end", label: "Design, image pipeline, payments, and launch" },
]

export default function HomePage() {
  const featured = getFeaturedProjects()

  return (
    <main className="min-h-full bg-(--color-bg)">
      {/* Hero — white */}
      <FadeIn>
        <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pt-8 pb-16 md:min-h-[80vh] md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:gap-12 md:px-12 md:pt-12 md:pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20 lg:px-20 lg:pt-16 lg:pb-32">
          <div className="flex flex-col gap-6 md:gap-7">
            <div className="flex items-center gap-3">
              <Image
                src="/images/portrait.webp"
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full object-cover object-[50%_35%] md:hidden"
                priority
              />
              <span className="font-body inline-flex items-center gap-2 rounded-full border border-(--color-border) px-3 py-1.5 text-[13px] font-medium text-(--color-text)">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Now available for contract work
              </span>
            </div>

            <h1 className="font-heading max-w-[19ch] text-[clamp(2.4rem,4.8vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-balance text-(--color-text)">
              I design and build{" "}
              <span className="text-(--color-link)">web and mobile products</span> for founders
              and small teams.
            </h1>

            <p className="font-body max-w-[34rem] text-[17px] leading-[1.6] text-(--color-muted) md:text-[19px]">
              From the first product flow to a working release, I handle interface design and
              full-stack development.
            </p>

            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <Link
                href="#contact"
                className="font-body flex w-full items-center justify-center gap-2 rounded-full bg-(--color-link) px-6 py-3.5 sm:w-auto text-[15px] font-medium text-white shadow-[0_6px_20px_-8px_rgba(193,80,46,0.7)] transition-[opacity,transform] hover:-translate-y-px hover:opacity-90"
              >
                Discuss a project <ArrowRight size={16} />
              </Link>
              <Link
                href="#work"
                className="font-body flex w-full items-center justify-center gap-2 rounded-full border border-(--color-border) px-6 py-3.5 sm:w-auto text-[15px] font-medium text-(--color-text) transition-colors hover:bg-(--color-surface)"
              >
                View my work <ArrowDown size={16} />
              </Link>
            </div>

            <p className="font-body mt-2 border-t border-(--color-border) pt-5 text-[14px] leading-[1.6] text-(--color-muted) md:mt-4">
              Recently shipped{" "}
              <Link href="/work/lucid-lock" className="font-medium text-(--color-text) hover:underline">
                Lucid Lock
              </Link>{" "}
              for iOS and{" "}
              <Link href="/work/pixelart-dev" className="font-medium text-(--color-text) hover:underline">
                pixelart.dev
              </Link>{" "}
              for the web.
            </p>
          </div>

          <figure className="relative hidden md:block">
            <div className="absolute -inset-3 -z-0 rotate-3 rounded-[28px] bg-[#faf2ee]" aria-hidden="true" />
            <Image
              src="/images/portrait.webp"
              alt="Ayden Springer at sunset by the beach"
              width={1000}
              height={1250}
              sizes="(min-width: 1024px) 26rem, 22rem"
              className="relative aspect-4/5 w-full rounded-[22px] object-cover shadow-[0_24px_60px_-24px_rgba(44,36,22,0.45)]"
              priority
            />
            <figcaption className="font-body absolute bottom-4 left-4 rounded-full bg-white/85 px-3.5 py-1.5 text-[13px] font-medium text-(--color-text) backdrop-blur-md">
              Ayden Springer · Designer &amp; developer
            </figcaption>
          </figure>
        </section>
      </FadeIn>

      {/* Showcase: pixelart.dev — white */}
      <FadeIn>
        <section
          id="showcase"
          aria-labelledby="showcase-title"
          className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pb-20 md:px-12 md:pb-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-20 lg:pb-36"
        >
          <div className="flex flex-col gap-5 md:gap-6">
            <span className="font-body text-[13px] font-medium tracking-[0.08em] text-(--color-muted) uppercase">
              Featured build
            </span>
            <h2
              id="showcase-title"
              className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-(--color-text)"
            >
              pixelart.dev
            </h2>
            <p className="font-body max-w-[34rem] text-[17px] leading-[1.6] text-(--color-muted)">
              An AI pixel art generator for game developers. You describe a character, a tileset,
              or a background, and it comes back rebuilt on a true pixel grid with a fixed palette,
              ready to drop into a game. I designed and built it end to end.
            </p>

            <dl className="grid gap-4 border-t border-(--color-border) pt-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {PIXELART_FACTS.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1">
                  <dt className="font-heading text-[22px] font-semibold leading-tight text-(--color-text)">
                    {fact.value}
                  </dt>
                  <dd className="font-body text-[14px] leading-[1.5] text-(--color-muted)">
                    {fact.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <Link
                href="/work/pixelart-dev"
                className="font-body flex w-full items-center justify-center gap-2 rounded-full border border-(--color-border) px-6 py-3.5 text-[15px] font-medium text-(--color-text) transition-colors hover:bg-(--color-surface) sm:w-auto"
              >
                Read the case study <ArrowRight size={16} />
              </Link>
              <Link
                href="https://pixelart.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body flex items-center gap-2 px-2 py-3.5 text-[15px] font-medium text-(--color-link) hover:underline"
              >
                Visit pixelart.dev <ArrowUpRightFromSquareIcon size={14} />
              </Link>
            </div>
          </div>

          <YouTubeEmbed
            id="BPsZfW3P6Qw"
            title="Create Pixel Art with AI using pixelart.dev"
            className="shadow-[0_24px_60px_-24px_rgba(44,36,22,0.45)] rounded-xl"
          />
        </section>
      </FadeIn>

      {/* Selected Work — dark band */}
      <HorizontalProjects
        title="Selected work"
        projects={featured.map((p) => ({
          title: p.frontmatter.title,
          slug: p.frontmatter.slug,
          color: p.frontmatter.color,
          thumbnail: p.frontmatter.thumbnail,
          thumbnailFit: p.frontmatter.thumbnailFit,
          description: p.frontmatter.summary ?? p.frontmatter.description,
          category: p.frontmatter.category,
          order: p.frontmatter.order,
        }))}
      />

      {/* Ways to work together — soft orange band */}
      <div className="bg-[#faf2ee]">
        <FadeIn>
          <section id="services" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
            <h2 className="font-heading mb-6 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-(--color-text)">
              Ways to work together
            </h2>
            <p className="font-body mb-12 max-w-200 text-[16px] leading-[1.7] text-(--color-muted) md:mb-16">
              Most projects start as one of these. If yours doesn&apos;t fit, tell me about it anyway.
            </p>

            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {SERVICES.map((service, i) => (
                <div
                  key={service.title}
                  className="flex flex-col gap-4 rounded-xl border border-(--color-border) bg-(--color-bg) p-6 md:p-8"
                >
                  <span className="font-body text-[13px] font-medium tracking-[0.08em] text-(--color-muted)">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-[clamp(1.35rem,2.4vw,1.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-(--color-text)">
                    {service.title}
                  </h3>
                  <p className="font-body text-[16px] leading-[1.7] text-(--color-muted)">
                    {service.body}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="#contact"
              className="font-body mt-10 inline-flex items-center gap-2 text-[15px] font-medium text-(--color-link) hover:underline md:mt-12"
            >
              Discuss a project <ArrowRight size={16} />
            </Link>
          </section>
        </FadeIn>
      </div>

      {/* Proof: Red Block Labs — warm surface band */}
      <div className="bg-(--color-surface)">
        <FadeIn>
          <section id="experience" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36">
            <BackgroundRow
              title="Client work at Red Block Labs"
              image="/images/rbl-hero.png"
              imageAlt="Red Block Labs agency site"
              imagePosition="right"
            >
              <p className="text-(--color-text)">
                At{" "}
                <Link
                  href="https://redblocklabs-aydentest.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-(--color-link) hover:underline"
                >
                  Red Block Labs
                </Link>
                , I work with designers and engineers to ship{" "}
                <Highlight>brand systems, product interfaces, and production websites</Highlight> for
                technology clients. I&apos;ve contributed to more than 10 client projects, including
                two years as the frontend developer for Zero Authority.
              </p>
            </BackgroundRow>
          </section>
        </FadeIn>
      </div>

      {/* Testimonials — dark band */}
      <div className="bg-(--color-text)">
        <section id="testimonials" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36">
          <FadeIn>
            <h2 className="font-heading mb-16 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-white md:mb-24">
              What people I&apos;ve worked with say
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
