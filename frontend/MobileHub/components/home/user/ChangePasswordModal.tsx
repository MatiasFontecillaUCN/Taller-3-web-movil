import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Modal, Portal, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../../assets/styles";
import PasswordInput from "../../utils/PasswordInput";

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
});

export default function ChangePasswordModal({
  hideModal,
  isModalVisible,
}: {
  hideModal: VoidFunction;
  isModalVisible: boolean;
}) {
  const [password, setPassword] = useState("");

  function handlePasswordChange(text: string) {
    setPassword(text);
  }
  return (
    <Portal>
      <Modal
        visible={isModalVisible}
        onDismiss={() => {
          hideModal();
        }}
        style={[style.modal, compStyle.container]}
      >
        <PasswordInput
          password={password}
          CustomPlaceholder="Contraseña Nueva"
          handlePasswordChange={handlePasswordChange}
        />
      </Modal>
    </Portal>
  );
}
