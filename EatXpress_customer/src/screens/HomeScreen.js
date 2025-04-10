import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Pressable,
  Platform,
  StatusBar,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { fontSizes } from "../common/fontSizes";
import Input from "../components/Input";
import Card from "../components/Card";
import Restaurant from "../components/Restaurant";
import { LocationModal } from "../components/LocationModal";
import { colors } from "../common/colors";
import actions from "../context/actions";
import { useGlobalContext } from "../context/context";
import order from "../features/order";
import * as Location from "expo-location";
import req from "../axios/req";
import profile from "../features/profile";

function HomeScreen({ navigation }) {
  const { state, dispatch } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectVisible, setSelectVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [vendors, setVendors] = useState([]);

  console.log("Delivery Address:", state.deliveryAddress);

  const [currentLocation, setCurrentLocation] = useState({
    location: {},
    address: "loading...",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  const currentLocationCoords = currentLocation?.location?.coords;
  const latitude = currentLocationCoords?.latitude;
  const longitude = currentLocationCoords?.longitude;

  // useEffect(() => {
  //   dispatch({
  //     type: actions.setDeliveryAddress,
  //     payload: {
  //       address: currentLocation?.address,
  //       lat: latitude,
  //       lng: longitude,
  //     },
  //   });
  // }, [currentLocation]);

  const handleAddAddress = (payload) => {
    profile("addAddress", payload)().then((res) => {
      if (res) {
        console.log("Add address", res);
      }
    });
  };

  // Search location
  const handleSearch = async (text) => {
    setQuery(text);

    // Send a search request as the user types
    const apiKey = process.env.GOOGLE_MAPS_APIKEY; // Replace with your Google Maps API Key
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${text}&key=${apiKey}`;

    try {
      const response = await req.get(apiUrl);
      const results = response.data.results;
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Update this function to set the selectedAddress
  const handleAddressSelection = (item) => {
    console.log("Passed item", item);
    const currentLocationCoords = currentLocation?.location?.coords;
    const latitude = currentLocationCoords?.latitude;
    const longitude = currentLocationCoords?.longitude;

    const address =
      item.street || item.formatted_address || currentLocation?.address;

    const setDeliveryAddressPayload = {
      address: address,
      lat: item.lat || item?.geometry?.location?.lat || latitude,
      lng: item.lng || item?.geometry?.location?.lng || longitude,
    };

    // Set global address state
    dispatch({
      type: actions.setDeliveryAddress,
      payload: setDeliveryAddressPayload,
    });

    const addressParts = address.split(",");
    const street = addressParts.slice(0, 3).join(",").trim();
    const state = addressParts.slice(-2, -1).toString().trim();

    const addAddressData = {
      street: street,
      city: "Abuja",
      state: state,
      lat: setDeliveryAddressPayload.lat,
      lng: setDeliveryAddressPayload.lng,
    };

    handleAddAddress(addAddressData);

    // console.log("CLICK", address);
  };

  // useEffect(() => {
  //   getLocationAsync();
  // }, []);

  // Get user current location
  const getLocationAsync = async () => {
    // Getting location from Expo Location
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      setCurrentLocation((prevLocation) => ({
        ...prevLocation,
        location: location,
      }));

      // Reverse Geocoding
      const { latitude, longitude } = location.coords;
      const apiKey = process.env.GOOGLE_MAPS_APIKEY;
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

      try {
        const response = await req.get(apiUrl);
        if (response.data.results.length > 0) {
          const result = response.data.results[0];
          const fullAddress = result.formatted_address;
          setCurrentLocation((prevLocation) => ({
            ...prevLocation,
            address: fullAddress,
          }));

          // Truncate the address
          const maxLength = 30; // Maximum length for the truncated address
          let truncatedAddress = fullAddress;

          if (fullAddress.length > maxLength) {
            truncatedAddress = fullAddress.substring(0, maxLength - 3) + "...";
          }

          // setSelectedAddress(truncatedAddress);
        } else {
          setCurrentLocation((prevLocation) => ({
            ...prevLocation,
            address: "No address found",
          }));
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    } else {
      console.log("Location permission denied");
    }
  };

 // Get vendor list
  useEffect(() => {
    order("getVendors")()
      .then((res) => {
        if (res) {
           console.log("Vendor List:", res.data.data);
          setVendors(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <Pressable onPress={() => setModalVisible(true)}>
            <View style={styles.location}>
              <Text
                style={{
                  fontSize: fontSizes.small,
                  color: colors.black,
                  fontWeight: "600",
                }}
              >
                Delivery
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: fontSizes.small,
                    marginRight: 10,
                    color: colors.teal,
                  }}
                >
                  {/* {state?.deliveryAddress?.address.length > 30
                    ? currentLocation.address.substring(0, 30 - 3) + "..."
                    : currentLocation.address} */}
                  {state?.deliveryAddress.address
                    ? state?.deliveryAddress?.address?.substring(0, 30 - 3) +
                      "..."
                    : currentLocation.address.substring(0, 30 - 3) + "..."}
                </Text>
                <AntDesign name="down" size={14} color={colors.teal} />
              </View>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.push("Profile")}>
            <View style={styles.icon}>
              <AntDesign name="user" size={24} color="black" />
            </View>
          </Pressable>
        </View>
        <View>
          {/* <Input
            height={35}
            width={300}
            value={search}
            onChangeText={(textValue) => setSearch(textValue)}
            placeholder="Dishes, restaurants or cuisines"
          /> */}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.h1}>Restaurants</Text>
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {vendors
            ?.map((i, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate("Menu", {
                    screen: "Restaurant",
                    params: {
                      vendor_image: i.avatar,
                      vendor_id: i.id,
                      vendor_name: i.name,
                    },
                  })
                }
              >
                <Card
                  name={i.name}
                  rate={i.rate}
                  cuisine={i.cuisine}
                  bg={colors.teal}
                  image={i?.avatar}
                />
              </Pressable>
            ))
            .reverse()}
        </ScrollView> */}
        {vendors?.map((i, index) => (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate("Menu", {
                screen: "Restaurant",
                params: {
                  vendor_image: i.avatar,
                  vendor_id: i.id,
                  vendor_name: i.name,
                },
              })
            }
          >
            <Restaurant
              name={i.name}
              rate={4.6}
              cuisine={"African . Nigerian"}
              bg="gray"
              image={i?.avatar}
            />
          </Pressable>
        ))}
      </ScrollView>
      <LocationModal
        isModalVisible={modalVisible}
        onCancel={() => setModalVisible(!modalVisible)}
        onSearch={handleSearch}
        locAddress={currentLocation.address} // Pass selectedAddress instead of address
        searchQuery={query}
        handleSearch={handleSearch}
        searchResults={searchResults}
        handleAddressSelection={handleAddressSelection} // Pass the function
        address={state.address}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 5,
  },
  top: {
    padding: 10,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
  },
  location: {
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    height: 35,
    width: 35,
    backgroundColor: colors.white,
    borderRadius: 100,
  },
  scroll: {
    height: 90,
  },
  h1: {
    margin: 5,
    fontSize: fontSizes.large,
    fontWeight: "bold",
    color: colors.grey,
  },
});

export default HomeScreen;
