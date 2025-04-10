import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import Input from "../components/Input";
import { colors } from "../common/colors";
import { Button } from "../components/Button";

const RegisterScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Register</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            width={343}
            height={52}
            placeholder="Email"
          />
          <Input
            style={styles.input}
            width={343}
            height={52}
            placeholder="Password"
          />
        </View>

        <View>
          <Button title="Next" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  card: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  titleContainer: {
    marginTop: 100,
    paddingLeft: 15,
  },
  title: {
    fontSize: 30,
  },
  inputContainer: {
    marginTop: 80,
  },
  input: {
    borderColor: colors.black,
    borderWidth: 1.5,
    borderRadius: 1,
  },
});

export default RegisterScreen;
