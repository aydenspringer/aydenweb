import { ArrowUpRightFromSquareIcon, FileIcon, GithubIcon, LinkedinIcon, MailIcon } from "lucide-react"
import Link from "next/link"

export function ContactFooter() {
  return (
    <footer id="contact" className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pt-20 pb-40 md:gap-8 md:px-12 md:pt-28 md:pb-60 lg:px-20 lg:pt-36 lg:pb-80">
      <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-(--color-text)">
        Contact
      </h2>
      <div className="font-body flex flex-col gap-4">
        <a
          href="mailto:ayden@pixelnova.app"
          className="flex items-center gap-2 text-[16px] text-(--color-link) hover:underline"
        >
          <MailIcon size={16} />
          ayden@pixelnova.app
        </a>
        <Link
          href="https://github.com/aydenspringer"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[16px] text-(--color-link) hover:underline"
        >
          <GithubIcon size={16} />
          github.com/aydenspringer <ArrowUpRightFromSquareIcon size={14} />
        </Link>
        <Link
          href="https://linkedin.com/in/ayden-springer"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[16px] text-(--color-link) hover:underline"
        >
          <LinkedinIcon size={16} />
          linkedin.com/in/ayden-springer <ArrowUpRightFromSquareIcon size={14} />
        </Link>
        <Link
          href="https://aydenweb.com/ayden-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-2 text-[16px] font-medium text-(--color-link) hover:underline"
        >
          <FileIcon size={16} />
          View Resume <ArrowUpRightFromSquareIcon size={14} />
        </Link>
      </div>
    </footer>
  )
}
