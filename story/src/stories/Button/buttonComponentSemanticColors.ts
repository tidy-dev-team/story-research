import { pzColors } from "../../ui-kit/foundations/colors";

export const pzButtonComponentSemanticColors = {
  fg: {
    primary: {
      idle: pzColors.base.white,
    },
    ghost: {
      idle: pzColors.gray[200],
      hover: pzColors.base.white,
      pressed: pzColors.gray[200],
    },
  },
  bg: {
    ghost: {
      hover: pzColors.alpha.white["12p"],
      pressed: pzColors.alpha.white["8p"],
    },
  },
} as const;
