"use client"

import { useEffect, useRef, useState } from "react"

interface YouTubeEmbedProps {
  id: string
  title: string
  caption?: string
  /** Start muted and loop once the embed scrolls into view, like a motion reel. */
  autoplay?: boolean
  aspectRatio?: string
  className?: string
}

export function YouTubeEmbed({
  id,
  title,
  caption,
  autoplay = true,
  aspectRatio = "16/9",
  className = "my-8",
}: YouTubeEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isNear, setIsNear] = useState(false)

  // The player is heavy, so it only mounts once the reader is close to it.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setIsNear(true)
        observer.disconnect()
      },
      { rootMargin: "200px 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const params = new URLSearchParams({
    rel: "0",
    playsinline: "1",
    modestbranding: "1",
    ...(autoplay && { autoplay: "1", mute: "1", loop: "1", playlist: id }),
  })

  return (
    <figure className={className}>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-xl border border-[#E8E4DF] bg-black"
        style={{ aspectRatio }}
      >
        {isNear && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>
      {caption && (
        <figcaption className="font-body mt-3 text-left text-sm text-[var(--color-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
