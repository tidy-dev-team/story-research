import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { pzColors } from "@/ui-kit/foundations/colors";

export enum AvatarSize {
  Sm = "sm",
  Md = "md",
  Lg = "lg",
}

const avatarStyles = cva(
  "h-pz-3xl"
  // "flex justify-center items-center rounded-full overflow-hidden select-none text-white !box-border font-['Heebo',_sans-serif]",
  // {
  //   variants: {
  //     size: {
  //       [AvatarSize.Sm]: "h-8 w-8 text-xs font-medium",
  //       [AvatarSize.Md]: "h-14 w-14 text-xl font-normal",
  //       [AvatarSize.Lg]: "h-24 w-24 text-4xl font-normal",
  //     },
  //     filled: {
  //       true: "bg-[var(--prisma-light-blue)]",
  //       false: "bg-zinc-700",
  //     },
  //   },
  //   defaultVariants: {
  //     size: AvatarSize.Md,
  //     filled: true,
  //   },
  // }
);

interface AvatarProps extends VariantProps<typeof avatarStyles> {
  label?: string;
  size?: AvatarSize;
}

const Avatar = ({ size, label }: AvatarProps): ReactElement => {
  // const isFilled = typeof label === "string" && label.length > 0;

  // const classes = twMerge(avatarStyles({ size, filled: isFilled }));

  // return <div className={classes}>{isFilled ? label : "N/A"}</div>;

  // console.log(pzColors.gray[500])
  return <div className="h-pz-3xl bg-pz-base-white">Hello</div>
};

export default Avatar;
