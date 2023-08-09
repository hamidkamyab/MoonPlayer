/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Pressable } from 'react-native';
import { Box, Spinner, useDisclose, Text, VStack } from 'native-base';
import { CoverSection, TitleMusicSection, HomeHeader, TimeSection, HomeFooter, MenuComponent, ControlSection, PropertiesComponent, EqualizerComponent } from '../components';
import RNFS from 'react-native-fs'
import TrackPlayer, { RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents, Event, Capability } from 'react-native-track-player';
import { encode as btoa } from 'base-64'

const jsmediatags = require('jsmediatags');
const { height, width } = Dimensions.get('window');

const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
}

const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const playbackState = usePlaybackState();
    const progress = useProgress();
    const [repeatMode, setRepeatMode] = useState('Off');
    const [titleTrack, setTitleTrack] = useState();
    const [srcArt, setSrcArt] = useState();


    let id = 1;
    const findAudioFiles = async (dirPath) => {
        try {
            const files = await RNFS.readDir(dirPath);
            const audioFiles = [];

            for (const file of files) {
                if (file.isDirectory() && file.name != '.thumbnails') {
                    const subDirAudioFiles = await findAudioFiles(file.path);
                    audioFiles.push(...subDirAudioFiles);
                } else {
                    const lowerCaseName = file.name.toLowerCase();
                    if (lowerCaseName.endsWith('.mp3') || lowerCaseName.endsWith('.wav') || lowerCaseName.endsWith('.wma') || lowerCaseName.endsWith('.ogg') || lowerCaseName.endsWith('.flac') || lowerCaseName.endsWith('.aac')) {
                        file.id = id;
                        file.url = 'file://' + file.path;
                        audioFiles.push(file);
                        id++;
                    }
                }
            }

            return audioFiles;
        } catch (error) {
            return []; // تغییر اینجا
        }
    };

    const togglePlayback = async (playbackState) => {
        try {
            const currentTrack = await TrackPlayer.getCurrentTrack();
            if (currentTrack != null) {
                if (playbackState === State.Paused || playbackState === State.Ready) {
                    await TrackPlayer.play();
                } else {
                    await TrackPlayer.pause();
                }
            }
        } catch {
            console.log("togglePlayback Error!")
        }
    }


    const getFFTime = (duration, status) => {
        jumpTrackPlayer(duration, status)
    }

    const jumpTrackPlayer = async (duration, status) => {
        try {
            const currentPosition = await TrackPlayer.getPosition();
            if (status == 'forward') {
                await TrackPlayer.seekTo(currentPosition + parseFloat(duration));
            } else if (status == 'backward') {
                await TrackPlayer.seekTo(currentPosition - parseFloat(duration));
            }
        }
        catch {
            console.log('jumpTrackPlayer Error!')
        }
    }


    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (e) => {
        try {
            if (e.type == Event.PlaybackTrackChanged && e.nextTrack != null) {
                const track = await TrackPlayer.getTrack(e.nextTrack);
                const { name } = track;
                const { path } = track;
                setTitleTrack(name)
                getCover(path)
            }
        }
        catch
        {
            console.log('useTrackPlayerEvents Error!')
        }
    })

    const getCover = (path) => {
        new jsmediatags.Reader(path)
            .read({
                onSuccess: (tag) => {
                    var tags = tag.tags;
                    const { data, format } = tags.picture;
                    let base64String = "";
                    for (let i = 0; i < data.length; i++) {
                        base64String += String.fromCharCode(data[i]);
                    }
                    const src = `data:${format};base64,${btoa(base64String)}`;
                    setSrcArt(src)
                },
                onError: (error) => {
                    setSrcArt(null)
                }
            });
    }

    const { isOpen, onOpen, onClose } = useDisclose();

    const [isOpenProperties, setIsOpenProperties] = useState(false);
    const CloseProperties = () => {
        setIsOpenProperties(false)
    }

    const [isOpenEqualizer, setIsOpenEqualizer] = useState(false);
    const closeEqualizer = () => {
        setIsOpenEqualizer(false);
    };

    const changeRepeatMode = () => {
        if (repeatMode == 'Off') {
            setRepeatMode('Track')
            TrackPlayer.setRepeatMode(RepeatMode.Track)
        }
        if (repeatMode == 'Track') {
            setRepeatMode('Queue')
            TrackPlayer.setRepeatMode(RepeatMode.Queue)
        }
        if (repeatMode == 'Queue') {
            setRepeatMode('Off')
            TrackPlayer.setRepeatMode(RepeatMode.Off)
        }
    }

    async function loadAudioFiles() {
        try {
            await findAudioFiles(RNFS.ExternalStorageDirectoryPath).then(async (audioFiles) => {
                await setupPlayer();
                await TrackPlayer.add(audioFiles);
                setIsLoading(false)
            });
        }
        catch {
            console.log('loadAudioFiles Error!')
        }
    }
    useEffect(() => {
        loadAudioFiles()
    }, []);
    return (
        <>
            {
                isLoading ?
                    <Box style={styles.loadingLayer} >
                        <VStack position={'absolute'} zIndex={11} space={5}>
                            <Spinner color={'#EE520F'} size={80} />
                            <Text color={'#EE520F'} fontSize={18}>Loading Musics...</Text>
                        </VStack>

                        <Box width={'100%'} height={'100%'} backgroundColor={'black'} opacity={0.8} >
                        </Box>

                    </Box> : ''
            }

            <HomeHeader onOpen={onOpen} />
            <CoverSection setIsOpenEqualizer={setIsOpenEqualizer} CoverUrl={srcArt} />
            <TitleMusicSection titleTrack={titleTrack} />
            <TimeSection progress={progress} TrackPlayer={TrackPlayer} />
            <ControlSection playbackState={playbackState} togglePlayback={togglePlayback} skipToNext={TrackPlayer.skipToNext} skipToPrevious={TrackPlayer.skipToPrevious} getFFTime={getFFTime} />
            <HomeFooter repeatMode={repeatMode} changeRepeatMode={changeRepeatMode} />

            <EqualizerComponent isOpenEqualizer={isOpenEqualizer} isClose={closeEqualizer} />
            <MenuComponent isOpen={isOpen} onClose={onClose} setIsOpenProperties={setIsOpenProperties} />

            <PropertiesComponent isOpenProperties={isOpenProperties} isClose={CloseProperties} />
        </>
    );
}

const styles = StyleSheet.create({
    loadingLayer: {
        position: 'absolute',
        width: width,
        height: height,
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export { HomeScreen };
