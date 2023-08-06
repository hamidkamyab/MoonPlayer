/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Slider, useDisclose } from 'native-base';
import { CoverSection, TitleMusicSection, HomeHeader, TimeSection, HomeFooter, MenuComponent, ControlSection, PropertiesComponent, EqualizerComponent } from '../components';
import RNFS from 'react-native-fs'
import TrackPlayer, { RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents, Event } from 'react-native-track-player';


let musicListDir = [];
let id = 1;
const regFileName = /[^\\]*\.(\w+)$/;
const findAudioFiles = (path = '') => {
    if (path == '') {
        var DirPath = RNFS.ExternalStorageDirectoryPath;
    } else {
        var DirPath = path;
    }
    RNFS.readDir(DirPath)
        .then((result) => {
            result.map((item, index) => {
                if (item.isDirectory() && item.name != '.thumbnails') {
                    findAudioFiles(item.path)
                }
                if (item.isFile()) {
                    var FileName = item.path.match(regFileName);
                    var extension = FileName[1];
                    if (extension == 'mp3' || extension == 'wav' || extension == 'wma' || extension == 'ogg' || extension == 'flac' || extension == 'aac') {
                        musicListDir.push({ id: id, url: 'file://' + item.path, title: item.name})
                        id++;
                    }
                }
            })
        })
        .catch((err) => {
            console.log(err.message, err.code);
            // console.log(musicListDir);
        });
}

const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(musicListDir);
}

const togglePlayback = async (playbackState) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack != null) {
        if (playbackState === State.Paused || playbackState === State.Ready) {
            await TrackPlayer.play();
        } else {
            await TrackPlayer.pause();
        }
    }
}
const HomeScreen = () => {
    const playbackState = usePlaybackState();
    const progress = useProgress();
    const [repeatMode, setRepeatMode] = useState('Off');
    const [titleTrack,setTitleTrack] = useState()

    useTrackPlayerEvents([Event.PlaybackTrackChanged],async (e)=>{
        if(e.type == Event.PlaybackTrackChanged && e.nextTrack != null){
            const track = await TrackPlayer.getTrack(e.nextTrack);
            const {title} = track;
            setTitleTrack(title)
        }
    })

    const { isOpen, onOpen, onClose } = useDisclose();

    const [isOpenProperties, setIsOpenProperties] = useState(false);
    const CloseProperties = () => {
        setIsOpenProperties(false)
    }

    const [isOpenEqualizer, setIsOpenEqualizer] = useState(false);
    const closeEqualizer = () => {
        setIsOpenEqualizer(false);
    };
    // setTimeout(async () => {
    //     const [position, duration] = await Promise.all([
    //         TrackPlayer.getPosition(),
    //         TrackPlayer.getDuration()
    //     ])
    //     console.log('Time: ', duration);
    //     console.log(`${duration - position} seconds left.`);
    // }, 10);

    const changeRepeatMode = ()=>{
        if(repeatMode == 'Off'){
            setRepeatMode('Track')
            TrackPlayer.setRepeatMode(RepeatMode.Track)
        }
        if(repeatMode == 'Track'){
            setRepeatMode('Queue')
            TrackPlayer.setRepeatMode(RepeatMode.Queue)
        }
        if(repeatMode == 'Queue'){
            setRepeatMode('Off')
            TrackPlayer.setRepeatMode(RepeatMode.Off)
        }
    }

    useEffect(() => {
        findAudioFiles();
        setupPlayer();
        // ttt()
    }, []);
    return (
        <>
            {/* <Pressable onPress={()=>togglePlayback(playbackState)}><Text style={{color:'#fff',fontSize:20}}>Play!!!</Text></Pressable> */}
            <HomeHeader onOpen={onOpen} />
            <CoverSection setIsOpenEqualizer={setIsOpenEqualizer} />
            <TitleMusicSection titleTrack={titleTrack} />
            <TimeSection progress={progress} TrackPlayer={TrackPlayer} />
            <ControlSection playbackState={playbackState} togglePlayback={togglePlayback} skipToNext={TrackPlayer.skipToNext} skipToPrevious={TrackPlayer.skipToPrevious} />
            <HomeFooter repeatMode={repeatMode} changeRepeatMode={changeRepeatMode} />

            <EqualizerComponent isOpenEqualizer={isOpenEqualizer} isClose={closeEqualizer} />
            <MenuComponent isOpen={isOpen} onClose={onClose} setIsOpenProperties={setIsOpenProperties} />

            <PropertiesComponent isOpenProperties={isOpenProperties} isClose={CloseProperties} />
        </>
    );
}

const styles = StyleSheet.create({

})

export { HomeScreen };

