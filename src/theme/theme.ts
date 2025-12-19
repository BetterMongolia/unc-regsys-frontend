import { extendTheme, theme as defaultTheme } from "@chakra-ui/react";

const colors = {};

const extendedTheme: any = {
  shadows: {
    ...defaultTheme.shadows,
    xl: "0px 32px 64px rgba(0, 0, 0, 0.05);",
  },
  fonts: {
    body: "Roboto",
  },
  fontSizes: {
    xs: ".6875rem;", // 11px
    sm: ".8125rem", // 13px
    md: "0.9375rem", // 15px
    base: "1rem", // 16px
    lg: "1.0625rem", // 17px
    xl: "1.5rem", // 24px
    "2xl": "2.0625rem", // 33px
    "3xl": "2.25rem", // 36px
    "4xl": "2.75rem", // 44px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  colors: {
    ...defaultTheme.colors,
    ...colors,
    primary: "#3083FF",
    primaryHover: "#0065FD",
    secondary: "#F9FAFC",
  },
  radii: {
    ...defaultTheme.radii,
    xs: ".6875rem;", // 11px
    sm: ".8125rem", // 13px
    base: "0.9375rem", // 15px
    lg: "1.0625rem", // 17px
    xl: "1.5rem", // 24px
    "2xl": "2.0625rem", // 33px
  },
  sizes: {
    ...defaultTheme.sizes,
    container: {
      ...defaultTheme.sizes.container,
      xl: "1480px",
    },
  },
};

const theme = extendTheme(extendedTheme);

export default theme;
