import React, { Component } from 'react';
import { Grid, Typography, Card, Button, Iconbutton, LinearProgress, IconButton, Icon } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

export default function MusicPlayer({songData}) {

    const song = songData;
    const songProgress = (song["time"]/song["duration"]) * 100;
    
    function pauseSong() {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type":"application/json" },
        };
        fetch("/spotify/pause", requestOptions);
    }

    function playSong() {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type":"application/json" },
        };
        fetch("/spotify/play", requestOptions);
    }

    function skipSong() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type":"application/json" },
        };
        fetch("/spotify/skip", requestOptions);
    }

    return (
        <Card>
            <Grid container alignItems="center">
                <Grid item align="center" xs={4}>
                    <img src={ song["image_url"] } height="100%" width="100%"/>
                </Grid>
                <Grid item align="center" xs={8}>
                    <Typography component="h5" variant="h5">
                        { song["title"] }
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                        { song["artist"] }
                    </Typography>
                    <div>
                        <IconButton onClick={ () => {song["is_playing"] ? pauseSong() : playSong()}}>
                            {song["is_playing"] ? <PauseIcon/> : <PlayArrowIcon/>}
                        </IconButton>
                        <IconButton onClick={() => {skipSong()}}>
                            <SkipNextIcon/>
                        </IconButton>
                        <Typography color="textSecondary" variant="subtitle1">
                            {song.votes} / {song.votes_required}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" id="bar" value={songProgress} />
        </Card>
    );
}