/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet } from 'react-native';
import { HStack, Icon, Pressable, Text, VStack } from 'native-base';
import { Neomorph } from 'react-native-neomorph-shadows';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeFooter = (props) => {
    const handelItem = ()=>{
        props.setIsOpenPlaylist(true)
    }
    return (
        <VStack alignItems={'center'}>
            <HStack justifyContent={'center'} alignItems={'center'} pt={3} space={5}>
                <Pressable onPress={() => props.changeRepeatMode()}>
                    <Neomorph inner useArt style={styles.SRShadow} >
                        {
                            (props.repeatMode == "Off" || props.repeatMode == 'Queue') ?
                                <Icon as={MaterialIcons} name="repeat" size={26} color={(props.repeatMode == "Off") ? '#666' : '#EE520F'} />
                                :
                                <Icon as={MaterialIcons} name="repeat-one" size={26} color={'#EE520F'} />
                        }
                    </Neomorph>
                </Pressable>
                <Pressable onPress={() => handelItem()} >
                    <Neomorph inner useArt style={styles.PlayList} >
                        <Icon as={MaterialIcons} name="playlist-play" size={42} />
                    </Neomorph>
                </Pressable>
                <Neomorph inner useArt style={styles.SRShadow} >
                    <Icon as={Ionicons} name="shuffle" size={26} />
                </Neomorph>
            </HStack>
            <Text color={'#666'} mt={4} fontSize={10} fontWeight={'bold'} >Designed By: HamidKamyab</Text>
        </VStack>
    );
}

const styles = StyleSheet.create({
    PlayList: {
        shadowOffset: { width: 6, height: 6 },
        shadowRadius: 6,
        backgroundColor: 'rgb(35,37,40)',
        width: 64,
        height: 64,
        borderRadius: 64,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 4
    },
    SRShadow: {
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 5,
        backgroundColor: 'rgb(35,37,40)',
        width: 46,
        height: 46,
        borderRadius: 46,
        justifyContent: 'center',
        alignItems: 'center'
    },

});

export { HomeFooter };
