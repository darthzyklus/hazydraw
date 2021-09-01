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

const Button = {
  variants: {
    solid: {
      borderRadius: "0",
    },
  },
};

const Input = {
  variants: {
    outline: {
      borderRadius: "none",
      borderWidth: "0.1px",
    },
  },
};

export default extendTheme({
  styles,
  fonts,
  textStyles,
  components: { Button, Input },
});
