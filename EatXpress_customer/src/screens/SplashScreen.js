import React from "react";
import { StyleSheet, SafeAreaView, Text, Image } from "react-native";

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.img}
        source={require("../assets/MainLogo_Teal.png")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 300,
    height: 300,
  },
});

export default SplashScreen;
