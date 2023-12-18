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

  useEffect(() => {
    (async () => {
      const tokenValue = await getValueFor("token");
      if (tokenValue == '') router.replace("/auth/login");
      else setToken(tokenValue);
    })();
  }, []);

  async function handleLogout() {
    await save("token", '');
    let token = await getValueFor("token");
    console.log(token);
    router.replace("/");
  }

  // useEffect(() => {
  //   setIsLoading(true);
  //   agent.Repositories.getAll()
  //     .then((response) => {
  //       setRepositories(response);
  //     })
  //     .catch((error) => console.log(error))
  //     .finally(() => setIsLoading(false));
  // }, []);

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
