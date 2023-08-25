﻿/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Box, Spinner, useDisclose, Text, VStack } from 'native-base';
import { CoverSection, TitleMusicSection, HomeHeader, TimeSection, HomeFooter, MenuComponent, ControlSection, PropertiesComponent, EqualizerComponent, PlaylistSection } from '../components';
import RNFS from 'react-native-fs'
// import TrackPlayer, { RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents, Event, Capability } from 'react-native-track-player';
import { encode as btoa } from 'base-64'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
import SoundPlayer from 'react-native-sound-player';

const jsmediatags = require('jsmediatags');
const { height, width } = Dimensions.get('window');
const newArr = [];
let shuffleIndex = 0;
const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [repeatMode, setRepeatMode] = useState('Off');
    const [shuffleMode, setShuffle] = useState(false);
    // const [shuffleIndex, setShuffleIndex] = useState(0);
    const [titleTrack, setTitleTrack] = useState();
    const [srcArt, setSrcArt] = useState();
    const [songsList, setSongsList] = useState([]);
    const [coverRotate, setCoverRotate] = useState();
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [runLoadSong, setRunLoadSong] = useState(false);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);

    // const [currentTrackPlaylist, setCurrentTrackPlaylist] = useState(null);


    let generateUniqueCode = () => {
        const now = new Date();
        const year = now.getFullYear().toString().slice(-2); // دو رقم آخر سال
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // ماه با دو رقم
        const day = now.getDate().toString().padStart(2, '0'); // روز با دو رقم
        const hours = now.getHours().toString().padStart(2, '0'); // ساعت با دو رقم
        const minutes = now.getMinutes().toString().padStart(2, '0'); // دقیقه با دو رقم
        const seconds = now.getSeconds().toString().padStart(2, '0'); // ثانیه با دو رقم
        const r1 = Math.floor(Math.random(0, 9) * 10);
        const r2 = Math.floor(Math.random(0, 9) * 10);
        // ترکیب تاریخ و زمان به عنوان کد یونیک
        const uniqueCode = year + month + day + hours + minutes + seconds + r1 + r2;
        return uniqueCode;

    };

    /////////////////////Find And Save All Songs////////////////////
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
                        file.song_key = generateUniqueCode();
                        file.url = 'file://' + file.path;
                        audioFiles.push(file);
                    }
                }
            }

            return audioFiles;
        } catch (error) {
            return []; // تغییر اینجا
        }
    };


    async function loadAudioFiles() {
        try {
            await findAudioFiles(RNFS.ExternalStorageDirectoryPath).then(async (audioFiles) => {
                try {
                    const externalDirs = await RNFS.getAllExternalFilesDirs();
                    console.log('SD Cart =>', externalDirs)
                    getSongsTrackPlayer(audioFiles);
                    saveToDB(audioFiles)
                    setIsLoading(false)
                } catch (error) {
                    console.log('findAudioFiles in loadAudioFiles Error => ', error)
                }
            });
        }
        catch (error) {
            console.log('loadAudioFiles Error => ', error)
        }
    }

    const saveToDB = async (songs) => {
        try {
            const db = SQLite.openDatabase({ name: 'songsDb', location: 'default' });
            db.transaction(tx => {
                tx.executeSql('DROP TABLE IF EXISTS songsTbl', [],);
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS songsTbl (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, path TEXT NOT NULL, size INTEGER NOT NULL, url TEXT NOT NULL, cover TEXT NULL, song_key TEXT NOT NULL)', [],
                    () => {
                        songs.forEach(file => {
                            tx.executeSql('INSERT INTO songsTbl (name,path,size,url,cover,song_key) VALUES (?,?,?,?,?,?)', [file.name, file.path, file.size, file.url, null, file.song_key]);
                        });
                    },
                    error => {
                        console.log('Error executing the CREATE TABLE command:', error);
                    }
                );
            });
            await AsyncStorage.setItem('saveToDb', '1');
        } catch (error) {
            console.log('Error saveToDB => ', error)
        }
    }

    const readDataFromDatabase = () => {
        try {
            const db = SQLite.openDatabase({
                name: 'songsDb',
                location: 'default',
            });
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM songsTbl', [], (_, results) => {
                    const rows = results.rows;
                    const dataList = [];
                    for (let i = 0; i < rows.length; i++) {
                        dataList.push(rows.item(i));
                    }
                    getSongsTrackPlayer(dataList);
                    setIsLoading(false)
                });
            });
        } catch (error) {
            console.log('readDataFromDatabase Error => ', error)
        }
    };

    const loadSongs = async () => {
        try {
            const check = await AsyncStorage.getItem('saveToDb');
            if (check !== null) {
                readDataFromDatabase()
            } else {
                setTimeout(() => {
                    loadAudioFiles()
                }, 3000);
            }
        } catch (error) {
            console.log('loadSongs Error => ', error)
        }
    }
    //////////////////////////////////////

    const getSongsTrackPlayer = async (songs) => {
        try {
            setSongsList(songs)
        } catch (error) {
            console.log('getSongsTrackPlayer Error => ', error)
        }
    }


    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const PlayPause = async () => {
        try {
            if (isPlaying) {
                if (isPaused) {
                    await SoundPlayer.resume();
                    setIsPaused(false);
                    setCoverRotate('play');
                } else {
                    await SoundPlayer.pause();
                    setIsPaused(true);
                    setCoverRotate('stop');
                }
            } else {
                setIsPlaying(true);
                Playing()
            }
        }
        catch (error) {
            console.log('PlayPause Error =>', error)
        }
    }

    const Playing = async (status = null) => {
        PlayBack(currentAudioIndex, true, false)
        setCoverRotate('play');
    }

    // const [intervalId, setIntervalId] = useState(null);
    // const seekController = (status = null) => {
    //     console.log('seekController => ', status)
    //     setIntervalId(setInterval(() => {
    //         console.log('Test')
    //     }, 2000));
    //     if (status == 'stop') {
    //         clearInterval(intervalId)
    //         console.log('clearInterval(intervalId)', intervalId)

    //     }
    // }

    const [intervalId, setIntervalId] = useState(null);
    const seekController = (status = null) => {
        if (status === 'stop' && intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        } else if (intervalId === null && status !== 'stop') {
            const newIntervalId = setInterval(async () => {
                const info = await SoundPlayer.getInfo();
                setPosition(info.currentTime)
            }, 1000);
            setIntervalId(newIntervalId);
        }
    };

    useEffect(() => {
        if (!isPlaying || isPaused) {
            seekController('stop');
        } else {
            seekController();
        }
    }, [isPlaying, isPaused]);

    useEffect(() => {
        if (songsList.length > 0 && !runLoadSong) {
            PlayBack(0, false, false)
            setRunLoadSong(true)
        }
    }, [songsList]);
    const PlayBack = async (index, run = true, setCI = true) => {
        try {
            let key;
            if (setCI) {
                setCurrentAudioIndex(index);
            }
            if (shuffleMode) {
                key = newArr[index];
            } else {
                key = index;
            }
            console.log('Key =>', key)
            // setShuffleIndex(key)
            shuffleIndex = key;
            const cover = songsList[key].cover;
            const path = songsList[key].path;
            const song_key = songsList[key].song_key;
            setTitleTrack(songsList[key].name);
            if (run) {
                await SoundPlayer.playUrl(path, 'mp3');
            }
            const info = await SoundPlayer.getInfo();
            setDuration(info.duration);
            coverCheck(cover, path, song_key);
        }
        catch (error) {
            console.log('PlayBack Error => ', error)
        }
    }

    const skip = async (status) => {
        try {
            await SoundPlayer.stop();
            setCoverRotate('stop');
            let pause = false;
            if (status == 'next') {
                let nextSong;
                let play = true;
                if (repeatMode == 'Queue') {
                    if (currentAudioIndex == songsList.length - 1) {
                        nextSong = 0;
                    } else {
                        nextSong = currentAudioIndex + 1;
                    }
                } else {
                    if (currentAudioIndex == songsList.length - 1) {
                        nextSong = 0;
                        play = false;
                        pause = true;
                    } else {
                        nextSong = currentAudioIndex + 1;
                    }
                }
                PlayBack(nextSong, play)
            } else if (status == 'previous') {
                let prevSong;
                if (currentAudioIndex == 0) {
                    prevSong = 0;
                } else {
                    prevSong = currentAudioIndex - 1;
                }
                PlayBack(prevSong)
            } else if (status == 'repeat') {
                const repaetSong = currentAudioIndex;
                PlayBack(repaetSong)
            }
            if (!pause) {
                setCoverRotate('play')
                setIsPlaying(true);
                setIsPaused(false);
            } else {
                setIsPlaying(false);
                setIsPaused(true);
            }

        }
        catch (error) {
            console.log('skip Error =>', error)
        }
    }



    function shuffleArray(arr) {
        try{
            for (let i = arr.length - 1; i >= 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)); // انتخاب تصادفی یک اندیس
                // جابجایی مقدارها
                const temp = arr[i];
                newArr.push(arr[j]);
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }catch(error){
            console.log('shuffleArray Error =>',error)
        }
    }


    // console.log('newArr =>',newArr); // خانه‌های آرایه به صورت تصادفی بریزیده شده
    // newArr[0] = firstIndexValue;

    const shuffleSongs = () => {
        try {
            const songsIndex = [];
            for (let i = 0; i < songsList.length; i++) {
                songsIndex.push(i)
            }
            // const index = 2;
            const val = songsIndex[shuffleIndex];
            songsIndex[shuffleIndex] = songsIndex[0];
            newArr.push(val);
            shuffleArray(songsIndex.slice(1));
            console.log(newArr);
        }catch(error){
            console.log('shuffleSongs Error =>',error)
        }
    }


    const coverCheck = (cover, path = null, song_key = null) => {
        if (cover == null) {
            getCover(path, song_key)
        } else if (cover !== 'default') {
            setSrcArt(cover)
        } else {
            setSrcArt(null)
        }
    }



    // useTrackPlayerEvents([Event.PlaybackTrackChanged], async (e) => {
    //     try {
    //         if (e.type == Event.PlaybackTrackChanged && e.nextTrack != null) {
    //             const track = await TrackPlayer.getTrack(e.nextTrack);
    //             const { song_key } = track;
    //             const { name } = track;
    //             const { path } = track;
    //             setTitleTrack(name)
    //             // setCurrentTrackPlaylist(song_key);

    //             const db = SQLite.openDatabase({
    //                 name: 'songsDb',
    //                 location: 'default',
    //             });
    //             db.transaction(tx => {
    //                 tx.executeSql('SELECT * FROM songsTbl WHERE song_key = ?', [song_key], (tx, results) => {
    //                     if (results.rows.length > 0) {
    //                         if (results.rows.item(0).cover == null) {
    //                             getCover(path, song_key)
    //                         } else if (results.rows.item(0).cover !== 'default') {
    //                             setSrcArt(results.rows.item(0).cover)
    //                         } else {
    //                             setSrcArt(null)
    //                         }
    //                     } else {
    //                         setSrcArt(null); // هیچ رکوردی پیدا نشد
    //                     }
    //                 });
    //             });
    //             if (playbackState == 'paused') {
    //                 setCoverRotate('stop')
    //             } else if (playbackState == 'playing') {
    //                 setCoverRotate('reset')
    //             }
    //             setPositionTime(0);
    //         }
    //     }
    //     catch (error) {
    //         console.log('useTrackPlayerEvents Error => ', error)
    //     }
    // })

    const getCover = async (path, song_key) => {
        const db = SQLite.openDatabase({ name: 'songsDb', location: 'default' });
        await new jsmediatags.Reader(path)
            .read({
                onSuccess: (tag) => {
                    var tags = tag.tags;
                    const { data, format } = tags.picture;
                    let base64String = "";
                    for (let i = 0; i < data.length; i++) {
                        base64String += String.fromCharCode(data[i]);
                    }
                    const src = `data:${format};base64,${btoa(base64String)}`;
                    songsList[currentAudioIndex + 1].cover = src;
                    db.transaction(tx => {
                        tx.executeSql(
                            'UPDATE songsTbl SET cover = ? WHERE song_key = ?',
                            [src, song_key],
                            (txObj, resultSet) => {
                                //////Success
                            },
                            (txObj, error) => {
                                console.log('Error Submit Cover')
                            }
                        );
                    });
                    setSrcArt(src)
                },
                onError: (error) => {
                    db.transaction(tx => {
                        tx.executeSql(
                            'UPDATE songsTbl SET cover = ? WHERE song_key = ?',
                            ['default', song_key],
                            (txObj, resultSet) => {
                                //////Success
                            },
                            (txObj, error) => {
                                console.log('Error Submit Defualt Cover')
                            }
                        );
                    });
                    setSrcArt(null)
                }
            });
    }

    const { isOpen, onOpen, onClose } = useDisclose();

    const [isOpenProperties, setIsOpenProperties] = useState(false);
    const CloseProperties = () => {
        setIsOpenProperties(false)
    }

    const [isOpenPlaylist, setIsOpenPlaylist] = useState(false);
    const ClosePlaylist = () => {
        setIsOpenPlaylist(false)
    }

    const [isOpenEqualizer, setIsOpenEqualizer] = useState(false);
    const closeEqualizer = () => {
        setIsOpenEqualizer(false);
    };

    const changeRepeatMode = () => {
        if (repeatMode == 'Off') {
            setRepeatMode('Track')
        }
        if (repeatMode == 'Track') {
            setRepeatMode('Queue')
        }
        if (repeatMode == 'Queue') {
            setRepeatMode('Off')
        }
    }

    const changeShuffleMode = () => {
        let shuffleStatus = !shuffleMode;
        setShuffle(!shuffleMode);
        if (shuffleStatus) {
            newArr.splice(0, newArr.length);
            setCurrentAudioIndex(0)
            shuffleSongs();
        }else{
            setCurrentAudioIndex(shuffleIndex)
        }
    }
    // const playSelectTrack = async(trackId) =>{
    //     // const song_key = parseInt(trackId);
    //     console.log('trackId1=>',trackId)
    //     await TrackPlayer.skip(trackId);
    //     await TrackPlayer.play();
    //     console.log('trackId2=>',trackId)
    // }


    const onSeek = async (value) => {
        try {
            setPosition(value);
            await SoundPlayer.seek(value);
        } catch (error) {
            console.log('onSeek Error =>', error)
        }
    };

    useEffect(() => {
        loadSongs();

        if (isPlaying) {
            const subscription = SoundPlayer.addEventListener('FinishedPlaying', () => {

                if (repeatMode == 'Track') {
                    skip('repeat')
                } else {
                    skip('next')
                }
            });

            return () => {
                subscription.remove();
            };
        }
    }, [currentAudioIndex, isPlaying, repeatMode]);


    return (
        <Box position={'relative'} h={'100%'} >
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
            <CoverSection setIsOpenEqualizer={setIsOpenEqualizer} CoverUrl={srcArt} status={coverRotate} />
            <TitleMusicSection titleTrack={titleTrack} />
            {/* <TimeSection progress={progress} positionTime={positionTime} TrackPlayer={TrackPlayer} /> */}
            <TimeSection position={position} onSeek={onSeek} duration={duration} />

            <ControlSection PlayPause={PlayPause} next={() => skip('next')} previous={() => skip('previous')} isPlaying={isPlaying} isPaused={isPaused} />
            {/* <HomeFooter repeatMode={repeatMode} changeRepeatMode={changeRepeatMode} setIsOpenPlaylist={setIsOpenPlaylist} /> */}
            <HomeFooter repeatMode={repeatMode} changeRepeatMode={changeRepeatMode} changeShuffleMode={changeShuffleMode} shuffleMode={shuffleMode} setIsOpenPlaylist={setIsOpenPlaylist} />

            <EqualizerComponent isOpenEqualizer={isOpenEqualizer} isClose={closeEqualizer} />
            <MenuComponent isOpen={isOpen} onClose={onClose} setIsOpenProperties={setIsOpenProperties} />

            <PlaylistSection isOpenPlaylist={isOpenPlaylist} isClosePlaylist={ClosePlaylist} songsList={songsList} />
            {/* currentTrackPlaylist={currentTrackPlaylist} playSelectTrack={playSelectTrack} */}

            <PropertiesComponent isOpenProperties={isOpenProperties} isClose={CloseProperties} />

            <VStack position={'absolute'} bottom={4} alignItems={'center'} w={'100%'} >
                <Text color={'#666'} fontSize={10} fontWeight={'bold'} >Designed By: HamidKamyab</Text>
            </VStack>
        </Box>
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






