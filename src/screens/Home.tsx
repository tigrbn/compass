import React , { useEffect, useState, useRef } from 'react';
import { ImageBackground, Text, View} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { Animated, SafeAreaView, Pressable,Image, ScrollView, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import ToursScreen from './TourScreen';
import Pagination from './Pagination';
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
  

const HomeScreen  = ({ navigation}) =>  {  
  const [index, setIndex] = useState(0);
  const [favlocal] = useState()
  const [fav,setFav] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;  
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);  
  const [info, setInfo] = useState([])  
  const [banners, setBann] = useState([]);   
  const DEVICE_WIDTH = Dimensions.get('window').width;
  const DEVICE_HEIGHT = Dimensions.get('window').height;
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

  getCategories = () => {
      fetch('http://81.200.150.54/api/v1/tours/')
        .then((response) => response.json())
        .then((json) => setCategories(json.data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
         console.log(categories);
  }    

  getBanners = () => {
    fetch('http://81.200.150.54/api/v1/banners/')
      .then((response) => response.json())
      .then((json) => setBann(json.banners))
      .catch((error) => console.error(error))
      // console.log(json.images);
}    
  useEffect(() => {
      setLoading(true);
      getCategories();
      // getInfo();
      getBanners();

  }, []);  
  return (
  <SafeAreaView style={{ flex: 1}}>
          {isLoading ? 
          <Text>Загрузка...</Text> :
          (
        <ScrollView  showsVerticalScrollIndicator={false}>
          <FlatList  
            data={banners}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            onScroll={handleOnScroll}
            onViewableItemsChanged={handleOnViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            className="rounded-3xl py-2 px-2 m-2"
            renderItem={({ item }) => (     
            <TouchableOpacity 
              onPress={() => navigation.navigate('ToursScreen' , {paramKey: item.id} )}>
                <View>
                <Image  
                  style={{
                  width: DEVICE_WIDTH/1.2,
                  marginRight: 20,
                  position: 'relative',
                  borderRadius: 19,
                  resizeMode: 'cover',
                  height: DEVICE_HEIGHT/2.6,
              }}  source={{uri: 'http://81.200.150.54/storage/'+ item.image.image_name}}/>
                </View>
                <View style={styles.Panelslider}>
                    <Text style={styles.textPanelslider}>{`${item.title}`}</Text>
                    <Text style={styles.pricePanelText}>{`${item.schedules[0].price/1}`} ₽</Text>
                </View>
                {/* {fav.includes(item) ? (
                 <Pressable style={{position: "absolute", top: 15, left: 15}}  onPress={() => setFav(fav.filter((x) => x.id !== item.id))}>
                   <Icon name="heart" size={30} color="#D92030" />
               </Pressable>
              ):(
                <Pressable style={{position: "absolute", top: 15, left: 15}} onPress={() => setFav([...fav,item])}>
                    <Icon  name="heart" size={30} color="#F2F2F2" />
              </Pressable>
              )} */}
              </TouchableOpacity>
            )}
            />
            <Pagination data={banners} scrollX={scrollX} index={index} />
                <View>
                    <Text className="flex-1 font-title text-xl font-bold text-left py-4 px-4 m-2">Рекомендации</Text>
                </View>      
                <FlatList 
                    className="rounded-3xl py-2 px-2 m-2"
                    data={banners}
                    numColumns={2}
                    key={2}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                      <TouchableOpacity  
                      style={{width: DEVICE_WIDTH/2.15, padding: 5}}
                      onPress={() => navigation.navigate('ToursScreen' , {paramKey: item.id} )}>
                        <Image  style={{width: '100%', flex: 1, height: 180,  borderRadius: 19, resizeMode: 'cover'}}  source={{uri: 'http://81.200.150.54/storage/'+ item.image.image_name}}/> 
                        <View style={styles.Panelslider_mini}>
                          <Text style={styles.textPanelslider_mini}>{`${item.title}`}</Text>
                          <Text style={styles.pricePanelText_mini}>{`${item.schedules[0].price/1}`} ₽</Text>
                         </View>
                      </TouchableOpacity>
                    )}
              />
          </ScrollView>
          )}
    </SafeAreaView>
  );
}


export default HomeScreen;
const styles = StyleSheet.create({
  Panelslider: {
    backgroundColor: 'rgba(0, 17, 35, 0.75)',
    borderRadius: 19,
    height: 100,
    position:'absolute',
    right: 20,
    left: 0,
    bottom: 5
  },
  textPanelslider: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: '22',
    padding: 20,
    width: '80%'
  },
  Panelslider_mini: {
    backgroundColor: 'rgba(0, 17, 35, 0.65)',
    borderRadius: 19,
    height: 80,
    position:'absolute',
    right: 5,
    left: 5,
    bottom: 5
  },
  textPanelslider_mini: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: '18',
    padding: 15,
    width: '50%'
  },
  pricePanelText_mini: {
    color: '#F4D150',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontWeight: '500',
    fontSize: 16,
  },
  zagText: {
    color: '#00274E',
    fontSize: 20,
    lineHeight: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 10
  },
  linkText: {
    color: '#00274E',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
    position: 'absolute',
    right: 10,
    top: 30,
  },
  gallery: {
   
    position: 'relative',
    paddingRight: 20,
    borderRadius: 10,
    alignSelf: 'flex-start'
  },
  img: {
    height: 280,
    position: 'relative',
    borderRadius: 19,
  },
  textPanel: {
    zIndex:9,
    height: 80,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: 'rgba(0, 17, 35, 0.5)'
  },
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  box: {
    width: '50%',
    height: '50%',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width:  200,
    height: 200
  },
  colText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: 'white',
    width: '90%'
  },
  priceText: {
    color: '#F4D150',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 15,
  },
  pricePanelText: {
    color: '#F4D150',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontWeight: '500',
    fontSize: 25,

  },
});