import { ScrollView, StyleSheet } from "react-native";
import {
  Text,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../assets/styles";
import agent from "../../app/api/agent";
import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen";
import Repositorie from "./repositories/Repositorie";
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
      <SafeAreaView style={style.container}>
        <Text variant="displaySmall">Repositorios</Text>
        {repositories.map((r: Repository) => {
          return <Repositorie repositorie={r} key={r.name} />;
        })}
      </SafeAreaView>
    </ScrollView>
  );
}
