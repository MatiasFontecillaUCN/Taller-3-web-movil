import style from "../../assets/styles";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  ImageSourcePropType,
  Alert,
  TouchableOpacity,
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
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

  const [btnDisable, setBtnDisable] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  function handleEmailError(text: string) {
    let valid = false;
    valid = !emailRegex.test(text);
    console.log(text + " ES " + valid);
    setEmailError(valid);
  }

  function handlePasswordChange(text: string) {
    setPassword(text);
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

  function handlePressDisabledButton() {
    if (btnDisable) {
      Alert.alert("", "Debe ingresar un correo electronico valido", [
        {
          text: "Ok",
        },
      ]);
    }
  }

  function handleLogin(email: string, password: string) {
    agent.Auth.auth(email, password)
      .then((response) => {
        save("token", response);
        router.replace("/home/");
      })
      .catch((error) => {
        Alert.alert(
          "Credenciales invalidas",
          "La contraseña o el correo electronico son incorrectos",
          [
            {
              text: "Ok",
            },
          ]
        );
        console.log(error);
      });
  }

  useEffect(() => {
    if (emailError) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [emailError]);

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
          error={email == "" ? false : emailError}
          onChangeText={(text) =>
            handleFieldChange(text, setEmail, handleEmailError)
          }
        />

        <PasswordInput
          password={password}
          CustomPlaceholder="Contraseña"
          handlePasswordChange={handlePasswordChange}
        />
        <TouchableOpacity
          style={style.widthFull}
          activeOpacity={1}
          onPress={handlePressDisabledButton}
        >
          <Button
            style={style.widthFull}
            mode="contained"
            disabled={btnDisable}
            onPress={() => handleLogin(email, password)}
          >
            Ingresar
          </Button>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}
