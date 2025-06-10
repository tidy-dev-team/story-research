import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";

export enum AvatarSize {
  S = "s",
  M = "m",
  L = "l",
}

const avatarStyles = cva(
  "flex justify-center items-center rounded-full select-none",
  {
    variants: {
      size: {
        [AvatarSize.S]: "h-8 w-8 pz-body-s400",
        [AvatarSize.M]: "h-14 w-14 pz-heading-m400",
        [AvatarSize.L]: "h-24 w-24 pz-heading-xl500",
      },
      type: {
        filled: "bg-pz-system-bg-primary text-pz-system-fg-black",
        empty: "bg-pz-system-bg-4 text-pz-system-fg-1",
      },
    },
    defaultVariants: {
      size: AvatarSize.M,
      type: "empty",
    },
  }
);

interface AvatarProps extends VariantProps<typeof avatarStyles> {
  firstName?: string | null;
  lastName?: string | null;
}

const Avatar = ({
  size = AvatarSize.M,
  firstName,
  lastName,
}: AvatarProps): ReactElement => {
  const initials = `${firstName?.trim().charAt(0).toUpperCase() || ""}${lastName?.trim().charAt(0).toUpperCase() || ""}`;
  const isFilled = initials.length > 0;
  const displayText = isFilled ? initials : "N/A";

  return (
    <div
      className={avatarStyles({ size, type: isFilled ? "filled" : "empty" })}
    >
      {displayText}
    </div>
  );
};

export default Avatar;
