import React from "react";
import { colors } from "../common/colors";
import { fontSizes } from "../common/fontSizes";
import { StyleSheet, View, Text, Pressable } from "react-native";

const OrderCard = (props) => {
  return (
    <Pressable style={styles.box} onPress={props.onPress}>
      <View style={{ flex: 3 }}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.reference}>{props.reference}</Text>
        <Text style={styles.progress}>{props.progress}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    borderBottomWidth: 0.5,
    borderColor: colors.separator,
  },
  name: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: fontSizes.medium,
  },
  reference: {
    marginTop: 2,
    marginBottom: 10,
    color: colors.grey,
  },
  progress: {
    marginBottom: 10,
    color: "green",
  },
  separator: {
    width: 5,
  },
});

export default OrderCard;
