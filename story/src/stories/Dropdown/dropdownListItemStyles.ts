import { cva } from "class-variance-authority";

// Base styles shared across all dropdown list item components
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

// Padding and height variants
export const dropdownListItemPaddingVariants = {
  simple: "px-pz-4xs py-pz-3xs gap-pz-4xs h-8", // For basic DropdownListItem
  complex: "p-pz-4xs gap-pz-4xs min-h-8", // For Multi/Severity variants
};

// Focus ring variants
export const dropdownListItemFocusVariants = {
  simple: "", // No additional focus styles
  enhanced:
    "focus-visible:rounded-pz-2xs ring-offset-1 ring-offset-pz-gray-1000", // Enhanced focus for complex items
};

// Disabled state variants (shared across all)
export const dropdownListItemDisabledVariants = {
  disabled: {
    true: "text-pz-system-fg-disabled cursor-not-allowed hover:bg-transparent",
    false: "",
  },
};

// Factory function to create dropdown list item styles
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
