import React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { colors } from "../common/colors";
import { fontSizes } from "../common/fontSizes";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Order(props) {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Pressable style={styles.card} onPress={() => toggleModal()}>
      <View style={styles.food} />
      <View style={styles.main}>
        <Text style={styles.status}>{props.progress}</Text>
        <Text style={styles.name}>{props.restaurant_id}</Text>
        <Text style={styles.date}>{`₦${props.total_cost} . ${props.inserted_at
          .split("")
          .splice(0, 10)
          .join("")}`}</Text>
      </View>
      {/* <AntDesign
        style={{ justifyContent: "flex-end" }}
        name="right"
        size={24}
        color="teal"
      /> */}
      <Info
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}
        goBack={toggleModal}
        total_cost={props.total_cost}
        address={props.address}
        restaurant={props.restaurant}
        date={props.inserted_at}
        number={props.reference}
        orders={props.orders}
      />
    </Pressable>
  );
}

const Info = (props) => {
  return (
    <SafeAreaView>
      <Modal style={styles.modal} isVisible={props.isModalVisible}>
        <View style={styles.bottom}>
          <Pressable onPress={props.goBack}>
            <Text style={{ marginTop: 30, marginLeft: 10 }}>Back</Text>
          </Pressable>
          <ScrollView
            style={styles.orderDetails}
            contentContainerStyle={styles.contentContainerStyle}
          >
            <View style={styles.orderCard}>
              <View style={styles.deliveryInfo}>
                <Text
                  style={{ color: colors.grey, fontSize: fontSizes.medium }}
                >
                  Order Number
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: fontSizes.small,
                    fontWeight: "500",
                  }}
                >
                  {props.number}
                </Text>
              </View>

              <View style={styles.deliveryInfo}>
                <Text style={{ color: colors.grey }}>Delivered From</Text>
                <Text
                  style={{ color: colors.black, fontSize: fontSizes.medium }}
                >
                  {props.restaurant}
                </Text>
              </View>
              <View style={styles.deliveryInfo}>
                <Text style={{ color: colors.grey }}>Delivered To</Text>
                <Text style={{ color: colors.grey }}>{props.address}</Text>
              </View>
              <View style={styles.deliveryInfo}>
                <Text style={{ color: colors.grey }}>Status</Text>
                <Text>
                  {`Delivered ${props.date.split("").splice(0, 10).join("")}`}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: colors.separator,
              }}
            />

            <View style={styles.orderCard}>
              {props.orders.map((item, i) => {
                return (
                  <View style={styles.orderInfo} key={i}>
                    <Text>{item.quantity}x</Text>
                    <Text>{item.name}</Text>
                    <Text>₦{item.price}</Text>
                  </View>
                );
              })}
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: colors.separator,
                  marginBottom: 20,
                  marginTop: 20,
                }}
              />
              <View style={styles.orderInfo}>
                <Text>Delivery Fee</Text>
                <Text>₦500</Text>
              </View>
              <View style={styles.orderInfo}>
                <Text>Total</Text>
                <Text>{`₦${props.total_cost}`}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  food: {
    margin: 5,
    width: 40,
    height: 40,
    backgroundColor: "orangered",
    borderRadius: 100,
  },
  main: {
    marginLeft: 20,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 5,
    margin: 4,
    borderRadius: 5,
  },
  status: {
    fontSize: fontSizes.small,
    color: colors.grey,
  },
  name: {
    fontSize: fontSizes.medium,
  },
  date: {
    fontSize: fontSizes.small,
  },

  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  bottom: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.bg,
  },
  orderDetails: {
    display: "flex",
  },
  orderCard: {
    backgroundColor: colors.white,
    padding: 10,
    margin: 20,
    borderRadius: 5,
  },
  orderInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
  },
  deliveryInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
});
