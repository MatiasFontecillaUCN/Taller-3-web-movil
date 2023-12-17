import { StyleSheet } from "react-native";
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: "center",
    justifyContent: 'space-between',
    gap: 20,
  },
  widthFull: {
    width: "100%",
  },
  input: {
    borderRadius: 5,
  },
  inline: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default style;
