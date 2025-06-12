import React, { forwardRef, useState, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "../Button/IconButton";

const searchStyles = cva(
  [
    "w-[200px]",
    "h-8",
    "relative",
    "flex",
    "items-center",
    "bg-pz-system-bg-3",
    "rounded-pz-2xs",
    "transition-all",
    "duration-200",
    "font-['Heebo',_sans-serif]",
    "pz-body-m400",
    "border",
    "border-transparent",
    "hover:before:absolute",
    "hover:before:inset-0",
    "hover:before:bg-pz-system-bg-overlay-hover",
    "hover:before:rounded-pz-2xs",
    "hover:before:pointer-events-none",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      filled: {
        true: "",
        false: "",
      },
      rtl: {
        true: "flex-row-reverse",
        false: "",
      },
      active: {
        true: "border-pz-system-border-primary bg-pz-system-bg-3",
        false: "",
      },
      focused: {
        true: "ring-2 ring-pz-system-border-focused-1 ring-offset-2 ring-offset-pz-system-bg-1",
        false: "",
      },
    },
    defaultVariants: {
      filled: false,
      rtl: false,
      active: false,
      focused: false,
    },
  }
);

const inputStyles = cva(
  [
    "flex-1",
    "min-w-0",
    "bg-transparent",
    "outline-none",
    "border-none",
    "font-['Heebo',_sans-serif]",
    "placeholder:text-pz-system-fg-4",
    "text-pz-system-fg-4",
    "disabled:text-pz-system-fg-disabled",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      filled: {
        true: "text-pz-system-fg-1",
        false: "text-pz-system-fg-4",
      },
      rtl: {
        true: "text-right",
        false: "text-left",
      },
    },
    defaultVariants: {
      filled: false,
      rtl: false,
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
  onClear?: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  rtl?: boolean;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
}

const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      placeholder = "Search",
      value = "",
      onClear,
      onChange,
      onFocus,
      onBlur,
      rtl = false,
      disabled = false,
      className,
      autoFocus,
    },
    ref
  ): React.ReactElement => {
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

    const filled = Boolean(value && value.length > 0);

    const containerClasses = twMerge(
      searchStyles({
        filled,
        rtl,
        active: isFocused && !disabled,
        focused: isFocused && isKeyboardUser && !disabled,
        className,
      }),
      rtl ? "pl-2 pr-1 py-0 gap-1" : "pl-2 pr-1 py-0 gap-1",
      disabled && "opacity-50 cursor-not-allowed"
    );

    const inputClasses = twMerge(inputStyles({ filled, rtl }));

    const searchIconClasses = twMerge(
      iconStyles({ type: "search", filled, disabled })
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleClear = () => {
      if (onClear) {
        onClear();
      }
    };

    return (
      <div className={containerClasses}>
        <SearchIcon
          className={searchIconClasses}
          style={{ fontSize: "16px" }}
        />

        <input
          ref={ref}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled || undefined}
          autoFocus={autoFocus}
          className={inputClasses}
        />

        {filled && !disabled && (
          <IconButton
            type="ghost"
            size="S"
            icon={<CloseIcon />}
            onClick={handleClear}
            className="ml-1"
          />
        )}
      </div>
    );
  }
);

Search.displayName = "Search";

export default Search;
