import React, {
  type ReactElement,
  type ChangeEvent,
  type FocusEvent,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, ButtonSize, ButtonType } from "../Button/IconButton";
import { TextDirection } from "../textDirection";
import { IconFontSize } from "../iconFontSize";

const searchStyles = cva([
  "bg-pz-system-bg-3",
  "border-transparent",
  "border",
  "disabled:cursor-not-allowed",
  "disabled:opacity-50",
  "duration-200",
  "flex",
  "gap-1",
  "h-8",
  "hover:before:absolute",
  "hover:before:bg-pz-system-bg-overlay-hover",
  "hover:before:inset-0",
  "hover:before:pointer-events-none",
  "hover:before:rounded-pz-2xs",
  "items-center",
  "px-2",
  "py-0",
  "pz-body-m400",
  "relative",
  "rounded-pz-2xs",
  "transition-all",
  "w-[200px]",
  "has-[:focus]:border-pz-system-border-primary",
  "has-[:focus]:bg-pz-system-bg-3",
  "has-[:focus-visible]:ring-2",
  "has-[:focus-visible]:ring-pz-system-border-focused-1",
  "has-[:focus-visible]:ring-offset-0",
]);

const inputStyles = cva(
  [
    "bg-transparent",
    "border-none",
    "disabled:cursor-not-allowed",
    "disabled:text-pz-system-fg-disabled",
    "flex-1",
    "min-w-0",
    "outline-none",
    "placeholder:text-pz-system-fg-4",
  ],
  {
    variants: {
      filled: {
        true: "text-pz-system-fg-1",
        false: "text-pz-system-fg-4",
      },
    },
    defaultVariants: {
      filled: false,
    },
  }
);

const iconStyles = cva(["transition-colors", "duration-200", "flex-shrink-0"], {
  variants: {
    filled: {
      true: "text-pz-system-fg-1",
      false: "text-pz-system-fg-4",
    },
    disabled: {
      true: "text-pz-system-fg-disabled",
      false: "",
    },
  },
  defaultVariants: {
    filled: false,
    disabled: false,
  },
});

interface SearchProps {
  placeholder?: string;
  value?: string;
  textDirection?: TextDirection;
  disabled?: boolean;
  autoFocus?: boolean;
  onClear?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const Search = ({
  placeholder = "Search",
  value = "",
  onClear,
  onChange,
  onFocus,
  onBlur,
  textDirection = TextDirection.Ltr,
  disabled = false,
  autoFocus = false,
}: SearchProps): ReactElement => {
  const hasValue = Boolean(value);

  const containerClass = searchStyles();

  const inputClass = inputStyles({ filled: hasValue });

  const searchIconClass = iconStyles({
    filled: hasValue,
    disabled,
  });

  return (
    <div className={containerClass} dir={textDirection}>
      <SearchIcon className={searchIconClass} fontSize={IconFontSize.Small} />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        autoFocus={autoFocus}
        className={inputClass}
      />

      {hasValue && !disabled && (
        <IconButton
          type={ButtonType.Ghost}
          size={ButtonSize.Small}
          icon={<CloseIcon />}
          onClick={onClear}
        />
      )}
    </div>
  );
};
