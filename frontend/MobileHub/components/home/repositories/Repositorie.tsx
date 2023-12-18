import { Button, Card, Text } from "react-native-paper";
import CommitModal from "./commits/CommitModal";
import style from "../../../assets/styles";
import { useState } from "react";
import agent from "../../../app/api/agent";
interface Commit {
  message: string;
  author: string;
  createdAt: string;
  avatarUrl: string;
}

interface Repository {
  name: string;
  createdAt: string;
  updatedAt: string;
  commitsAmount: number;
}

export default function Repositorie({
  repositorie,
}: {
  repositorie: Repository;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [isModalLoading, setIsModalLoading] = useState(true);

  const formatedUpdatedAt = new Date(repositorie.updatedAt).toLocaleString(
    "es-CL",
    { timeZone: "America/Santiago" }
  );
  const formatedCreatedAt = new Date(repositorie.createdAt).toLocaleString(
    "es-CL",
    { timeZone: "America/Santiago" }
  );

  /**
   * Función para mostrar el modal de commits.
   * Primero, establece `isModalVisible` y `isModalLoading` en true para mostrar el modal y la pantalla de carga.
   * Luego, hace una solicitud para obtener los commits del repositorio.
   * Cuando la respuesta es recibida, establece los commits y oculta la pantalla de carga.
   */
  const showModal = () => {
    console.log("CARGANDO MODAL " + repositorie.name);
    setIsModalVisible(true);
    setIsModalLoading(true);
    agent.Repositories.getCommits(repositorie.name)
      .then((response) => {
        setCommits(response);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsModalLoading(false));
  };

  /**
   * Función para ocultar el modal de commits.
   * Simplemente establece `isModalVisible` en false.
   */
  const hideModal = () => {
    setIsModalVisible(false);
  };
  return (
    <Card style={style.widthFull} key={repositorie.name}>
      <Card.Title title={repositorie.name} titleVariant="headlineSmall" />
      <Card.Content>
        <Text variant="bodyMedium">Creado el {formatedCreatedAt}</Text>
        <Text variant="bodyMedium">Actualizado el {formatedUpdatedAt}</Text>
        <Text variant="bodyMedium">{repositorie.commitsAmount} Commits</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => showModal()}>
          Ver Más
        </Button>
        <CommitModal
          hideModal={hideModal}
          isModalVisible={isModalVisible}
          commits={commits}
          isLoading={isModalLoading}
        />
      </Card.Actions>
    </Card>
  );
}
