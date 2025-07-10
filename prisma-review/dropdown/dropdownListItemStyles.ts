import { cva } from "class-variance-authority";

export const baseDropdownListItemStyles = [
  "flex items-center w-full box-border overflow-hidden",
  "border-none bg-transparent cursor-pointer",
  "text-pz-system-fg-1 pz-label-m",
  "rounded-pz-2xs",
  "transition-all duration-200",
  "hover:enabled:bg-pz-system-bg-overlay-hover",
  "active:enabled:bg-pz-system-bg-overlay-pressed",
  "focus:outline-none focus-visible:ring-2",
  "focus-visible:ring-pz-system-border-focused-1",
];

export const dropdownListItemPaddingVariants = {
  simple: "px-pz-4xs py-pz-3xs gap-pz-4xs h-8",
  complex: "p-pz-4xs gap-pz-4xs min-h-8",
};

export const dropdownListItemFocusVariants = {
  simple: "",
  enhanced:
    "focus-visible:rounded-pz-2xs ring-offset-1 ring-offset-pz-gray-1000",
};

export const dropdownListItemDisabledVariants = {
  disabled: {
    true: "text-pz-system-fg-disabled cursor-not-allowed hover:bg-transparent",
    false: "",
  },
};

export const createDropdownListItemStyles = (
  paddingVariant: keyof typeof dropdownListItemPaddingVariants = "simple",
  focusVariant: keyof typeof dropdownListItemFocusVariants = "simple"
) => {
  return cva(
    [
      ...baseDropdownListItemStyles,
      dropdownListItemPaddingVariants[paddingVariant],
      dropdownListItemFocusVariants[focusVariant],
    ],
    {
      variants: dropdownListItemDisabledVariants,
      defaultVariants: {
        disabled: false,
      },
    }
  );
};
