import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export enum TagStatusType {
  Error = "error",
  Warning = "warning",
  Caution = "caution",
  Ok = "ok",
  Loading = "loading",
}

export interface TagStatusProps {
  type: TagStatusType;
  label: string;
}

const tagStatusVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-1",
    "px-4",
    "py-2",
    "pz-label-m",
    "rounded-pz-2xs",
    "text-center",
    "h-6",
  ],
  {
    variants: {
      type: {
        [TagStatusType.Error]:
          "bg-pz-system-status-danger-3 text-pz-system-fg-1",
        [TagStatusType.Warning]:
          "bg-pz-system-status-warning-2 text-pz-system-fg-black",
        [TagStatusType.Caution]:
          "bg-pz-system-status-caution-2 text-pz-system-fg-black",
        [TagStatusType.Ok]:
          "bg-pz-system-status-success-2 text-pz-system-fg-black",
        [TagStatusType.Loading]:
          "bg-pz-system-status-loading-2 text-pz-system-fg-1",
      },
    },
    defaultVariants: {
      type: TagStatusType.Loading,
    },
  }
);

export const TagStatus: React.FC<TagStatusProps> = ({ type, label }) => {
  return (
    <span
      className={tagStatusVariants({ type })}
      aria-label={label}
      role="status"
    >
      {label}
    </span>
  );
};
