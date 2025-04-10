import React from "react";
import "react-native-url-polyfill/auto";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import { colors } from "../common/colors";
import { useFormInput } from "../hooks/useFormInput";
import { Item } from "../components/Item";
import { EditModal } from "../components/EditModal";
import InfoCard from "../components/infoCard";
import { useGlobalContext } from "../context/context";

function DetailScreen(props) {
  const fName = useFormInput("");
  const lName = useFormInput("");
  const [isModalVisible, setModalVisible] = React.useState(false);

  const { state } = useGlobalContext();

  // React.useEffect(() => {
  //   props.navigation.setOptions({
  //     headerRight: () => <Button onPress={() => toggleModal()} title="Edit" />,
  //   });
  // }, []);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const changeFullName = () => {
    return `${fName.value} ${lName.value}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <InfoCard placeholder="Name" value={state.user.name} />
      <InfoCard placeholder="Phone Number" value={`+${state.user.phone}`} />
      <InfoCard placeholder="Email" value={state.user.email} />
      {/* <EditModal
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}
        onCancel={toggleModal}
        onDone={async () => {
          toggleModal();
          updateName(changeFullName(), phone);
          update(changeFullName());
        }}
      >
        <Item placeholder="First Name" {...fName} />
        <Item placeholder="Last Name" {...lName} />
        <Item
          placeholder="Phone Number"
          value={phone}
          onChangeText={(textValue) => console.log(textValue)}
        />
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

export default DetailScreen;
