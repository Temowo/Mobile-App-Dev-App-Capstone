import React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../common/colors";
import { AntDesign } from "@expo/vector-icons";

const Header = ({ vendor_image, back }) => {
  return (
    <View style={styles.header}>
      {vendor_image ? (
        <ImageBackground
          source={{
            uri: vendor_image,
          }}
          style={styles.backgroundImage}
        >
          <View style={styles.border}>
            <Pressable onPress={back}>
              <AntDesign name="arrowleft" size={24} color={colors.black} />
            </Pressable>
          </View>
          <View style={styles.border}>
            <AntDesign name="info" size={24} color="black" />
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.placeholderContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.border}>
              <Pressable onPress={back}>
                <AntDesign name="arrowleft" size={24} color={colors.black} />
              </Pressable>
            </View>
            <View style={styles.border}>
              <AntDesign name="info" size={24} color="black" />
            </View>
          </View>
          <View style={styles.placeholder}>
            <Image source={require("../../assets/vendors.png")} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flex: 1.1,
    flexDirection: "row",
    padding: 5,
  },
  backgroundImage: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeholderContainer: {
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  border: {
    margin: 5,
    width: 25,
    height: 25,
    backgroundColor: colors.white,
    borderRadius: 100,
  },
  iconContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: "0.3",
  },
  placeholder: {
    width: "30%",
    flex: "1",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
