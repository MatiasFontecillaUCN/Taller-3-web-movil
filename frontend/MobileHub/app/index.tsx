import { PaperProvider, MD3LightTheme as Theme } from "react-native-paper";
import HomeScreen from "../components/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

const theme = {
    ...Theme,
    colors:{
        ...Theme.colors,
        primary:"#fcaf43",
        secondary:"#fcaf43"
    }
}

export default function Index(){
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <HomeScreen />
      </SafeAreaProvider>
    </PaperProvider>
  );
};
