import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Deal(props) {
  return (
    <View style={styles.deal}>
      <Text style={styles.text}>Pizza</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  deal: {
    height: 80,
    width: 100,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#928fa6",
  },
  text: {
    fontWeight: "600",
  },
});
