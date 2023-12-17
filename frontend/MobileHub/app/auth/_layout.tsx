import { Slot, router } from "expo-router";
import CustomAppBar from "../../components/utils/CustomAppbar";

export default function AuthLayout() {
  return (
    <>
      <CustomAppBar/>
      <Slot />
    </>
  );
}
