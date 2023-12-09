import { ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../assets/styles";
import agent from "../../app/api/agent";
import { useEffect, useState } from "react";
interface Repository {
  name: string;
  createdAt: string;
  updatedAt: string;
  commitsAmount: number;

  // other properties...
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
        console.log(response);
        setRepositories(response);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={compStyle.loadScreen}>
        <ActivityIndicator animating={true} size={"large"}/>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView style={style.container}>
        <Text variant="displaySmall">Repositorios</Text>
        {repositories.map((r: Repository) => {
          return (
            <Card style={style.widthFull} key={r.name}>
              <Card.Title title={r.name} titleVariant="headlineSmall" />
              <Card.Content>
                <Text variant="bodyMedium">Creado el {r.createdAt}</Text>
                <Text variant="bodyMedium">Actualizado el {r.updatedAt}</Text>
                <Text variant="bodyMedium">{r.commitsAmount} Commits</Text>
              </Card.Content>
              <Card.Actions>
                <Button mode="contained" onPress={() => console.log("pressed")}>
                  Ver Más
                </Button>
              </Card.Actions>
            </Card>
          );
        })}
      </SafeAreaView>
    </ScrollView>
  );
}
