/* eslint-disable prettier/prettier */
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
const shuffleSongsList = [];
let shuffleIndex = 0;
const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [repeatMode, setRepeatMode] = useState('Off');
    const [shuffleMode, setShuffleMode] = useState(false);
    // const [shuffleIndex, setShuffleIndex] = useState(0);
    const [titleTrack, setTitleTrack] = useState();
    const [albumTrack, setAlbumTrack] = useState();
    const [srcArt, setSrcArt] = useState();
    const [songsList, setSongsList] = useState([]);
    const [coverRotate, setCoverRotate] = useState();
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [runLoadSong, setRunLoadSong] = useState(false);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const [currentTrackPlaylist, setCurrentTrackPlaylist] = useState(null);


    let generateUniqueCode = () => {
        const now = new Date();
        // const timestamp = now.getTime(); // میلی‌ثانیه از زمان Unix Epoch
        const random = Math.floor(Math.random(0, 9) * 100); // عدد تصادفی بین 10 تا 99

        const year = now.getFullYear().toString().slice(-2); // دو رقم آخر سال
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // ماه با دو رقم
        const day = now.getDate().toString().padStart(2, '0'); // روز با دو رقم
        const hours = now.getHours().toString().padStart(2, '0'); // ساعت با دو رقم
        const minutes = now.getMinutes().toString().padStart(2, '0'); // دقیقه با دو رقم
        const seconds = now.getSeconds().toString().padStart(2, '0'); // ثانیه با دو رقم

        const uniqueCode = year + month + day + hours + minutes + seconds + random.toString().padStart(2, '0');
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
                        await new jsmediatags.Reader(file.path)
                            .read({
                                onSuccess: (tag) => {
                                    var tags = tag.tags;
                                    const album = tags.album;
                                    file.album = album;

                                },
                                onError: (error) => {
                                    file.album = null;

                                }
                            });

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
                    'CREATE TABLE IF NOT EXISTS songsTbl (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, path TEXT NOT NULL, size INTEGER NOT NULL, url TEXT NOT NULL, cover TEXT NULL, song_key TEXT NOT NULL, album TEXT NULL)', [],
                    () => {
                        songs.forEach(file => {
                            tx.executeSql('INSERT INTO songsTbl (name,path,size,url,cover,song_key,album) VALUES (?,?,?,?,?,?,?)', [file.name, file.path, file.size, file.url, null, file.song_key, file.album]);
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

    const seekController = (status = null) => {
        try {
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
        } catch (error) {
            console.log('seekController Error => ', error)
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
            
            shuffleIndex = key;
            const cover = songsList[key].cover;
            const path = songsList[key].path;
            const song_key = songsList[key].song_key;
            setCurrentTrackPlaylist(song_key);
            setTitleTrack(songsList[key].name);
            setAlbumTrack(songsList[key].album);
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

    const playSelectTrack = async (trackId) => {
        try {
            PlayBack(trackId, true, true)
            setCoverRotate('play')
            setIsPlaying(true);
            setIsPaused(false);
            ClosePlaylist()
        } catch (error) {
            console.log('playSelectTrack Error => ', error)
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
                        pause = false;
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
        try {
            for (let i = arr.length - 1; i >= 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)); // انتخاب تصادفی یک اندیس
                // جابجایی مقدارها
                const temp = arr[i];
                newArr.push(arr[j]);
                shuffleSongsList.push(songsList[arr[j]])
                arr[i] = arr[j];
                arr[j] = temp;
            }
        } catch (error) {
            console.log('shuffleArray Error =>', error)
        }
    }


    const shuffleSongs = () => {
        try {
            const songsIndex = [];
            for (let i = 0; i < songsList.length; i++) {
                songsIndex.push(i)
            }
            const val = songsIndex[shuffleIndex];
            songsIndex[shuffleIndex] = songsIndex[0];
            newArr.push(val);
            shuffleSongsList.push(songsList[val]);
            shuffleArray(songsIndex.slice(1));
            // console.log(newArr);
            // console.log(shuffleSongsList);
        } catch (error) {
            console.log('shuffleSongs Error =>', error)
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


    const getCover = async (path, song_key) => {
        try {
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
        } catch (error) {
            console.log('getCover Error =>', error)
        }
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
        try {
            let shuffleStatus = !shuffleMode;
            setShuffleMode(!shuffleMode);
            if (shuffleStatus) {
                newArr.splice(0, newArr.length);
                setCurrentAudioIndex(0)
                shuffleSongs();
            } else {
                setCurrentAudioIndex(shuffleIndex);
                shuffleSongsList.splice(0, shuffleSongsList.length);
            }
        } catch (error) {
            console.log('changeShuffleMode Error => ', error)
        }
    }



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
            <TitleMusicSection titleTrack={titleTrack} albumTrack={albumTrack} />
            {/* <TimeSection progress={progress} positionTime={positionTime} TrackPlayer={TrackPlayer} /> */}
            <TimeSection position={position} onSeek={onSeek} duration={duration} />

            <ControlSection PlayPause={PlayPause} next={() => skip('next')} previous={() => skip('previous')} isPlaying={isPlaying} isPaused={isPaused} />
           
            <HomeFooter repeatMode={repeatMode} changeRepeatMode={changeRepeatMode} changeShuffleMode={changeShuffleMode} shuffleMode={shuffleMode} setIsOpenPlaylist={setIsOpenPlaylist} />

            <EqualizerComponent isOpenEqualizer={isOpenEqualizer} isClose={closeEqualizer} />
            <MenuComponent isOpen={isOpen} onClose={onClose} setIsOpenProperties={setIsOpenProperties} />

            <PlaylistSection isOpenPlaylist={isOpenPlaylist} isClosePlaylist={ClosePlaylist} songsList={songsList} currentTrackPlaylist={currentTrackPlaylist} playSelectTrack={playSelectTrack} shuffleSongsList={shuffleSongsList} shuffleMode={shuffleMode} />
           
            <PropertiesComponent isOpenProperties={isOpenProperties} isClose={CloseProperties} />

            <VStack position={'absolute'} bottom={4} alignItems={'center'} w={'100%'} >
                <Text color={'#666'} fontSize={10} fontWeight={'bold'} >Designed By: Hamid Kamyab</Text>
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






