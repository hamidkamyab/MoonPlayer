/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, HStack, Text } from 'native-base';
// import { Neomorph } from 'react-native-neomorph-shadows';
// import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider'

const TimeSection = (props) => {
    return (
        <Box style={styles.MainBox}>
            <HStack justifyContent={'space-between'}>
                <Text style={styles.time}>{new Date(props.positionTime * 1000).toISOString().substr(14,5)}</Text>
                <Text style={styles.time}>{new Date((props.progress.duration * 1000) + 1000).toISOString().substr(14,5)}</Text>
            </HStack>


            <Slider
                style={{ width: 360, height: 5, marginTop:10 }}
                value={props.positionTime}
                minimumValue={0}
                maximumValue={props.progress.duration}
                minimumTrackTintColor="#EE520F"
                maximumTrackTintColor="#000"
                thumbTintColor='#F6A730'
                onSlidingComplete={async (value)=>{
                    await props.TrackPlayer.seekTo(value)
                }}
            />





            {/* <Neomorph inner useArt style={styles.inShadowTimeBar} marginTop={40}>
                        <LinearGradient colors={['#EE520F', '#F6A730']} start={{ x: 0.1, y: 0.30 }} end={{ x: 0.6, y: 1.0 }} style={styles.linearGradient}>
                        <Neomorph inner useArt style={styles.SeekTimeBar} >
                            <LinearGradient colors={['#EE520F', '#802E0C']} start={{ x: 0.0, y: 0.30 }} style={styles.SeekCenter} />
                        </Neomorph>
                        </LinearGradient>

            </Neomorph> */}

        </Box>
    );
}

const styles = StyleSheet.create({
    MainBox: {
        paddingHorizontal: 25,
        marginVertical: 10
    },
    time: {
        color: '#888',
        fontSize: 16,
        fontWeight: 'bold'
    },
    inShadowTimeBar: {
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 4,
        backgroundColor: 'rgb(36,38,41)',
        width: 360,
        height: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10,
        paddingHorizontal: 3
    },
    linearGradient: {
        width: 240,
        height: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    SeekTimeBar: {
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 4,
        backgroundColor: 'rgb(40,42,45)',
        width: 36,
        height: 36,
        borderRadius: 36,
        transform: [{ rotate: '180deg' }],
        justifyContent: 'center',
        alignItems: 'center',
    },
    SeekCenter: {
        backgroundColor: '#EE520F',
        width: 12,
        height: 12,
        borderRadius: 12,
    }
})

export { TimeSection };
