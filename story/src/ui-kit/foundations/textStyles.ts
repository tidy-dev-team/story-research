export const pzFontWeights = {
  thin: "100",
  extraLight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
  black: "900"
} as const

export type PzFontWeights = typeof pzFontWeights

const pzDefaultTextStyles = {
  fontFamily: 'var(--font-heebo)',
  letterSpacing: "0px",
  lineHeight: "1"
} as const

export const pzTextStyles = {
  // pz-heading-xl500
  heading: {
    xl500: {
      ...pzDefaultTextStyles,
      fontWeight: pzFontWeights.medium,
      fontSize: "40px",
    },
    m500: {
      ...pzDefaultTextStyles,
      fontWeight: pzFontWeights.medium,
      fontSize: "20px"
    },
    m400: {
      ...pzDefaultTextStyles,
      fontWeight: pzFontWeights.regular,
      fontSize: "20px"
    },
    s400: {
      ...pzDefaultTextStyles,
      fontWeight: pzFontWeights.regular,
      fontSize: "18px"
    },
  },
  body: {
    l500: {
      ...pzDefaultTextStyles,
      fontWeight: pzFontWeights.semiBold,
      fontSize: "16px"
    },
    l400: {
      ...pzDefaultTextStyles,
      fontWeight: pzFontWeights.regular,
      fontSize: "16px"
    },
    m500: {
      ...pzDefaultTextStyles,
      fontWeight: pzFontWeights.medium,
      fontSize: "14px"
    },
    m400: {
      ...pzDefaultTextStyles,
      fontWeight: pzFontWeights.regular,
      fontSize: "14px"
    },
    s500: {
      ...pzDefaultTextStyles,
      fontWeight: pzFontWeights.medium,
      fontSize: "12px"
    },
    s400: {
      ...pzDefaultTextStyles,
      fontWeight: pzFontWeights.regular,
      fontSize: "12px"
    },
  },
  label: {
    l: {
      ...pzDefaultTextStyles,
      fontWeight: pzFontWeights.regular,
      fontSize: "16px"
    },
    m: {
      ...pzDefaultTextStyles,
      fontWeight: pzFontWeights.regular,
      fontSize: "14px"
    },
    s: {
      ...pzDefaultTextStyles,
      fontWeight: pzFontWeights.regular,
      fontSize: "12px"
    },
  },
  nav: {
    side: {
      ...pzDefaultTextStyles,
      fontWeight: pzFontWeights.regular,
      fontSize: "10px"
    }
  },
  link400: {
    ...pzDefaultTextStyles,
    fontWeight: pzFontWeights.regular,
    fontSize: "16px"
  }
} as const

export type PzTextStyles = typeof pzTextStyles

type TextStyleClassName = `.${"pz"}-${keyof PzTextStyles & string}`
type NestedTextClassName =
  `.${"pz"}-${keyof PzTextStyles & string}-${keyof PzTextStyles[keyof PzTextStyles & string]}`

type TextStyleValue = typeof pzDefaultTextStyles & {
  fontWeight: PzFontWeights[keyof PzFontWeights],
  fontSize: string
}

export type PzTextStylesAsClassNames = Record<
  TextStyleClassName | NestedTextClassName,
  TextStyleValue
>

const getPzTextStylesAsClassNames = (): PzTextStylesAsClassNames => {
  const result = {} as PzTextStylesAsClassNames

  for (const element in pzTextStyles) {
    const elementVariantsOrProperties = pzTextStyles[element as keyof PzTextStyles]

    // checks if this object is not nested by fontSize property
    if ('fontSize' in elementVariantsOrProperties) {
      const className = `.pz-${element}` as TextStyleClassName
      result[className] = elementVariantsOrProperties
    } else {
      for (const variant in elementVariantsOrProperties) {
        const variantProperties = elementVariantsOrProperties[variant as keyof typeof elementVariantsOrProperties]
        const className = `.pz-${element}-${variant}` as keyof NestedTextClassName

        result[className as keyof PzTextStylesAsClassNames] = variantProperties
      }
    }
  }

  return result
}

export const pzTextStylesAsClassNames = getPzTextStylesAsClassNames()
