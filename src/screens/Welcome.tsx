import React from 'react';
import { Text, Pressable,Image, View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';


function WelcomeScreen<StackScreenProps>({ navigation }) {
  return (
    <View className="w-full h-full" style={{backgroundColor: "white"}}>
      <View className="mx-4 h-full flex justify-center align-center space-y-6">
      <Text style={{color: '#056CF2'}} className="text-6xl font-bold text-left" >ComPass</Text>
      <Text style={{color: '#0E1F40'}} className="text-xl font-bold  text-left" >Ваш отдых в надежных руках. Начните покорять мир с нами.</Text>
      <View >
        <Pressable style={styles.pressable} className="rounded-xl py-2 px-4 m-4"><Text style={{padding: 5}} className="text-center text-white font-bold text-base" onPress={() => navigation.navigate('Sign In')}>Авторизоваться</Text></Pressable>
        <Pressable style={styles.pressable} className="rounded-xl py-2 px-4 m-4"><Text style={{padding: 5}}  className="text-center text-white font-bold text-base" onPress={() => navigation.navigate('Sign Up')}>Зарегистрироваться</Text></Pressable>
      </View>
    </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 37,
    flex: 3,
  },
  icon: {
    padding: 15,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
  },
  text: {
    color: "#0E1F40",
    marginTop: 15,
  },
  link: {
    color: "#0E1F40",
    fontWeight: 'bold'
  },
  pressable: {
    backgroundColor: "#056CF2",
    width: "100%",
    fontSize: 30,
    alignSelf: "center"
  },
  textInput: {
    backgroundColor: "white",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});


export default WelcomeScreen;
