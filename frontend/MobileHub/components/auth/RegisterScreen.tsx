import style from "../../assets/styles";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Cookies from "js-cookie";
import agent from "../../app/api/agent";
const MobileHubLogo: ImageSourcePropType = require("../../assets/images/MobileHub.png");

const img_Size = 150;

const compStyle = StyleSheet.create({
  img: {
    width: img_Size,
    height: img_Size * 1.17,
  },
});

export default function RegisterScreen() {
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [rutError, setRutError] = useState(true);

  const [btnDisable, setBtnDisable] = useState(true);

  function handleEmailError(text: string) {
    setEmailError(false);
  }

  function handleRutError(text: string) {
    setRutError(false);
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

  function handleRegister(
    rut: string,
    email: string,
    fullname: string,
    birthYear: string
  ) {
    agent.User.register(rut, email, fullname, Number(birthYear))
      .then(() => {
        console.log("EXITO");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (emailError || rutError) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [emailError, rutError]);

  return (
    <ScrollView
      style={[style.widthFull]}
      automaticallyAdjustKeyboardInsets={true}
    >
      <SafeAreaView style={style.container}>
        <Image style={compStyle.img} source={MobileHubLogo} />
        <TextInput
          style={[style.widthFull, style.input]}
          label="Rut"
          mode="outlined"
          value={rut}
          outlineColor="#fcaf43"
          onChangeText={(text) =>
            handleFieldChange(text, setRut, handleRutError)
          }
        />
        <TextInput
          style={[style.widthFull, style.input]}
          label="Email"
          mode="outlined"
          value={email}
          outlineColor="#fcaf43"
          onChangeText={(text) =>
            handleFieldChange(text, setEmail, handleEmailError)
          }
        />
        <TextInput
          style={[style.widthFull, style.input]}
          label="Nombre"
          mode="outlined"
          value={fullname}
          outlineColor="#fcaf43"
          onChangeText={(text) => handleFieldChange(text, setFullname, null)}
        />
        <TextInput
          style={[style.widthFull, style.input]}
          label="Año de Nacimiento"
          mode="outlined"
          value={birthYear}
          outlineColor="#fcaf43"
          onChangeText={(text) => handleFieldChange(text, setBirthYear, null)}
        />
        <Button
          style={style.widthFull}
          mode="contained"
          disabled={btnDisable}
          onPress={() => handleRegister(rut, email, fullname, birthYear)}
        >
          Crear cuenta
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}
