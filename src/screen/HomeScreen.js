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
import Slider from '@react-native-community/slider';

const jsmediatags = require('jsmediatags');
const { height, width } = Dimensions.get('window');

// const setupPlayer = async () => {
//     try {
//         await TrackPlayer.setupPlayer();
//     }
//     catch (error) {
//         console.log('setupPlayer Error => ', error)
//     }
// }
const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    // const playbackState = usePlaybackState();
    // const progress = useProgress();
    const [repeatMode, setRepeatMode] = useState('Off');
    const [titleTrack, setTitleTrack] = useState();
    const [srcArt, setSrcArt] = useState();
    const [songsList, setSongsList] = useState([]);
    const [coverRotate, setCoverRotate] = useState();
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
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
            // PlayBack(0,false)
            // await TrackPlayer.add(songs);
            // const currentPlaylist = await TrackPlayer.getQueue();
        } catch (error) {
            console.log('getSongsTrackPlayer Error => ', error)
        }
    }


    
    // const playPauseMusic = async () => {
    //     if (isPlaying) {
    //         await SoundPlayer.pause();
    //         setIsPlaying(false);
    //     } else {
    //         await SoundPlayer.playUrl(songsList[0].path, 'mp3');
    //         setIsPlaying(true);
    //     }
    // };


    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const PlayPause = async () => {
        try {
            console.log('isPlaying', isPlaying)
            if (isPlaying) {
                if (isPaused) {
                    await SoundPlayer.resume();
                    setIsPaused(false);
                    setCoverRotate('play');
                } else {
                    await SoundPlayer.pause();
                    setIsPaused(true);
                    setCoverRotate('stop');
                    // seekController('stop');
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

    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const Playing = async (status = null) => {
        // const cover = songsList[currentAudioIndex].cover;
        // const path = songsList[currentAudioIndex].path;
        // const song_key = songsList[currentAudioIndex].song_key;

        // await SoundPlayer.playUrl(path, 'mp3');
        // coverCheck(cover, path, song_key)
        PlayBack(currentAudioIndex, false)
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
            const newIntervalId = setInterval(async() => {
                console.log('Test')
                const info = await SoundPlayer.getInfo();
                console.log('info => ',info.currentTime)
                setPosition(info.currentTime)
                console.log('Postion => ',position)
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

    const PlayBack = async (index, setCI = true) => {
        try {
            if (setCI) {
                setCurrentAudioIndex(index);
            }
            const cover = songsList[index].cover;
            const path = songsList[index].path;
            const song_key = songsList[index].song_key;
            setTitleTrack(songsList[index].name);
            await SoundPlayer.playUrl(path, 'mp3');
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
            console.log(currentAudioIndex)
            await SoundPlayer.stop();
            setCoverRotate('stop')
            if (status == 'next') {
                const nextSong = currentAudioIndex + 1;
                PlayBack(nextSong)
            } else {
                const prevSong = currentAudioIndex - 1;
                PlayBack(prevSong)
            }
            setCoverRotate('play')
            setIsPlaying(true);
            setIsPaused(false);
        }
        catch (error) {
            console.log('skip Error =>', error)
        }
    }


    // const getFFTime = (duration, status) => {
    //     jumpTrackPlayer(duration, status)

    // }

    // const jumpTrackPlayer = async (duration, status) => {
    //     try {
    //         const currentPosition = await SoundPlayer.getInfo() // Also, you need to await this because it is async
    //         if (duration < 2) {
    //             duration = 5;
    //         }
    //         if (status == 'forward') {
    //             await SoundPlayer.seek(currentPosition.currentTime + parseInt(duration))
    //         } else if (status == 'backward') {
    //             await SoundPlayer.seek(currentPosition.currentTime - parseInt(duration));
    //         }
    //         console.log(currentPosition.currentTime)
    //     }
    //     catch (error) {
    //         console.log('jumpTrackPlayer Error => ', error)
    //     }
    // }

    const coverCheck = (cover, path = null, song_key = null) => {
        if (cover == null) {
            getCover(path, song_key)
        } else if (cover !== 'default') {
            setSrcArt(cover)
        } else {
            setSrcArt(null)
        }
    }

    // const togglePlayback = async (playbackState) => {
    //     try {
    //         const currentTrack = await TrackPlayer.getCurrentTrack();
    //         if (currentTrack != null) {
    //             if (playbackState === State.Paused || playbackState === State.Ready) {
    //                 await TrackPlayer.play();
    //                 setCoverRotate('play')
    //                 songsTimer('start')
    //             } else {
    //                 await TrackPlayer.pause();
    //                 setCoverRotate('pause')
    //                 songsTimer('pause')
    //             }
    //         }
    //     } catch (error) {
    //         console.log("togglePlayback Error => ", error)
    //     }
    // }

    // const [positionTime, setPositionTime] = useState(0)
    // const [positionInterval, setPositionInterval] = useState(null)
    // const songsTimer = (status = '') => {
    //     if (status == 'start') {
    //         setPositionInterval(setInterval(async () => {
    //             setPositionTime(await TrackPlayer.getPosition())
    //         }, 1000));
    //     }
    //     if (status == 'pause') {
    //         clearInterval(positionInterval);
    //     }
    //     if (status == 'stop') {
    //         clearInterval(positionInterval);
    //         setPositionTime(0)
    //     }

    // }

    // const getFFTime = (duration, status) => {
    //     jumpTrackPlayer(duration, status)
    // }

    // const jumpTrackPlayer = async (duration, status) => {
    //     try {
    //         const currentPosition = await TrackPlayer.getPosition();
    //         if (duration < 2) {
    //             duration = 5;
    //         }
    //         if (status == 'forward') {
    //             await TrackPlayer.seekTo(currentPosition + parseFloat(duration));
    //         } else if (status == 'backward') {
    //             await TrackPlayer.seekTo(currentPosition - parseFloat(duration));
    //         }
    //     }
    //     catch (error) {
    //         console.log('jumpTrackPlayer Error => ', error)
    //     }
    // }


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

    // const changeRepeatMode = () => {
    //     if (repeatMode == 'Off') {
    //         setRepeatMode('Track')
    //         TrackPlayer.setRepeatMode(RepeatMode.Track)
    //     }
    //     if (repeatMode == 'Track') {
    //         setRepeatMode('Queue')
    //         TrackPlayer.setRepeatMode(RepeatMode.Queue)
    //     }
    //     if (repeatMode == 'Queue') {
    //         setRepeatMode('Off')
    //         TrackPlayer.setRepeatMode(RepeatMode.Off)
    //     }
    // }

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
                // setIsPlaying(false);
                skip('next')
                // setPosition(0);
            });
            // setInterval(() => {
            //     if (isPlaying) {
            //         console.log('Play')
            //     }
            // }, 1000);

            return () => {
                subscription.remove();
            };
        }
    }, [currentAudioIndex, isPlaying]);


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
            <CoverSection setIsOpenEqualizer={setIsOpenEqualizer} CoverUrl={srcArt} status={coverRotate} />
            <TitleMusicSection titleTrack={titleTrack} />
            {/* <TimeSection progress={progress} positionTime={positionTime} TrackPlayer={TrackPlayer} /> */}
            <TimeSection position={position} onSeek={onSeek} duration={duration} />

            {/* <Slider
                value={position}
                onValueChange={onSeek}
                minimumValue={0}
                maximumValue={duration}
                step={1}
            />
            <Text style={{color:'#fff'}}>{position}</Text>
            <Slider
                style={{ width: 360, height: 5, marginTop: 10 }}
                value={position}
                minimumValue={0}
                maximumValue={duration}
                minimumTrackTintColor="#EE520F"
                maximumTrackTintColor="#000"
                thumbTintColor='#F6A730'
                onSlidingComplete={async (value) => {
                    onSeek(value);
                }}
            /> */}

            <ControlSection PlayPause={PlayPause} next={() => skip('next')} previous={() => skip('previous')} isPlaying={isPlaying} isPaused={isPaused} />
            {/* getFFTime={getFFTime} */}
            {/* <HomeFooter repeatMode={repeatMode} changeRepeatMode={changeRepeatMode} setIsOpenPlaylist={setIsOpenPlaylist} /> */}
            <EqualizerComponent isOpenEqualizer={isOpenEqualizer} isClose={closeEqualizer} />
            <MenuComponent isOpen={isOpen} onClose={onClose} setIsOpenProperties={setIsOpenProperties} />

            <PlaylistSection isOpenPlaylist={isOpenPlaylist} isClosePlaylist={ClosePlaylist} songsList={songsList} />
            {/* currentTrackPlaylist={currentTrackPlaylist} playSelectTrack={playSelectTrack} */}

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






