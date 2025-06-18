import { cva } from "class-variance-authority";
import { ReactNode, ChangeEvent } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { TextDirection } from "../textDirection";

export enum CheckboxState {
  Unchecked = "unchecked",
  Checked = "checked",
  Indeterminate = "indeterminate",
}

const CHECKBOX_ICONS = {
  [CheckboxState.Indeterminate]: IndeterminateCheckBoxIcon,
  [CheckboxState.Checked]: CheckBoxIcon,
  [CheckboxState.Unchecked]: CheckBoxOutlineBlankIcon,
} as const;

const baseTextStyles = {
  true: "text-pz-system-fg-disabled",
  false: "text-pz-system-fg-1",
};

const containerStyles = cva("group flex items-center gap-2", {
  variants: {
    disabled: baseTextStyles,
  },
  defaultVariants: { disabled: false },
});

const checkboxIconStyles = cva(
  [
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "peer-focus-visible:ring-2",
    "peer-focus-visible:ring-pz-system-border-focused-1",
    "peer-focus-visible:ring-offset-0",
    "peer-focus-visible:rounded-pz-3xs",
    "relative",
  ],
  {
    variants: {
      disabled: {
        true: "text-pz-system-fg-disabled",
        false: [
          "hover:before:absolute",
          "hover:before:inset-0",
          "hover:before:pointer-events-none",
          "hover:before:rounded-pz-3xs",
          "active:before:absolute",
          "active:before:inset-0",
          "active:before:pointer-events-none",
          "active:before:rounded-pz-3xs",
        ],
      },
      state: {
        unchecked: [],
        checked: [],
        indeterminate: [],
      },
    },
    compoundVariants: [
      // Unchecked states
      {
        disabled: false,
        state: "unchecked",
        class: [
          "text-pz-system-border-5",
          "hover:text-pz-system-border-hover",
          "active:text-pz-system-border-pressed",
        ],
      },
      // Checked states
      {
        disabled: false,
        state: "checked",
        class: [
          "text-pz-system-fg-primary",
          "hover:before:bg-pz-system-bg-overlay-hover-on-primary",
          "active:before:bg-pz-system-bg-overlay-pressed-on-primary",
        ],
      },
      // Indeterminate states
      {
        disabled: false,
        state: "indeterminate",
        class: [
          "text-pz-system-fg-primary",
          "hover:before:bg-pz-system-bg-overlay-hover-on-primary",
          "active:before:bg-pz-system-bg-overlay-pressed-on-primary",
        ],
      },
    ],
    defaultVariants: {
      disabled: false,
      state: "unchecked",
    },
  }
);

const labelStyles = cva(
  "select-none pz-body-m400 max-w-[480px] translate-y-px transition-colors duration-200",
  {
    variants: { disabled: baseTextStyles },
    defaultVariants: { disabled: false },
  }
);

const iconStyles = cva(
  "text-pz-system-fg-3 transition-colors duration-200 flex items-center justify-center",
  {
    variants: { disabled: baseTextStyles },
    defaultVariants: { disabled: false },
  }
);

const countStyles = cva("pz-body-m400 transition-colors duration-200", {
  variants: { disabled: baseTextStyles },
  defaultVariants: { disabled: false },
});

interface CheckboxProps {
  label?: string;
  state?: CheckboxState;
  disabled?: boolean;
  textDirection?: TextDirection;
  icon?: ReactNode;
  alwaysShowCount?: boolean;
  count?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  state = CheckboxState.Unchecked,
  textDirection = TextDirection.Ltr,
  disabled = false,
  icon,
  label,
  alwaysShowCount = false,
  count = 0,
  onChange,
}: CheckboxProps): React.ReactElement => {
  const safeCount = Math.max(0, count || 0);
  const shouldShowCount = alwaysShowCount || safeCount > 0;

  const IconComponent = CHECKBOX_ICONS[state];
  const iconClasses = checkboxIconStyles({
    disabled,
    state: state.toLowerCase() as "unchecked" | "checked" | "indeterminate",
  });

  return (
    <label className={containerStyles({ disabled })} dir={textDirection}>
      <input
        type="checkbox"
        checked={state === CheckboxState.Checked}
        disabled={disabled}
        className="sr-only peer"
        onChange={onChange}
      />
      <IconComponent className={iconClasses} fontSize="small" />
      {icon && <span className={iconStyles({ disabled })}>{icon}</span>}
      {label && <span className={labelStyles({ disabled })}>{label}</span>}
      {shouldShowCount && (
        <span className={countStyles({ disabled })}>({safeCount})</span>
      )}
    </label>
  );
};
