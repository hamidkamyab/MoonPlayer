/* eslint-disable prettier/prettier */
import { HStack, Icon, Pressable } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Neomorph } from 'react-native-neomorph-shadows';
import Entypo from 'react-native-vector-icons/Entypo';

const ControlSection = (props) => {
    return (
        <HStack justifyContent={'center'} alignItems={'center'} my={5} space={5} >

            <Pressable onPress={async ()=>await props.skipToPrevious()}>
                <Neomorph useArt style={styles.NexPrevShadow} >
                    <Neomorph inner useArt style={styles.NexPrevInShadow} >
                        <LinearGradient colors={['#32363A', '#232529']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }} style={styles.linearGradient}>
                            <Icon as={Entypo} name="controller-jump-to-start" size={25} color="#ccc" />
                        </LinearGradient>
                    </Neomorph>
                </Neomorph>
            </Pressable>

            <Neomorph useArt style={styles.FFRevShadow} >
                <Neomorph inner useArt style={styles.FFRevInShadow} >
                    <LinearGradient colors={['#32363A', '#232529']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }} style={[styles.linearGradient, { paddingEnd: 2 }]} >
                        <Icon as={Entypo} name="controller-fast-backward" size={18} color="#ccc" />
                    </LinearGradient>
                </Neomorph>
            </Neomorph>

            <Pressable onPress={() => props.togglePlayback(props.playbackState)}>
                <Neomorph useArt style={styles.playShadow}>
                    <Neomorph inner useArt style={styles.playInShadow} >
                        <Icon as={Entypo} name={props.playbackState === 'playing' ? "controller-paus" : "controller-play"} size={54} color="#fff" style={props.playbackState !== 'playing' ? { paddingLeft: 2 } : { paddingLeft: 0 }} />
                    </Neomorph>
                </Neomorph>
            </Pressable>

            <Neomorph useArt style={styles.FFRevShadow} >
                <Neomorph inner useArt style={styles.FFRevInShadow} >
                    <LinearGradient colors={['#32363A', '#232529']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }} style={[styles.linearGradient, { paddingLeft: 2 }]}>
                        <Icon as={Entypo} name="controller-fast-forward" size={18} color="#ccc" />
                    </LinearGradient>
                </Neomorph>
            </Neomorph>

            <Pressable onPress={async ()=>await props.skipToNext()}>
                <Neomorph useArt style={styles.NexPrevShadow} >
                    <Neomorph inner useArt style={styles.NexPrevInShadow} >
                        <LinearGradient colors={['#32363A', '#232529']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }} style={styles.linearGradient}>
                            <Icon as={Entypo} name="controller-next" size={25} color="#ccc" />
                        </LinearGradient>
                    </Neomorph>
                </Neomorph>
            </Pressable>
        </HStack>
    );
}

const styles = StyleSheet.create({
    NexPrevShadow: {
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 5,
        backgroundColor: 'rgb(46,48,51)',
        width: 52,
        height: 52,
        borderRadius: 52,
        justifyContent: 'center',
        alignItems: 'center'
    },
    NexPrevInShadow: {
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 4,
        backgroundColor: 'rgb(26,31,35)',
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
        alignItems: 'center',
    },
    playShadow: {
        shadowOffset: { width: 8, height: 8 },
        shadowRadius: 8,
        backgroundColor: 'rgb(46,48,51)',
        width: 80,
        height: 80,
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    playInShadow: {
        shadowOffset: { width: 8, height: 8 },
        shadowRadius: 8,
        backgroundColor: '#EE520F',
        width: 80,
        height: 80,
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    FFRevShadow: {
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 3,
        backgroundColor: 'rgb(46,48,51)',
        width: 38,
        height: 38,
        borderRadius: 38,
        justifyContent: 'center',
        alignItems: 'center'
    },
    FFRevInShadow: {
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 3,
        backgroundColor: 'rgb(26,31,35)',
        width: 38,
        height: 38,
        borderRadius: 38,
        justifyContent: 'center',
        alignItems: 'center'
    },
    test: {
        padding: 20
    }
})

export { ControlSection };
