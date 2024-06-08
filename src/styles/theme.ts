import { DefaultTheme } from "styled-components";
import font from "@/styles/font.ts";

const theme: DefaultTheme = {
  colors: {
    backGroundBlack: "#0D0D0F",
    grayScale1: "#F0F0F5",
    grayScale2: "#E8E8EE",
    grayScale3: "#CDCED6",
    grayScale4: "#A9ABB8",
    grayScale5: "#858899",
    grayScale6: "#525463",
    grayScale7: "#3E404C",
    grayScale8: "#2B2D36",
    grayScale9: "#1D1E24",
    purple: "#A40BCB",
    purpleDarker: "#56066A",
    purpleDarkest: "#33093D",
    blue: "#6A9BE3",
    alertRed: "#E13348",
    menubarBackgroundBlack60: "rgba(13, 13, 15, 0.6)",
  },

  fonts: {
    headline_24px_semibold: font({ size: 2.4, weight: 600 }),
    headline_18px_semibold: font({ size: 1.8, weight: 600 }),
    body_12px_medium: font({ size: 1.2, weight: 500 }),
    body_12px_regular: font({ size: 1.2, weight: 400 }),
    body_14px_light: font({ size: 1.4, weight: 300 }),
    body_20px_semibold: font({ size: 2.0, weight: 600 }),
    sub_14px_regular: font({ size: 1.4, weight: 400 }),
  },

  zIndex: {
    navBar: 1,
    header: 2,
    navBarOverlay: 3,
    toast: 4,
    modal: 5,
    toolTip: 6,
  },

  shadows: {
    box: "-0.14rem 0.7rem 4.3rem rgba(0, 0, 0, 0.13)",
    text: "0 0.2rem 0.2rem rgba(0, 0, 0, 0.18)",
    main: "rgba(0, 0, 0, 0.25) 0px 0px 0.315rem",
    threeD: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    threeDHovered:
      "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
    modal: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  },
};

export default theme;
