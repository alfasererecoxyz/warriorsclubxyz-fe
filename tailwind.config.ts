import type { Config } from "tailwindcss";
import tailwindTypography from '@tailwindcss/typography'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{jsx,tsx,mdx}"
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'bright-red': {
          '50': '#ffefef',
          '100': '#ffdcdc',
          '200': '#ffbfbf',
          '300': '#ff9292',
          '400': '#ff5454',
          '500': '#ff1f1f',
          '600': '#ff0000',
          '700': '#db0000',
          '800': '#ae0000',
          '900': '#940808',
          '950': '#520000',
        },
      },
    }
  },
  plugins: [
    tailwindTypography()
  ],
};
export default config;
