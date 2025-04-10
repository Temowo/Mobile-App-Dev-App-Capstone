import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, Pressable } from "react-native";
import { colors } from "../common/colors";
import { fontSizes } from "../common/fontSizes";
import Order from "../components/Order";
import { ScrollView } from "react-native";
import MenuCard from "../components/MenuCard";
import OrderCard from "../components/OrderCard";
import order from "../features/order";

export default function OrderScreen({ navigation }) {
  const [orders, setOrders] = useState([]);

  const handleGetOrders = () => {
    order("getOrders")().then((res) => {
      if (res) {
        console.log(res.data.data);
        setOrders(res.data.data.orders);
      }
    });
  };

  useEffect(() => {
    handleGetOrders();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {orders.map((item, i) => (
          <OrderCard
            key={i}
            onPress={() => {
              navigation.navigate("Profile", {
                screen: "Order Summary",
                params: {
                  order_details: item,
                },
              });
              // setItem(m);
              // toggleModal();
            }}
            // navigation.navigate("Menu", {
            //         screen: "Restaurant",
            //         params: {
            //           vendor_image: i.avatar,
            //           vendor_id: i.id,
            //           vendor_name: i.name,
            //         },
            //       })
            name={item.vendorName}
            reference={item._id}
            progress={item.status}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  box: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    borderBottomWidth: 0.5,
    borderColor: colors.separator,
  },
});
