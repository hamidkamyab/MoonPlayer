/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, HStack, Icon, Modal, ScrollView, Text, VStack } from 'native-base';
import { Neomorph } from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

const EqualizerComponent = (props) => {
    return (
        <>
            <Modal isOpen={props.isOpenEqualizer} onClose={props.isClose} >
                <Modal.Content style={styles.ModalContent} backgroundColor={'#1F2124'}>
                    <Modal.Body p={0} py={4}>
                        <HStack justifyContent={'space-between'} px={5}>
                            <HStack alignItems={'center'}  space={2}>
                                <Icon as={AntDesign} name='closecircleo' size={6} onPress={props.isClose} />
                                <Text color='#ccc'>Equalizer</Text>
                            </HStack>
                            <HStack space={2}>
                                <Text color='#ccc'>OFF</Text>
                                <Neomorph style={styles.EquStatusShadow}>
                                    <Box style={styles.EquStatusBox}>
                                        <Neomorph inner style={styles.EquStatusInShadow}>
                                            <LinearGradient colors={['#942626', '#DE4040']} start={{ x: 0.5, y: 1.2 }} end={{ x: 0, y: 0.60 }} style={styles.linearGradient} />
                                        </Neomorph>
                                    </Box>
                                </Neomorph>
                            </HStack>
                        </HStack>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                            <HStack my={5} space={5} px={5}>
                                <Neomorph style={styles.EquListShadow}>
                                    <Box style={styles.EquListBox}>
                                        <Text color='#ccc' fontSize={12} fontWeight={'600'} >Custom</Text>
                                    </Box>
                                </Neomorph>

                                <Neomorph style={styles.EquListShadow}>
                                    <Box style={styles.EquListBox} backgroundColor={'#EB500E'}>
                                        <Text color='#ccc' fontSize={12} fontWeight={'600'} >Rock</Text>
                                    </Box>
                                </Neomorph>

                                <Neomorph style={styles.EquListShadow}>
                                    <Box style={styles.EquListBox}>
                                        <Text color='#ccc' fontSize={12} fontWeight={'600'} >Rap</Text>
                                    </Box>
                                </Neomorph>

                                <Neomorph style={styles.EquListShadow}>
                                    <Box style={styles.EquListBox}>
                                        <Text color='#ccc' fontSize={12} fontWeight={'600'} >Pop</Text>
                                    </Box>
                                </Neomorph>
                            </HStack>
                        </ScrollView>

                        <HStack space={5} px={5} justifyContent={'center'}>
                            <VStack space={2} alignItems={'center'}>
                                <Text color='#ccc'>3dB</Text>
                                <Neomorph inner style={styles.FeqList}>
                                    <LinearGradient style={styles.inFeqList} colors={['#EB500E', '#F19204']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }}>
                                        <Neomorph style={styles.CircleFeqList}>
                                            <Neomorph inner style={styles.CircleFeqList}>
                                                <Box style={styles.CircleInFeqList} />
                                            </Neomorph>
                                        </Neomorph>
                                    </LinearGradient>
                                </Neomorph>
                                <Text color='#ccc'>60 Hz</Text>
                            </VStack>

                            <VStack space={2} alignItems={'center'}>
                                <Text color='#ccc'>3dB</Text>
                                <Neomorph inner style={styles.FeqList}>
                                    <LinearGradient style={styles.inFeqList} colors={['#EB500E', '#F19204']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }}>
                                        <Neomorph style={styles.CircleFeqList}>
                                            <Neomorph inner style={styles.CircleFeqList}>
                                                <Box style={styles.CircleInFeqList} />
                                            </Neomorph>
                                        </Neomorph>
                                    </LinearGradient>
                                </Neomorph>
                                <Text color='#ccc'>230 Hz</Text>
                            </VStack>

                            <VStack space={2} alignItems={'center'}>
                                <Text color='#ccc'>3dB</Text>
                                <Neomorph inner style={styles.FeqList}>
                                    <LinearGradient style={styles.inFeqList} colors={['#EB500E', '#F19204']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }}>
                                        <Neomorph style={styles.CircleFeqList}>
                                            <Neomorph inner style={styles.CircleFeqList}>
                                                <Box style={styles.CircleInFeqList} />
                                            </Neomorph>
                                        </Neomorph>
                                    </LinearGradient>
                                </Neomorph>
                                <Text color='#ccc'>910 Hz</Text>
                            </VStack>

                            <VStack space={2} alignItems={'center'}>
                                <Text color='#ccc'>3dB</Text>
                                <Neomorph inner style={styles.FeqList}>
                                    <LinearGradient style={styles.inFeqList} colors={['#EB500E', '#F19204']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }}>
                                        <Neomorph style={styles.CircleFeqList}>
                                            <Neomorph inner style={styles.CircleFeqList}>
                                                <Box style={styles.CircleInFeqList} />
                                            </Neomorph>
                                        </Neomorph>
                                    </LinearGradient>
                                </Neomorph>
                                <Text color='#ccc'>3600 Hz</Text>
                            </VStack>

                            <VStack space={2} alignItems={'center'}>
                                <Text color='#ccc'>3dB</Text>
                                <Neomorph inner style={styles.FeqList}>
                                    <LinearGradient style={styles.inFeqList} colors={['#EB500E', '#F19204']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }}>
                                        <Neomorph style={styles.CircleFeqList}>
                                            <Neomorph inner style={styles.CircleFeqList}>
                                                <Box style={styles.CircleInFeqList} />
                                            </Neomorph>
                                        </Neomorph>
                                    </LinearGradient>
                                </Neomorph>
                                <Text color='#ccc'>14000 Hz</Text>
                            </VStack>
                        </HStack>

                        <VStack p={5} space={4}>
                            <VStack space={2}>
                                <Text color={'#ccc'} fontSize={10}>BASS BOOST</Text>
                                <HStack alignItems={'center'} space={2}>
                                <Neomorph inner style={styles.BassShadow}>
                                    <LinearGradient style={styles.inBassShadow} colors={['#F19204','#EB500E']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }}>
                                        <Neomorph style={styles.CircleFeqList}>
                                            <Neomorph inner style={styles.CircleFeqList}>
                                                <Box style={styles.CircleInFeqList} />
                                            </Neomorph>
                                        </Neomorph>
                                    </LinearGradient>
                                </Neomorph>
                                <Text color={'#ccc'} fontSize={10}>30%</Text>
                                </HStack>
                            </VStack>
                            <VStack space={2}>
                                <Text color={'#ccc'} fontSize={10}>VIRTUALIZER</Text>
                                <HStack alignItems={'center'} space={2}>
                                <Neomorph inner style={styles.BassShadow}>
                                    <LinearGradient style={styles.inBassShadow} colors={['#F19204','#EB500E']} start={{ x: 0.0, y: 0.30 }} end={{ x: 0.5, y: 1.0 }}>
                                        <Neomorph style={styles.CircleFeqList}>
                                            <Neomorph inner style={styles.CircleFeqList}>
                                                <Box style={styles.CircleInFeqList} />
                                            </Neomorph>
                                        </Neomorph>
                                    </LinearGradient>
                                </Neomorph>
                                <Text color={'#ccc'} fontSize={10}>100%</Text>
                                </HStack>
                            </VStack>
                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    ModalContent: {
        width: '90%'
    },
    EquStatusShadow: {
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 4,
        backgroundColor: '#1F2124',
        width: 42,
        height: 22,
        borderRadius: 22,
        justifyContent: 'center',
    },
    EquStatusBox: {
        width: 42,
        height: 22,
        borderRadius: 22,
        backgroundColor: '#DE4040',
        justifyContent: 'center',
        alignItems: 'center'
    },
    EquStatusInShadow: {
        shadowOffset: { width: 8, height: 8 },
        shadowRadius: 4,
        backgroundColor: '#1F2124',
        width: 38,
        height: 18,
        borderRadius: 18,
        justifyContent: 'center',
    },
    linearGradient: {
        width: 16,
        height: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 1,
    },
    EquListShadow: {
        shadowOffset: { width: 6, height: 6 },
        shadowRadius: 6,
        backgroundColor: '#1F2124',
        width: 80,
        height: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    EquListBox: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    FeqList: {
        shadowOffset: { width: 6, height: 6 },
        shadowRadius: 6,
        backgroundColor: '#1F2124',
        width: 12,
        height: 160,
        borderRadius: 12,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    CircleFeqList: {
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 4,
        backgroundColor: '#2A2D31',
        width: 24,
        height: 24,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CircleInFeqList: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#EB500E',
    },
    inFeqList: {
        width: 10,
        height: 100,
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    BassShadow : {
        shadowOffset: { width: 6, height: 6 },
        shadowRadius: 6,
        backgroundColor: '#1F2124',
        width: 280,
        height: 12,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    inBassShadow : {
        width: 100,
        height: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})

export { EqualizerComponent };
