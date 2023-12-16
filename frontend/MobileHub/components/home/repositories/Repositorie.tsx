import { Button, Card, Text } from "react-native-paper";
import CommitModal from "./commits/CommitModal";
import style from "../../../assets/styles";
import { useState } from "react";

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

  const showModal = () => {
    setIsModalVisible(true);
    console.log("showFucntion");
  };
  const hideModal = () => {
    setIsModalVisible(false);
    console.log("dissmisFunciotn");
  };
  return (
    <Card style={style.widthFull} key={repositorie.name}>
      <Card.Title title={repositorie.name} titleVariant="headlineSmall" />
      <Card.Content>
        <Text variant="bodyMedium">Creado el {repositorie.createdAt}</Text>
        <Text variant="bodyMedium">Actualizado el {repositorie.updatedAt}</Text>
        <Text variant="bodyMedium">{repositorie.commitsAmount} Commits</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => showModal()}>
          Ver Más
        </Button>
        <CommitModal
          repoName={repositorie.name}
          hideModal={hideModal}
          isModalVisible={isModalVisible}
        />
      </Card.Actions>
    </Card>
  );
}
