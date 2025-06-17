import { pzButtonComponentSemanticColors } from "./Button/buttonComponentSemanticColors";

export const pzComponentSemanticColors = {
  button: pzButtonComponentSemanticColors,
} as const;

export type PzComponentSemanticColors = typeof pzComponentSemanticColors;
