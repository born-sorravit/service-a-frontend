import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      xs: { min: "0px", max: "639px" },

      "2xs": { min: "321px", max: "425px" },

      "3xs": { min: "426px", max: "639px" },

      xsm: { min: "390px" },
      sm: { min: "640px" },
      // => @media (max-width: 639px) { ... }

      md: { min: "768px" },
      // => @media (max-width: 767px) { ... }
      lmd: { min: "800px" },
      // => @media (formodalkyc) { ... }
      mmd: { min: "900px" },
      // => @media (for project card in launchpad) { ... }

      lg: { min: "1024px" },
      // => @media (max-width: 1023px) { ... }

      xl: { min: "1280px" },
      // => @media (max-width: 1279px) { ... }

      "0.5xl": { min: "1320px" },

      "2xl": { min: "1536px" },
      // => @media (max-width: 1535px) { ... }

      "3xl": { min: "2560px" },
      // => @media (max-width: 2549px) { ... }
    },
    extend: {
      fontFamily: {
        nohemi: ["var(--font-nohemi-font)"],
        aquire: ["var(--font-aquire-font)"],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        "opacity-primary": "#146EF5",
        "secondary-gray": "#DFE0E2",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        "primary-surface": {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
        },
        warningopacity: {
          DEFAULT: "var(--warning-opacity)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        brand: {
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          hover: "#458CF7",
        },
        error: {
          DEFAULT: "var(--error)",
        },
        erroropacity: {
          DEFAULT: "var(--error-opacity)",
        },
        pending: {
          DEFAULT: "var(--pending)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      backgroundImage: {
        stripes:
          "linear-gradient(45deg, #146EF5 25%, #3784F7 25%, #3784F7 50%, #146EF5 50%, #146EF5 75%, #3784F7 75%, #3784F7)",
        walletDesktop: "url('/images/bg-wallet/bg-wallet-desktop.png')",
        walletMobile: "url('/images/bg-wallet/bg-wallet-mobile.png')",
        WalletTablet: "url('/images/bg-wallet/bg-wallet-tablet.png')",
        WalletDesktopXL: "url('/images/bg-wallet/bg-wallet-desktop-xl.png')",
        walletProfileInvestor:
          "url('/images/bg-wallet/bg-wallet-profile-investor.png')",
        "blue-gradient": "linear-gradient(180deg, #146EF5 0%, #2647EA 100%)",
        "white-gradient":
          "linear-gradient(269.03deg, #FFFFFF 49.17%, rgba(255, 255, 255, 0.4) 99.56%)",
        "brand-gradient": "linear-gradient(180deg, #0957CD 0%, #146EF5 100%)",
        "primary-gradient":
          "linear-gradient(90deg, rgba(20, 92, 245, 0.4) 0%, rgba(20, 110, 245, 0) 100%)",
        "disable-gradient": "linear-gradient(180deg, #43474B 0%, #43474B 100%)",
        "tap-gradient":
          "linear-gradient(90deg, rgba(10, 10, 10, 0) -16.47%, #161616 100%)",
      },
      backgroundSize: {
        stripes: "20px 20px",
      },
      boxShadow: {
        "custom-inset": "0px -12px 40px 0px #CECEFB0F inset",
        "custom-shadow": "0 0 0px 4px #6895DD33",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
        "999": "999",
        max: "9999",
      },
    },
  },
} satisfies Config;

export default config;
