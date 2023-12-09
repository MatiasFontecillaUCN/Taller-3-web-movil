import style from "../assets/styles";
import { Link } from "expo-router";
import { StyleSheet, Image, ImageSourcePropType } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
const MobileHubLogo: ImageSourcePropType = require("../assets/images/MobileHub.png");

const compStyle = StyleSheet.create({
  img: {
    width: 300,
    height: 350,
  },
});

export default function InitialScreen() {
  return (
    <SafeAreaView style={style.container}>
      <Image
        style={compStyle.img}
        source={MobileHubLogo}
      />
      <Link href="/auth/login" asChild>
        <Button style={style.widthFull} mode="contained">
          Iniciar Sesión
        </Button>
      </Link>
      <Link href="/auth/register" asChild>
        <Button style={style.widthFull} mode="outlined">
          Regístrarme
        </Button>
      </Link>
    </SafeAreaView>
  );
}
