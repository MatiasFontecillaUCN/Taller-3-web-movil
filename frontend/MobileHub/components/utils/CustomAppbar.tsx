import { router } from "expo-router";
import { Appbar } from "react-native-paper";
import style from "../../assets/styles";

function handelBack() {
  router.back();
}
export default function CustomAppBar() {
  return (
    <>
      <Appbar.Header style={style.appBar}>
        <Appbar.BackAction onPress={handelBack} />
      </Appbar.Header>
    </>
  );
}
