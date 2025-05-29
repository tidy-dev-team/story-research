const elevationColors = {
  level1: "rgba(19, 19, 20, 0.5000)",
  level2: "rgba(10, 10, 10, 0.5000)",
  level3: "rgba(0, 0, 0, 0.5000)"
} as const

export const pzElevations = {
  center: {
    "level1": `0px 0px 32px 0px ${elevationColors.level1}`,
    "level2": `0px 2px 2px 0px ${elevationColors.level2}`,
    "level3": `0px 2px 2px 0px ${elevationColors.level3}`
  },
  right: {
    "level1": `8px 0px 32px 0px ${elevationColors.level1}`,
    "level2": `8px 0px 32px 0px ${elevationColors.level2}`,
    "level3": `8px 0px 32px 0px ${elevationColors.level3}`
  },
  left: {
    "level1": `-8px 0px 32px 0px ${elevationColors.level1}`,
    "level2": `-8px 0px 32px 0px ${elevationColors.level2}`,
    "level3": `-8px 0px 32px 0px ${elevationColors.level3}`
  },
  up: {
    "level1": `0px -8px 32px 0px ${elevationColors.level1}`,
    "level2": `0px -8px 32px 0px ${elevationColors.level2}`,
    "level3": `0px -8px 32px 0px ${elevationColors.level3}`
  },
  down: {
    "level1": `0px 8px 32px 0px ${elevationColors.level1}`,
    "level2": `0px 8px 32px 0px ${elevationColors.level2}`,
    "level3": `0px 8px 32px 0px ${elevationColors.level3}`
  }
} as const

export type PzElevations = typeof pzElevations

type BoxShadowValue = PzElevations[keyof PzElevations][keyof PzElevations[keyof PzElevations]]
type PzShadowClassName =
  `.${"shadow-pz"}-${keyof PzElevations & string}-${keyof PzElevations[keyof PzElevations & string]}`

export type PzElevationsAsClassUtility = Record<
  PzShadowClassName,
  { boxShadow: BoxShadowValue }
>

const getPzElevationsAsClassUtilities = (): PzElevationsAsClassUtility => {
  const result = {} as PzElevationsAsClassUtility

  for(const size in pzElevations) {
    const levels = pzElevations[size as keyof PzElevations]

    for(const levelKey in levels) {
      const levelValue = levels[levelKey as keyof typeof levels]
      const utilityClassName = `.shadow-pz-${size}-${levelKey}` as PzShadowClassName

      result[utilityClassName] = {
        boxShadow: levelValue
      }
    }
  }

  return result
}

export const pzElevationsAsClassUtilities = getPzElevationsAsClassUtilities()
