/* eslint-disable prettier/prettier */
import { Modal, HStack, Text, VStack, Box, Icon, Pressable, ScrollView, FlatList } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const PlaylistSection = (props) => {
    // console.log('props.songsList =>', props.currentTrackPlaylist)

    const renderItem = ({ item, index }) => (
        // <Pressable onPress={()=>props.playSelectTrack(item.id - 1)} >
            <HStack alignItems={'center'} py={2} borderBottomWidth={1} borderBottomColor={'#444'} >
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    <Text style={styles.ItemText} color={item.song_key == props.currentTrackPlaylist ? '#EE520F' : '#fff'} >{index + 1} - </Text>
                    <Text style={styles.ItemText} paddingRight={50} color={item.song_key == props.currentTrackPlaylist ? '#EE520F' : '#fff'} >{item.name}-{item.song_key}-{item.id}</Text>
                </ScrollView>
                {
                    item.song_key == props.currentTrackPlaylist ?
                        <Icon as={EvilIcons} name='play' style={styles.playingIcon} size={28} />
                        :
                        ''
                }
            </HStack>
        // </Pressable>
    );
    return (
        <>
            <Modal isOpen={props.isOpenPlaylist} onClose={props.isClosePlaylist}>
                <VStack style={styles.ModalContent} space={4} >
                    <HStack alignItems={'center'} space={2} pb={2} justifyContent={'space-between'} borderBottomColor={'#fff'} borderBottomWidth={1} >
                        <Box>
                            <Text fontSize={20} color={'#fff'}>Playlist</Text>
                        </Box>
                        <Pressable onPress={props.isClosePlaylist}>
                            <Icon as={EvilIcons} name='close' size={25} color={'#fff'} />
                        </Pressable>
                    </HStack>

                    <FlatList
                        data={props.songsList}
                        keyExtractor={(item,index) => index}
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
        backgroundColor: 'rgba(31, 33, 36,0.9)'
    },
    ItemText: {
        fontSize: 18,
        textAlign: 'right',
        fontWeight: 600
    },
    playingIcon: {
        position: 'absolute',
        color: '#EE520F',
        right: 0,
        backgroundColor: 'rgb(31, 33, 36)'
    }
})

export { PlaylistSection };
