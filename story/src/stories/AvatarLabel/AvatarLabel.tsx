import React, { ReactElement } from "react";
import Avatar from "../Avatar/Avatar";
import { AvatarSize } from "../Avatar/Avatar";
import {
  IconButton,
  IconButtonSize,
  IconButtonType,
} from "../Button/IconButton";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const avatarLabelStyles = cva("flex items-center gap-2", {
  variants: {
    rtl: {
      true: "flex-row-reverse",
      false: "flex-row",
    },
  },
  defaultVariants: {
    rtl: false,
  },
});

interface AvatarLabelProps extends VariantProps<typeof avatarLabelStyles> {
  firstName?: string | null;
  lastName?: string | null;
  textLabel: string;
  rtl?: boolean;
  disabled?: boolean;
  onIconClick?: () => void;
  className?: string;
}

const AvatarLabel = ({
  firstName,
  lastName,
  textLabel,
  rtl,
  disabled = false,
  onIconClick,
  className,
}: AvatarLabelProps): ReactElement => {
  return (
    <div className={twMerge(avatarLabelStyles({ rtl }), className)}>
      <Avatar firstName={firstName} lastName={lastName} size={AvatarSize.S} />
      <span className="text-pz-system-fg-1 pz-body-m400">{textLabel}</span>
      <IconButton
        icon={KeyboardArrowDownIcon}
        size={IconButtonSize.Small}
        type={IconButtonType.Ghost}
        onClick={onIconClick || (() => {})}
        isDisabled={disabled}
      />
    </div>
  );
};

export default AvatarLabel;
