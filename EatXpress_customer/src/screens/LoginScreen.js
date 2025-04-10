import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Pressable } from "react-native";
import Input from "../components/Input";
import { colors } from "../common/colors";
import { Button } from "../components/Button";
import { useFormik } from "formik";
import { LoginSchema } from "../schema/YupSchema";
import authentication from "../features/auth";
import { useGlobalContext } from "../context/context";
import actions from "../context/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useGlobalContext();

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("accessToken", value);
    } catch (e) {
      // saving error
    }
  };

  const handleSubmit = (payload) => {
    const x=authentication("login", payload)
    console.log(x)
    setLoading(true);
    authentication("login", payload)()
      .then((res) => {
        if (res) {
          setLoading(false);
          dispatch({ type: actions.setIsLoggedIn, payload: true });
          dispatch({ type: actions.setUser, payload: res.data.data.user });
          dispatch({
            type: actions.setAddress,
            payload: res.data.data.address,
          });
          storeData(res.data.data.accessToken);
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
      password: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: LoginSchema,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Log In</Text>
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

          <Text style={styles.error}>{error ? error.message : ""}</Text>

          <Button
            title="LOG IN"
            isLoading={loading}
            onPress={formik.handleSubmit}
          />

          <View style={styles.signupWrapper}>
            <Text>Don't have an account? </Text>

            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signup}>Signup</Text>
            </Pressable>
          </View>
          <View style={styles.forgotPassword}>
            <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.signup}>Forgot password?</Text>
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
  forgotPassword: {
    marginTop: 10,
  },
});

export default LoginScreen;
