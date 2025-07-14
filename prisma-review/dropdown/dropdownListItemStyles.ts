import { cva, VariantProps } from "class-variance-authority";

export enum DropdownListItemVariant {
  Text = "text",
  Severity = "severity",
}

export enum DropdownListItemPaddingVariant {
  Simple = "simple",
  Complex = "complex",
}

export const baseDropdownListItemStyles = [
  "flex items-center w-full box-border overflow-hidden",
  "border-none bg-transparent",
  "text-pz-system-fg-1 pz-label-m",
  "rounded-pz-2xs",
  "transition-all duration-200",
  "hover:enabled:bg-pz-system-bg-overlay-hover",
  "active:enabled:bg-pz-system-bg-overlay-pressed",
  "focus:outline-none focus-visible:ring-2",
  "focus-visible:ring-pz-system-border-focused-1",
];

export const getDropdownListStyles = cva(baseDropdownListItemStyles, {
  variants: {
    isDisabled: {
      true: "text-pz-system-fg-disabled cursor-not-allowed hover:bg-transparent",
      false: "cursor-pointer",
    },
    isFocused: {
      true: "focus-visible:rounded-pz-2xs ring-offset-1 ring-offset-pz-gray-1000",
      false: "",
    },
    paddingVariant: {
      [DropdownListItemPaddingVariant.Simple]:
        "px-pz-4xs py-pz-3xs gap-pz-4xs h-8",
      [DropdownListItemPaddingVariant.Complex]: "p-pz-4xs gap-pz-4xs min-h-8",
    },
  },
  defaultVariants: {
    isDisabled: false,
    isFocused: false,
    paddingVariant: DropdownListItemPaddingVariant.Simple,
  },
});

export type GetDropdownListStylesProps = VariantProps<
  typeof getDropdownListStyles
>;
