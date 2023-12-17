import { Slot, router } from "expo-router";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";

function handelBack() {
  router.back();
}
const styles = StyleSheet.create({
  appBar: {
    margin:0,
  },
});
export default function AuthLayout() {
  return (
    <>
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={handelBack} />
      </Appbar.Header>
      <Slot />
    </>
  );
}
