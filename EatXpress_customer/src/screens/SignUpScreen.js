import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import Input from "../components/Input";
import { colors } from "../common/colors";
import { Button } from "../components/Button";
import { useFormik } from "formik";
import authentication from "../features/auth";
import { SignUpSchema } from "../schema/YupSchema";

const SignUpScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (payload) => {
    setLoading(true);
    authentication("register", payload)()
      .then((res) => {
        if (res) {
          console.log(res);
          navigation.navigate("Verify", { email: formik.values.email });
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
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
      handleSubmit(values);
    },
    validationSchema: SignUpSchema,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign up</Text>
      </View>

      <ScrollView>
        <View style={styles.inputContainer}>
          <View
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input
              style={styles.input}
              placeholder="Name"
              onChangeText={formik.handleChange("name")}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <Text style={{ color: "red", fontSize: 10 }}>
                {formik.errors.name}
              </Text>
            )}

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

            {/* <Input
              style={styles.input}
              secureTextEntry={true}
              placeholder="Confirm password"
              autoCapitalize="none"
              onChangeText={formik.handleChange("confirmPassword")}
              value={formik.values.confirmPassword}
            />
            {formik.touched.password && formik.errors.password && (
              <Text style={{ color: "red", fontSize: 10 }}>
                {formik.errors.password}
              </Text>
            )} */}

            <Input
              style={styles.input}
              secureTextEntry={false}
              placeholder="Phone"
              autoCapitalize="none"
              onChangeText={formik.handleChange("phone")}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <Text style={{ color: "red", fontSize: 10 }}>
                {formik.errors.phone}
              </Text>
            )}

            <Button
              isLoading={loading}
              title="SIGN UP"
              onPress={formik.handleSubmit}
            />
            <Text style={styles.error}>{error ? error.message : ""}</Text>

            <Text style={{ marginBottom: 15 }}>Or</Text>

            <View style={styles.signinWrapper}>
              <Text>Already have an account? </Text>

              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.signin}>Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
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
  inputContainer: {
    marginTop: 10,
  },
  input: {
    borderColor: colors.black,
    borderWidth: 1.5,
    borderRadius: 1,
  },
  signinWrapper: {
    flexDirection: "row",
  },
  signin: {
    color: colors.teal,
    textDecorationLine: "underline",
  },
  error: {
    color: "red",
    marginVertical: 5,
  },
});

export default SignUpScreen;
