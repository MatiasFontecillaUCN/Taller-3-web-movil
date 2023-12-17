import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Modal, Portal, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../assets/styles";

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

export default function PasswordInput({
  password,
  CustomPlaceholder,
  handlePasswordChange,
}: {
  password: string;
  CustomPlaceholder: string;
  handlePasswordChange: Function;
}) {
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }
  return (
    <TextInput
      style={[style.widthFull, style.input]}
      label="Contraseña"
      placeholder={showPassword ? CustomPlaceholder : "********"}
      placeholderTextColor={"#B2B2B2"}
      mode="outlined"
      value={password}
      secureTextEntry={!showPassword}
      outlineColor="#fcaf43"
      onChangeText={(text) => handlePasswordChange(text)}
      right={
        <TextInput.Icon
          icon={showPassword ? "eye-off" : "eye"}
          onPress={handleShowPassword}
        />
      }
    />
  );
}
