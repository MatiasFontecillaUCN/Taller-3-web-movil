import { useState } from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../../assets/styles";
import PasswordInput from "../../utils/PasswordInput";
import CustomAppBar from "../../utils/CustomAppbar";
import changePassword from "../../../app/home/changePassword";
import agent from "../../../app/api/agent";
const MobileHubLogo: ImageSourcePropType = require("../../../assets/images/MobileHub.png");

const img_Size = 150;

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
  img: {
    width: img_Size,
    height: img_Size * 1.17,
  },
});

export default function ChangePassword({}: {}) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function handlePasswordChange(text: string) {
    setPassword(text);
  }

  function handleNewPasswordChange(text: string) {
    setNewPassword(text);
  }

  function changePassword(newPassword: string, password: string) {
    agent.User.updatePassword("21729131-3", newPassword, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <ScrollView
      style={[style.widthFull]}
      automaticallyAdjustKeyboardInsets={true}
    >
      <CustomAppBar />
      <SafeAreaView style={[style.container]}>
        <Image style={compStyle.img} source={MobileHubLogo} />
        <PasswordInput
          password={password}
          CustomPlaceholder="Contraseña Actual"
          handlePasswordChange={handlePasswordChange}
        />
        <PasswordInput
          password={newPassword}
          CustomPlaceholder="Nueva Contraseña"
          handlePasswordChange={handleNewPasswordChange}
        />
        <Button
          style={style.widthFull}
          mode="contained"
          onPress={() => changePassword(newPassword, password)}
        >
          Confirmar
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}
