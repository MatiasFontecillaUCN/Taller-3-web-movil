import style from "../../assets/styles";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { jwtDecode } from "jwt-decode";
import { Link, useRouter } from "expo-router";
import PasswordInput from "../utils/PasswordInput";
import * as SecureStore from "expo-secure-store";
import agent from "../../app/api/agent";
import { useNavigation } from "@react-navigation/native";

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
const MobileHubLogo: ImageSourcePropType = require("../../assets/images/MobileHub.png");
const img_Size = 150;

const compStyle = StyleSheet.create({
  img: {
    width: img_Size,
    height: img_Size * 1.17,
  },
});

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [logInError, setLogInError] = useState(false);

  const [btnDisable, setBtnDisable] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  function handleEmailError(text: string) {
    setEmailError(false);
  }

  function handlePasswordError(text: string) {
    setPasswordError(false);
  }

  function handlePasswordChange(text: string) {
    setPassword(text);
    handlePasswordError(text);
  }
  function handleFieldChange(
    text: string,
    setField: Function,
    fieldError: Function | null
  ) {
    setField(text);
    if (fieldError) {
      fieldError(text);
    }
  }

  function handleLogin(email: string, password: string) {
    agent.Auth.auth(email, password)
      .then((response) => {
        save("token", response);
        router.replace("/home/");
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  }

  useEffect(() => {
    if (emailError || passwordError) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [emailError, passwordError]);

  return (
    <ScrollView
      style={[style.widthFull]}
      automaticallyAdjustKeyboardInsets={true}
    >
      <SafeAreaView style={style.container}>
        <Image style={compStyle.img} source={MobileHubLogo} />
        <TextInput
          style={[style.widthFull, style.input]}
          label="Correo Electronico"
          placeholder="Tu correo electronico"
          mode="outlined"
          value={email}
          outlineColor="#fcaf43"
          onChangeText={(text) =>
            handleFieldChange(text, setEmail, handleEmailError)
          }
        />

        <PasswordInput
          password={password}
          CustomPlaceholder="Contraseña"
          handlePasswordChange={handlePasswordChange}
        />
        <Button
          style={style.widthFull}
          mode="contained"
          disabled={btnDisable}
          onPress={() => handleLogin(email, password)}
        >
          Ingresar
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}
