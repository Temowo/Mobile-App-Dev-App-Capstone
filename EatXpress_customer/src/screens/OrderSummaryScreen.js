import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../common/colors";

const OrderSummaryScreen = ({ route }) => {
  const { order_details } = route.params;

  const delivery_fee = 400;
  const service_fee = 50;
  return (
    <View style={styles.container}>
      <View style={styles.details_card}>
        <Text style={styles.heading}>Your order details</Text>
        <ScrollView style={styles.scrollView}>
          {order_details.items.map((item, index) => (
            <View style={styles.scrollContainer} key={index}>
              <>
                <View style={styles.scrollViewItems}>
                  <Text>{item.quantity}</Text>
                  <Text style={styles.xIcon}>x</Text>
                  <Text style={styles.name}>{item.name}</Text>
                </View>

                <Text>{`₦${item.amount}`}</Text>
              </>
            </View>
          ))}
        </ScrollView>

        <View style={styles.subContainer}>
          <View style={styles.price}>
            <Text>Subtotal</Text>
            <Text>{`₦${order_details.amount}`}</Text>
          </View>
          <View style={styles.price}>
            <Text>Delivery Fee</Text>
            <Text>{`₦${delivery_fee}`}</Text>
          </View>
          <View style={styles.price}>
            <Text>Service Fee</Text>
            <Text>{`₦${service_fee}`}</Text>
          </View>
          <View style={styles.price}>
            <Text>Order Total</Text>
            <Text>{`₦${
              order_details.amount + delivery_fee + service_fee
            }`}</Text>
          </View>

          <View style={styles.vendorDetails}>
            <Text>Vendor</Text>
            <Text>{order_details.vendorName}</Text>
          </View>

          <View style={styles.orderId}>
            <Text>Order ID</Text>
            <Text>{order_details._id}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    height: "100%",
  },

  img: {
    width: 150,
    height: 25,
  },

  details_card: {
    backgroundColor: colors.white,
    borderRadius: 25,
    height: "90%",
    width: "90%",
    padding: "5%",
    marginTop: "5%",
  },
  scrollView: {
    backgroundColor: colors.bg,
    padding: "2%",
  },
  scrollContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  scrollViewItems: {
    flexDirection: "row",
  },

  heading: {
    fontWeight: "bold",
    alignSelf: "center",
  },

  icon: {
    marginRight: "3%",
  },
  name: {
    paddingLeft: 10,
  },
  price: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 0,
  },
  orderId: {
    marginTop: "20%",
  },
  xIcon: {
    color: colors.teal,
    marginLeft: 3,
  },
  subContainer: {
    marginTop: 20,
  },
  vendorDetails: {
    marginTop: "20%",
  },
});
