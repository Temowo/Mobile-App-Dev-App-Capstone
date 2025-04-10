import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { colors } from "../common/colors";
export const Item = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{placeholder}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    display: "flex",
    paddingTop: 20,
    borderColor: colors.separator,
    borderBottomWidth: 1,
  },
  text: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    height: 35,
    width: 150,
  },
});
