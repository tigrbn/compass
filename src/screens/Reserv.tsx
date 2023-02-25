import React from "react";
import { Modal, TouchableOpacity, Text, Pressable, View, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useAuth } from "../hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";


function Reserv() {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
      <Feather
          name="user"
          size={24}
          color={"rgba(0, 27, 54, 0.4)"}/>
      </Pressable>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{ flex: 1, backgroundColor: "rgba(0, 27, 54, 0.4)" }}
        >
          <View className="h-[50%] mt-auto rounded-t-3xl ">
            <LinearGradient
              colors={["white", "white"]}
              style={{ flex: 1, borderRadius: 20 }}
            >
              <Pressable onPress={() => signOut(auth)}>
                <View className="flex flex-row m-4 pt-5">
                  <Feather
                    name="log-out"
                    color="#001B36"
                    size={"30"}
                  />
                  <Text style={{color: "#001B36"}} className="flex-1 font-title text-lg font-bold text-left text-white"> Выйти</Text>
                </View>
              </Pressable>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default Reserv;
