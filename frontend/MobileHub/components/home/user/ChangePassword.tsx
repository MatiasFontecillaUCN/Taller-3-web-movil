import { useEffect, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../../assets/styles";
import PasswordInput from "../../utils/PasswordInput";
import CustomAppBar from "../../utils/CustomAppbar";
import agent from "../../../app/api/agent";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { JwtPayload, jwtDecode } from "jwt-decode";

async function save(key: any, value: any) {
  await SecureStore.setItemAsync(key, value);
}
async function getValueFor(key: any) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}

const MobileHubLogo: ImageSourcePropType = require("../../../assets/images/MobileHub.png");

interface MyJwtPayload extends JwtPayload {
  rut: string;
}

const img_Size = 150;

const compStyle = StyleSheet.create({
  modal: {
    marginTop: "20%",
    marginBottom: "20%",
    margin: "10%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    borderColor: "#fcaf43",
    borderWidth: 3,
  },
  img: {
    width: img_Size,
    height: img_Size * 1.17,
  },
});

export default function ChangePassword({}: {}) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const emailValue = await getValueFor("email");
      if (emailValue) setEmail(emailValue);
      const tokenValue = await getValueFor("token");
      if (tokenValue == "") router.replace("/auth/login");
      else setToken(tokenValue);
    })();
  }, []);

  function handlePasswordChange(text: string) {
    setPassword(text);
  }

  function handleNewPasswordChange(text: string) {
    setNewPassword(text);
  }

  function changePassword(newPassword: string, password: string) {
    if (token == null) return;
    agent.User.updatePassword(email, newPassword, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <ScrollView
      style={[style.widthFull]}
      automaticallyAdjustKeyboardInsets={true}
    >
      <CustomAppBar />
      <SafeAreaView style={[style.container]}>
        <Image style={compStyle.img} source={MobileHubLogo} />
        <PasswordInput
          password={password}
          CustomPlaceholder="Contraseña Actual"
          handlePasswordChange={handlePasswordChange}
        />
        <PasswordInput
          password={newPassword}
          CustomPlaceholder="Nueva Contraseña"
          handlePasswordChange={handleNewPasswordChange}
        />
        <Button
          style={style.widthFull}
          mode="contained"
          onPress={() => changePassword(newPassword, password)}
        >
          Confirmar
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}
