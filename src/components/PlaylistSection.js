/* eslint-disable prettier/prettier */
import { Modal, HStack, Text, VStack, Box, Icon, Pressable, ScrollView, FlatList, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MarqueeView from 'react-native-marquee-view';

const PlaylistSection = (props) => {
    // console.log('props.songsList =>', props.currentTrackPlaylist)

    const renderItem = ({ item, index }) => (
        <Pressable onPress={() => props.playSelectTrack(item.id - 1)} >
            <HStack alignItems={'center'} py={2} borderBottomWidth={1} borderBottomColor={'#444'} space={1} >
                <HStack flex={1}>
                    <Box justifyContent={'center'}>
                        <Icon as={MaterialCommunityIcons} name='music-box' size={26} color={item.song_key == props.currentTrackPlaylist ? '#EE520F' : '#666'} />
                    </Box>
                </HStack>
                <HStack flex={8}>
                    <Text style={styles.ItemText} color={item.song_key == props.currentTrackPlaylist ? '#EE520F' : '#666'} >{index + 1} - </Text>
                    {
                        item.song_key == props.currentTrackPlaylist ?
                            <MarqueeView style={{ width: '98%' }}>
                                <View>
                                    <Text style={styles.ItemText} paddingRight={50} color={item.song_key == props.currentTrackPlaylist ? '#EE520F' : '#666'} >{item.name}</Text>
                                </View>
                            </MarqueeView>
                            :
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }} >
                                <Text style={styles.ItemText} paddingRight={50} color={item.song_key == props.currentTrackPlaylist ? '#EE520F' : '#666'} >{item.name}</Text>
                            </ScrollView>
                    }
                </HStack>
                <HStack flex={1}>
                    {
                        item.song_key == props.currentTrackPlaylist ?
                            <Icon as={EvilIcons} name='play' style={styles.playingIcon} size={28} />
                            :
                            ''
                    }
                </HStack>
            </HStack>
        </Pressable>
    );
    return (
        <>
            <Modal isOpen={props.isOpenPlaylist} onClose={props.isClosePlaylist}>
                <VStack style={styles.ModalContent} space={4} >
                    <HStack alignItems={'center'} space={2} pb={2} justifyContent={'space-between'} borderBottomColor={'#666'} borderBottomWidth={1} >
                        <Box>
                            <Text fontSize={20} color={'#666'}>Playlist</Text>
                        </Box>
                        <Pressable onPress={props.isClosePlaylist}>
                            <Icon as={EvilIcons} name='close' size={25} color={'#666'} />
                        </Pressable>
                    </HStack>

                    <FlatList
                        data={props.songsList}
                        keyExtractor={(item, index) => index}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                </VStack>
            </Modal >
        </>
    );
}

const styles = StyleSheet.create({
    ModalContent: {
        width: '95%',
        height: '90%',
        padding: 15,
        backgroundColor: 'rgba(230, 230, 230,0.9)',
        borderRadius: 20
    },
    ItemText: {
        fontSize: 18,
        textAlign: 'right',
        fontWeight: 600
    },
    playingIcon: {
        color: '#EE520F',
    }
})

export { PlaylistSection };
