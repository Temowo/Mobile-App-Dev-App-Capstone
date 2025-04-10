import React from "react";
import { StyleSheet, View, Button } from "react-native";
import Modal from "react-native-modal";

export const EditModal = ({ isModalVisible, onCancel, onDone, children }) => {
  return (
    <View>
      <Modal style={styles.modal} isVisible={isModalVisible}>
        <View style={styles.bottom}>
          <View style={styles.header}>
            <Button onPress={onCancel} title="Cancel"></Button>
            <Button onPress={onDone} title="Done"></Button>
          </View>
          {children}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  bottom: {
    width: "100%",
    height: "100%",
    padding: 30,
    borderStyle: "solid",
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
