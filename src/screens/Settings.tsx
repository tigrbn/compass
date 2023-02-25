import React, { useState } from "react";
import { Modal, TouchableOpacity, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useAuth } from "../hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import localStorage from "react-native-expo-localstorage"

const auth = getAuth();

function Settings() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [text, setText] = useState(localStorage.getItem("history") ? localStorage.getItem("history") : '');
  const handleChange = (text: string) => {
    setText(text)
    localStorage.setItem("history", text)
  }
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
          style={{ flex: 1, backgroundColor: "rgba(0, 27, 54, 0.4)" }} >
          <View className="h-[50%] mt-auto rounded-t-3xl " style={{backgroundColor: "white"}}>
          <View style={styles.textInput} className="flex-row justify-center align-center rounded-xl pt-2.5 pr-2.5 pb-2.5 pl-0 bg-gray-100">
          <TextInput
                className="flex-1 pt-2.5 pr-2.5 pb-2.5  pl-0"   onChangeText={handleChange} value={text} style={{paddingLeft: 20}}
                placeholder="Напишите Ваше Ф.И.О."/> 
          </View>
                <Text  className="font-title text-xl font-bold text-left py-2 px-2 m-2 pt-5">{text}</Text>
              <Pressable onPress={() => signOut(auth)}>
                <View className="flex flex-row m-4">
                  <Feather
                    name="log-out"
                    color="#001B36"
                    size={"30"}
                  />
                  <Text style={{color: "#001B36"}} className="flex-1 font-title text-lg font-bold text-left text-white"> Выйти</Text>
                </View>
              </Pressable>
          
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}



const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: "90%",
    marginTop: "10%",
    alignSelf: "center"
  },
})

export default Settings;
