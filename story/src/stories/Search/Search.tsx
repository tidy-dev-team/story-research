import React, {
  useState,
  useEffect,
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
  ],
  {
    variants: {
      filled: {
        true: "",
        false: "",
      },
      active: {
        true: "border-pz-system-border-primary bg-pz-system-bg-3",
        false: "",
      },
      focused: {
        true: "ring-2 ring-pz-system-border-focused-1 ring-offset-0",
        false: "",
      },
    },
    defaultVariants: {
      filled: false,
      active: false,
      focused: false,
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
  const [isFocused, setIsFocused] = useState(false);
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  // Track if user is using keyboard or mouse (focus handling)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const hasValue = Boolean(value);

  const containerClass = searchStyles({
    filled: hasValue,
    active: isFocused && !disabled,
    focused: isFocused && isKeyboardUser && !disabled,
    ...variants,
  });

  const inputClass = inputStyles({ filled: hasValue });

  const searchIconClass = iconStyles({
    type: "search",
    filled: hasValue,
    disabled,
  });

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={containerClass} dir={textDirection}>
      <SearchIcon className={searchIconClass} fontSize="small" />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
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

// Export Search component
export default Search;
