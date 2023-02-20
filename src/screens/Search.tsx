import React, {Component} from 'react';
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

export default class SearchScreen extends Component {
 
  constructor(props) {
 
    super(props);
 
    this.state = {
      isLoading: true,
      text: '',
      data: [],
    }
 
    this.arrayholder = [];
  }
 
  componentDidMount() {

    return fetch('http://81.200.150.54/api/v1/tours/')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({
          isLoading: false,
          data: responseJson.data,
        }, () => {
          // In this block you can do something with new state.
          this.arrayholder = responseJson.data;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
 

 
  searchData(text) {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.title.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });
 
    this.setState({
      data: newData,
      text: text
      })
    }
 
    itemSeparator = () => {
      return (
        <View
        className="flex-1 font-title text-xl font-bold text-left" style={{color: "#00274E"}} 
        />
      );
    }
 
    render() {
      const { navigation } = this.props;
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
   
      return (
   
        <View className="w-full h-full">
          <View style={styles.textInput} className="flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100">
              <Icon style={styles.icon} name="magnify" size={18} color="gray" />
              <TextInput
                className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0"
                onChangeText={(text) => this.searchData(text)}
                value={this.state.text}
                placeholder="Поиск по турам"
              />
            </View>
          <FlatList
            data={this.state.data}
            keyExtractor={ (item, index) => index.toString() }
            ItemSeparatorComponent={this.itemSeparator}
            renderItem={({ item }) => 
            <Text className="flex-1 font-title text-lg font-bold text-left rounded-3xl py-2 px-4 m-2" style={{color: "#00274E"}}  onPress={() => navigation.navigate('ToursScreen' , {paramKey: item.id} )}
            >{item.title}</Text>}
            style={{ marginTop: 10 }} />
      </View>
    );
  }
}
export default withNavigation(SearchScreen);



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
    width: "90%",
    alignSelf: "center",
    marginTop: "10%"
  },
});
