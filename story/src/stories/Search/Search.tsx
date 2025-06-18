import React, {
  type ReactElement,
  type ChangeEvent,
  type FocusEvent,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "../Button/IconButton";
import { TextDirection } from "../textDirection";

const searchStyles = cva(
  [
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
  ],
  {
    variants: {
      filled: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      filled: false,
    },
  }
);

const inputStyles = cva(
  [
    "bg-transparent",
    "border-none",
    "disabled:cursor-not-allowed",
    "disabled:text-pz-system-fg-disabled",
    "flex-1",
    "font-['Heebo',_sans-serif]",
    "min-w-0",
    "outline-none",
    "placeholder:text-pz-system-fg-4",
    "text-pz-system-fg-4",
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
    type: {
      search: "text-pz-system-fg-4",
    },
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
    type: "search",
    filled: false,
    disabled: false,
  },
});

interface SearchProps extends VariantProps<typeof searchStyles> {
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
  ...variants
}: SearchProps): ReactElement => {
  const hasValue = Boolean(value);

  const containerClass = searchStyles({
    filled: hasValue,
    ...variants,
  });

  const inputClass = inputStyles({ filled: hasValue });

  const searchIconClass = iconStyles({
    type: "search",
    filled: hasValue,
    disabled,
  });

  return (
    <div className={containerClass} dir={textDirection}>
      <SearchIcon className={searchIconClass} fontSize="small" />

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
          type="ghost"
          size="S"
          icon={<CloseIcon />}
          onClick={onClear}
        />
      )}
    </div>
  );
};

export default Search;
