import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../common/colors";
import { fontSizes } from "../common/fontSizes";
import Input from "./Input";
import { MaterialIcons } from "@expo/vector-icons";
// import { ScrollView } from "react-native-web";

export function LocationModal({
  isModalVisible,
  onCancel,
  locAddress,
  onSearch,
  searchQuery,
  handleSearch,
  searchResults,
  handleAddressSelection,
  address,
}) {
  return (
    <View>
      <Modal
        style={styles.modal}
        isVisible={isModalVisible}
        onBackdropPress={onCancel}
      >
        <View style={styles.bottom}>
          <View style={styles.header}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Input
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Enter a new address"
                height={50}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="my-location" size={15} color={colors.teal} />
              <Pressable
                onPress={() => {
                  handleAddressSelection(locAddress); // Call the handleAddressSelection function
                  onCancel(); // Close the modal
                }}
                style={({ pressed }) => [
                  styles.pressable,
                  pressed && styles.pressablePressed,
                ]}
              >
                <Text style={styles.text}>Use your current location</Text>
                <Text style={[styles.text, { color: "gray" }]}>
                  {locAddress}
                </Text>
              </Pressable>
            </View>
            {searchQuery ? (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "row" }}>
                    <Entypo
                      style={{ alignSelf: "center" }}
                      name="location-pin"
                      size={15}
                      color={colors.teal}
                    />
                    <Text
                      style={styles.text}
                      onPress={() => {
                        handleAddressSelection(item); // Set the selected address
                        onCancel(); // Close the modal
                      }}
                    >
                      {item.formatted_address}
                    </Text>
                  </View>
                )}
              />
            ) : (
              <Picker
                address={address}
                onCancel={onCancel}
                handleAddressSelection={handleAddressSelection}
              />
            )}

            {/* <Text
              style={{ fontWeight: "500", marginTop: 20, marginBottom: 15 }}
            >
              Saved locations
            </Text> */}
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Picker({ address, handleAddressSelection, onCancel }) {
  return (
    <FlatList
      style={{ height: "70%" }}
      data={address}
      keyExtractor={(item) => item.place_id}
      renderItem={({ item }) => (
        <Pressable
          style={styles.picker}
          onPress={() => {
            handleAddressSelection(item); // Set the selected address
            onCancel(); // Close the modal
          }}
        >
          <Entypo
            style={{ alignSelf: "center" }}
            name="location-pin"
            size={15}
            color={colors.teal}
          />
          <Text style={styles.text}>
            {`${item.street}, ${item.state}, ${item.city}`}
          </Text>
        </Pressable>
      )}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  bottom: {
    marginTop: "auto",
    alignSelf: "flex-end",
    width: "100%",
    height: "80%",
    padding: 5,
    borderStyle: "solid",
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    margin: 10,
  },
  picker: {
    display: "flex",
    flexDirection: "row",
    marginVertical: "2%",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    paddingBottom: 15,
  },
  pressable: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
  },
  pressablePressed: {
    backgroundColor: "lightblue",
  },
  text: {
    marginLeft: "3%",
  },
});

export default LocationModal;
