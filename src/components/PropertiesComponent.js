/* eslint-disable prettier/prettier */
import { HStack, Icon, Modal, ScrollView, Text, VStack, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PropertiesComponent = (props) => {
    return (
        <Modal isOpen={props.isOpenProperties} onClose={props.isClose}>
            <VStack style={styles.ModalContent} backgroundColor={'#1F2124'} space={4} >
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <Text fontSize={20} fontWeight={'600'} color="#fff">
                        Title Music...
                    </Text>
                    <Icon as={AntDesign} name='close' color="#fff" size={21} onPress={props.isClose} />
                </HStack>

                <ScrollView showsVerticalScrollIndicator={false} >

                    <VStack space={2} >

                        <Text color="#fff" fontSize={16}>File</Text>
                        <HStack space={4} mb={2}>
                            <VStack space={2}>
                                <Text color="#ccc">
                                    File
                                </Text>
                                <Text color="#ccc">
                                    Location
                                </Text>
                                <Text color="#ccc">
                                    Size
                                </Text>
                                <Text color="#ccc">
                                    Date
                                </Text>
                            </VStack>
                            <VStack space={2}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#ccc" numberOfLines={1} >
                                        Shahin Najafi - Beshmar 320.mp3
                                    </Text>
                                </ScrollView>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#ccc" numberOfLines={1} >
                                        /storage/emulated/0/Music/ShahinNajafi
                                    </Text>
                                </ScrollView>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#ccc" numberOfLines={1} >
                                        7.3 MB (7,308,986 bytes)
                                    </Text>
                                </ScrollView>
                                <Text color="#ccc">
                                    Novamber 11, 2022, 09:30
                                </Text>
                            </VStack>
                        </HStack>

                        <Text color="#fff" fontSize={16}>Media</Text>
                        <HStack space={4} mb={2}>
                            <VStack space={2}>
                                <Text color="#ccc">
                                    Title
                                </Text>
                                <Text color="#ccc">
                                    Description
                                </Text>
                                <Text color="#ccc">
                                    Format
                                </Text>
                                <Text color="#ccc">
                                    Date
                                </Text>
                                <Text color="#ccc">
                                    Length
                                </Text>
                                <Text color="#ccc">
                                    Year
                                </Text>
                                <Text color="#ccc">
                                    Artist
                                </Text>
                                <Text color="#ccc">
                                    Publisher
                                </Text>
                                <Text color="#ccc">
                                    Copyright
                                </Text>
                                <Text color="#ccc">
                                    Encoded by
                                </Text>
                            </VStack>
                            <VStack space={2}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#ccc" numberOfLines={1} >
                                        Beshmar::Bia2Rap.com
                                    </Text>
                                </ScrollView>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#ccc" numberOfLines={1} >
                                        Beahmar::Description
                                    </Text>
                                </ScrollView>
                                <Text color="#ccc" numberOfLines={1} >
                                    MP2/3 (MPEG audio layer 2/3)
                                </Text>
                                <Text color="#ccc">
                                    3:00
                                </Text>
                                <Text color="#ccc">
                                    2020
                                </Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#ccc" numberOfLines={1} >
                                        ShahinNajafi::Bia2Rap.com
                                    </Text>
                                </ScrollView>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#ccc" numberOfLines={1} >
                                        ~بیا تو رپ~
                                    </Text>
                                </ScrollView>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#ccc" numberOfLines={1} >
                                        Bia2Rap.com
                                    </Text>
                                </ScrollView>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#ccc" numberOfLines={1} >
                                        Bia2Rap.com
                                    </Text>
                                </ScrollView>
                            </VStack>
                        </HStack>

                        <Text color="#fff" fontSize={16}>Stream #1</Text>
                        <HStack space={4} mb={2}>
                            <VStack space={2}>
                                <Text color="#ccc">
                                    Type
                                </Text>
                                <Text color="#ccc">
                                    Codec
                                </Text>
                                <Text color="#ccc">
                                    Sample rate
                                </Text>
                                <Text color="#ccc">
                                    Channels
                                </Text>
                                <Text color="#ccc">
                                    Bit rate
                                </Text>
                            </VStack>
                            <VStack space={2}>
                                <Text color="#ccc" numberOfLines={1} >
                                    Audio
                                </Text>
                                <Text color="#ccc" numberOfLines={1} >
                                    MP3 (MPEG audio layer 3)
                                </Text>
                                <Text color="#ccc" numberOfLines={1} >
                                    44100 Hz
                                </Text>
                                <Text color="#ccc" numberOfLines={1} >
                                    Stereo
                                </Text>
                                <Text color="#ccc" numberOfLines={1} >
                                    320.0 kbits/sec
                                </Text>
                            </VStack>
                        </HStack>

                    </VStack>

                </ScrollView>
            </VStack>
        </Modal >
    );
}

const styles = StyleSheet.create({
    ModalContent: {
        width: '100%',
        height:'60%',
        marginBottom: 0,
        marginTop: "auto",
        padding: 15
    },
})

export { PropertiesComponent };
