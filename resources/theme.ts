import { extendTheme } from "@chakra-ui/react";
const styles = {
  global: {
    "html, body": {
      color: "white",
      bg: "gray.900",
    },
  },
};

const fonts = {
  heading: "Roboto, sans-serif",
  body: "Roboto, sans-serif",
};

const textStyles = {
  p: {
    fontFamily: "Montserrat, sans-serif",
  },
  a: {
    textDecoration: "none",
  },
};
export default extendTheme({ styles, fonts, textStyles });
