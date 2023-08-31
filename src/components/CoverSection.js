/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, Easing, Image } from 'react-native';
import { Box, HStack, Icon, Pressable } from 'native-base';
import { Neomorph } from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const CoverSection = (props) => {
    const [rotation] = useState(new Animated.Value(0));
    const drawRotate = (status = '') => {
        let animation = Animated.loop(
            Animated.timing(rotation, {
                toValue: 3600,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        if (status == 'play') {
            animation.start();
        } else if (status == 'stop') {
            animation.reset();
        }
    }
    const rotate = rotation.interpolate({
        inputRange: [0, 3600],
        outputRange: ['0deg', '360deg'],
    });
    useEffect(() => {
        if (props.status == 'play') {
            drawRotate('play')
        } else if (props.status == 'stop') {
            drawRotate('stop')
        }

    }, [props.status]);
    return (
        <>
            <Box position={'relative'}>
                <HStack style={styles.MainBox}>
                    <Neomorph useArt style={styles.coverShadow} >
                        <Animated.View style={[styles.imgBox, { transform: [{ rotate }] }]}>
                            <Image source={props.CoverUrl == null ? require('../../assets/img/musicCover.png') : { uri: props.CoverUrl }} alt="musicCover" style={styles.imgCover} />
                        </Animated.View>
                    </Neomorph>
                </HStack>
                <HStack style={styles.FavEquBox}>
                    <Pressable onPress={() => props.handleFavorite()}>
                        <Neomorph useArt style={styles.outShadow} >
                            <Neomorph inner useArt style={styles.inShadow} >
                                <LinearGradient colors={['#efefef', '#e0e0e0']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }} style={styles.linearGradient}>
                                    <Icon as={AntDesign} name='heart' size={22} color={props.isFavorite == 1 ? '#EE520F' : '#666'} />
                                </LinearGradient>
                            </Neomorph>
                        </Neomorph>
                    </Pressable>

                    <Neomorph useArt style={styles.outShadow} >
                        <Pressable onPress={() => props.setIsOpenEqualizer(true)}>
                            <Neomorph inner useArt style={styles.inShadow} >
                                <LinearGradient colors={['#efefef', '#e0e0e0']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }} style={styles.linearGradient}>
                                    <Icon as={MaterialIcons} name='equalizer' size={26} color={'#666'} />
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
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    coverShadow: {
        shadowOffset: { width: 14, height: 14 },
        shadowRadius: 16,
        backgroundColor: '#e0e0e0',
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
        backgroundColor: '#e0e0e0',
        width: 52,
        height: 52,
        borderRadius: 52,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inShadow: {
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 4,
        backgroundColor: '#e0e0e0',
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
