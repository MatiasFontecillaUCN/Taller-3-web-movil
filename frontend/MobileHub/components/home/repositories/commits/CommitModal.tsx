import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Modal, Portal, Text } from "react-native-paper";
import Commit from "./Commits";
import LoadingScreen from "../../../utils/LoadingScreen";

interface Commit {
  message: string;
  author: string;
  createdAt: string;
  avatarUrl: string;
}
const style = StyleSheet.create({
  modal: {
    marginTop: "20%",
    marginBottom: "20%",
    margin: "10%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor:"#fcaf43",
    borderWidth:3,
  },
});

export default function CommitModal({
  commits,
  hideModal,
  isModalVisible,
  isLoading,
}: {
  commits: Commit[];
  hideModal: VoidFunction;
  isModalVisible: boolean;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => {
            hideModal();
          }}
          style={style.modal}
        >
          <View>
            <LoadingScreen />
          </View>
        </Modal>
      </Portal>
    );
  }

  return (
    <Portal>
      <Modal
        visible={isModalVisible}
        onDismiss={() => {
          hideModal();
        }}
        style={style.modal}
      >
        <ScrollView>
          <View style={style.container}>
            {commits.map((commit, Index) => {
              return <Commit commit={commit} key={Index} />;
            })}
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}
