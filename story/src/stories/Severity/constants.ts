export type SeverityLevel = "high" | "medium" | "low";

export const SEVERITY_COLORS = {
  high: "bg-pz-system-priority-high-3", // Red
  medium: "bg-pz-system-priority-medium-3", // Yellow
  low: "bg-pz-system-priority-low-1", // Green
} as const;
