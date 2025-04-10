import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fontSizes } from "../common/fontSizes";
import { colors } from "../common/colors";
export default function InfoCard(props) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.placeholder}>{props.placeholder}</Text>
      <Text>{props.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    paddingLeft: 20,
    flex: 0.12,
    backgroundColor: "#fff",
    borderColor: colors.separator,
    borderTopWidth: 0.5,
    justifyContent: "space-around",
  },
  placeholder: {
    fontSize: fontSizes.small,
    color: colors.grey,
  },
});
