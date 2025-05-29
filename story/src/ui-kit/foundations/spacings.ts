export const pzSpacing = {
  none: "0",
  "6xs": "2px",
  "5xs": "4px",
  "4xs": "8px",
  "3xs": "12px",
  "2xs": "16px",
  xs: "20px",
  s: "24px",
  m: "28px",
  l: "32px",
  xl: "36px",
  "2xl": "40px",
  "3xl": "44px",
  "4xl": "48px"
} as const

export type PzSpacing = typeof pzSpacing

export const pzIconSizes = {
  s: "12px",
  m: "16px",
  l: "20px",
  xl: "24px",
  "2xl": "32px"
} as const

export type PzIconSizes = typeof pzIconSizes
