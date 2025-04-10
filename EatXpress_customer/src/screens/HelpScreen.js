import React from "react";
import { StyleSheet, SafeAreaView, View, Linking } from "react-native";
import AccountCard from "../components/AccountCard";
import { colors } from "../common/colors";
// import * as Linking from "expo-linking";

const HelpScreen = () => {
  const onPressHandler = () => {
    Linking.openURL("mailto:somethingemail@gmail.com");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section1}>
        <AccountCard
          screenName="Contact us about your order"
          onPress={() => Linking.openURL("mailto:support@foodswipe.com.ng")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  section1: {
    flex: 0.1,
    marginTop: 50,
  },
});

export default HelpScreen;
