import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Drawer,
  IconButton,
  MD3Colors,
  Text,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../assets/styles";
import agent from "../../app/api/agent";
import { useEffect, useState } from "react";
import Repositorie from "./repositories/Repositorie";
import { Link, useRouter } from "expo-router";
import LoadingScreen from "../utils/LoadingScreen";
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
interface Repository {
  name: string;
  createdAt: string;
  updatedAt: string;
  commitsAmount: number;
}
const compStyle = StyleSheet.create({
  loadIcon: {
    width: 300,
    height: 300,
  },
  header: {
    justifyContent: "space-between",
  },
});
export default function HomeScreen() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  /**
   * Primer useEffect: Se ejecuta cuando el componente se monta.
   * Obtiene el token del almacenamiento local.
   * Si el token es una cadena vacía, redirige al usuario a la página de inicio de sesión.
   * De lo contrario, establece el token en el estado.
   */
  useEffect(() => {
    (async () => {
      const tokenValue = await getValueFor("token");
      if (tokenValue == "") router.replace("/auth/login");
      else setToken(tokenValue);
    })();
  }, []);

  /**
   * Función para manejar el cierre de sesión del usuario.
   * Guarda una cadena vacía como token en el almacenamiento local y luego obtiene el valor guardado.
   * Imprime el token obtenido en la consola y redirige al usuario a la página de inicio.
   */
  async function handleLogout() {
    await save("token", "");
    let token = await getValueFor("token");
    console.log(token);
    router.replace("/");
  }

  /**
   * Segundo useEffect: Se ejecuta cuando el componente se monta.
   * Establece el estado de carga en verdadero y obtiene todos los repositorios.
   * Si la obtención es exitosa, establece los repositorios en el estado.
   * Si la obtención falla, imprime el error en la consola.
   * Finalmente, establece el estado de carga en falso.
   */
  useEffect(() => {
    setIsLoading(true);
    agent.Repositories.getAll()
      .then((response) => {
        setRepositories(response);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  /**
   * Si el estado de carga es verdadero, retorna el componente LoadingScreen.
   * De lo contrario, renderiza el componente normalmente.
   */
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView>
      <SafeAreaView style={[style.container]}>
        <View style={[style.inline, compStyle.header]} id="header">
          <Link href="/home/updateUser" asChild replace={false}>
            <IconButton
              icon="account-edit"
              mode="outlined"
              size={20}
              onPress={() => console.log("Pressed")}
            />
          </Link>
          <Text variant="displaySmall">Repositorios</Text>
          <IconButton
            icon="logout"
            mode="outlined"
            size={20}
            onPress={() => handleLogout()}
          />
        </View>
        {repositories.map((r: Repository) => {
          return <Repositorie repositorie={r} key={r.name} />;
        })}
      </SafeAreaView>
    </ScrollView>
  );
}
