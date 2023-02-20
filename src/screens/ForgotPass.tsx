import React , {useState} from "react";
import logo from "../../assets/logo.png";
import back from "../../assets/signin.webp";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { StackScreenProps } from "@react-navigation/stack";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const auth = getAuth();

function ForgotPassScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const resetUserPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
      setError(null);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Пользователь не найден');
      } else {
        Alert.alert('Возникла проблема с вашим запросом');
      }
    }
  };

  return ( 
    <View className="w-full h-full" style={{backgroundColor: "white"}}>
      <View className="space-y-6" style={{marginLeft: "5%", marginRight: "5%", marginTop: "25%" }}>
          <View className="mt-1 space-y-4">
        <Text className="font-title text-4xl font-bold text-left" style={{color: "#056CF2", marginBottom: "10%"}}></Text>
        <Text className="font-title text-4xl font-bold text-left" style={{color: "#056CF2", marginBottom: "10%"}}>
                  Сбросить {"\n"} 
                  пароль
          </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
          <Text style={styles.link}>Вернуться к авторизации</Text>
        </TouchableOpacity>

        {submitted ? (
          <Text style={{color: "green"}}>Пожалуйста, проверьте свою электронную почту на наличие ссылки для сброса пароля.</Text>
        ) : (
          <>
            <View style={styles.textInput} className="font-main flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100">
              <Icon style={styles.icon} name="email" size={18} color="gray" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholder='Электронная почта'
                  className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0"
                  autoCapitalize="none"
                  style={styles.input}
                />
           </View>       
            <Pressable style={styles.pressable} className="rounded-xl py-2 px-4 m-4" title="Подтвердить" onPress={resetUserPassword} disabled={!email}>
            <Text className="text-center text-white font-bold text-base" style={{padding: 10}}>Подтвердить</Text>
            </Pressable>
          </>
        )}
      </View>
      </View>
    </View>
  );
}


export default ForgotPassScreen;


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
    fontWeight: 'bold',
    marginBottom: "10%"
  },
  pressable: {
    backgroundColor: "#056CF2",
    width: "100%",
    fontSize: 30,
    alignSelf: "center",
    marginTop: "10%"
  },
  textInput: {
    backgroundColor: "white",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
