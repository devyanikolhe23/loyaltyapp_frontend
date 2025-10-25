import { StyleSheet } from "react-native";
import color from "./color";

export default StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: color.dark,
    marginVertical: 12,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "600",
    color: color.dark,
    marginVertical: 10,
  },
  body: {
    fontSize: 15,
    color: color.dark,
    lineHeight: 22,
  },
  small: {
    fontSize: 13,
    color: color.gray,
  },
  link: {
    fontSize: 15,
    color: color.primary,
    textDecorationLine: "underline",
  },
});
