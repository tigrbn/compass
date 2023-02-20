import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, FlatList, TouchableOpacity } from 'react-native';

const CategoryScreen = ({ route: { params }, navigation }) => {
 
  const { id } = params;
  const [isLoading, setLoading] = useState(false);
  const [ccategory, setCategories] = useState([]);    
  getCategories = () => {
          fetch('http://81.200.150.54/api/v1/categories/' + id)
            .then((response) => response.json())
            .then((json) => setCategories(json.subcategories))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
      }    
    useEffect(() => {
      setLoading(true);
      getCategories();
      console.log(ccategory)
  }, []);   
  return (
    <SafeAreaView style={{marginTop: "5%"}}>
    {isLoading ? 
    <Text>Загрузка...</Text> :
    (
        <View className="w-full h-full">
        <FlatList
          data={ccategory}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Subcategories' , {paramKey: item.id, name: item.name} )}>
          <Text className="flex-1 font-title text-lg font-bold text-left rounded-3xl py-2 px-4 m-2" style={{color: "#0E1F40"}}>{`${item.name}`}</Text>
        </TouchableOpacity>
)}
/>
</View>
    )}
</SafeAreaView>
  );
};

export default CategoryScreen;

