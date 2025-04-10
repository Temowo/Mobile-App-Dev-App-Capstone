import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  Platform,
  ActivityIndicator,
  Pressable,
  Text,
  Modal,
} from "react-native";
import { colors } from "../common/colors";
import AccountCard from "../components/AccountCard";
import actions from "../context/actions";
import { useGlobalContext } from "../context/context";
import { fontSizes } from "../common/fontSizes";
import profile from "../features/profile";

const AccountScreen = ({ navigation }) => {
  const { state, dispatch } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  const logout = async () => {
    dispatch({ type: actions.setIsLoggedIn, payload: false });
  };

  if (Platform.OS === "ios") {
    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <Button onPress={() => navigation.goBack()} title="< Home" />
        ),
      });
    }, []);
  }

  const handleDeleteAccount = () => {
    profile("deleteAccount")()
      .then((res) => {
        if (res) {
          console.log(res);
          // Confirm that the function is being called
          console.log("Closing modal...");
          handleCloseModal();
          //Log user out
          dispatch({ type: actions.setIsLoggedIn, payload: false });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section1}>
        <AccountCard
          screenName="My Orders"
          onPress={() => navigation.navigate("My Recent Orders")}
        />
      </View>
      <View style={styles.section2}>
        <AccountCard
          screenName="My Details"
          onPress={() => navigation.push("My Details")}
        />

        <AccountCard
          screenName="Delivery Address"
          onPress={() => navigation.push("Delivery Address")}
        />
      </View>
      <View style={styles.section3}>
        <AccountCard
          screenName="Help"
          onPress={() => navigation.push("Help")}
        />
        <AccountCard
          screenName="About"
          onPress={() => navigation.push("About")}
        />
        <AccountCard screenName="Logout" onPress={logout} />
      </View>

      <View style={styles.btnContainer}>
        <Pressable style={styles.btn} onPress={handleOpenModal}>
          {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.text}>Delete Account</Text>
          )}
        </Pressable>
      </View>
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Are you sure you want to delete your account? This action is
            irreversible and will permanently remove all your data.
          </Text>
          <View style={styles.modalBtn}>
            <Button color="red" onPress={handleDeleteAccount} title="Delete" />
            <Button onPress={handleCloseModal} title="Cancel" />
          </View>
        </View>
      </Modal>
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
  section2: {
    flex: 0.19,
    marginTop: 20,
  },
  section3: {
    flex: 0.19,
    marginTop: 35,
  },
  box1: {
    flex: 0.7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingLeft: 20,
    paddingRight: 10,
  },
  box2: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingLeft: 20,
    paddingRight: 10,
  },
  arrow: {
    margin: 5,
    width: 25,
    height: 25,
    backgroundColor: colors.white,
    borderRadius: 100,
  },
  btnContainer: {
    alignItems: "center",
    marginTop: 80,
  },
  btn: {
    padding: 10,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: "35%",
  },
  text: {
    color: colors.white,
    fontSize: fontSizes.small,
    fontWeight: "700",
  },

  modalText: {
    fontSize: fontSizes.small,
  },
  modalBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    width: 150,
  },

  modalView: {
    margin: 20,
    top: "25%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AccountScreen;
