import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import { colors } from "../common/colors";
import { AntDesign } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, Geojson, Polyline } from "react-native-maps";
import { Marker } from "react-native-maps";
import rider from "../assets/bike.png";
import MapViewDirections from "react-native-maps-directions";
import { useGlobalContext } from "../context/context";

const OrderConfirmationScreen = ({ route }) => {
  const { state } = useGlobalContext();
  const [orders, setOrders] = useState([]);
  const [cost, setCost] = React.useState(0);

  const riderUri = Image.resolveAssetSource(rider).uri;

  const origin = { latitude: 9.064239375305403, longitude: 7.484174211692194 };
  const destination = {
    latitude: state?.deliveryAddress.lat,
    longitude: state?.deliveryAddress.lng,
  };

  console.log("STATE:", state?.deliveryAddress);

  const { test, subtotal, orderTotal } = route.params;
  console.log("TEST:", test);
  //Temporary
  const totalCost = cost + 400;

  const sum = test.reduce(function (currentTotal, obj) {
    var price = parseFloat(obj.price * obj.quantity);
    if (!isNaN(price)) return currentTotal + price;
    return currentTotal;
  }, 0);

  // const myPlace = {
  //   type: "FeatureCollection",
  //   features: [
  //     {
  //       type: "Feature",
  //       properties: {},
  //       geometry: {
  //         type: "Point",
  //         coordinates: [9.064334729011716, 7.4847964840119365],
  //       },
  //     },
  //   ],
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.img}
        source={require("../assets/MainLogo_Teal.png")}
      />
      <View style={styles.card}>
        {orders.length !== 0 ? (
          <View style={{ flexDirection: "row" }}>
            <AntDesign
              name="checkcircleo"
              size={13}
              color={colors.teal}
              style={styles.icon}
            />
            <Text>Order accepted by vendor</Text>
          </View>
        ) : null}

        <View style={{ flexDirection: "row", marginTop: "10%" }}>
          <AntDesign
            name="checkcircleo"
            size={13}
            color={colors.teal}
            style={styles.icon}
          />

          <Text>The vendor is confirming your order</Text>
        </View>
      </View>

      <View style={styles.details_card}>
        <Text style={styles.heading}>Your order details</Text>
        <ScrollView style={{ backgroundColor: colors.bg }}>
          {test.map((t, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text>{t.quantity}</Text>
                <Text style={{ color: colors.teal }}>x</Text>
                <Text style={{ paddingLeft: 10 }}>{t.name}</Text>
              </View>

              <Text>{`₦${t.price * t.quantity}`}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={{ marginTop: 20 }}>
          <View style={styles.price}>
            <Text>Subtotal</Text>
            <Text>{`₦${subtotal}`}</Text>
          </View>
          <View style={styles.price}>
            <Text>Delivery Fee</Text>
            <Text>₦400</Text>
          </View>
          <View style={styles.price}>
            <Text>Order Total</Text>
            <Text>{`₦${orderTotal}`}</Text>
          </View>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <Text style={styles.heading}>Track your Rider</Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            // Switch with rider location
            latitude: state?.deliveryAddress.lat,
            longitude: state?.deliveryAddress.lng,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          style={styles.map}
        >
          {/* Rider location */}
          <Marker
            coordinate={{
              latitude: 9.064239375305403,
              longitude: 7.484174211692194,
            }}
            image={{ uri: riderUri }}
          />

          {/* Customer location */}
          <Marker
            coordinate={{
              latitude: state?.deliveryAddress.lat,
              longitude: state?.deliveryAddress.lng,
            }}
          />

          {/* A polyline will be drawn between the origin and destination route */}
          <MapViewDirections
            // Origin will be the restaurants location
            origin={origin}
            destination={destination}
            apikey={process.env.GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor={colors.teal}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
  img: {
    width: 150,
    height: 25,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 25,
    height: "20%",
    width: "90%",
    padding: "5%",
  },
  details_card: {
    backgroundColor: colors.white,
    borderRadius: 25,
    height: "35%",
    width: "90%",
    padding: "5%",
  },
  mapContainer: {
    backgroundColor: colors.white,
    borderRadius: 25,
    height: "37%",
    width: "90%",
    padding: "2%",
  },
  map: {
    width: "100%",
    height: "92%",
    borderRadius: 25,
  },
  heading: {
    fontWeight: "bold",
    alignSelf: "center",
  },

  icon: {
    marginRight: "3%",
  },
  price: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 0,
  },
});

export default OrderConfirmationScreen;
