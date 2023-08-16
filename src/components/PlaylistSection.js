/* eslint-disable prettier/prettier */
import { Modal, HStack, Text, VStack, Box, Icon, Pressable, ScrollView, FlatList } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const PlaylistSection = (props) => {
    console.log('props.songsList =>', props.songsList)

    const renderItem = ({ item, index }) => (
        <HStack alignItems={'center'} py={2} borderBottomWidth={1} borderBottomColor={'#444'} >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Text style={styles.ItemText} >{index + 1} - </Text>
                <Text style={styles.ItemText} >{item.name}</Text>
            </ScrollView>

        </HStack>
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
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
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
        // backgroundColor={'#1F2124'}
        backgroundColor: 'rgba(31, 33, 36,0.9)'
    },
    ItemText: {
        color: '#ccc',
        fontSize: 18,
        textAlign: 'right',
    }
})

export { PlaylistSection };
