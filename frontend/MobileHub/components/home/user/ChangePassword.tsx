import { useEffect, useState } from "react";
import { Alert, Image, ImageSourcePropType, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../../assets/styles";
import PasswordInput from "../../utils/PasswordInput";
import CustomAppBar from "../../utils/CustomAppbar";
import agent from "../../../app/api/agent";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
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

  /**
   * Efecto para obtener el correo electrónico y el token del usuario.
   * Si el token es una cadena vacía, redirige al usuario a la página de inicio de sesión.
   * De lo contrario, establece el token.
   */
  useEffect(() => {
    (async () => {
      const emailValue = await getValueFor("email");
      if (emailValue) setEmail(emailValue);
      const tokenValue = await getValueFor("token");
      if (tokenValue == "") router.replace("/auth/login");
      else setToken(tokenValue);
    })();
  }, []);

  /**
   * Función para manejar el cambio de contraseña.
   *
   * @param {string} text - La nueva contraseña.
   */
  function handlePasswordChange(text: string) {
    setPassword(text);
  }

  /**
   * Función para manejar el cambio de la nueva contraseña.
   *
   * @param {string} text - La nueva contraseña.
   */
  function handleNewPasswordChange(text: string) {
    setNewPassword(text);
  }

  /**
   * Función para cambiar la contraseña del usuario.
   *
   * @param {string} newPassword - La nueva contraseña.
   * @param {string} password - La contraseña actual.
   */
  function changePassword(newPassword: string, password: string) {
    if (token == null) return;
    agent.User.updatePassword(email, newPassword, password)
      .then((response) => {
        console.log(response);
        Alert.alert("", "Contraseña editada con exito", [
          {
            text: "Ok",
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("", "Contraseña invalida", [
          {
            text: "Ok",
          },
        ]);
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
