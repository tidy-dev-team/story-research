import React, { useState, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const searchStyles = cva(
  [
    "relative",
    "flex",
    "items-center",
    "bg-[#212426]",
    "rounded",
    "transition-all",
    "duration-200",
    "font-['Heebo',_sans-serif]",
    "text-sm",
    "border",
    "border-transparent",
  ],
  {
    variants: {
      state: {
        idle: "hover:bg-[#212426]/[0.88]",
        hover: "bg-[#212426]/[0.88]",
        active: "border-[#0093EE]",
        focused:
          "focus-within:ring-2 focus-within:ring-[#0093EE]/70 focus-within:ring-offset-2 focus-within:ring-offset-[#101010]",
        disabled: "opacity-50 cursor-not-allowed",
      },
      filled: {
        true: "",
        false: "",
      },
      rtl: {
        true: "flex-row-reverse",
        false: "",
      },
    },
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
    "bg-transparent",
    "outline-none",
    "border-none",
    "text-sm",
    "font-['Heebo',_sans-serif]",
    "placeholder:text-[#A8B0B8]",
  ],
  {
    variants: {
      state: {
        idle: "text-[#A8B0B8]",
        hover: "text-[#f00f00]",
        active: "text-[#A8B0B8]",
        focused: "text-[#A8B0B8]",
        disabled: "text-[#A8B0B8]/50 cursor-not-allowed",
      },
      filled: {
        true: "text-white",
        false: "text-[#A8B0B8]",
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

const iconStyles = cva(["transition-colors", "duration-200"], {
  variants: {
    type: {
      search: "",
      close: "cursor-pointer hover:text-[#0081D1]",
    },
    state: {
      idle: "text-[#A8B0B8]",
      hover: "text-[#A8B0B8]",
      active: "text-[#A8B0B8]",
      focused: "text-[#A8B0B8]",
      disabled: "text-[#A8B0B8]/50",
    },
    filled: {
      true: "text-white",
      false: "text-[#A8B0B8]",
    },
  },
  defaultVariants: {
    type: "search",
    state: "idle",
    filled: false,
  },
});

interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
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
      rtl ? "px-2 py-0 gap-2" : "px-2 py-0 gap-2"
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
          disabled={disabled}
          className={inputClasses}
          {...props}
        />

        {filled && !disabled && (
          <CloseIcon
            className={closeIconClasses}
            fontSize="small"
            onClick={handleClear}
          />
        )}
      </div>
    );
  }
);

Search.displayName = "Search";

export type { SearchProps };
