import { Link } from "expo-router";
import { StyleSheet, Image, ImageSourcePropType } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
const MobileHubLogo: ImageSourcePropType = require("../assets/images/MobileHub.png");

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
    height: 350,
  },
});

export default function HomeScreen() {
  return (
    <SafeAreaView style={style.container}>
      <Text variant="displayMedium">MobileHub</Text>
      <Image
        style={style.img}
        source={MobileHubLogo}
      />
      <Link href="/auth/login" asChild>
        <Button style={style.btn} mode="contained">
          Iniciar Sesión
        </Button>
      </Link>
      <Link href="/auth/register" asChild>
        <Button style={style.btn} mode="outlined">
          Regístrarme
        </Button>
      </Link>
    </SafeAreaView>
  );
}
