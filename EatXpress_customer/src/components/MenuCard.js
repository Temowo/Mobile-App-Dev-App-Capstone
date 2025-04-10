import React from "react";
import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import { colors } from "../common/colors";
import { fontSizes } from "../common/fontSizes";

const MenuCard = (props) => {
  return (
    <Pressable style={styles.box} onPress={props.onPress}>
      <View style={{ flex: 3 }}>
        <Text style={styles.food}>{props.food}</Text>
        <Text style={styles.description}>{props.description}</Text>
        <Text style={styles.price}>{props.price}</Text>
      </View>
      <Image
        source={{
          uri: props.url,
        }}
        style={{ width: 60, height: 70, borderRadius: 5, flex: 1 }}
      />
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
  food: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: fontSizes.medium,
  },
  description: {
    marginTop: 2,
    marginBottom: 10,
    color: colors.grey,
  },
  price: {
    marginBottom: 10,
    color: colors.grey,
  },
  separator: {
    width: 5,
  },
});

export default MenuCard;
