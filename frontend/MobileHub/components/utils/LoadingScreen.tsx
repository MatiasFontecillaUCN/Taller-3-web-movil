import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const compStyle = StyleSheet.create({
  loadView: {
    flex: 1,
    justifyContent:"center"
  },
});

export default function LoadingScreen() {
  return (
    <>
      <SafeAreaView style={compStyle.loadView}>
        <ActivityIndicator animating={true} size={"large"}/>
      </SafeAreaView>
    </>
  );
}
