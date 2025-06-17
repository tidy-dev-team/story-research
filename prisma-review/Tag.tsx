import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export enum TagType {
  Default = "default",
  Geo = "geo",
}

export interface TagProps {
  value: number;
  type?: TagType;
}

const tagVariants = cva(
  [
    "h-[26px]",
    "inline-flex",
    "items-center",
    "justify-center",
    "min-w-[40px]",
    "p-pz-4xs",
    "pz-body-s400",
    "rounded-full",
    "text-center",
    "text-pz-system-fg-1",
  ],
  {
    variants: {
      type: {
        [TagType.Default]: "bg-pz-system-bg-primary",
        [TagType.Geo]: "bg-pz-system-bg-geofence",
      },
    },
    defaultVariants: {
      type: TagType.Default,
    },
  }
);

export const Tag: React.FC<TagProps> = ({ value, type }) => {
  const clampedValue = Math.max(1, Math.min(999, Math.round(value)));
  const displayValue = `+${clampedValue}`;

  return (
    <div
      className={tagVariants({ type })}
      aria-label={`${clampedValue} items`}
      role="status"
    >
      <span className="translate-y-px">{displayValue}</span>
    </div>
  );
};
