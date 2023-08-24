/* eslint-disable prettier/prettier */
import { VStack, Text, Box, ScrollView } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

const TitleMusicSection = (props) => {
    return (
        <VStack style={styles.BoxMain} >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Box style={styles.TextBox}>
                    <Text numberOfLines={1} color={'#EE520F'} fontSize={18} fontWeight={'bold'} mb={2} >
                        {props.titleTrack}
                    </Text>
                </Box>
            </ScrollView>
            <Box style={styles.TextBox}>
                <Text numberOfLines={1} color={'#EE520F'} fontSize={14} fontWeight={'bold'}>
                    Shahin Najafi
                </Text>
            </Box>
        </VStack>
    );
}

const styles = StyleSheet.create({
    BoxMain: {
        width: '100%',
        marginTop: 60,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    TextTitle: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center'
    }
})

export { TitleMusicSection };