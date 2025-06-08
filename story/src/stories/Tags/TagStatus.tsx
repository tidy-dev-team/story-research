import React from "react";
import { pzSemanticColors } from "../../ui-kit/foundations/semantic-colors";
import { pzRoundings } from "../../ui-kit/foundations/roundings";

export interface TagStatusProps {
  type: "error" | "warning" | "caution" | "ok" | "loading";
  rtl?: boolean;
  className?: string;
}

const statusConfig = {
  error: {
    backgroundColor: pzSemanticColors.system.status.danger[3],
    color: pzSemanticColors.system.fg[1], // white
    text: {
      ltr: "Error",
      rtl: "שגיאה",
    },
  },
  warning: {
    backgroundColor: pzSemanticColors.system.status.warning[2],
    color: pzSemanticColors.system.fg.black,
    text: {
      ltr: "Warning",
      rtl: "אזהרה",
    },
  },
  caution: {
    backgroundColor: pzSemanticColors.system.status.caution[2],
    color: pzSemanticColors.system.fg.black,
    text: {
      ltr: "Caution",
      rtl: "זהירות",
    },
  },
  ok: {
    backgroundColor: pzSemanticColors.system.status.success[2],
    color: pzSemanticColors.system.fg.black,
    text: {
      ltr: "OK",
      rtl: "תקין",
    },
  },
  loading: {
    backgroundColor: pzSemanticColors.system.status.loading[2],
    color: pzSemanticColors.system.fg[1],
    text: {
      ltr: "Loading",
      rtl: "טוען",
    },
  },
} as const;

export const TagStatus: React.FC<TagStatusProps> = ({
  type,
  rtl = false,
  className = "",
}) => {
  const config = statusConfig[type];
  const text = rtl ? config.text.rtl : config.text.ltr;

  return (
    <span
      className={`inline-flex items-center justify-center gap-1 px-4 py-2 font-heebo pz-label-m rounded-pz-2xs ${className}`}
      style={{
        backgroundColor: config.backgroundColor,
        color: config.color,
        direction: rtl ? "rtl" : "ltr",
        textAlign: "center",
        lineHeight: "1.46875em",
      }}
      aria-label={text}
      role="status"
    >
      {text}
    </span>
  );
};
