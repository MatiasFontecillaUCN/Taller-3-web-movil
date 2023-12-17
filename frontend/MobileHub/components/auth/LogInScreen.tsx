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
import { Link } from "expo-router";
import PasswordInput from "../utils/PasswordInput";
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
          CustomPlaceholder="Contraseña Nueva"
          handlePasswordChange={handlePasswordChange}
        />
        <Link href="/home/" asChild replace={true}>
          <Button
            style={style.widthFull}
            mode="contained"
            disabled={btnDisable}
            // onPress={() => {}}
          >
            Ingresar
          </Button>
        </Link>
      </SafeAreaView>
    </ScrollView>
  );
}
