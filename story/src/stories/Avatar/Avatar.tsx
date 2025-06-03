import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export enum AvatarSize {
  S = "s",
  M = "m",
  L = "l",
}

export enum AvatarType {
  Default = "default",
  Empty = "empty",
}

const avatarStyles = cva(
  "flex justify-center items-center rounded-full select-none font-['Heebo',_sans-serif]",
  {
    variants: {
      size: {
        [AvatarSize.S]: "h-8 w-8 text-xs font-medium pz-heading-s500",
        [AvatarSize.M]: "h-14 w-14 text-xl font-normal pz-heading-m400",
        [AvatarSize.L]: "h-24 w-24 text-4xl font-medium pz-heading-xl500",
      },
      type: {
        [AvatarType.Default]: "bg-pz-blue-500 text-pz-base-black",
        [AvatarType.Empty]: "bg-pz-gray-800 text-pz-base-white",
      },
    },
    defaultVariants: {
      size: AvatarSize.M,
      type: AvatarType.Default,
    },
  }
);

interface AvatarProps extends VariantProps<typeof avatarStyles> {
  label?: string;
  size?: AvatarSize;
  type?: AvatarType;
}

const Avatar = ({
  size = AvatarSize.M,
  type,
  label,
}: AvatarProps): ReactElement => {
  // Determine type based on label if not explicitly provided
  const avatarType =
    type ??
    (label && label.trim().length > 0 ? AvatarType.Default : AvatarType.Empty);

  // Display text based on type
  const displayText = avatarType === AvatarType.Default ? label || "AA" : "N/A";

  const classes = twMerge(avatarStyles({ size, type: avatarType }));

  return <div className={classes}>{displayText}</div>;
};

export default Avatar;
