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
const MobileHubLogo: ImageSourcePropType = require("../../assets/images/MobileHub.png");

const img_Size = 150;

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: "center",
    gap: 20,
  },
  widthFull: {
    width: "100%",
  },
  img: {
    width: img_Size,
    height: img_Size * 1.17,
  },
  input: {
    borderRadius: 5,
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
    if (emailError || rutError) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [emailError, rutError]);

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
        <Image style={style.img} source={MobileHubLogo} />
        <TextInput
          style={[style.widthFull, style.input]}
          label="Rut"
          mode="outlined"
          value={rut}
          outlineColor="#fcaf43"
          onChangeText={(text) =>
            handleFieldChange(text, setRut, handleEmailError)
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
          label="Password"
          mode="outlined"
          value={birthYear}
          outlineColor="#fcaf43"
          onChangeText={(text) => handleFieldChange(text, setBirthYear, null)}
        />
        <Button
          style={style.widthFull}
          mode="contained"
          disabled={btnDisable}
          // onPress={() => {}}
        >
          Registrar
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}
