import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Modal, PaperProvider, Portal, Text } from "react-native-paper";
import agent from "../../../../app/api/agent";
import LoadingScreen from "../../../LoadingScreen";
import Index from "../../../../app/home/index";
import Commit from "./Commits";

interface Commit {
  message: string;
  author: string;
  createdAt: string;
  avatarUrl: string;
}
const style = StyleSheet.create({
  modal: {
    flex: 1,
    marginTop: "20%",
    marginBottom: "20%",
    margin: "10%",
    height: "80%",
    backgroundColor: "white",
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
          <LoadingScreen />
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
          {commits.map((commit, Index) => {
            console.log(commit);
            return <Commit commit={commit} key={Index} />;
          })}
        </ScrollView>
      </Modal>
    </Portal>
  );
}
