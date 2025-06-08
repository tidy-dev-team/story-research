import React, { useState, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

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
  ],
  {
    variants: {
      state: {
        idle: "",
        hover: "bg-pz-system-bg-3",
        active: "border-pz-system-border-primary",
        focused: "border-pz-system-border-primary",
        disabled: "opacity-50",
      },
      filled: {
        true: "",
        false: "",
      },
      focused: {
        true: "focus-within:ring-2 focus-within:ring-pz-system-border-focused-1 focus-within:ring-offset-2 focus-within:ring-offset-pz-system-bg-1",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
      rtl: {
        true: "flex-row-reverse",
        false: "",
      },
    },
    compoundVariants: [
      {
        state: "hover",
        className:
          "before:absolute before:inset-0 before:bg-pz-system-bg-overlay-hover before:rounded-pz-2xs before:pointer-events-none",
      },
    ],
    defaultVariants: {
      state: "idle",
      filled: false,
      rtl: false,
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
  ],
  {
    variants: {
      state: {
        idle: "text-pz-system-fg-4 ",
        hover: "text-pz-system-fg-4",
        active: "text-pz-system-fg-4",
        focused: "text-pz-system-fg-4",
        disabled: "text-pz-system-fg-disabled cursor-not-allowed",
      },
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
      state: "idle",
      filled: false,
      rtl: false,
    },
  }
);

const iconStyles = cva(["transition-colors", "duration-200", "flex-shrink-0"], {
  variants: {
    type: {
      search: "",
      close: "cursor-pointer hover:text-pz-system-fg-hover",
    },
    state: {
      idle: "text-pz-system-fg-4",
      hover: "text-pz-system-fg-4",
      active: "text-pz-system-fg-4",
      focused: "text-pz-system-fg-4",
      disabled: "text-pz-system-fg-disabled",
    },
    filled: {
      true: "text-pz-system-fg-1",
      false: "text-pz-system-fg-4",
    },
  },
  defaultVariants: {
    type: "search",
    state: "idle",
    filled: false,
  },
});

interface SearchProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "disabled"
    >,
    VariantProps<typeof searchStyles> {
  placeholder?: string;
  value?: string;
  onClear?: () => void;
  rtl?: boolean;
  state?: "idle" | "hover" | "active" | "focused" | "disabled";
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      placeholder = "Search",
      value = "",
      onClear,
      onChange,
      onFocus,
      onBlur,
      rtl = false,
      state = "idle",
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [internalState, setInternalState] =
      useState<SearchProps["state"]>(state);
    const [internalFocused, setInternalFocused] = useState(false);

    const filled = Boolean(value && value.length > 0);
    const currentState = disabled
      ? "disabled"
      : internalFocused
        ? "focused"
        : internalState;
    const showFocusRing = internalFocused && !disabled;

    const containerClasses = twMerge(
      searchStyles({
        state: showFocusRing ? "focused" : currentState,
        filled,
        rtl,
        className,
      }),
      rtl ? "pl-2 pr-1 py-0 gap-1" : "pl-2 pr-1 py-0 gap-1"
    );

    const inputClasses = twMerge(
      inputStyles({ state: currentState, filled, rtl })
    );

    const searchIconClasses = twMerge(
      iconStyles({ type: "search", state: currentState, filled })
    );

    const closeIconClasses = twMerge(
      iconStyles({ type: "close", state: currentState, filled })
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setInternalFocused(true);
      setInternalState("focused");
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setInternalFocused(false);
      setInternalState("idle");
      onBlur?.(e);
    };

    const handleMouseEnter = () => {
      if (!disabled && !internalFocused) {
        setInternalState("hover");
      }
    };

    const handleMouseLeave = () => {
      if (!disabled && !internalFocused) {
        setInternalState("idle");
      }
    };

    const handleClear = () => {
      if (onClear) {
        onClear();
      }
    };

    return (
      <div
        className={containerClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SearchIcon className={searchIconClasses} fontSize="small" />

        <input
          ref={ref}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled || undefined}
          className={inputClasses}
          {...props}
        />

        {filled && !disabled && (
          <CloseIcon
            className={`${closeIconClasses} ml-1`}
            fontSize="small"
            onClick={handleClear}
          />
        )}
      </div>
    );
  }
);

Search.displayName = "Search";
