import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, FlatList, TouchableOpacity } from 'react-native';


const Subcategories = ({ route: { params }, navigation }) => {
 
  const { id } = params;
  const [isLoading, setLoading] = useState(false);
  const [subcategories, setSubCategories] = useState([]);    
  getCategories = () => {
          fetch('http://81.200.150.54/api/v1/categories/' + 1)
            .then((response) => response.json())
            .then((json) => setSubCategories(json.tours))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
      }    
    useEffect(() => {
      setLoading(true);
      getCategories();
      console.log(subcategories)

  }, []);   
  return (
    <SafeAreaView style={{marginTop: "5%"}}>
    {isLoading ? 
    <Text>Загрузка...</Text> :
    (
        <View className="w-full h-full">
        <FlatList
          data={subcategories}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('TourScreen' , {paramKey: item.id, name: item.title} )}>
          <Text className="flex-1 font-title text-lg font-bold text-left rounded-3xl py-2 px-4 m-2" style={{color: "#0E1F40"}}>{`${item.title}`}</Text>
        </TouchableOpacity>
)}
/>
</View>
    )}
</SafeAreaView>
  );
};




export default Subcategories;

