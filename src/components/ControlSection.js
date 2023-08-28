/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { HStack, Icon, Pressable } from 'native-base';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Neomorph } from 'react-native-neomorph-shadows';
import Entypo from 'react-native-vector-icons/Entypo';

const ControlSection = (props) => {
    const [pressNextBtn, setPressNextBtn] = useState(false);
    const [pressPrevBtn, setPressPrevBtn] = useState(false);
    const [playBtnStatus, setPlayBtnStatus] = useState(false);

    const handlePlayBtn = () => {
        try {
            if (props.isPlaying && !props.isPaused) {
                setPlayBtnStatus(true)
            } else {
                setPlayBtnStatus(false)
            }
        }
        catch (error) {
            console.log('handlePlayBtn Error =>', error)
        }

    }

    useEffect(() => {
        handlePlayBtn()
    }, [props.isPlaying, props.isPaused]);


    return (
        <HStack justifyContent={'center'} alignItems={'center'} my={5} space={12} >

            <Pressable onPress={props.previous} onPressIn={() => setPressPrevBtn(true)} onPressOut={() => setPressPrevBtn(false)}  style={{zIndex:5}}>
                <Neomorph useArt style={styles.NexPrevShadow} >
                    <Neomorph inner useArt style={styles.NexPrevInShadow} >
                        <LinearGradient colors={pressPrevBtn ? ['#dedede', '#ebebeb'] : ['#efefef', '#e0e0e0']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }} style={styles.linearGradient}>
                            <Icon as={Entypo} name="controller-jump-to-start" size={25} color={pressPrevBtn ? '#EE520F' : '#666'} />
                        </LinearGradient>
                    </Neomorph>
                </Neomorph>
            </Pressable>

            <Pressable onPress={props.PlayPause} style={{zIndex:5}}>
                <Neomorph useArt style={styles.playShadow}>
                    <Neomorph inner useArt style={playBtnStatus ? styles.playingInShadow : styles.playInShadow} >
                        <Icon as={Entypo} name={props.isPlaying ? (props.isPaused ? "controller-play" : "controller-paus") : "controller-play"} size={54} color="#fff" style={playBtnStatus ? { paddingLeft: 0} : { paddingLeft: 2, transform: [{ rotate: '180deg' }]}} />
                    </Neomorph>
                </Neomorph>
            </Pressable>

            <Pressable onPress={props.next} onPressIn={() => setPressNextBtn(true)} onPressOut={() => setPressNextBtn(false)}  style={{zIndex:5}}>
                <Neomorph useArt style={styles.NexPrevShadow} >
                    <Neomorph inner useArt style={styles.NexPrevInShadow} >
                        <LinearGradient colors={pressNextBtn ? ['#dedede', '#ebebeb'] : ['#efefef', '#e0e0e0']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }} style={styles.linearGradient}>
                            <Icon as={Entypo} name="controller-next" size={25} color={pressNextBtn ? '#EE520F' : '#666'} />
                        </LinearGradient>
                    </Neomorph>
                </Neomorph>
            </Pressable>
        </HStack>
    );
}

const styles = StyleSheet.create({
    NexPrevShadow: {
        shadowOffset: { width: 8, height: 8 },
        shadowRadius: 8,
        backgroundColor: '#e0e0e0',
        width: 65,
        height: 65,
        borderRadius: 65,
        justifyContent: 'center',
        alignItems: 'center'
    },
    NexPrevInShadow: {
        shadowOffset: { width: 6, height: 6 },
        shadowRadius: 4,
        backgroundColor: '#e0e0e0',
        width: 59,
        height: 59,
        borderRadius: 59,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradient: {
        width: 53,
        height: 53,
        borderRadius: 53,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playShadow: {
        shadowOffset: { width: 9, height: 9 },
        shadowRadius: 9,
        backgroundColor: '#e0e0e0',
        width: 90,
        height: 90,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center'
    },
    playInShadow: {
        shadowOffset: { width: 9, height: 9 },
        shadowRadius: 6,
        backgroundColor: '#EE520F',
        width: 90,
        height: 90,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '180deg' }]
    },
    playingInShadow: {
        shadowOffset: { width: 9, height: 9 },
        shadowRadius: 6,
        backgroundColor: '#EE520F',
        width: 90,
        height: 90,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '0deg' }]
    },

})

export { ControlSection };
