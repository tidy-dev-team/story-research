import React, { ReactElement } from "react";
import { cva } from "class-variance-authority";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { TextDirection } from "../textDirection";

const containerStyles = cva("group flex items-center gap-2", {
  variants: {
    disabled: {
      true: "cursor-not-allowed",
      false: "cursor-pointer",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

const radioButtonIconStyles = cva(
  [
    "transition-all",
    "duration-200",
    "peer-focus-visible:ring-2",
    "peer-focus-visible:ring-pz-system-border-focused-1",
    "peer-focus-visible:ring-offset-0",
    "peer-focus-visible:rounded-full",
  ],
  {
    variants: {
      selected: {
        true: "",
        false: "",
      },
      disabled: {
        true: "text-pz-system-fg-disabled",
        false: "",
      },
    },
    compoundVariants: [
      {
        selected: false,
        disabled: false,
        class:
          "text-pz-system-border-5 group-hover:text-pz-system-fg-hover group-active:text-pz-system-fg-pressed",
      },
      {
        selected: true,
        disabled: false,
        class:
          "text-pz-system-fg-primary group-hover:text-pz-system-fg-hover group-active:text-pz-system-fg-pressed",
      },
    ],
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  }
);

const labelStyles = cva(
  [
    "select-none",
    "transition-colors",
    "duration-200",
    "pz-body-m400",
    "leading-none",
    "translate-y-px",
  ],
  {
    variants: {
      disabled: {
        true: "text-pz-system-fg-disabled",
        false: "text-pz-system-fg-1",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

interface RadioButtonProps {
  disabled?: boolean;
  id?: string;
  label?: string | null;
  name?: string;
  onChange?: () => void;
  textDirection?: TextDirection;
  selected?: boolean;
  value?: string;
}

const RadioButton = ({
  selected = false,
  textDirection = TextDirection.Ltr,
  disabled = false,
  label,
  onChange,
  ...props
}: RadioButtonProps): ReactElement => {
  const iconClasses = radioButtonIconStyles({
    selected,
    disabled,
  });
  const textLabelClasses = labelStyles({ disabled });

  const IconComponent = selected
    ? RadioButtonCheckedIcon
    : RadioButtonUncheckedIcon;

  return (
    <label className={containerStyles({ disabled })} dir={textDirection}>
      <input
        type="radio"
        checked={selected}
        disabled={disabled}
        className="sr-only peer"
        onChange={onChange}
        {...props}
      />
      <IconComponent className={iconClasses} fontSize="small" />
      {label && <span className={textLabelClasses}>{label}</span>}
    </label>
  );
};

export default RadioButton;
