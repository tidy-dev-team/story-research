/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import { pzColors } from "./src/ui-kit/foundations/colors";
import { pzIconSizes, pzSpacing } from "./src/ui-kit/foundations/spacings";
import { pzSemanticColors } from "./src/ui-kit/foundations/semantic-colors";
import { pzRoundings } from "./src/ui-kit/foundations/roundings";
import { pzTextStylesAsClassNames } from "./src/ui-kit/foundations/text-styles";
import { pzElevationsAsClassUtilities } from "./src/ui-kit/foundations/elevations";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // rounded-pz-3xs
    borderRadius: {
      pz: {
        ...pzRoundings,
      },
    },
    colors: {
      pz: {
        ...pzColors,
        ...pzSemanticColors,
      },
    },
    extend: {
      spacing: {
        pz: {
          ...pzSpacing,
          size: {
            icon: {
              ...pzIconSizes,
            },
          },
        },
      },
      fontSize: {
        pz: {
          size: {
            icon: {
              ...pzIconSizes,
            },
          },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents(pzTextStylesAsClassNames);
    }),
    plugin(({ addUtilities }) => {
      addUtilities(pzElevationsAsClassUtilities);
    }),
  ],
};
