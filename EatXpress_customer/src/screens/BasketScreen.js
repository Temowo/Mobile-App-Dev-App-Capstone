import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { colors } from "../common/colors";
import BasketCard from "../components/BasketCard";
import { Button } from "../components/Button";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import ItemModal from "../components/ItemModal";
import { useGlobalContext } from "../context/context";
import order from "../features/order";

const windowWidth = Dimensions.get("window").width;

const BasketScreen = ({ route, navigation }) => {
  const { state } = useGlobalContext();
  const { vendor_id, vendor_name, menuId } = route.params;
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);
  const [cost, setCost] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState();

  const {
    state: { basket },
  } = useGlobalContext();

  // console.log("STATE:", state?.deliveryAddress);
  // console.log("BASKET:", basket);

  //Temporary
  const totalCost = cost + 400;

  const sum = basket.reduce(function (currentTotal, obj) {
    var price = parseFloat(obj.price * obj.quantity);
    if (!isNaN(price)) return currentTotal + price;
    return currentTotal;
  }, 0);

  useEffect(() => {
    setCost(sum);
  }, [basket]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const sendOrder = (payload) => {
    console.log("Payload:", payload);
    order("createOrder", payload)()
      .then((res) => {
        if (res) {
          console.log("RES:", res);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.box, styles.time]}>
          <Text>Delivery in 30 minutes</Text>
        </View>

        <BasketCard
          heading="Delivery Address"
          value={state?.deliveryAddress.address}
        />
        <BasketCard heading="Phone Number" value={`+${state.user.phone}`} />
        {/* <BasketCard heading="Payment Details" value="123x xxxx xxxx xxxx" /> */}
        {basket.map((t, i) => (
          <Pressable
            onPress={() => {
              setItem(t);
              toggleModal();
            }}
            key={i}
            style={[styles.box, styles.basketCard]}
          >
            <View style={{ flexDirection: "row" }}>
              <Text>{t.quantity}</Text>
              <Text style={{ color: colors.teal }}>x</Text>
              <Text style={{ paddingLeft: 10 }}>{t.name}</Text>
            </View>
            <Text>{`₦${t.price * t.quantity}`}</Text>
          </Pressable>
        ))}

        <View style={[styles.bigBox]}>
          <View style={styles.price}>
            <Text>Subtotal</Text>
            <Text>{`₦${cost}`}</Text>
          </View>
          <View style={styles.price}>
            <Text>Delivery Fee</Text>
            <Text>₦400</Text>
          </View>
          <View style={styles.price}>
            <Text>Order Total</Text>
            <Text>{`₦${totalCost}`}</Text>
          </View>
        </View>
      </ScrollView>
      {/* <View style={[styles.box, styles.voucher]}>
        <Text style={styles.voucherText}>Add voucher code</Text>
      </View> */}

      <Paystack
        paystackKey={publicKey}
        billingEmail="paystackwebview@something.com"
        amount={cost + 400}
        onCancel={(e) => {
          console.log("Payment Canceled");
        }}
        onSuccess={(res) => {
          console.log("Response:", res);
          // Make order here
          sendOrder({
            menuId: menuId,
            items: basket.map((item, i) => ({
              name: item.name,
              quantity: item.quantity,
              amount: item.price,
            })),
            payment_reference: res.data.transactionRef.reference,
            isPaid: true,
            deliveryInfo: {
              address: state?.deliveryAddress.address,
              lat: state?.deliveryAddress.lat,
              lng: state?.deliveryAddress.lng,
              phone: `+${state.user.phone}`,
            },
          });
          navigation.navigate("OrderConfirmationScreen", {
            test: basket,
            subtotal: cost,
            orderTotal: totalCost,
          });
          // console.log("Success");
        }}
        ref={paystackWebViewRef}
      />

      <View style={{ alignItems: "center" }}>
        <Button onPress={() =>       sendOrder({
            menuId: menuId,
            amount: basket[0].price,
            quantity: basket[0].quantity,
            payment_type: "card",
            isPaid: true,
            deliveryInfo: {
              address: "International House, 6th Floor, 2, Marina Rd, Lagos",
              lat: "40.741895",
              lng: "-73.989308",
              phone: `+${state.user.phone}`,
            },
            // items: basket.map((item, i) => ({
            //   name: item.name,
            //   quantity: item.quantity,
            //   amount: item.price,
            // })),
            // payment_reference: "0123DFRE",
            // isPaid: true,
            // deliveryInfo: {
            //   address: "International House, 6th Floor, 2, Marina Rd, Lagos",
            //   lat: "40.741895",
            //   lng: "-73.989308",
            //   phone: `+${state.user.phone}`,
            // },
          })}

          // onPress={() => paystackWebViewRef.current.startTransaction()}
          title="Place delivery order"
        />
      </View>

      <ItemModal
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}
        item={item}
        setItem={setItem}
        screen="basket"
      />
    </SafeAreaView>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  box: {
    padding: 10,
    marginBottom: 1,
    width: "100%",
    height: 40,
    backgroundColor: colors.white,
  },
  bigBox: {
    padding: 10,
    marginBottom: 0,
    width: "100%",
    backgroundColor: colors.white,
  },
  time: {
    justifyContent: "center",
    marginBottom: "2%",
  },
  basketCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  voucher: {
    justifyContent: "center",
  },
  voucherText: {
    color: colors.teal,
  },
  price: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 0,
  },
});
