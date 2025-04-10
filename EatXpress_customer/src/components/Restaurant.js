import React from "react";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;
import { colors } from "../common/colors";

export default function Restaurant(props) {
  return (
    <View style={styles.card}>
      <View style={{ ...styles.image, backgroundColor: props.bg }}>
        {props.image ? (
          <Image
            source={{
              uri: `${props.image}`,
            }}
            style={{ ...styles.image }}
          />
        ) : (
          <Image
            source={require("../../assets/vendors.png")}
            style={{ width: "13%" }}
          />
        )}
      </View>
      <View style={styles.time}>
        <Text style={styles.timeText}>30-50 min</Text>
      </View>
      <Text style={styles.h1}>{props.name}</Text>
      <Text style={styles.text}>{props.cuisine}</Text>
      <View style={styles.rating}>
        <AntDesign
          style={{ marginTop: 5.5, marginLeft: 4 }}
          name="staro"
          size={14}
          color="grey"
        />
        <Text style={styles.text}>{props.rate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: windowWidth - 10,
    backgroundColor: colors.white,
    margin: 5,
    // borderWidth: 1,
    borderRadius: 5,
    // borderColor: "lightgrey",
  },
  image: {
    height: 110,
    width: windowWidth - 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  h1: {
    fontWeight: "bold",
    margin: 5,
  },
  text: {
    color: colors.grey,
    margin: 5,
  },
  time: {
    position: "absolute",
    left: 220,
    top: 80,
    width: 130,
    height: 50,
    backgroundColor: "#fff",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 100,
  },
  timeText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 15,
  },
  rating: {
    display: "flex",
    flexDirection: "row",
  },
});
