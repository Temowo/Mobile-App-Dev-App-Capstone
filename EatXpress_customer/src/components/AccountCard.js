import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { colors } from "../common/colors";
import { AntDesign } from "@expo/vector-icons";

const AccountCard = (props) => {
  return (
    <Pressable style={styles.main} onPress={props.onPress}>
      <Text>{props.screenName}</Text>
      <View style={styles.arrow}>
        <AntDesign name="arrowright" size={24} color={colors.teal} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingLeft: 20,
    paddingRight: 10,
  },
  box2: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingLeft: 20,
    paddingRight: 10,
  },
  arrow: {
    margin: 5,
    width: 25,
    height: 25,
    backgroundColor: colors.white,
    borderRadius: 100,
  },
});

export default AccountCard;
