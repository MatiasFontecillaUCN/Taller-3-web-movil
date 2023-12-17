import style from "../../../assets/styles";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import agent from "../../../app/api/agent";
import CustomAppBar from "../../utils/CustomAppbar";
import ChangePasswordModal from "./ChangePasswordModal";
import LoadingScreen from "../../utils/LoadingScreen";
const MobileHubLogo: ImageSourcePropType = require("../../../assets/images/MobileHub.png");

const img_Size = 150;

const compStyle = StyleSheet.create({
  img: {
    width: img_Size,
    height: img_Size * 1.17,
  },
});

export default function UpdateUserScreen() {
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const [btnDisable, setBtnDisable] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setIsLoading(true);
    agent.User.getUser("11.111.111-1")
      .then((response) => {
        setRut(response.id);
        setEmail(response.email);
        setFullname(response.fullname);
        setBirthYear(response.birthYear.toString());
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  function handleEmailError(text: string) {
    setEmailError(false);
  }

  function handleFieldChange(
    text: string,
    setField: Function,
    fieldError: Function | null
  ) {
    setField(text);
    if (fieldError) {
      fieldError(text);
    }
  }

  function updateUser(email: string, fullname: string, birthYear: string) {
    agent.User.updateUser("11.111.111-1", email, fullname, Number(birthYear))
      .then(() => {
        console.log("Updated");
        setUpdated(true);
      })
      .catch((error) => {
        console.log(error);
        setUpdated(false);
      });
  }

  useEffect(() => {
    if (emailError) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [emailError]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <ScrollView
      style={[style.widthFull]}
      automaticallyAdjustKeyboardInsets={true}
    >
      <CustomAppBar />
      <SafeAreaView style={style.container}>
        <Image style={compStyle.img} source={MobileHubLogo} />
        <TextInput
          style={[style.widthFull, style.input]}
          label="Rut"
          mode="outlined"
          value={rut}
          outlineColor="#fcaf43"
          disabled={true}
        />
        <TextInput
          style={[style.widthFull, style.input]}
          label="Email"
          mode="outlined"
          value={email}
          outlineColor="#fcaf43"
          onChangeText={(text) =>
            handleFieldChange(text, setEmail, handleEmailError)
          }
        />
        <TextInput
          style={[style.widthFull, style.input]}
          label="Nombre"
          mode="outlined"
          value={fullname}
          outlineColor="#fcaf43"
          onChangeText={(text) => handleFieldChange(text, setFullname, null)}
        />
        <TextInput
          style={[style.widthFull, style.input]}
          label="Año de Nacimiento"
          mode="outlined"
          value={birthYear}
          outlineColor="#fcaf43"
          onChangeText={(text) => handleFieldChange(text, setBirthYear, null)}
        />
        <Button
          style={style.widthFull}
          mode="contained"
          disabled={btnDisable}
          onPress={() => updateUser(email, fullname, birthYear)}
        >
          Editar Datos
        </Button>
        <Button
          style={style.widthFull}
          mode="outlined"
          onPress={() => showModal()}
        >
          Editar Contraseña
        </Button>
        <ChangePasswordModal
          hideModal={hideModal}
          isModalVisible={isModalVisible}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
