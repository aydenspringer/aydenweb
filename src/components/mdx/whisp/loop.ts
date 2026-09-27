/**
 * One requestAnimationFrame loop for every Whisp on the page. It only runs
 * while a rig is on screen and the tab is visible, and Reduced Motion stops
 * it entirely so each rig renders once, at rest.
 */

export interface RigHandle {
  render: (now: number, still: boolean) => void
  isVisible: () => boolean
}

const rigs = new Set<RigHandle>()
let running = false
let listening = false

function reduceMotionQuery() {
  return typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null
}

export function prefersStillness() {
  return reduceMotionQuery()?.matches ?? false
}

function frame() {
  if (!running) return

  const now = performance.now() / 1000
  let awake = false

  for (const rig of rigs) {
    if (!rig.isVisible()) continue
    awake = true
    rig.render(now, false)
  }

  if (!awake || document.hidden) {
    running = false
    return
  }

  requestAnimationFrame(frame)
}

export function wake() {
  if (running || prefersStillness() || document.hidden) return
  running = true
  requestAnimationFrame(frame)
}

function listen() {
  if (listening || typeof document === "undefined") return
  listening = true

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) wake()
  })

  reduceMotionQuery()?.addEventListener("change", () => {
    if (prefersStillness()) {
      running = false
      for (const rig of rigs) rig.render(0, true)
    } else {
      wake()
    }
  })
}

export function register(rig: RigHandle) {
  listen()
  rigs.add(rig)
  return () => {
    rigs.delete(rig)
    if (rigs.size === 0) running = false
  }
}
