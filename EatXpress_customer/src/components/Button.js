import React from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet, Pressable, Text, Dimensions, View } from "react-native";
import { colors } from "../common/colors";
import { fontSizes } from "../common/fontSizes";

export function Button({ onPress, title, isLoading }) {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}

export function BasketButton(props) {
  return (
    <Pressable
      style={styles.basket_btn}
      onPress={props.onPress}
      width={props.width}
    >
      <View style={styles.content}>
        <Text style={styles.text}>{props.count}</Text>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.teal,
    width: "50%",
  },
  text: {
    color: colors.white,
    fontSize: fontSizes.medium,
    fontWeight: "700",
  },
  content: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: "30%",
  },
  basket_btn: {
    height: 50,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.teal,
  },
});
