/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet } from 'react-native';
import { HStack, Icon, Pressable, Text, VStack } from 'native-base';
import { Neomorph } from 'react-native-neomorph-shadows';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeFooter = (props) => {
    const handelItem = () => {
        props.setIsOpenPlaylist(true)
    }
    return (
        <VStack alignItems={'center'} mt={3}>
            <HStack justifyContent={'center'} alignItems={'center'} pt={3} space={10}>
                <Pressable onPress={() => props.changeRepeatMode()}>
                    <Neomorph useArt style={styles.SR_Out_Shadow} >
                        <Neomorph inner useArt style={styles.SR_In_Shadow} >
                            {
                                (props.repeatMode == "Off" || props.repeatMode == 'Queue') ?
                                    <Icon as={MaterialIcons} name="repeat" size={26} color={(props.repeatMode == "Off") ? '#666' : '#EE520F'} />
                                    :
                                    <Icon as={MaterialIcons} name="repeat-one" size={26} color={'#EE520F'} />
                            }
                        </Neomorph>
                    </Neomorph>
                </Pressable>
                <Pressable onPress={() => handelItem()} >
                    <Neomorph useArt style={styles.PlayList} >
                        <Icon as={MaterialIcons} name="playlist-play" size={42} />
                    </Neomorph>
                </Pressable>
                <Pressable onPress={() => props.changeShuffleMode()}>
                    <Neomorph useArt style={styles.SR_Out_Shadow} >
                        <Neomorph inner useArt style={styles.SR_In_Shadow} >
                            <Icon as={Ionicons} name="shuffle" size={26} color={(props.shuffleMode) ? '#EE520F' : '#666'} />
                        </Neomorph>
                    </Neomorph>
                </Pressable>
            </HStack>
        </VStack>
    );
}

const styles = StyleSheet.create({
    PlayList: {
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 5,
        backgroundColor: '#e0e0e0',
        width: 58,
        height: 58,
        borderRadius: 58,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 4
    },
    SR_In_Shadow: {
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 4,
        backgroundColor: '#e0e0e0',
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    SR_Out_Shadow: {
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 4,
        backgroundColor: '#e0e0e0',
        width: 46,
        height: 46,
        borderRadius: 46,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export { HomeFooter };
