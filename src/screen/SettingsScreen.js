/* eslint-disable prettier/prettier */
import { Box, HStack, Icon, Link, ScrollView, Switch, Text, VStack } from 'native-base';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const navigation = useNavigation();
    return (
        <>
            <HStack justifyContent={'space-between'} p={4} borderBottomWidth={1} borderColor={'#5F7072'} >
                <Pressable onPress={()=>navigation.goBack()}>
                    <Icon as={MaterialIcons} size={30} color="#eee" name="keyboard-backspace" />
                </Pressable>
                <HStack space={3} alignItems={'center'}>
                    <Text color={'#eee'} fontSize={18} >Settings</Text>
                </HStack>
            </HStack>
            <ScrollView p={4} showsVerticalScrollIndicator={false} >
                <VStack space={5}>
                    <HStack justifyContent={'space-between'}>
                        <HStack alignItems={'flex-start'} space={2}>
                            <Icon as={MaterialIcons} name="language" color={'#ccc'} size={21} mt={1} />
                            <VStack space={1}>
                                <Text color={'#eee'} fontSize={16} >Language</Text>
                                <Text color={'#ccc'} fontSize={'xs'}>Change the language of Monplayer</Text>
                            </VStack>
                        </HStack>
                        <HStack alignItems={'center'} space={2}>
                            <Text color={'#eee'} fontSize={16} borderBottomWidth={1} borderColor={'#eee'} >En</Text>
                            <Icon as={MaterialIcons} color={'#ccc'} name={'keyboard-arrow-right'} size={28} />
                        </HStack>
                    </HStack>

                    <HStack justifyContent={'space-between'}>
                        <HStack alignItems={'flex-start'} space={2}>
                            <Icon as={FontAwesome6} name="brush" color={'#ccc'} size={19} marginLeft={1} mt={1} />
                            <VStack space={1}>
                                <Text color={'#eee'} fontSize={16} >Theme</Text>
                                <Text color={'#ccc'} fontSize={'xs'}>Change the theme of Monplayer</Text>
                            </VStack>
                        </HStack>
                        <HStack alignItems={'center'} space={2}>
                            <Box width={5} height={5} backgroundColor={'#1F2124'} borderWidth={1} borderColor={'#eee'} />

                            <Icon color={'#ccc'} as={MaterialIcons} name={'keyboard-arrow-right'} size={28} />
                        </HStack>
                    </HStack>

                    <HStack justifyContent={'space-between'}>
                        <HStack alignItems={'flex-start'} space={2}>
                            <Icon as={MaterialCommunityIcons} name="timer-outline" color={'#ccc'} size={23} mt={0.5} />
                            <VStack space={1}>
                                <Text color={'#eee'} fontSize={16} >Sleep timer</Text>
                                <Text color={'#ccc'} fontSize={'xs'}>Set a time to play the song</Text>
                            </VStack>
                        </HStack>
                        <HStack alignItems={'center'} space={2}>
                            <Icon color={'#ccc'} as={MaterialIcons} name={'keyboard-arrow-right'} size={28} />
                        </HStack>
                    </HStack>


                    <HStack justifyContent={'space-between'}>
                        <HStack alignItems={'flex-start'} space={2}>
                            <Icon as={MaterialCommunityIcons} name="headphones" color={'#ccc'} size={21} mt={1} />
                            <VStack space={1}>
                                <Text color={'#eee'} fontSize={16} >Pause on detach</Text>
                                <Text color={'#ccc'} fontSize={'xs'}>Change the language of Monplayer</Text>
                            </VStack>
                        </HStack>
                        <HStack alignItems={'center'}>
                            <Switch size="sm" colorScheme="orange" />
                        </HStack>
                    </HStack>

                    <HStack justifyContent={'space-between'}>
                        <HStack alignItems={'flex-start'} space={2}>
                            <Icon as={MaterialIcons} name="screen-lock-portrait" color={'#ccc'} size={21} mt={1} />
                            <VStack space={1}>
                                <Text color={'#eee'} fontSize={16} >Lock Screen Playing</Text>
                                <Text color={'#ccc'} fontSize={'xs'}>Change the language of Monplayer</Text>
                            </VStack>
                        </HStack>
                        <HStack alignItems={'center'}>
                            <Switch size="sm" colorScheme="orange" />
                        </HStack>
                    </HStack>

                    <HStack justifyContent={'space-between'}>
                        <HStack alignItems={'flex-start'} space={2}>
                            <Icon as={MaterialIcons} name="star-border" color={'#ccc'} size={23} />
                            <VStack space={1}>
                                <Text color={'#eee'} fontSize={16} >Rate US</Text>
                                <Text color={'#ccc'} fontSize={'xs'}>Change the language of Monplayer</Text>
                            </VStack>
                        </HStack>
                        <HStack alignItems={'center'} space={2}>
                            <Link href="https://nativebase.io" borderBottomWidth={1} borderColor={'#fa8231'} marginRight={3} >
                                <Text color="#fa8231">Rate</Text>
                            </Link>
                        </HStack>
                    </HStack>

                    <HStack justifyContent={'space-between'}>
                        <HStack alignItems={'flex-start'} space={2}>
                            <Icon as={MaterialIcons} name="info" color={'#ccc'} size={21} mt={1} marginLeft={0.5} />
                            <VStack space={1}>
                                <Text color={'#eee'} fontSize={16} >Version</Text>
                                <Text color={'#ccc'} fontSize={'xs'}>Change the language of Monplayer</Text>
                            </VStack>
                        </HStack>
                        <HStack alignItems={'center'} space={2}>
                            <Text href="https://nativebase.io" borderBottomWidth={1} borderColor={'#fa8231'} marginRight={3} color={'#fa8231'} >
                                1.0.0
                            </Text>
                        </HStack>
                    </HStack>

                </VStack>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({})

export { SettingsScreen };
