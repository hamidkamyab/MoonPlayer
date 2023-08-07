/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Animated, FlatList, Image } from 'react-native';
import { Box, HStack, Icon, Pressable } from 'native-base';
import { Neomorph } from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import jsmediatags from 'jsmediatags';

const songs = [
    {
        img: 'https://www.soorban.com/images/news/2022/03/1648435354_X3yV4.jpg'
    },
    {
        img: 'https://roozaneh.net/wp-content/uploads/2018/07/aks-romantic-6-e1532606100217.jpg.webp'
    },
    {
        img: 'https://www.soorban.com/images/news/2022/03/1648435355_L6oA2.jpg'
    },
    {
        img: 'https://www.soorban.com/images/news/2022/03/1648435355_H1eR0.jpg'
    }
]
const CoverSection = (props) => {
    // const jsmediatags = require('jsmediatags');

    const scrollX = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        scrollX.addListener(({ value }) => {
            console.log('ScrollX:', scrollX)
        })
        console.log('Cover:', props.CoverUrl)
        // new jsmediatags.Reader('../../assets/Rammstein-Rammlied.mp3')
        //     .read({
        //         onSuccess: (tag) => {
        //             console.log('Success!');
        //             console.log(tag);
        //         },
        //         onError: (error) => {
        //             console.log('Error');
        //             console.log(error);
        //         }
        //     });

        // return () => {
        //     cleanup
        // };
    }, []);
    return (
        <>
            <Box position={'relative'}>
                <HStack style={styles.MainBox}>
                    <Neomorph useArt style={styles.coverShadow} >
                        <Box style={styles.imgBox}>
                            <Image source={props.CoverUrl == null?require('../../assets/img/musicCover.png'):{uri: props.CoverUrl}} alt="musicCover" style={styles.imgCover} />
                            {/* <Animated.FlatList
                                data={props.CoverUrl}
                                renderItem={({ index, item }) => (
                                    <Animated.Image source={{ uri: item.coverPath }} alt="musicCover" style={styles.imgCover} />
                                )}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                scrollEventThrottle={16}
                                onScroll={Animated.event(
                                    [{
                                        nativeEvent: {
                                            contentOffset: { x: scrollX }
                                        }
                                    }],
                                    { useNativeDriver: true }
                                )}
                                style={styles.FlatListBox}
                                contentContainerStyle={{ alignItems: 'center' }}
                            /> */}
                        </Box>
                    </Neomorph>
                </HStack>
                <HStack style={styles.FavEquBox}>
                    <Neomorph useArt style={styles.outShadow} >
                        <Neomorph inner useArt style={styles.inShadow} >
                            <LinearGradient colors={['#2B2E31', '#1B1D20']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }} style={styles.linearGradient}>
                                <Icon as={AntDesign} name='heart' size={22} color={'#EE520F'} />
                            </LinearGradient>
                        </Neomorph>
                    </Neomorph>

                    <Neomorph useArt style={styles.outShadow} >
                        <Pressable onPress={() => props.setIsOpenEqualizer(true)}>
                            <Neomorph inner useArt style={styles.inShadow} >
                                <LinearGradient colors={['#2B2E31', '#1B1D20']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }} style={styles.linearGradient}>
                                    <Icon as={MaterialIcons} name='equalizer' size={26} color={'#ccc'} />
                                </LinearGradient>
                            </Neomorph>
                        </Pressable>
                    </Neomorph>
                </HStack>
            </Box>
        </>
    );
}

const styles = StyleSheet.create({
    MainBox: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    coverShadow: {
        shadowOffset: { width: 26, height: 26 },
        shadowRadius: 26,
        backgroundColor: 'rgb(42,44,46)',
        width: 260,
        height: 260,
        borderRadius: 260,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgBox: {
        width: 240,
        height: 240,
        borderRadius: 240,
        backgroundColor: '#EE520F',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    FlatListBox: {
        width: 226,
        height: 226,
    },
    imgCover: {
        resizeMode: 'contain',
        borderRadius: 226,
        width: 226,
        height: 226,
    },
    FavEquBox: {
        height: 'auto',
        width: '100%',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 250
    },
    outShadow: {
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 5,
        backgroundColor: 'rgb(46,48,51)',
        width: 52,
        height: 52,
        borderRadius: 52,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inShadow: {
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 4,
        backgroundColor: 'rgb(36,41,45)',
        width: 46,
        height: 46,
        borderRadius: 46,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradient: {
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export { CoverSection };
