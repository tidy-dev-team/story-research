import type { Preview } from "@storybook/react";
import "../tailwind-base.css";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "light", value: "#dedede" },
        { name: "dark", value: "#101010" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      canvas: {
        sourceState: "shown",
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        locales: "en-US",
      },
    },
  },
};

export default preview;
