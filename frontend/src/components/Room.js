import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@material-ui/core';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';

export default function Room(props) {
    let navigate = useNavigate();
    const initialState = {
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
        showSettings: false,
    };
    const [roomData, setRoomData] = useState(initialState);
    const [song, setSong] = useState({});
    const { roomCode } = useParams();
    const [refresh, setRefresh] = useState(false);
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        function authenticateSpotify () {
            fetch('/spotify/is-authenticated')
            .then((res) => res.json())
            .then((data) => {
                setSpotifyAuthenticated(data.status);
                if (data.status == false) {
                    fetch('/spotify/get-auth-url')
                    .then((res) => res.json())
                    .then((data) => {
                        window.location.replace(data.url); // redirect to spotify auth page, which will redirect to spotify_callback when authorized
                        // spotify_callback will then save token and redirect back to frontend
                    });
                }
            });
        }

        function getCurrentSong() {
            fetch('/spotify/current-song')
            .then((res) => {
                if (!res.ok) {
                    return {};
                } else {
                    return res.json();
                }
            })
            .then((data) => setSong(data));
        }

        fetch("/api/get-room" + "?code=" + roomCode, {
            signal:signal
        })
        .then((res) => {
            if (!res.ok) {
                navigate("/");
            }
            return res.json();
        })
        .then((data) => {
            setRoomData({
                ...roomData,
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            });
            if (data.is_host) {
                authenticateSpotify();
            }
        });

        const interval = setInterval(getCurrentSong, 1000);

        return () => {
            // cancel the request before component unmounts
            controller.abort();
            clearInterval(interval);
        };
    },[roomCode, setRoomData, refresh]);


    function leaveButtonPressed() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'applications/json'}
        };
        fetch("/api/leave-room", requestOptions)
        .then((res) => {
            navigate("/")
        });
    }

    function updateShowSettings(value) {
        setRoomData({
            ...roomData,
            showSettings: value
        });
    }

    function renderSettingsButton() {
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={() => updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    }

    function renderSettings() {
        return(
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <CreateRoomPage 
                update={true} 
                votesToSkip={roomData.votesToSkip} 
                guestCanPause={roomData.guestCanPause} 
                roomCode={roomCode} 
                updateCallback={() => {setRefresh(!refresh)}}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Button 
                variant="contained"
                color="secondary"
                onClick={() => updateShowSettings(false)}>
                    Close
                </Button>
            </Grid>
        </Grid>
        );
    }   

    if (roomData.showSettings) {
        return renderSettings();
    }
    return(
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <MusicPlayer songData={song} roomData={roomData}/>
            <Grid item xs={12} align="center">
                {roomData.isHost ? renderSettingsButton(): null}
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>
    )
}