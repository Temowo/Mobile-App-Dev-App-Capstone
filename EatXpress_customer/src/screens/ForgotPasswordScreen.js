import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Pressable } from "react-native";
import Input from "../components/Input";
import { colors } from "../common/colors";
import { Button } from "../components/Button";
import { useFormik } from "formik";
import authentication from "../features/auth";
import { ForgotPasswordSchema } from "../schema/YupSchema";

const ForgotPasswordScreen = ({ navigation }) => {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (payload) => {
    setLoading(true);
    authentication("forgetPassword", payload)()
      .then((res) => {
        if (res) {
          console.log(res);
          setLoading(false);
          navigation.navigate("ResetPassword");
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
    validationSchema: ForgotPasswordSchema,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text>Enter your email to get a password reset link.</Text>
      </View>
      <View>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Input
            style={styles.input}
            placeholder="Email"
            type="email-address"
            autoCapitalize="none"
            onChangeText={formik.handleChange("email")}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <Text style={{ color: "red", fontSize: 10 }}>
              {formik.errors.email}
            </Text>
          )}

          <Text style={styles.error}>{error ? error.message : ""}</Text>

          <Button
            title="Send Reset Link"
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
  forgotPassword: {
    marginTop: 10,
  },
});

export default ForgotPasswordScreen;
