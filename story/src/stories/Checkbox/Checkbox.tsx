import { cva } from "class-variance-authority";
import { ReactNode } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { TextDirection } from "../textDirection";
import { IconFontSize } from "../iconFontSize";

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

const disabledVariants = {
  disabled: {
    true: "text-pz-system-fg-disabled",
    false: "text-pz-system-fg-1",
  },
};

const containerStyles = cva("flex items-center gap-2", {
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed !text-pz-system-bg-disabled",
      false: "text-pz-system-fg-primary cursor-pointer",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

const checkboxIconStyles = cva(
  "relative transition-all duration-200 focus:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-pz-system-border-focused-1 peer-focus-visible:ring-offset-0 peer-focus-visible:rounded-pz-3xs before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-pz-3xs",
  {
    variants: {
      disabled: {
        true: "text-pz-system-fg-disabled pointer-events-none",
        false: "",
      },
      state: {
        unchecked:
          "text-pz-system-border-5 hover:text-pz-system-border-hover active:text-pz-system-border-pressed",
        checked:
          "hover:before:bg-pz-system-bg-overlay-hover-on-primary active:before:bg-pz-system-bg-overlay-pressed-on-primary",
        indeterminate:
          "hover:before:bg-pz-system-bg-overlay-hover-on-primary active:before:bg-pz-system-bg-overlay-pressed-on-primary",
      },
    },
    defaultVariants: {
      disabled: false,
      state: CheckboxState.Unchecked,
    },
  }
);

const labelStyles = cva(
  "select-none pz-body-m400 max-w-[480px] translate-y-px transition-colors duration-200",
  {
    variants: disabledVariants,
    defaultVariants: { disabled: false },
  }
);

const iconStyles = cva(
  "text-pz-system-fg-3 transition-colors duration-200 flex items-center justify-center",
  {
    variants: disabledVariants,
    defaultVariants: { disabled: false },
  }
);

const countStyles = cva("pz-body-m400 transition-colors duration-200", {
  variants: disabledVariants,
  defaultVariants: { disabled: false },
});

interface CheckboxProps {
  state: CheckboxState;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  count?: number | null;
  label?: string;
  icon?: ReactNode;
  textDirection?: TextDirection;
  isDisabled?: boolean;
}

export const Checkbox = ({
  state = CheckboxState.Unchecked,
  onChange,
  count = 0,
  label,
  icon,
  textDirection = TextDirection.Ltr,
  isDisabled = false,
}: CheckboxProps): React.ReactElement => {
  if (count !== null && (count < 0 || !Number.isInteger(count))) {
    console.warn(`Checkbox component: Invalid prop count: "${count}"`);
  }

  if (typeof label === "string" && label.trim() === "") {
    console.warn("Checkbox component: label prop is an empty string.");
  }

  const CheckboxElement = CHECKBOX_ICONS[state];

  const checkboxElementClasses = checkboxIconStyles({
    disabled: isDisabled,
    state: state,
  });

  return (
    <label
      className={containerStyles({ disabled: isDisabled })}
      dir={textDirection}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        checked={state === CheckboxState.Checked}
        onChange={onChange}
        disabled={isDisabled}
      />
      <span className={checkboxElementClasses}>
        <CheckboxElement fontSize={IconFontSize.Small} />
      </span>
      {icon && (
        <span className={iconStyles({ disabled: isDisabled })}>{icon}</span>
      )}
      {label && (
        <span className={labelStyles({ disabled: isDisabled })}>{label}</span>
      )}
      {count !== null && count !== undefined && (
        <span className={countStyles({ disabled: isDisabled })}>({count})</span>
      )}
    </label>
  );
};
