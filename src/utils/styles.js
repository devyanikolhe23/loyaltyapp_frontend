import { StyleSheet } from "react-native";
import color from "./color";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    
  },
  contentContainer: {
   
    paddingHorizontal: 16, // keep padding for normal content
    paddingVertical: 12,
    
  },
  card: {
    backgroundColor: color.white,
    borderRadius: 12,
    padding: 14,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
