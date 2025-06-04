import React, { ReactElement } from "react";
import Avatar from "../Avatar/Avatar";
import { AvatarSize, AvatarType } from "../Avatar/Avatar";
import { Button } from "../Button/IconButton";
import { ButtonSize, ButtonType } from "../Button/IconButton";
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
  avatarLabel?: string;
  avatarType?: AvatarType;
  textLabel: string;
  rtl?: boolean;
  disabled?: boolean;
  onIconClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const AvatarLabel = ({
  avatarLabel,
  avatarType,
  textLabel,
  rtl,
  disabled = false,
  onIconClick,
  className,
}: AvatarLabelProps): ReactElement => {
  return (
    <div className={twMerge(avatarLabelStyles({ rtl }), className)}>
      <Avatar label={avatarLabel} size={AvatarSize.s} type={avatarType} />
      <span className="text-pz-system-fg-1 font-['Heebo',_sans-serif] pz-body-m400">
        {textLabel}
      </span>
      <Button
        icon={<KeyboardArrowDownIcon />}
        size={ButtonSize.XSmall}
        type={ButtonType.Ghost}
        onClick={onIconClick}
        disabled={disabled}
      />
    </div>
  );
};

export default AvatarLabel;
