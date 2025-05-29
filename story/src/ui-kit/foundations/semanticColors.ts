import { pzColors } from './colors'
// import {pzComponentsSemanticColors} from '../components/ComponentsSemanticColors'

export const pzSystemColors = {
  bg: {
    "1": pzColors.gray[1000],
    "2": pzColors.gray[950],
    "3": pzColors.gray[900],
    "4": pzColors.gray[800],
    primary: pzColors.blue[500],
    secondary: pzColors.blue[700],
    geofence: pzColors.orange[700],
    error: pzColors.red[500],
    "overlay-hover": pzColors.alpha.white["12p"],
    "overlay-pressed": pzColors.alpha.white["8p"],
    "overlay-hover-on-primary": pzColors.alpha.black["12p"],
    "overlay-pressed-on-primary": pzColors.alpha.black["38p"],
    disabled: pzColors.alpha.white["12p"]
  },
  fg: {
    "1": pzColors.base.white,
    "2": pzColors.gray[100],
    "3": pzColors.gray[200],
    "4": pzColors.gray[300],
    primary: pzColors.blue[500],
    black: pzColors.base.black,
    error: pzColors.red[500],
    geofence: pzColors.orange[700],
    hover: pzColors.blue[400],
    pressed: pzColors.blue[500],
    disabled: pzColors.alpha.white["38p"]
  },
  border: {
    "1": pzColors.gray[800],
    "2": pzColors.gray[700],
    "3": pzColors.gray[650],
    "4": pzColors.gray[600],
    "5": pzColors.gray[300],
    primary: pzColors.blue[500],
    geofence: pzColors.orange[700],
    error: pzColors.red[500],
    hover: pzColors.blue[400],
    pressed: pzColors.blue[500],
    focused: pzColors.alpha.blue500["70p"],
    disabled: pzColors.alpha.white["38p"]
  },
  status: {
    danger: {
      "1": pzColors.red[100],
      "2": pzColors.red[400],
      "3": pzColors.red[500]
    },
    warning: {
      "1": pzColors.orange[100],
      "2": pzColors.orange[500],
      "3": pzColors.orange[600]
    },
    caution: {
      "1": pzColors.yellow[100],
      "2": pzColors.yellow[500],
      "3": pzColors.yellow[600]
    },
    success: {
      "1": pzColors.green[100],
      "2": pzColors.green[500],
      "3": pzColors.green[600]
    },
    loading: {
      "1": pzColors.gray[100],
      "2": pzColors.gray[400],
      "3": pzColors.gray[600]
    }
  },
  priority: {
    high: {
      "1": pzColors.red[100],
      "2": pzColors.red[400],
      "3": pzColors.red[500]
    },
    medium: {
      "1": pzColors.yellow[100],
      "2": pzColors.yellow[500],
      "3": pzColors.yellow[600]
    },
    low: {
      "1": pzColors.base.white
    }
  }
} as const

export const pzSemanticColors = {
  system: pzSystemColors,
  components: {}
} as const

export type PzSemanticColors = typeof pzSemanticColors
