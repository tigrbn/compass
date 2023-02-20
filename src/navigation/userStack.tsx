import React from "react";
import { View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import ToursScreen from '../screens/TourScreen';
import CategoryScreen  from '../screens/CategoryScreen';
import CategoryList  from '../screens/CategoryList';
import SettingsScreen from "../screens/Settings";
import SearchScreen from "../screens/Search";
// import FavoritesScreen from "../screens/Favorites";
import Feather from 'react-native-vector-icons/Feather';
import Subcategories from "../screens/Subcategories";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator   
        screenOptions={{
          headerShown: true,
          cardStyle: { backgroundColor: '#fff' }
        }}
        >
        <HomeStack.Screen name="HomeScreen" 
        options={{
          title: 'Главная',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#001B36'
          },
        }}
        component={HomeScreen}/>
        <HomeStack.Screen name="CategoryList" component={CategoryList}/>
        <HomeStack.Screen name="CategoryScreen" component={CategoryScreen} options={({ route }) => ({ title: route.params.name })}/>
        <HomeStack.Screen name="Subcategories" component={Subcategories} options={({ route }) => ({ title: route.params.name })}/>
        <HomeStack.Screen name="ToursScreen"  component={ToursScreen}
         options={{
          title: 'О туре',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#001B36'
          },
        }}
        />
        <HomeStack.Screen name="Search" component={SearchScreen} />
        {/* <HomeStack.Screen name="Favorites" component={FavoritesScreen} /> */}
    </HomeStack.Navigator>
  );
}


const TourStack = createStackNavigator();
function TourStackScreen() {
  return (
    <TourStack.Navigator
        screenOptions={{
          headerShown: true,
          cardStyle: { backgroundColor: '#fff' }
        }}>
        <TourStack.Screen 
         options={{
          title: 'Виды туров',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#001B36'
          },
        }}
        name="CategoryList" component={CategoryList}/>
        <TourStack.Screen name="CategoryScreen" component={CategoryScreen} options={({ route }) => ({ title: route.params.name })}/>
        <TourStack.Screen name="Subcategories" component={Subcategories} options={({ route }) => ({ title: route.params.name })}/>
        <TourStack.Screen name="ToursScreen" component={ToursScreen} options={({ route }) => ({ title: route.params.name })}/>
    </TourStack.Navigator>
  );
}


const SearchStack = createStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator
        screenOptions={{
          headerShown: true,
          cardStyle: { backgroundColor: '#fff' }
        }}>
        <SearchStack.Screen 
         options={{
          title: 'Поиск туров',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#001B36'
          },
        }}
        name="SearchScreen" component={SearchScreen}/>
        <SearchStack.Screen name="TourScreen" component={ToursScreen} options={({ route }) => ({ title: route.params.name })}/>
    </SearchStack.Navigator>
  );
}


export default function UserStack() {
  return (
    <NavigationContainer>
     <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "white" },
          tabBarActiveTintColor: "#0053A9",
          tabBarInactiveTintColor: "rgba(0, 83, 169, 0.5)",
        }}
        sceneContainerStyle={{ backgroundColor: "white" }}
      >
        <Tab.Screen
          name="Категории"
          component={TourStackScreen}
          options={
            {
                tabBarIcon: ({ focused, color, size }) => (
                    <Feather
                        name="align-left"
                        size={size ? size : 12}
                        color={focused ? color : "rgba(0, 83, 169, 0.5)"}
                        focused={focused}
               
                    />
                )
            }
        }
        />
        <Tab.Screen
          name="Главная"
          component={HomeStackScreen}
          options={
            {
                tabBarIcon: ({ focused, color, size }) => (
                    <Feather
                        name="home"
                        size={size ? size : 12}
                        color={focused ? color : "rgba(0, 83, 169, 0.5)"}
                        focused={focused}
               
                    />
                )
            }
        }
        />
         <Tab.Screen
          name="Поиск"
          component={SearchStackScreen}
          options={
            {
                tabBarIcon: ({ focused, color, size }) => (
                    <Feather
                        name="search"
                        size={size ? size : 12}
                        color={focused ? color : "rgba(0, 83, 169, 0.5)"}
                        focused={focused}
               
                    />
                )
            }
        }
        />
                 {/* <Tab.Screen
          name="Избранное"
          component={FavoritesScreen}
          options={{
            tabBarShowLabel: true,
            tabBarIcon: ({ focused }) => (
              <View>
                 <Feather
                    name="search"
                    color="#001B36"
                    size={"30"}
                    style={{
                      tintColor: focused ? "#0053A9" : "rgba(0, 83, 169, 0.5)",
                    }}
                    color={focused ? color : "#222222"}
  focused={focused}
  color={color}
                  />
            </View>
            ),
          }}
        /> */}
        <Tab.Screen
          name="Профиль"
          component={SettingsScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => <SettingsScreen />,
          }}
        />
          
      </Tab.Navigator>
    </NavigationContainer>
  );
}


