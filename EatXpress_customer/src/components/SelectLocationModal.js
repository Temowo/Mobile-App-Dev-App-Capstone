import React from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal";

const SelectLocationModal = ({ isVisible, onBackdropPress }) => {
  return (
    <View>
      <Modal
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
        isVisible={isVisible}
        // backdropOpacity={0.7} // Adjust opacity as needed
        onBackdropPress={onBackdropPress}
      >
        <View
          style={{
            marginTop: "auto",
            alignSelf: "flex-end",
            width: "100%",
            height: "20%",
            padding: 10,
            borderStyle: "solid",
            backgroundColor: "white",
          }}
        >
          <Text style={{ fontWeight: "700" }}>Your location</Text>
          <View style={{ marginTop: "5%" }}>
            <Text>Search somewhere else</Text>
            <Text>Current location</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SelectLocationModal;
