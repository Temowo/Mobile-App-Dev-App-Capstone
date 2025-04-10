import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Pressable } from "react-native";
import Input from "../components/Input";
import { colors } from "../common/colors";
import { Button } from "../components/Button";
import { useFormik } from "formik";
import authentication from "../features/auth";
import { VerifyAccountSchema } from "../schema/YupSchema";

const VerifyScreen = ({ route, navigation }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { email } = route.params;
  //   console.log("EMAIL:", email);

  const handleSubmit = (payload) => {
    setLoading(true);
    authentication("verifyAccount", payload)()
      .then((res) => {
        if (res) {
          console.log("SUCCESS:", res);
          navigation.navigate("Login");
          setLoading(false);
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
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
      handleSubmit({ token: values.token, email: email });
    },
    validationSchema: VerifyAccountSchema,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Verify your account</Text>
      </View>
      <View style={styles.paragraph}>
        <Text>Enter the token sent to yor email to verify your account</Text>
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

          {/* <Input
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
          )} */}

          <Text style={styles.error}>{error ? error.message : ""}</Text>

          <Button
            title="Verify"
            isLoading={loading}
            onPress={formik.handleSubmit}
          />

          <View style={styles.signupWrapper}>
            <Text>Didn't get an email?</Text>

            {/* <Pressable onPress={() => navigation.navigate("Signup")}> */}
            <Text style={styles.signup}>Resend token</Text>
            {/* </Pressable> */}
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
  paragraph: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    borderColor: colors.black,
    borderWidth: 1.5,
    borderRadius: 1,
    marginBottom: 40,
  },
  signupWrapper: {
    flexDirection: "row",
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

export default VerifyScreen;
