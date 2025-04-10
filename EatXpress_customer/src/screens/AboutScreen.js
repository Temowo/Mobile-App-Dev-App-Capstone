import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { colors } from "../common/colors";
import { Linking } from "react-native";

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box1}>
        <Text>2023 FoodSwipe</Text>
        <Text style={{ color: colors.grey, margin: 10 }}>Made in Abuja</Text>
      </View>

      <View style={styles.box2}>
        <Text
          style={{ color: colors.teal }}
          onPress={() =>
            Linking.openURL(
              "https://www.privacypolicies.com/live/b2a64272-703e-464e-97a9-3e2968fa402b"
            )
          }
        >
          Terms and Conditions <Text style={{ fontSize: 40 }}>. </Text>
          <Text
            style={{ color: colors.teal }}
            onPress={() =>
              Linking.openURL(
                "https://www.privacypolicies.com/live/b2a64272-703e-464e-97a9-3e2968fa402b"
              )
            }
          >
            Privacy Policy
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  box1: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 300,
  },
  box2: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AboutScreen;
