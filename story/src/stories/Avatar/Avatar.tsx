import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

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
    },
    defaultVariants: {
      size: AvatarSize.M,
    },
  }
);

interface AvatarProps extends Omit<VariantProps<typeof avatarStyles>, "type"> {
  firstName?: string | null;
  lastName?: string | null;
  size?: AvatarSize;
}

const Avatar = ({
  size = AvatarSize.M,
  firstName,
  lastName,
}: AvatarProps): ReactElement => {
  const isFilled = !!(firstName?.trim() || lastName?.trim());
  let firstInitial = "";
  if (firstName && firstName.trim().length > 0) {
    firstInitial = firstName.trim().charAt(0).toUpperCase();
  }
  let lastInitial = "";
  if (lastName && lastName.trim().length > 0) {
    lastInitial = lastName.trim().charAt(0).toUpperCase();
  }

  const processedLabel = isFilled ? `${firstInitial}${lastInitial}` : "";

  const displayText = isFilled ? processedLabel : "N/A";

  const typeBasedClasses = isFilled
    ? "bg-pz-system-bg-primary text-pz-system-fg-black"
    : "bg-pz-system-bg-4 text-pz-system-fg-1";

  const classes = twMerge(avatarStyles({ size }), typeBasedClasses);

  return <div className={classes}>{displayText}</div>;
};

export default Avatar;
