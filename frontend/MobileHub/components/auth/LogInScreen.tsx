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
import Cookies from "js-cookie";
import { Link } from "expo-router";
const MobileHubLogo: ImageSourcePropType = require("../../assets/images/MobileHub.png");
const img_Size = 300;

const compStyle = StyleSheet.create({
  img: {
    width: img_Size,
    height: img_Size * 1.17,
  }
});

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [logInError, setLogInError] = useState(false);

  const [btnDisable, setBtnDisable] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  /**
   * Maneja el clic en el botón para mostrar la contraseña
   */
  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  function handleEmailError(text: string) {
    setEmailError(false);
  }

  function handlePasswordError(text: string) {
    setPasswordError(false);
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

  // eslint-disable-next-line no-unused-vars
  //   const { authenticated, setAuthenticated } = useContext(AuthContext);
  //   const navigate = useNavigate();

  /**
   * Efecto para verificar la autenticación del usuario
   */
  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       const dateNow = new Date();

  //       if (decodedToken.exp < dateNow.getTime() / 1000) {
  //         console.log("Token expired.");
  //       } else {
  //         setAuthenticated(true);
  //         navigate("/client-list");
  //       }
  //     } catch {
  //       setAuthenticated(false);
  //     }
  //   }
  // }, [setAuthenticated, navigate]);

  /**
   * Efecto para habilitar o deshabilitar el botón de inicio de sesión
   */
  useEffect(() => {
    if (emailError || passwordError) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [emailError, passwordError]);

  /**
   * Inicia sesión con el nombre de usuario y la contraseña proporcionados
   * @param {string} username - El nombre de usuario
   * @param {string} password - La contraseña
   */
  // function login(username, password) {
  //   agent.Auth.auth(username, password)
  //     .then((data) => {
  //       Cookies.set("token", data);
  //       setAuthenticated(true);
  //       setLogInError(false);
  //       navigate("/client-list");
  //     })
  //     .catch(() => {
  //       setLogInError(true);
  //     });
  // }

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
        <TextInput
          style={[style.widthFull, style.input]}
          label="Contraseña"
          placeholder={showPassword ? "Tu contraseña" : "********"}
          placeholderTextColor={"#B2B2B2"}
          mode="outlined"
          value={password}
          secureTextEntry={!showPassword}
          outlineColor="#fcaf43"
          onChangeText={(text) =>
            handleFieldChange(text, setPassword, handlePasswordError)
          }
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={handleShowPassword}
            />
          }
        />
        <Link href='/home/' asChild replace={true}>
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
