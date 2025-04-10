import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../common/colors";
import { Button } from "../components/Button";

const AnchorScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <View style={{ marginTop: 90 }}>
          <Image
            style={styles.img}
            source={require("../assets/MainLogo_Teal.png")}
          />
        </View>
        <View style={styles.section}>
          <Button title="Login" width={150} />
          <Button title="Resgister" width={150} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  container2: {
    flex: 0.8,
    // backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-between",
  },
  section: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    width: 500,
  },
  img: {
    flex: 0.5,
    width: 300,
    height: 300,
    // backgroundColor: "yellow",
  },
});

export default AnchorScreen;
