import React from "react";
import { pzSemanticColors } from "../../ui-kit/foundations/semantic-colors";

export interface TagProps {
  /**
   * The numeric value to display (1-999)
   */
  value: number;
  /**
   * The variant type that determines the visual appearance
   */
  type?: "default" | "geo";
  /**
   * Additional CSS class name
   */
  className?: string;
}

const typeConfig = {
  default: {
    backgroundColor: pzSemanticColors.system.bg.primary,
    color: pzSemanticColors.system.fg[1], // white
  },
  geo: {
    backgroundColor: pzSemanticColors.system.bg.geofence,
    color: pzSemanticColors.system.fg[1], // white
  },
} as const;

export const Tag: React.FC<TagProps> = ({
  value,
  type = "default",
  className = "",
}) => {
  // Clamp value between 1 and 999
  const clampedValue = Math.max(1, Math.min(999, Math.round(value)));
  const displayValue = `+${clampedValue}`;
  const config = typeConfig[type];

  return (
    <span
      className={`inline-flex items-center justify-center font-heebo text-xs font-normal rounded-full text-center leading-[1.46875] min-w-[40px] h-[26px] pz-body-s400 p-pz-4xs${className}`}
      style={{
        backgroundColor: config.backgroundColor,
        color: config.color,
      }}
      aria-label={`${clampedValue} items`}
      role="status"
    >
      {displayValue}
    </span>
  );
};
