"use client"

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react"
import Image from "next/image"
import {
  IDENTITY,
  REACTION_NAMES,
  blinkScale,
  combine,
  detailScale,
  idlePose,
  isReaction,
  reactionPose,
  type Reaction,
} from "./whisp/poses"
import { prefersStillness, register, wake } from "./whisp/loop"

const TORSO_SRC = "/projects/lucid-lock/whisp-torso.png"
const TORSO_W = 707
const TORSO_H = 644

export interface WhispHandle {
  play: (name: Reaction) => void
}

interface WhispProps {
  /** Any CSS length. The rig is square and scales from this. */
  size?: string
  /** Reaction to play the first time the rig scrolls into view. */
  greeting?: Reaction
  /** Hover to notice, click to celebrate. */
  interactive?: boolean
  label?: string
  ref?: Ref<WhispHandle>
}

/**
 * Whisp, the Lucid Lock mascot, as a layered rig rather than an image. The
 * body, arms, face, specular light and ground shadow move independently.
 * Sizes are written once per resize; only transforms change per frame.
 */
export function Whisp({
  size = "200px",
  greeting,
  interactive = false,
  label = "Whisp",
  ref,
}: WhispProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const rigRef = useRef<HTMLDivElement>(null)
  const armLeftRef = useRef<HTMLDivElement>(null)
  const armRightRef = useRef<HTMLDivElement>(null)
  const torsoRef = useRef<HTMLDivElement>(null)
  const specularRef = useRef<HTMLDivElement>(null)
  const faceRef = useRef<HTMLDivElement>(null)
  const eyeRowRef = useRef<HTMLDivElement>(null)
  const mouthRef = useRef<SVGSVGElement>(null)
  const mouthPathRef = useRef<SVGPathElement>(null)
  const eyeWrapRefs = useRef<(HTMLDivElement | null)[]>([])
  const eyeBallRefs = useRef<(HTMLDivElement | null)[]>([])
  const glintRefs = useRef<(HTMLDivElement | null)[]>([])

  const state = useRef({
    px: 0,
    ds: 1,
    mouthW: 0,
    mouthH: 0,
    visible: false,
    greeted: false,
    event: null as Reaction | null,
    eventStart: 0,
  })

  function play(name: Reaction) {
    if (!isReaction(name)) return
    state.current.event = name
    state.current.eventStart = performance.now() / 1000
    if (prefersStillness()) return
    wake()
  }

  useImperativeHandle(ref, () => ({ play }))

  useEffect(() => {
    const s = state.current
    const root = rootRef.current
    const shadow = shadowRef.current
    const glow = glowRef.current
    const rig = rigRef.current
    const armLeft = armLeftRef.current
    const armRight = armRightRef.current
    const torso = torsoRef.current
    const specular = specularRef.current
    const face = faceRef.current
    const eyeRow = eyeRowRef.current
    const mouth = mouthRef.current
    const mouthPath = mouthPathRef.current
    if (
      !root || !shadow || !glow || !rig || !armLeft || !armRight || !torso ||
      !specular || !face || !eyeRow || !mouth || !mouthPath
    ) {
      return
    }

    function render(now: number, still: boolean) {
      if (!s.px) return
      const { px, ds, mouthW, mouthH } = s

      const idle = still ? IDENTITY : idlePose(now)
      const reaction =
        still || !s.event ? IDENTITY : reactionPose(s.event, now - s.eventStart)
      const p = combine(idle, reaction)
      const blink = (still ? 1 : blinkScale(now)) * (1 - p.lidClose)

      // The ground shadow tightens and lifts as Whisp floats up.
      shadow!.style.transform = `translate(-50%,-50%) translateY(${px * 0.39}px) scaleX(${
        1 - Math.min(Math.abs(p.y) / 95, 0.22)
      })`
      shadow!.style.opacity = `${0.25 - Math.min(Math.abs(p.y) / 230, 0.11)}`

      glow!.style.transform = `translate(-50%,-50%) scale(${p.glowScale})`
      glow!.style.opacity = `${(0.16 + p.glowOpacity) / 0.34}`

      rig!.style.transform = `translate(-50%,-50%) translateY(${p.y}px) rotate(${p.rotation}deg)`

      armLeft!.style.transform = `translate(-50%,-50%) translate(${
        -px * 0.325 - p.armReach
      }px, ${px * 0.13}px) rotate(${p.leftArmLift}deg)`
      armRight!.style.transform = `translate(-50%,-50%) translate(${
        px * 0.325 + p.armReach
      }px, ${px * 0.13}px) rotate(${p.rightArmLift}deg)`

      torso!.style.transform = `translate(-50%,-50%) scale(${p.scaleX}, ${p.scaleY})`
      specular!.style.transform = `translateX(${p.gazeX * 0.25}px)`

      face!.style.transform = `translate(-50%,-50%) translateY(${px * -0.04 + p.y * -0.025}px)`

      eyeWrapRefs.current.forEach((wrap, i) => {
        const ball = eyeBallRefs.current[i]
        const glint = glintRefs.current[i]
        if (!wrap || !ball || !glint) return
        wrap.style.transform = `translate(${p.gazeX * ds}px, ${p.gazeY * ds}px) scale(${p.eyeScale})`
        ball.style.transform = `scaleY(${blink})`
        glint.style.transform = `translate(${p.gazeX * 0.18 * ds}px, ${p.gazeY * 0.18 * ds}px)`
        glint.style.opacity = blink > 0.35 ? "1" : "0"
      })

      mouthPath!.setAttribute(
        "d",
        `M0,${mouthH * 0.18} Q${mouthW / 2},${mouthH * Math.max(0.25, p.smile)} ${mouthW},${mouthH * 0.18}`,
      )
    }

    function layout() {
      const next = root!.clientWidth
      if (!next || next === s.px) return
      const px = next
      const ds = detailScale(px)
      s.px = px
      s.ds = ds

      shadow!.style.width = `${px * 0.62}px`
      shadow!.style.height = `${px * 0.105}px`
      shadow!.style.filter = `blur(${px * 0.019}px)`

      glow!.style.width = `${px * 1.14}px`
      glow!.style.height = `${px * 1.14}px`

      for (const [i, arm] of [armLeft!, armRight!].entries()) {
        arm.style.width = `${px * 0.31}px`
        arm.style.height = `${px * 0.16}px`
        arm.style.transformOrigin = i === 0 ? "100% 50%" : "0% 50%"
        arm.style.background = `linear-gradient(${
          i === 0 ? "135deg" : "225deg"
        }, #e8ebf0 0%, #9ba3b3 50%, #d6d9e0 100%)`
        arm.style.boxShadow = `inset 0 0 0 ${0.7 * ds}px rgb(255 255 255 / 0.2), 0 ${
          3 * ds
        }px ${7 * ds}px rgb(0 0 0 / 0.16)`
      }

      torso!.style.width = `${px * 0.864}px`
      torso!.style.height = `${px * 0.864}px`

      specular!.style.width = `${px * 0.27}px`
      specular!.style.height = `${px * 0.12}px`
      specular!.style.filter = `blur(${px * 0.035}px)`
      specular!.style.left = `${px * 0.11}px`
      specular!.style.top = `${px * 0.08}px`

      face!.style.width = `${px * 0.3}px`
      face!.style.gap = `${7 * ds}px`
      eyeRow!.style.gap = `${27 * ds}px`

      eyeWrapRefs.current.forEach((wrap, i) => {
        const ball = eyeBallRefs.current[i]
        const glint = glintRefs.current[i]
        if (!wrap || !ball || !glint) return
        wrap.style.width = `${12 * ds}px`
        wrap.style.height = `${21 * ds}px`
        ball.style.boxShadow = `0 ${1 * ds}px ${2 * ds}px rgb(0 0 0 / 0.2)`
        glint.style.width = `${3.5 * ds}px`
        glint.style.height = `${3.5 * ds}px`
        glint.style.left = `${2.7 * ds}px`
        glint.style.top = `${3.2 * ds}px`
      })

      s.mouthW = 20 * ds
      s.mouthH = 8 * ds
      mouth!.setAttribute("width", String(s.mouthW))
      mouth!.setAttribute("height", String(s.mouthH))
      mouthPath!.setAttribute("stroke-width", String(2.6 * ds))

      render(0, true)
    }

    layout()

    const unregister = register({ render, isVisible: () => s.visible })

    const resizeObserver = new ResizeObserver(layout)
    resizeObserver.observe(root)

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          s.visible = entry.isIntersecting
          if (!entry.isIntersecting) continue
          if (greeting && !s.greeted) {
            s.greeted = true
            s.event = greeting
            s.eventStart = performance.now() / 1000
          }
          wake()
        }
      },
      { threshold: 0.2 },
    )
    intersectionObserver.observe(root)

    if (prefersStillness()) render(0, true)

    return () => {
      unregister()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [greeting])

  const layers = (
    <>
      <div ref={shadowRef} className="whisp__layer whisp__shadow" />
      <div ref={glowRef} className="whisp__layer whisp__glow" />

      <div ref={rigRef} className="whisp__layer whisp__rig">
        <div ref={armLeftRef} className="whisp__layer whisp__arm" />
        <div ref={armRightRef} className="whisp__layer whisp__arm" />

        <div ref={torsoRef} className="whisp__torso">
          <Image src={TORSO_SRC} alt="" width={TORSO_W} height={TORSO_H} unoptimized />
          <div ref={specularRef} className="whisp__specular" />
        </div>

        <div ref={faceRef} className="whisp__face">
          <div ref={eyeRowRef} className="whisp__eyes">
            {[0, 1].map((i) => (
              <div
                key={i}
                ref={(el) => {
                  eyeWrapRefs.current[i] = el
                }}
                className="whisp__eye-wrap"
              >
                <div
                  ref={(el) => {
                    eyeBallRefs.current[i] = el
                  }}
                  className="whisp__eye"
                />
                <div
                  ref={(el) => {
                    glintRefs.current[i] = el
                  }}
                  className="whisp__glint"
                />
              </div>
            ))}
          </div>

          <svg ref={mouthRef} className="whisp__mouth" aria-hidden="true">
            <path ref={mouthPathRef} fill="none" stroke="#0e0e12" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </>
  )

  // Interactive rigs are real buttons, so Whisp answers the keyboard as well
  // as the mouse. Decorative ones stay out of the accessibility tree.
  if (interactive) {
    return (
      <button
        ref={(el) => {
          rootRef.current = el
        }}
        type="button"
        aria-label={label}
        className="whisp whisp--interactive"
        style={{ width: size, height: size }}
        onMouseEnter={() => play("notice")}
        onClick={() => play("celebrate")}
      >
        {layers}
      </button>
    )
  }

  return (
    <div
      ref={(el) => {
        rootRef.current = el
      }}
      role="img"
      aria-label={label}
      className="whisp"
      style={{ width: size, height: size }}
    >
      {layers}
    </div>
  )
}

const REACTION_LABELS: Record<Reaction, string> = {
  wave: "Wave",
  notice: "Notice",
  encourage: "Encourage",
  ponder: "Ponder",
  drowse: "Drowse",
  reassure: "Reassure",
  celebrate: "Celebrate",
}

interface WhispStageProps {
  caption?: string
}

/** A Night Ink stage for the live rig, with a button for each reaction. */
export function WhispStage({ caption }: WhispStageProps) {
  const whispRef = useRef<WhispHandle>(null)
  const [active, setActive] = useState<Reaction | null>(null)

  return (
    <figure className="my-10">
      <div className="flex flex-col items-center gap-8 rounded-xl bg-[#111214] px-6 pt-12 pb-8">
        <Whisp ref={whispRef} size="clamp(160px, 38vw, 240px)" greeting="wave" interactive label="Whisp. Hover or tap to play a reaction." />
        <div className="flex flex-wrap justify-center gap-2">
          {REACTION_NAMES.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => {
                setActive(name)
                whispRef.current?.play(name)
              }}
              className={`font-body rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                active === name
                  ? "border-[#B9C5D0] bg-[#B9C5D0] text-[#111214]"
                  : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {REACTION_LABELS[name]}
            </button>
          ))}
        </div>
      </div>
      {caption && (
        <figcaption className="font-body mt-3 text-left text-sm text-[var(--color-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
