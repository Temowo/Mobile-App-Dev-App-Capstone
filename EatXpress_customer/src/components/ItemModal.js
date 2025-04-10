import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "../components/Button";
import { useEffect } from "react";
import { useGlobalContext } from "../context/context";
import actions from "../context/actions";

const ItemModal = (props) => {
  const [quantity, setQuantity] = useState(1);

  const { dispatch } = useGlobalContext();

  useEffect(() => {
    if (props.item?.quantity) {
      setQuantity(props.item?.quantity);
    }
  }, [props.item]);

  const add = () => {
    setQuantity((prev) => prev + 1);
  };

  const minus = () => {
    setQuantity((prev) => {
      const num = prev - 1;
      if (num < 0) return 0;
      return num;
    });
  };

  const addToBasket = () => {
    dispatch({
      type: actions.addToBasket,
      payload: { item: props.item, quantity },
    });
    props.setItem();
    setQuantity(1);
  };

  const updateBasket = () => {
    dispatch({
      type: actions.updateBasket,
      payload: { item: props.item, quantity },
    });
    props.setItem();
    setQuantity(1);
  };

  return (
    <View>
      <Modal style={styles.modal} isVisible={props.isModalVisible}>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              props.toggleModal();
            }}
          >
            <AntDesign name="closecircleo" size={28} color="black" />
          </TouchableOpacity>
          <View style={styles.amount}>
            <Pressable onPress={minus}>
              <AntDesign name="minuscircleo" size={24} color="black" />
            </Pressable>
            <Text
              style={{ fontWeight: "bold", marginLeft: 20, marginRight: 20 }}
            >
              {quantity}
            </Text>
            <Pressable onPress={add}>
              <AntDesign name="pluscircleo" size={24} color="black" />
            </Pressable>
          </View>
          <Button
            title={
              props.screen === "restaurant" ? "Add to basket" : "Update basket"
            }
            onPress={() => {
              if (props.screen === "restaurant") {
                addToBasket();
              } else {
                updateBasket();
              }
              props.toggleModal();
            }}
            width={250}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  close: {
    position: "absolute",
    top: "5%",
    right: "5%",
  },
  bottom: {
    position: "relative",
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    backgroundColor: "white",
  },
  amount: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ItemModal;
