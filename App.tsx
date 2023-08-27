/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect,useState } from 'react';
import { StyleSheet, PermissionsAndroid, Alert } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, SettingsScreen, ShadowScreen } from './src/screen';
import { NativeBaseProvider, StatusBar } from "native-base";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const requestPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      // {
      //     title: 'Moon Player Access SD Card Permission',
      //     message:
      //         'Moon Player App needs access to your FileManger and SD card ',
      //     buttonNeutral: 'Ask Me Later',
      //     buttonNegative: 'Cancel',
      //     buttonPositive: 'OK',
      // },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const p = await AsyncStorage.getItem('permission');
      if (p != '1') {
        Alert.alert('You can use the FileManger and SD card');
        await AsyncStorage.setItem('permission', "1")
      }
    } else {
      Alert.alert('FileManger and SD card permission denied');
    }
    const granted1 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      // {
      //     title: 'Moon Player Access SD Card Permission',
      //     message:
      //         'Moon Player App needs access to your FileManger and SD card ',
      //     buttonNeutral: 'Ask Me Later',
      //     buttonNegative: 'Cancel',
      //     buttonPositive: 'OK',
      // },
    );
    if (granted1 === PermissionsAndroid.RESULTS.GRANTED) {
      const p = await AsyncStorage.getItem('permission');
      if (p != '1') {
        Alert.alert('You can use the FileManger and SD card');
        await AsyncStorage.setItem('permission', "1")
      }
    } else {
      Alert.alert('FileManger and SD card permission denied');
    }
  } catch (err) {
    Alert.alert(JSON.stringify(err));
  }
};

function App(): JSX.Element {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      background: 'rgba(255, 255, 255,0)',
    },
  };

  useEffect(() => {
    requestPermissions();
  }, [])

  return (
    <LinearGradient colors={['#e0e0e0', '#dadada']} style={styles.linearGradient}>
      <NativeBaseProvider>
        <StatusBar backgroundColor={'#e0e0e0'} barStyle={'dark-content'} />
        <NavigationContainer theme={MyTheme} >
          <Stack.Navigator screenOptions={({ route, navigation }) => ({
            headerShown: false
          })}>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Settings' component={SettingsScreen} />
            <Stack.Screen name='Shadow' component={ShadowScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    padding: 5,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
