import React, { ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export enum AvatarSize {
    Sm = 'sm',
    Md = 'md',
    Lg = 'lg'
}

const avatarStyles = cva(
    "flex justify-center items-center rounded-full overflow-hidden select-none text-white !box-border",
    {
        variants: {
            size: {
                [AvatarSize.Sm]: "h-8 w-8 pb-0.5 text-xs font-medium",
                [AvatarSize.Md]: "h-14 w-14 pb-1 text-xl font-normal",
                [AvatarSize.Lg]: "h-24 w-24 pb-2 text-4xl font-normal"
            },
            filled: {
                true: "bg-[var(--prisma-light-blue)]",
                false: "bg-zinc-700"
            }
        },
        defaultVariants: {
            size: AvatarSize.Md,
            filled: true,
        }
    }
)

interface AvatarProps extends VariantProps<typeof avatarStyles> {
    label?: string
    size?: AvatarSize
}

const Avatar = ({ size, label }: AvatarProps): ReactElement => {
    const isFilled = typeof label === "string" && label.length > 0

    const classes = twMerge(
        avatarStyles({ size, filled: isFilled })
    )

    return (
        <div className={classes}>
            {isFilled ? label : "N/A"}
        </div>
    )
}

export default Avatar