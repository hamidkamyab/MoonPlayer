/* eslint-disable prettier/prettier */
import { Box, HStack, Icon, Modal, Text, VStack, View } from 'native-base';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MarqueeView from 'react-native-marquee-view';

const PropertiesComponent = (props) => {
    return (
        <Modal isOpen={props.isOpenProperties} onClose={props.isClose}>
            <VStack style={styles.ModalContent} backgroundColor={'#e0e0e0'} space={4} >
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Text fontSize={20} fontWeight={'600'} color="#222">
                            {props.song && props.song.name != null ?
                                props.song.name
                                :
                                '-'
                            }
                        </Text>
                    </ScrollView>
                    <Icon as={AntDesign} name='close' color="#222" size={21} onPress={props.isClose} />
                </HStack>

                <Box>
                    <VStack space={2} >

                        <Text color="#222" fontSize={16}>File</Text>
                        <HStack space={4} mb={2}>
                            <VStack space={2}>
                                <Text color="#666">
                                    File
                                </Text>
                                <Text color="#666">
                                    Location
                                </Text>
                                <Text color="#666">
                                    Size
                                </Text>
                                <Text color="#666">
                                    Date
                                </Text>
                            </VStack>
                            <VStack space={2}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#666" numberOfLines={1} >
                                        {props.song && props.song.name != null ?
                                            props.song.name
                                            :
                                            '-'
                                        }
                                    </Text>
                                </ScrollView>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#666" numberOfLines={1} >
                                        {props.song && props.song.path != null ?
                                            props.song.path
                                            :
                                            '-'
                                        }
                                    </Text>
                                </ScrollView>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#666" numberOfLines={1} >
                                        {props.song && props.song.size != null ?
                                            (parseInt(props.song.size) / 1000000).toString() + 'MB (' + props.song.size + ' bytes)'
                                            :
                                            '-'
                                        }
                                    </Text>
                                </ScrollView>
                                <Text color="#666">
                                    {props.song && props.song.date != null ?
                                        props.song.date
                                        :
                                        '-'
                                    }
                                </Text>
                            </VStack>
                        </HStack>

                        <Text color="#222" fontSize={16}>Media</Text>
                        <HStack space={4} mb={2}>
                            <VStack space={2}>
                                <Text color="#666">
                                    Title
                                </Text>
                                <Text color="#666">
                                    Length
                                </Text>
                                <Text color="#666">
                                    Year
                                </Text>
                                <Text color="#666">
                                    Artist
                                </Text>
                                <Text color="#666">
                                    Publisher
                                </Text>
                                <Text color="#666">
                                    Copyright
                                </Text>

                            </VStack>
                            <VStack space={2}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#666" numberOfLines={1} >
                                        {props.song && props.song.title != null ?
                                            props.song.title
                                            :
                                            '-'
                                        }
                                    </Text>
                                </ScrollView>
                                <Text color="#666">
                                    {props.song && props.duration != null ?
                                        new Date((props.duration * 1000) + 1000).toISOString().substr(14, 5)
                                        :
                                        '-'
                                    }
                                </Text>
                                <Text color="#666">
                                    {props.song && props.song.year != null ?
                                        props.song.year
                                        :
                                        '-'
                                    }
                                </Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#666" numberOfLines={1} >
                                        {props.song && props.song.artist != null ?
                                            props.song.artist
                                            :
                                            '-'
                                        }
                                    </Text>
                                </ScrollView>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#666" numberOfLines={1} >
                                        {props.song && props.song.publish != null ?
                                            props.song.publish
                                            :
                                            '-'
                                        }
                                    </Text>
                                </ScrollView>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <Text color="#666" numberOfLines={1} >
                                        {props.song && props.song.copyright != null ?
                                            props.song.copyright
                                            :
                                            '-'
                                        }
                                    </Text>
                                </ScrollView>

                            </VStack>
                        </HStack>
                    </VStack>
                </Box>

                {/* <ScrollView showsVerticalScrollIndicator={false} >

                    

                </ScrollView> */}
            </VStack>
        </Modal >
    );
}

const styles = StyleSheet.create({
    ModalContent: {
        width: '100%',
        height: '60%',
        marginBottom: 0,
        marginTop: "auto",
        padding: 15
    },
})

export { PropertiesComponent };
