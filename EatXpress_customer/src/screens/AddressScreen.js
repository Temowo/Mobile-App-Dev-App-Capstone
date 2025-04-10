import React from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import { useFormInput } from "../hooks/useFormInput";
import { Item } from "../components/Item";
import { EditModal } from "../components/EditModal";
import { colors } from "../common/colors";
import InfoCard from "../components/infoCard";

function AddressScreen(props) {
  const address = useFormInput("");
  const landmark = useFormInput("");
  // const [isModalVisible, setModalVisible] = React.useState(false);

  // React.useEffect(() => {
  //   const fetchData = async () => {};
  //   fetchData();
  // }, [add]);

  // React.useEffect(() => {
  //   props.navigation.setOptions({
  //     headerRight: () => <Button onPress={() => toggleModal()} title="Edit" />,
  //   });
  // }, []);

  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* <InfoCard placeholder="Address Line" value={add} /> */}
      {/* <InfoCard placeholder="Closeby Landmark" value={land} /> */}
      {/* <EditModal
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}
        onCancel={toggleModal}
        onDone={() => {
          updateAddress(address.value, landmark.value);
          toggleModal();
        }}
      >
        <Item placeholder="Address Line" {...address} />
        <Item placeholder="Landmark" {...landmark} />
      </EditModal> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  item: {
    display: "flex",
    paddingTop: 20,
    borderColor: colors.separator,
    borderBottomWidth: 1,
  },
  text: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    height: 35,
    width: 150,
  },
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

export default AddressScreen;
