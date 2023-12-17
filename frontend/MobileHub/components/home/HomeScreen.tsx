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
import { Link } from "expo-router";
import LoadingScreen from "../utils/LoadingScreen";
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

  useEffect(() => {
    setIsLoading(true);
    agent.Repositories.getAll()
      .then((response) => {
        setRepositories(response);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

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
          <Link href="/" asChild replace={true}>
            <IconButton
              icon="logout"
              mode="outlined"
              size={20}
              onPress={() => console.log("Pressed")}
            />
          </Link>
        </View>
        {repositories.map((r: Repository) => {
          return <Repositorie repositorie={r} key={r.name} />;
        })}
      </SafeAreaView>
    </ScrollView>
  );
}
