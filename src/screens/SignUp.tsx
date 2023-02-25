import React,  {useState}from 'react';
import logo from "../../assets/logo.png"
import back from "../../assets/back.jpg";
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import {LinearGradient} from 'expo-linear-gradient';
import { Image, Pressable, StyleSheet, TextInput, Text, View } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { StackScreenProps } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

function SignUpScreen<StackScreenProps>({ navigation }) {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  async function signUp() {

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
    if(password.length === 0){
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

    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Нужно ввести электронную почту и пароль'
      })
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    <View className="w-full h-full" style={{backgroundColor: "white"}}>
         <View style={styles.container} >
        </View>     
      <View style={styles.card}>
        <View className="space-y-6" >
          <View className="mt-1 space-y-4">
          <Text className="font-title text-4xl font-bold text-left" style={{color: "#056CF2", marginBottom: "10%"}}>
                  Регистрация
          </Text>
            <View style={styles.textInput} className="font-main flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100">
              <Icon style={styles.icon} name="email" size={18} color="gray" />
              <TextInput
                placeholder='Электронная почта'
                value={value.email}
                className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0"
                onChangeText={(text) => setValue({ ...value, email: text })}
              />
                {emailError.length > 0 &&
                  <Text style={{color: "#B32535", fontSize: 10, fontWeight: "bold", padding: 10, textAlign: "right", alignSelf: "center"}}>{emailError}</Text>
                }
            </View>

            <View style={styles.textInput} className="flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100">
              <Icon style={styles.icon} name="lock" size={18} color="gray" />
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
          <Pressable style={styles.pressable} className="rounded-xl py-2 px-4 m-4"><Text className="text-center text-white font-bold text-base" style={{padding: 10}} onPress={signUp}>Зарегистрироваться</Text></Pressable>
        </View>
        <Text style={styles.text} className="text-center text-white font-main text-base">У Вас есть аккаунт? <Text style={styles.link}  className="text-blue" onPress={() => navigation.navigate('Sign In')}> {'\n'} Войти</Text></Text>
        <Text style={styles.text} className="text-sm text-center">Нажимая на зарегистрироваться, Вы принимаете
        <Text style={{color: "#0554F2"}}  className="text-sm" onPress={() => navigation.navigate('Privacy')}> Политику конфиденциальности, </Text>
         а также даете 
         <Text style={{color: "#0554F2"}} className="text-sm" onPress={() => navigation.navigate('Personal')}> согласие на обработку персональных данных</Text>
         </Text>
      </View>
    </View>
  );
}

export default SignUpScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 37,
    flex: 9,
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
