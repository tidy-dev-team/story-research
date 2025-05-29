export const pzRoundings = {
  none: "0px",
  "3xs": "2px",
  "2xs": "4px",
  xs: "8px",
  s: "12px",
  m: "16px",
  l: "20px",
  xl: "24px",
  max: "1000px"
} as const

export type PzRoundings = typeof pzRoundings
