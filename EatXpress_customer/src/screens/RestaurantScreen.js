import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Pressable,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { colors } from "../common/colors";
import MenuCard from "../components/MenuCard";
import { BasketButton } from "../components/Button";
import ItemModal from "../components/ItemModal";
import { useGlobalContext } from "../context/context";
import order from "../features/order";
import Header from "../components/Header";
import req from "../axios/req";

const RestaurantScreen = ({ route, navigation }) => {
  const { vendor_image, vendor_id, vendor_name } = route.params;
  const [menu, setMenu] = useState([]);
  const [menuId, setMenuId] = useState();
  const {
    state: { basket },
  } = useGlobalContext();

  console.log("menue for vendor",vendor_id);

  useEffect(() => {
    console.log("Vendor IDD:", vendor_id);
    const fetchMenu = async () => {
      // const response = await order("getMenu", vendor_id)();
      try {
      const response = await req.get(`menu/1`);
     // console.log("Menu Response:", response.data.data.menus);
       setMenu(response.data.data.menus);
       setMenuId(response.data.data.menus[0]._id);
      } catch (error) {
        console.log("Error fetching menu:", error);
      }
    }
    fetchMenu();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isBasket, setIsBasket] = useState(false);
  const [item, setItem] = useState();

  const basketItemCount = basket
    ?.map((i) => i.quantity)
    .reduce((prevValue, currentValue) => prevValue + currentValue, 0);

  const toggleModal = () => {
    setModalVisible((prev) => !prev);
    setIsBasket(true);
  };

  const viewBasket = () => {
    if (!basket.length) return;
    navigation.navigate("Basket", {
      vendor_id,
      vendor_name,
      vendor_name,
      menuId,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header vendor_image={vendor_image} back={() => navigation.goBack()} />
      <View style={styles.main}>
        <View style={styles.title}>
          <Text style={{ color: colors.grey, marginTop: 5, marginLeft: 5 }}>
            Nigerian . African
          </Text>
          <Text style={{ color: colors.grey, marginTop: 5, marginLeft: 5 }}>
            Delivery N400 . Min Order N1500
          </Text>
        </View>

        <View style={styles.sub_menu}>
          <Pressable>
            <Text style={styles.link}>Starters</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.link}>Drinks</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.link}>Main Course</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.link}>Desert</Text>
          </Pressable>
        </View>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {menu?.map((m, i) => (
            <MenuCard
              key={i}
              onPress={() => {
                setItem(m);
                toggleModal();
              }}
              url={m.imagePath}
              food={m.name}
              description={m.description}
              price={`₦${m.price}`}
            />
          ))}
        </ScrollView>
      </View>

      <View style={isBasket ? { display: "flex" } : { display: "none" }}>
        <BasketButton
          title="View Basket"
          count={basketItemCount}
          onPress={viewBasket}
        />
      </View>
      <ItemModal
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}
        item={item}
        setItem={setItem}
        screen="restaurant"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
  main: {
    flex: 5,
    paddingHorizontal: 5,
  },
  title: {
    justifyContent: "center",
    backgroundColor: colors.white,
    paddingLeft: 5,
    zIndex: 1,
  },
  sub_menu: {
    flexDirection: "row",
    marginLeft: 10,
    justifyContent: "space-between",
    paddingTop: 10,
    backgroundColor: colors.bg,
  },
  link: {
    fontWeight: "300",
  },
});

export default RestaurantScreen;
