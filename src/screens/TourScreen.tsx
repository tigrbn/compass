import {Animated, FlatList, StyleSheet, Image, View, Dimensions, TextInput, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Pagination from './Pagination';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from "react-native-vector-icons/Feather";
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

    const TourScreen = ({route}) =>{
    const [index, setIndex] = useState(0);
    const DEVICE_WIDTH= Dimensions.get('window').width;
    const scrollX = useRef(new Animated.Value(0)).current;
    const [modalVisible, setModalVisible] = useState(false);
    const handleOnScroll = event => {
      Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: scrollX,
              },
            },
          },
        ],
        {
          useNativeDriver: false,
        },
      )(event);
    };

    const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
      // console.log('viewableItems', viewableItems);
      setIndex(viewableItems[0].index);
    }).current;

    const viewabilityConfig = useRef({
      itemVisiblePercentThreshold: 50,
    }).current;

    const id = route.params.paramKey;
    const [data, setData] = useState([]);
    const [imgAddress, setImgAddress] = useState([]);
    const [infoShedules, setInfoShedules] = useState([]);
    const getCategory = async () => {
    fetch('http://81.200.150.54/api/v1/tours/' + id)
    .then((response) => response.json())
    .then((json) => {
      setData(json);
      setImgAddress(json.images);
      setInfoShedules(json.schedules[0]);
      // console.log(json.images);
    })
    .catch((error) => console.error(error))
    // .finally(() => setLoading(false));
  }

    const dnyaText = <Text> дня</Text>;
  const dneyText = <Text> дней</Text>;
  let textDay;
  if (infoShedules.dateForHumans==0) {
      
  }
  else if (infoShedules.dateForHumans>5) {
      textDay = dneyText
  }
  else  {
      textDay = dnyaText
  }

  const chasovText = <Text>часов</Text>;
  const chasaText = <Text>часа</Text>;
  const chasText = <Text>час</Text>;
  
  let textHourse;
  if (infoShedules.hoursForHumans==1 && infoShedules.dateForHumans<1) {
    textHourse = chasText
  }
  else if (infoShedules.hoursForHumans<5 && infoShedules.dateForHumans<1) {
    textHourse = chasaText
  }
  else if (infoShedules.hoursForHumans>6 && infoShedules.dateForHumans<1 ) {
    textHourse = chasovText
  }

  if ( infoShedules.dateForHumans<1) {
    infoShedules.dateForHumans = ''
  }
  if ( infoShedules.dateForHumans>1) {
    infoShedules.hoursForHumans = '' 
  }




  useEffect(() => {
    getCategory();
  }, []);

  let [counter, setCounter] = useState(1);
  let [isDisabled, setDisabled] = useState(false);
  let increment = () => {
    let newValue = counter +=1;
    setCounter(newValue)
    if (newValue >= infoShedules.space_current) {
      setDisabled(true)
    } 
  }


  let decrement = () => {
    let newValue = counter; 
    if (newValue > 1) {
    newValue = counter -=1; 
    // console.log(newValue)
  }
    setCounter(newValue)
    if (newValue <= infoShedules.space_current) {
      setDisabled(false) 
    } 
  }

  const Btn = ({
    size = 40,
    title,
    onPress,
    disabled
  }) => {
    return (
      <TouchableOpacity 
      onPress={onPress}
      disabled={disabled}
      style={{
        width: size,
        height: 50,
        backgroundColor: "#002A57",
        borderRadius: 19,
      }}
      >
        <Text
        style={{
          color: "white",
          alignSelf: "center",
          alignItems: "center",
          fontSize: 20,
          marginTop: 10,
        }}
        >{title}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView>
             <FlatList 
                    data={imgAddress}
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleOnScroll}
                    onViewableItemsChanged={handleOnViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    // keyExtractor={({ id }) => id.toString()}
                    renderItem={({ item }) => (
                  <Image 
                  item={item}
                      resizeMode='cover'
                      style={{width: DEVICE_WIDTH, flex: 1, height: 300}}
                      source={{uri: 'http://81.200.150.54/storage/' + item.image_name}}
                  />)}/>
      <View className="w-full">
      <View  style={styles.whitePanel}>
        <View style={{marginBottom: "5%"}}></View>
          <Pagination  data={imgAddress} scrollX={scrollX} index={index}/>
               <Text className="flex-1 font-title text-xl font-bold text-left rounded-3xl py-2 px-4 m-2" style={{color: "#002A57", marginTop: "5%"}}>{data.title}</Text>
               <View style={{flex: 1,flexDirection: "row"}}>
               <Feather
                    className="px-4 m-2"
                    name="map"
                    color="#001B36"
                    size={"20"}
                  />
                <Text className="text-xl text-left" style={{color: "#002A57"}}>
                {data.location}</Text>
                </View>
                <View style={{flex: 1,flexDirection: "row"}}>
                <View className="rounded-3xl py-2 px-4 m-2" style={styles.counter} >
                    <Btn onPress={decrement}  title={"-"}/>
                      <Text className="text-xl text-center rounded-3xl px-4 m-2" style={{color: "#002A57", padding: 10, backgroundColor: "#F3F3F3"}}>{counter}</Text>
                    <Btn onPress={increment} disabled={isDisabled}  title={"+"} />
                </View>
                <Text className="text-xl text-left" style={{color: "#002A57", alignItems: "center", alignSelf: "center"}}>
               <Feather
                    className="px-4 m-2"
                    name="clock"
                    color="#001B36"
                    size={"20"}
                  />  {infoShedules.dateForHumans}{textDay}{infoShedules.hoursForHumans} {textHourse}</Text>
                </View>
               <Text className="flex-1 font-title text-xl font-bold text-left rounded-3xl py-2 px-4 m-2" style={{color: "#002A57", marginTop: "5%"}}>Размер группы</Text>
               <Text className="text-xl text-left rounded-3xl px-4 m-2" style={{color: "#002A57"}}>До {infoShedules.space_current} человек</Text>
               <Text className="flex-1 font-title text-xl font-bold text-left rounded-3xl py-2 px-4 m-2" style={{color: "#002A57", marginTop: "5%"}}>Размещение:</Text>
               <Text className="text-xl text-left rounded-3xl px-4 m-2" style={{color: "#002A57"}}>{data.accommodation}</Text>
               <Text className="flex-1 font-title text-xl font-bold text-left rounded-3xl py-2 px-4 m-2" style={{color: "#002A57", marginTop: "5%"}}>Место сбора:</Text>
               <Text className="text-xl text-left rounded-3xl px-4 m-2" style={{color: "#002A57"}}>{infoShedules.meet_place}</Text>
               <Text className="flex-1 font-title text-xl font-bold text-left rounded-3xl py-2 px-4 m-2" style={{color: "#002A57", marginTop: "5%"}}>Описание:</Text>
               <Text className="text-xl text-left rounded-3xl px-4 m-2" style={{color: "#002A57"}}>{data.description}</Text>
               <View style={styles.price_container}>
               <Text className="flex-1 font-title text-xl font-bold text-left" style={{color: "#002A57"}}>{infoShedules.price/1} ₽ {'\n'}
               <Text>с человека</Text></Text>
               <TouchableOpacity  onPress={() => setModalVisible(true)} style={styles.zabron}>
               <Text className="text-sm text-white font-bold text-center" style={{
            
                      paddingLeft: 15,
                      paddingRight: 15,
                      paddingTop: 2,
                      paddingBottom: 2
               }}>
               Забронировать</Text></TouchableOpacity>
               </View>
               </View>  
      </View>
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
      <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{ flex: 1, backgroundColor: "rgba(0, 27, 54, 0.5)" }} >
      <View className="h-[100%] mt-auto">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text className="font-title text-xl font-bold text-center">Бронирование тура</Text>
            
            {/* <View style={styles.textInput} className="flex-row justify-center align-center rounded-xl pt-2.5 pr-2.5 pb-2.5 pl-0 bg-gray-100">
              <TextInput
                className="flex-1 pt-2.5 pr-2.5 pb-2.5  pl-0" style={{paddingLeft: 20}}
                placeholder="Напишите Ваше Ф.И.О."/>
            </View> */}
            {/* <Text className="text-lg font-bold text-left pt-2.5 pr-2.5 pb-2.5 pl-0">Туроператор:</Text>
            <Text className="text-lg text-left">{data.operator.name}</Text> */}
            <Text className="text-lg font-bold text-left pt-2.5 pr-2.5 pb-2.5 pl-0">Название тура:</Text>
            <Text className="text-lg text-left">{data.title}</Text>
            <Text className="text-lg font-bold text-left pt-2.5 pr-2.5 pb-2.5 pl-0">Количество мест:</Text>
            <Text className="text-lg text-left">{counter}</Text>
            <Text className="text-lg font-bold text-left pt-2.5 pr-2.5 pb-2.5 pl-0">Стоимость:</Text>
            <Text className="text-lg text-left">{counter * infoShedules.price/1} ₽</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text className="text-sm font-bold text-center text-white">Подтвердить</Text>
            </Pressable>
          </View>
        </View>
        </View>
        </TouchableOpacity>
      </Modal>
    </View>
    </ScrollView>
    
  );
};


const styles = StyleSheet.create({
    whitePanel: {
      backgroundColor: 'white',
      borderRadius: 37,
      flex: 1,
      position:"relative",
      marginTop: "-10%"
    },
    mapPng: {
      width: 20,
      height: 20,
      tintColor: "#002A57",
    },
    dataTitle: {
        color: '#0E1F40',
        fontSize: 20,
        paddingLeft: 10,
        marginLeft: 45,
        marginTop: 20
    },
    zabron: {
      backgroundColor: '#ECBE00', 
      color: 'white',
      borderRadius: 28,
      padding: 15,
    },
    price_container: {
      flex: 1,
      flexDirection: "row",
      marginTop: "5%",
      marginBottom: "15%",
      width: "87.5%",
      alignSelf: "center"
    },
    counter: {
      flexDirection: "row",
      alignItems: "center",
      width: "45%"
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'left',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      backgroundColor: '#ECBE00', 
      color: 'white',
      borderRadius: 28,
      padding: 10,
      paddingLeft: 35,
      paddingRight: 35,
      marginTop: 30,
      alignSelf: 'center'
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      position: 'relative',

    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      position: 'absolute',
      top: 15,
      right: 0,
    },
    textInput: {
      backgroundColor: "white",
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      width: "100%",
      marginTop: "10%",
      marginBottom: "10%"
    },
})
export default TourScreen;

