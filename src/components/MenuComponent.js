/* eslint-disable prettier/prettier */
import { Actionsheet, HStack, Icon, Text, useDisclose } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const MenuComponent = (props) => {
    const navigation = useNavigation();
    const handleProperties = ()=>{
        props.onClose(true);
        props.handleProperties()
    }
    const handleFav = ()=>{
        props.onClose(true);
        props.handleShowFavorites()
    }
    return (
        <>
            <Actionsheet isOpen={props.isOpen} onClose={props.onClose}>
                <Actionsheet.Content style={styles.Content}>
                    <LinearGradient colors={['#e9e9e9','#e6e6e6','#e0e0e0']} style={styles.linearGradient}>
                        {/* <Actionsheet.Item style={styles.Item}>
                            <HStack alignItems={'center'} space={2}>
                                <Icon as={MaterialCommunityIcons} size={25} color="#666" name="playlist-music" />
                                <Text style={styles.ItemText}>All Music</Text>
                            </HStack>
                        </Actionsheet.Item> */}
                        <Actionsheet.Item style={styles.Item} onPress={()=>handleFav()}>
                            <HStack alignItems={'center'} space={2}>
                                <Icon as={MaterialCommunityIcons} size={25} color="#666" name="playlist-star" />
                                <Text style={styles.ItemText}>Favorite List</Text>
                            </HStack>
                        </Actionsheet.Item>
                        <Actionsheet.Item style={styles.Item}>
                            <HStack alignItems={'center'} space={2}>
                                <Icon as={MaterialCommunityIcons} size={21} color="#666" name="share-variant" />
                                <Text style={styles.ItemText}>Share</Text>
                            </HStack>
                        </Actionsheet.Item>
                        <Actionsheet.Item style={styles.Item} onPress={()=>handleProperties()} >
                            <HStack alignItems={'center'} space={2}>
                                <Icon as={MaterialCommunityIcons} size={22} color="#666" name="information-outline" />
                                <Text style={styles.ItemText}>Properties</Text>
                            </HStack>
                        </Actionsheet.Item>
                        <Actionsheet.Item style={styles.Item} onPress={()=>navigation.navigate('Settings')}>
                            <HStack alignItems={'center'} space={2}>
                                <Icon as={Ionicons} size={21} color="#666" name="settings-sharp" />
                                <Text style={styles.ItemText}>Settings</Text>
                            </HStack>
                        </Actionsheet.Item>
                        <Actionsheet.Item style={styles.Item}>
                            <HStack alignItems={'center'} space={2}>
                                <Icon as={Ionicons} size={19} color="#666" name="moon" />
                                <Text style={styles.ItemText}>About Moon Player</Text>
                            </HStack>
                        </Actionsheet.Item>
                    </LinearGradient>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        width: '100%'
    },
    Content: {
        backgroundColor: '#efefef',
        margin: 0,
        padding: 0,
    },
    Item: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    ItemText: {
        color: '#666',
        fontSize: 16
    }
})

export { MenuComponent };
