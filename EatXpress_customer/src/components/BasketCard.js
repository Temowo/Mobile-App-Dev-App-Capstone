import React from "react";
import { StyleSheet, Text, Dimensions, View, Pressable } from "react-native";
import { colors } from "../common/colors";
import { fontSizes } from "../common/fontSizes";
const windowWidth = Dimensions.get("window").width;

export default function BasketCard(props) {
  return (
    <View style={[styles.box, , styles.detail]}>
      <View style={styles.innerDetail}>
        <Text style={styles.heading}>{props.heading}</Text>
        <Text style={styles.value}>{props.value}</Text>
      </View>
      <Pressable>
        {/* <Text style={styles.text}>Edit</Text> */}
        <Text style={styles.text}></Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 10,
    paddingRight: 15,
    marginBottom: 1,
    width: windowWidth,
    height: 95,
    backgroundColor: colors.white,
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerDetail: {
    justifyContent: "space-between",
  },
  text: {
    color: colors.teal,
  },
  heading: {
    fontWeight: "bold",
  },
  value: {
    fontSize: fontSizes.small,
    color: colors.grey,
  },
});
