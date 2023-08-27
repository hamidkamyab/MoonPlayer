/* eslint-disable prettier/prettier */
import React from 'react';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { Box, HStack, Icon, Text } from 'native-base';
import { Neomorph } from 'react-native-neomorph-shadows';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const HomeHeader = (props) => {
    return (
        <HStack style={styles.BoxMain}>
            <Neomorph useArt style={styles.outShadow} >
                <Neomorph inner useArt style={styles.inShadow} >
                    <Icon as={AntDesign} name={'close'} size={30} color='#666' />
                </Neomorph>
            </Neomorph>
            <Box>
                <Text color="#666">PLAYING NOW</Text>
            </Box>
            <Pressable onPress={()=>props.onOpen()} >
                <Neomorph useArt style={styles.outShadow} >
                    <Neomorph inner useArt style={styles.inShadow} >
                        <Icon as={Feather} name={'menu'} size={30} color='#666' />
                    </Neomorph>
                </Neomorph>
            </Pressable>
        </HStack>
    );
}

const styles = StyleSheet.create({
    BoxMain: {
        height: 'auto',
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    outShadow: {
        shadowOffset: { width: 6, height: 6 },
        shadowRadius: 6,
        backgroundColor: '#e0e0e0',
        width: 62,
        height: 62,
        borderRadius: 62,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inShadow: {
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 5,
        backgroundColor: '#e0e0e0',
        width: 56,
        height: 56,
        borderRadius: 56,
        transform: [{ rotate: '180deg' }],
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export { HomeHeader };
