import { StyleSheet, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    gap: 20,
  },
  btn: {
    width: "100%",
  },
  img: {
    width: 300,
    height:350,
  },
});

export default function HomeScreen() {
  return (
    <SafeAreaView style={style.container}>
      <Text variant="displayMedium">MobileHub</Text>
      <Image
        style={style.img}
        source={require("../assets/images/MobileHub.png")}
      />
      <Button style={style.btn} mode="contained">
        Iniciar Sesión
      </Button>
      <Button style={style.btn} mode="outlined">
        Regístrarme
      </Button>
    </SafeAreaView>
  );
}
