import React from "react";
import { Dimensions, StyleSheet, TextInput } from "react-native";
import { colors } from "../common/colors";

export default function Input({
  placeholder,
  value,
  onChangeText,
  type,
  secureTextEntry,
  autoCapitalize,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={type}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      placeholderTextColor="#333"
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 50,
    paddingVertical: 20,
    marginHorizontal: 100,
    backgroundColor: colors.bg,
    alignItems: "flex-start",
    height: 70,
    width: Dimensions.get("screen").width - 60,
    borderRadius: 5,
    margin: 10,
  },
});
