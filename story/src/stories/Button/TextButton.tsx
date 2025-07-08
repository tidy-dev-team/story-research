import React, { type ReactElement } from "react";
import { cva } from "class-variance-authority";
import { TextDirection } from "../textDirection";

const buttonStyles = cva([
  "inline-flex",
  "justify-center",
  "items-center",
  "gap-2",
  "overflow-hidden",
  "bg-transparent",
  "focus:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-pz-system-border-focused-1",
  "focus-visible:ring-offset-0",
  "pz-body-m400",
  "cursor-pointer",
  "p-1",
  "text-pz-system-fg-primary",
  "hover:enabled:text-pz-system-fg-hover",
  "active:enabled:text-pz-system-fg-pressed",
  "disabled:text-pz-system-fg-disabled",
  "disabled:cursor-not-allowed",
  "disabled:pointer-events-none",
]);

interface TextButtonProps {
  label: string;
  onClick: () => void;
  isDisabled?: boolean;
  textDirection?: TextDirection;
}

export const TextButton = ({
  label,
  onClick,
  isDisabled = false,
  textDirection = TextDirection.Ltr,
}: TextButtonProps): ReactElement => {
  const handleClick = () => {
    if (!isDisabled) {
      onClick();
    }
  };

  return (
    <button
      className={buttonStyles()}
      type="button"
      disabled={isDisabled}
      dir={textDirection}
      onClick={handleClick}
    >
      <span className="leading-none translate-y-px">{label}</span>
    </button>
  );
};
