import React, { Component, useState } from 'react';
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

export default function RoomJoinPage(props) {
    let navigate = useNavigate();
    const[roomCode, setRoomCode] = useState("");
    const[error, setError] = useState("");

    function handleTextFieldChange(e) {
        setRoomCode(e.target.value);
    }

    function roomButtonPressed() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                code: roomCode
            })
        };
        fetch('/api/join-room', requestOptions)
        .then((res) => {
            if (res.ok){
                navigate(`/room/${roomCode}`);
            } else {
                setError("Room not found")
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Join A Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField
                id="joincode"
                error={error.length > 0}
                label="Code"
                placeholder="Enter a Room Code"
                value={roomCode}
                helperText={error}
                variant="outlined"
                onChange={handleTextFieldChange}/>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={roomButtonPressed}>
                    Enter Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" to="/" component={ Link }>
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}