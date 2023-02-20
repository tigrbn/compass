import React , {useState} from "react";
import logo from "../../assets/logo.png";
import back from "../../assets/signin.webp";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { StackScreenProps } from "@react-navigation/stack";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

function SignInScreen<StackScreenProps>({ navigation }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
      
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    
    var emailValid = false;
    if(email.length == 0){
        setEmailError("Поле должно быть заполнено");
    }        
    else if(email.length < 6){
        setEmailError("Электронная почта должна быть не менее 6 символов");
    }      
    else if(email.indexOf(' ') >= 0){        
        setEmailError('Данное поле не должно содержать пробелы');                          
    }    
    else{
        setEmailError("")
        emailValid = true
    }

    var passwordValid = false;
    if(password.length == 0){
        setPasswordError("Поле должно быть заполнено");
    }        
    else if(password.length < 6){
        setPasswordError("Пароль должен быть минимум 6 символов");
    }      
    else if(password.indexOf(' ') >= 0){        
        setPasswordError('Данное поле не должно содержать пробелы');                          
    }    
    else{
        setPasswordError("")
        passwordValid = true
    }        

    if(emailValid && passwordValid){            
        alert('Email: ' + email + '\nPassword: ' + password); 
        setEmail("");
        setPassword("");
    }   
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Нужно ввести электронную почту и пароль",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

    
    
      

  return (
    <View className="w-full h-full" style={{backgroundColor: "white"}}>
            <View style={styles.container} >
            </View>
        <View style={styles.card}>
            <View className="space-y-6">
              <View className="mt-1 space-y-4">
              <Text className="font-title text-4xl font-bold text-left" style={{color: "#056CF2", marginBottom: "10%"}}>
                  Авторизация
                </Text>
                <View   style={styles.textInput} className="font-main flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100">
                  <Icon style={styles.icon} name="email" size={20} color="#056CF2" />
                  <TextInput
                    placeholder="Электронная почта"
                    value={value.email}
                    className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0"
                    onChangeText={(text) => setValue({ ...value, email: text })}
                  />
                  {emailError.length > 0 &&
                  <Text style={{color: "#B32535", fontSize: 10, fontWeight: "bold", padding: 10, textAlign: "right", alignSelf: "center"}}>{emailError}</Text>
                  }
                </View>

                <View style={styles.textInput} className="flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100">
                  <Icon style={styles.icon} name="lock" size={20} color="#056CF2" />
                  <TextInput
                    placeholder="Пароль"
                    className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0"
                    onChangeText={(text) => setValue({ ...value, password: text })}
                    secureTextEntry={true}
                  />
                    {passwordError.length > 0 &&
                   <Text style={{color: "#B32535", fontSize: 10, fontWeight: "bold", padding: 10, textAlign: "right", alignSelf: "center"}}>{passwordError}</Text>
                  }
                </View>
              </View>
              <Text style={styles.text} className="text-right text-white font-main text-base"
               onPress={() => navigation.navigate("FogotPass")}>
                  Забыли пароль?
            </Text>
              <Pressable style={styles.pressable} className="rounded-xl py-2 px-4 m-4">
                <Text
                  className="text-center text-white font-bold text-base"
                  onPress={signIn}
                  style={{padding: 10}}>
                  Войти
                </Text>
              </Pressable>
            </View>
            <Text style={styles.text} className="text-center text-white font-main text-base">
              У Вас нет аккаунта?{" "}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("Sign Up")}
              >{'\n'}
                Зарегистрироваться
              </Text>
            </Text>
            {/* <View>
            <Feather
                    onPress={() => navigation.navigate("Phone")}
                    name="phone"
                    color="#0E1F40"
                    size={"35"}
                    style={{alignSelf: "center", marginTop: 25}}
                  />
            </View> */}
          </View>
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 37,
    flex: 4,
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
