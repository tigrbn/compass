import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import CategoryScreen from './CategoryScreen';

const Categories  = ({ navigation: { navigate } }) =>  {    
    const [isLoading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);    
    getCategories = () => {
        fetch('http://81.200.150.54/api/v1/categories/')
          .then((response) => response.json())
          .then((json) => setCategories(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
    }    
    useEffect(() => {
        setLoading(true);
        getCategories();
    }, []);    
    return(
        <SafeAreaView style={{marginTop: "5%"}}>
            {isLoading ? 
            <Text>Загрузка...</Text> :
            (
                <View className="w-full h-full">
                    <FlatList 
                      data={categories}
                      style={styles.catItems}
                      keyExtractor={({ id }) => id.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity 
                          onPress={() => navigate('CategoryScreen', { id: item.id, name: item.name})}> 
                          <Text className="flex-1 font-title text-lg font-bold text-left rounded-3xl py-2 px-4 m-2" style={{color: "#00274E"}}> {`${item.name}`}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  LinkText: {
    fontSize: 22,
    paddingTop: '5%',
    paddingBottom: '5%',
    fontWeight: 'bold',
    color: '#001B36',
    lineHeight: 22,
    left: 45,
    right: 0,
    width: 350,
  }
});

export default Categories;