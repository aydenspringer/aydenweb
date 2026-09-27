/**
 * Whisp's pose vocabulary, ported from the Lucid Lock website (lucidlock.co),
 * which ported it from the iOS app's DesignSystem/WhispAnimatedView.swift.
 * Durations and curves are copied value-for-value so this Whisp moves like
 * the one in the app: same idle float and breath, same blink cadence, same
 * seven reactions.
 *
 * Everything here is pure: a time in seconds goes in, a pose comes out.
 */

export interface Pose {
  y: number
  scaleX: number
  scaleY: number
  rotation: number
  glowScale: number
  glowOpacity: number
  leftArmLift: number
  rightArmLift: number
  armReach: number
  smile: number
  eyeScale: number
  gazeX: number
  gazeY: number
  /** How far the lids are drawn over the idle blink, 0…1. */
  lidClose: number
}

export const IDENTITY: Readonly<Pose> = Object.freeze({
  y: 0,
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
  glowScale: 1,
  glowOpacity: 0,
  leftArmLift: 0,
  rightArmLift: 0,
  armReach: 0,
  smile: 1,
  eyeScale: 1,
  gazeX: 0,
  gazeY: 0,
  lidClose: 0,
})

function pose(partial: Partial<Pose>): Pose {
  return { ...IDENTITY, ...partial }
}

export function combine(a: Pose, b: Pose): Pose {
  return {
    y: a.y + b.y,
    scaleX: a.scaleX * b.scaleX,
    scaleY: a.scaleY * b.scaleY,
    rotation: a.rotation + b.rotation,
    glowScale: a.glowScale * b.glowScale,
    glowOpacity: a.glowOpacity + b.glowOpacity,
    leftArmLift: a.leftArmLift + b.leftArmLift,
    rightArmLift: a.rightArmLift + b.rightArmLift,
    armReach: a.armReach + b.armReach,
    smile: a.smile * b.smile,
    eyeScale: a.eyeScale * b.eyeScale,
    gazeX: a.gazeX + b.gazeX,
    gazeY: a.gazeY + b.gazeY,
    lidClose: Math.max(a.lidClose, b.lidClose),
  }
}

export const REACTION_NAMES = [
  "wave",
  "notice",
  "encourage",
  "ponder",
  "drowse",
  "reassure",
  "celebrate",
] as const

export type Reaction = (typeof REACTION_NAMES)[number]

const DURATIONS: Record<Reaction, number> = {
  celebrate: 1.25,
  encourage: 1.45,
  notice: 1.05,
  wave: 1.7,
  ponder: 2.0,
  drowse: 2.3,
  reassure: 1.8,
}

const REACTIONS: Record<Reaction, (t: number) => Pose> = {
  /** Reserved in the app for the moment the user subscribes. */
  celebrate(t) {
    const e = Math.sin(t * Math.PI)
    const hop = Math.abs(Math.sin(t * Math.PI * 2)) * (1 - t * 0.35)
    const landing = Math.pow(Math.max(0, Math.sin(t * Math.PI * 2 - Math.PI / 2)), 6)
    return pose({
      y: -25 * hop,
      scaleX: 1 - 0.07 * hop + 0.09 * landing,
      scaleY: 1 + 0.1 * hop - 0.08 * landing,
      rotation: 4.5 * Math.sin(t * Math.PI * 4) * (1 - t),
      glowScale: 1 + 0.32 * e,
      glowOpacity: 0.18 * e,
      leftArmLift: 31 * e,
      rightArmLift: -31 * e,
      armReach: 9 * e,
      smile: 1 + 0.55 * e,
      eyeScale: 1 + 0.08 * e,
    })
  },

  encourage(t) {
    const e = Math.sin(t * Math.PI)
    const nod = Math.sin(t * Math.PI * 2) * e
    return pose({
      y: -5 * e,
      scaleX: 1 + 0.025 * e,
      scaleY: 1 - 0.02 * e,
      rotation: 3.5 * nod,
      glowScale: 1 + 0.16 * e,
      glowOpacity: 0.1 * e,
      leftArmLift: 10 * e,
      rightArmLift: -7 * e,
      armReach: 3 * e,
      smile: 1 + 0.25 * e,
      gazeY: 1.5 * e,
    })
  },

  notice(t) {
    const e = Math.sin(t * Math.PI)
    return pose({
      y: -12 * e,
      scaleX: 1 + 0.055 * e,
      scaleY: 1 - 0.04 * e,
      rotation: 6 * Math.sin(t * Math.PI * 5) * (1 - t),
      glowScale: 1 + 0.24 * e,
      glowOpacity: 0.14 * e,
      leftArmLift: 19 * e,
      rightArmLift: -19 * e,
      armReach: 6 * e,
      smile: 1 - 0.65 * e,
      eyeScale: 1 + 0.2 * e,
      gazeY: -2 * e,
    })
  },

  /** One arm goes up and swings; the body counter-tilts with it. */
  wave(t) {
    const raise = Math.sin(Math.min(1, t * 1.15) * Math.PI)
    const swing = Math.sin(t * Math.PI * 6)
    return pose({
      y: -7 * raise,
      scaleX: 1 - 0.02 * raise,
      scaleY: 1 + 0.03 * raise,
      rotation: 2.5 * swing * raise,
      glowScale: 1 + 0.14 * raise,
      glowOpacity: 0.08 * raise,
      leftArmLift: 6 * raise,
      rightArmLift: -38 * raise - 11 * swing * raise,
      armReach: 4 * raise,
      smile: 1 + 0.4 * raise,
      gazeX: 1.6 * raise,
    })
  },

  /** Looks up and away with one arm raised toward the chin. */
  ponder(t) {
    const hold = Math.sin(Math.min(1, t * 1.1) * Math.PI)
    const drift = Math.sin(t * Math.PI * 2)
    return pose({
      y: -3 * hold,
      rotation: -5.5 * hold,
      glowScale: 1 + 0.1 * hold,
      glowOpacity: 0.05 * hold,
      leftArmLift: 27 * hold,
      rightArmLift: -4 * hold,
      armReach: -3 * hold,
      smile: 1 - 0.32 * hold,
      eyeScale: 1 - 0.08 * hold,
      gazeX: -3.6 * hold + 0.7 * drift,
      gazeY: -3 * hold,
    })
  },

  /** Sinks, squashes, and lets the eyes fall shut with a slow sway. */
  drowse(t) {
    const sink = Math.sin(Math.min(1, t * 1.05) * Math.PI)
    const sway = Math.sin(t * Math.PI * 3)
    return pose({
      y: 6 * sink,
      scaleX: 1 + 0.035 * sink,
      scaleY: 1 - 0.05 * sink,
      rotation: 4 * sway * sink,
      glowScale: 1 - 0.06 * sink,
      glowOpacity: 0.03 * sink,
      leftArmLift: -9 * sink,
      rightArmLift: 9 * sink,
      smile: 1 + 0.15 * sink,
      gazeY: 2 * sink,
      lidClose: 0.92 * sink,
    })
  },

  /** Arms tuck inward and the glow blooms. */
  reassure(t) {
    const breath = Math.sin(Math.min(1, t * 1.05) * Math.PI)
    return pose({
      y: -4 * breath,
      scaleX: 1 + 0.03 * breath,
      scaleY: 1 + 0.02 * breath,
      rotation: 1.6 * Math.sin(t * Math.PI * 2) * breath,
      glowScale: 1 + 0.3 * breath,
      glowOpacity: 0.16 * breath,
      leftArmLift: -17 * breath,
      rightArmLift: 17 * breath,
      armReach: -8 * breath,
      smile: 1 + 0.3 * breath,
      eyeScale: 1 - 0.05 * breath,
      lidClose: 0.35 * breath,
    })
  },
}

export function isReaction(name: unknown): name is Reaction {
  return typeof name === "string" && Object.hasOwn(REACTIONS, name)
}

export function reactionPose(name: Reaction, elapsed: number): Pose {
  const duration = DURATIONS[name]
  const progress = Math.min(Math.max(elapsed / duration, 0), 1)
  if (progress >= 1) return IDENTITY
  return REACTIONS[name](progress)
}

export function idlePose(time: number): Pose {
  const floatPhase = time * ((Math.PI * 2) / 4.4)
  const breathePhase = time * ((Math.PI * 2) / 3.6)
  const breath = Math.sin(breathePhase)

  return pose({
    y: 3.5 * Math.sin(floatPhase),
    scaleX: 1 - 0.01 * breath,
    scaleY: 1 + 0.016 * breath,
    rotation: 0.65 * Math.sin(floatPhase * 0.73),
    leftArmLift: 6 + 2.2 * Math.sin(floatPhase * 0.81),
    rightArmLift: -6 - 2.6 * Math.sin(floatPhase * 0.81 + 0.7),
    gazeX: 1.5 * Math.sin(time * 0.43),
    gazeY: 0.7 * Math.sin(time * 0.31 + 1.2),
  })
}

function blinkPulse(distance: number) {
  if (distance >= 0.13) return 0
  return Math.sin((1 - distance / 0.13) * (Math.PI / 2))
}

export function blinkScale(time: number) {
  const cycle = time % 5.8
  const primary = blinkPulse(Math.abs(cycle - 4.15))
  const secondary = blinkPulse(Math.abs(cycle - 4.48)) * 0.55
  return Math.max(0.08, 1 - Math.max(primary, secondary))
}

/**
 * The face and shading were authored against a 160pt rig. The exponent under
 * one keeps a small Whisp and a large Whisp reading as the same character.
 */
export function detailScale(size: number) {
  return Math.pow(size / 160, 0.86) * 0.82
}
