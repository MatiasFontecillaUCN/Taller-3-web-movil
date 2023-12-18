import { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
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

/**
 * Componente de entrada de contraseña.
 *
 * Este componente muestra un campo de entrada de texto para la contraseña.
 * El usuario puede mostrar u ocultar la contraseña haciendo clic en el icono del ojo.
 *
 * @param {string} password - La contraseña.
 * @param {string} CustomPlaceholder - El marcador de posición personalizado para el campo de entrada de texto.
 * @param {Function} handlePasswordChange - La función que se llama cuando cambia el valor del campo de entrada de texto.
 * @returns {JSX.Element} El componente de entrada de contraseña.
 */
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

  /**
   * Función para manejar el cambio de estado de showPassword.
   * Invierte el valor actual de showPassword.
   */
  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }
  return (
    <TextInput
      style={[style.widthFull, style.input]}
      label={CustomPlaceholder}
      placeholder={showPassword ? "Tu Contraseña" : "********"}
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
