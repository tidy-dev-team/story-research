import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export interface TagProps extends VariantProps<typeof tagVariants> {
  value: number;
  className?: string;
}

const tagVariants = cva(
  [
    // Base styles
    "inline-flex",
    "items-center",
    "justify-center",
    "font-heebo",
    "text-xs",
    "font-normal",
    "rounded-full",
    "text-center",
    "leading-[1.46875]",
    "min-w-[40px]",
    "h-[26px]",
    "pz-body-s400",
    "p-pz-4xs",
    "text-pz-system-fg-1", // white text for all variants
  ],
  {
    variants: {
      type: {
        default: "bg-pz-system-bg-primary",
        geo: "bg-pz-system-bg-geofence",
      },
    },
    defaultVariants: {
      type: "default",
    },
  }
);

export const Tag: React.FC<TagProps> = ({ value, type, className }) => {
  const clampedValue = Math.max(1, Math.min(999, Math.round(value)));
  const displayValue = `+${clampedValue}`;

  return (
    <span
      className={tagVariants({ type, className })}
      aria-label={`${clampedValue} items`}
      role="status"
    >
      {displayValue}
    </span>
  );
};
