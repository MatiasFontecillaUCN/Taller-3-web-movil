import style from "../../../assets/styles";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  ImageSourcePropType,
  Alert,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import agent from "../../../app/api/agent";
import CustomAppBar from "../../utils/CustomAppbar";
import LoadingScreen from "../../utils/LoadingScreen";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

/**
 * Función para guardar un valor en SecureStore.
 *
 * @param {any} key - La clave bajo la cual se guardará el valor.
 * @param {any} value - El valor que se guardará.
 */
async function save(key: any, value: any) {
  await SecureStore.setItemAsync(key, value);
}

/**
 * Función para obtener un valor de SecureStore.
 *
 * @param {any} key - La clave del valor que se obtendrá.
 * @returns {Promise<string | null>} - Retorna una promesa que se resuelve en el valor guardado bajo la clave proporcionada.
 * Si no se encuentra ningún valor, se resuelve en null.
 */
async function getValueFor(key: any) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}

const MobileHubLogo: ImageSourcePropType = require("../../../assets/images/MobileHub.png");

const img_Size = 150;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const compStyle = StyleSheet.create({
  img: {
    width: img_Size,
    height: img_Size * 1.17,
  },
});

export default function UpdateUserScreen() {
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [fullnameError, setFullnameError] = useState(false);
  const [birthYear, setBirthYear] = useState("");
  const [birthYearError, setBirthYearError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const [btnDisable, setBtnDisable] = useState(true);

  const router = useRouter();

  /**
   * Primer useEffect: Se ejecuta cuando el componente se monta.
   * Obtiene el email y el token del almacenamiento local.
   * Si el token es una cadena vacía, redirige al usuario a la página de inicio de sesión.
   * De lo contrario, establece el token en el estado.
   */
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const emailValue = await getValueFor("email");
      if (emailValue) setEmail(emailValue);
      const tokenValue = await getValueFor("token");
      if (tokenValue == "") router.replace("/auth/login");
      else setToken(tokenValue);
    })();
  }, []);

  /**
   * Segundo useEffect: Se ejecuta cuando cambian los errores de los campos de email, nombre completo o año de nacimiento.
   * Si hay algún error, deshabilita el botón de actualizar.
   * De lo contrario, habilita el botón de actualizar.
   */
  useEffect(() => {
    if (emailError || fullnameError || birthYearError) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [emailError, fullnameError, birthYearError]);

  /**
   * Tercer useEffect: Se ejecuta cuando cambia el token.
   * Si el token es nulo, no hace nada.
   * De lo contrario, obtiene la información del usuario y la establece en los campos del formulario.
   */
  useEffect(() => {
    if (token == null) return;
    agent.User.getUser(email)
      .then((response) => {
        setRut(response.id);
        setEmail(response.email);
        setFullname(response.fullname);
        setBirthYear(response.birthYear.toString());
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [token]);

  /**
   * Función para manejar el error del campo de nombre completo.
   * Si el nombre completo tiene menos de 10 caracteres, establece el error de nombre completo en verdadero.
   */
  function handleEmailError(text: string) {
    let valid = false;
    valid = !emailRegex.test(text);
    setEmailError(valid);
  }

  /**
   * Función para manejar el error del campo de nombre completo.
   * Si el nombre completo tiene menos de 10 caracteres, establece el error de nombre completo en verdadero.
   */
  function handleNameError(text: string) {
    if (fullname == "") return;
    setFullnameError(!(text.length >= 10));
  }

  /**
   * Función para manejar el error del campo de año de nacimiento.
   * Si el año de nacimiento no es un número entre 1900 y el año actual, establece el error de año de nacimiento en verdadero.
   */
  function handleBirthYearError(text: string) {
    if (birthYear == "") return;
    const value = Number(text);
    const currentYear = new Date().getFullYear();
    setBirthYearError(!(value > 1900 || value < currentYear));
  }

  /**
   * Función para manejar el cambio de los campos del formulario.
   * Establece el valor del campo y verifica si hay algún error.
   */
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

  /**
   * Función para actualizar la información del usuario.
   * Si la actualización es exitosa, muestra una alerta y guarda el nuevo email en el almacenamiento local.
   * Si la actualización falla, muestra una alerta y registra el error en la consola.
   */
  function updateUser(
    rut: string,
    email: string,
    fullname: string,
    birthYear: string
  ) {
    agent.User.updateUser(rut, email, fullname, Number(birthYear))
      .then(async () => {
        Alert.alert("", "Datos editados con exito", [
          {
            text: "Ok",
          },
        ]);
        await save("email", email);
      })
      .catch((error) => {
        Alert.alert("", "No se pudieron editar los datos", [
          {
            text: "Ok",
          },
        ]);
        console.log(error);
      });
  }

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <ScrollView
      style={[style.widthFull]}
      automaticallyAdjustKeyboardInsets={true}
    >
      <CustomAppBar />
      <SafeAreaView style={style.container}>
        <Image style={compStyle.img} source={MobileHubLogo} />
        <TextInput
          style={[style.widthFull, style.input]}
          label="Rut"
          mode="outlined"
          value={rut}
          outlineColor="#fcaf43"
          disabled={true}
        />
        <TextInput
          style={[style.widthFull, style.input]}
          label="Email"
          mode="outlined"
          value={email}
          error={email == "" ? false : emailError}
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
          error={fullname == "" ? false : fullnameError}
          outlineColor="#fcaf43"
          onChangeText={(text) =>
            handleFieldChange(text, setFullname, handleNameError)
          }
        />
        <TextInput
          style={[style.widthFull, style.input]}
          label="Año de Nacimiento"
          mode="outlined"
          value={birthYear}
          error={birthYear == "" ? false : birthYearError}
          outlineColor="#fcaf43"
          onChangeText={(text) =>
            handleFieldChange(text, setBirthYear, handleBirthYearError)
          }
        />
        <Button
          style={style.widthFull}
          mode="contained"
          disabled={btnDisable}
          onPress={() => updateUser(rut, email, fullname, birthYear)}
        >
          Comfirmar cambios
        </Button>
        <Link href="/home/changePassword" asChild replace={false}>
          <Button style={style.widthFull} mode="outlined">
            Editar Contraseña
          </Button>
        </Link>
      </SafeAreaView>
    </ScrollView>
  );
}
