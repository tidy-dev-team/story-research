import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export interface TagStatusProps extends VariantProps<typeof tagStatusVariants> {
  rtl?: boolean;
  className?: string;
}

const statusText = {
  error: {
    ltr: "Error",
    rtl: "שגיאה",
  },
  warning: {
    ltr: "Warning",
    rtl: "אזהרה",
  },
  caution: {
    ltr: "Caution",
    rtl: "זהירות",
  },
  ok: {
    ltr: "OK",
    rtl: "תקין",
  },
  loading: {
    ltr: "Loading",
    rtl: "טוען",
  },
} as const;

const tagStatusVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-1",
    "px-4",
    "py-2",
    "font-heebo",
    "pz-label-m",
    "rounded-pz-2xs",
    "text-center",
    "leading-[1.46875em]",
  ],
  {
    variants: {
      type: {
        error: "bg-pz-system-status-danger-3 text-pz-system-fg-1",
        warning: "bg-pz-system-status-warning-2 text-pz-system-fg-black",
        caution: "bg-pz-system-status-caution-2 text-pz-system-fg-black",
        ok: "bg-pz-system-status-success-2 text-pz-system-fg-black",
        loading: "bg-pz-system-status-loading-2 text-pz-system-fg-1",
      },
    },
  }
);

export const TagStatus: React.FC<TagStatusProps> = ({
  type,
  rtl = false,
  className,
}) => {
  const text = rtl ? statusText[type!].rtl : statusText[type!].ltr;

  return (
    <span
      className={tagStatusVariants({ type, className })}
      style={{
        direction: rtl ? "rtl" : "ltr",
      }}
      aria-label={text}
      role="status"
    >
      {text}
    </span>
  );
};
