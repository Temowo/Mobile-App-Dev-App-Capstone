import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Pressable } from "react-native";
import Input from "../components/Input";
import { colors } from "../common/colors";
import { Button } from "../components/Button";
import { useFormik } from "formik";
import authentication from "../features/auth";
import { ResetPasswordSchema } from "../schema/YupSchema";

const ResetPasswordScreen = ({ navigation }) => {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (payload) => {
    setLoading(true);
    authentication("resetPassword", payload)()
      .then((res) => {
        if (res) {
          setLoading(false);
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      token: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      handleSubmit({ token: values.token, password: values.confirmPassword });
    },
    validationSchema: ResetPasswordSchema,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Reset Password</Text>
        <Text>Enter the token send to your email and a new password.</Text>
      </View>
      <View>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Input
            style={styles.input}
            placeholder="Token"
            autoCapitalize="none"
            onChangeText={formik.handleChange("token")}
            value={formik.values.token}
          />
          {formik.touched.token && formik.errors.token && (
            <Text style={{ color: "red", fontSize: 10 }}>
              {formik.errors.token}
            </Text>
          )}

          <Input
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={formik.handleChange("password")}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={{ color: "red", fontSize: 10 }}>
              {formik.errors.password}
            </Text>
          )}

          <Input
            style={styles.input}
            secureTextEntry={true}
            placeholder="Confirm Password"
            autoCapitalize="none"
            onChangeText={formik.handleChange("confirmPassword")}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Text style={{ color: "red", fontSize: 10 }}>
              {formik.errors.confirmPassword}
            </Text>
          )}

          <Text style={styles.error}>{error ? error.message : ""}</Text>

          <Button
            title="Reset Password"
            isLoading={loading}
            onPress={formik.handleSubmit}
          />

          <View style={styles.loginWrapper}>
            <Text>Remember now? </Text>

            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signup}>Login</Text>
            </Pressable>
          </View>
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
  titleContainer: {
    marginTop: 100,
    paddingLeft: 15,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    borderColor: colors.black,
    borderWidth: 1.5,
    borderRadius: 1,
    marginBottom: 40,
  },
  loginWrapper: {
    flexDirection: "row",
    marginTop: 10,
  },
  signup: {
    color: colors.teal,
    textDecorationLine: "underline",
  },
  error: {
    color: "red",
    marginVertical: 5,
  },
});

export default ResetPasswordScreen;
