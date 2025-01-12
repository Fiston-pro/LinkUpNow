import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mainBg: 'var(--mainBg)',
        secondary: 'var(--secondary)',
        cardBg: 'var(--cardBg)',
        cardBgLight: 'var(--cardBgLight)',
        textPrimary: 'var(--textPrimary)',
        textSecondary: 'var(--textSecondary)',
        highlight: 'var(--highlight)',
        success: 'var(--success)',
        error: 'var(--error)',
        warning: 'var(--warning)',
      },
    },
  },
  plugins: [],
};

export default config;
