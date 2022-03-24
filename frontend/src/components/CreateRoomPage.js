import React, { Component, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { RadioGroup, TextField } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Radio } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core';
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";


export default function CreateRoomPage(props) {
    let navigate = useNavigate();

    const defaultVotes = 2;
    const title = props.update ? "Update Room" : "Create a Room";
    const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause || false);
    const [votesToSkip, setVotesToSkip] = useState(props.votesToSkip || defaultVotes);
    const [message, setMessage] = useState("");
    const [sucess, setSuccess] = useState(null);

    function handleVotesChange(e) {
        setVotesToSkip(e.target.value);
    }

    function handleGuestCanPauseChange(e) {
        setGuestCanPause(e.target.value === "true" ? true : false);
    }

    function handleRoomButtonPressed() {
        // send request to end point
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, // what type of content coming in
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause
            }),
        };
        fetch('/api/create-room', requestOptions)
            .then((response) => response.json())
            .then((data) => navigate('/room/' + data.code));
        // send request to api with requestOptions payload, take response and convert into json
    }

    function handleUpdateButtonPressed() {
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                code: props.roomCode,
            }),
        };
        fetch('/api/update-room', requestOptions)
            .then((res) => {
                if (res.ok) {
                    setSuccess(true);
                    setMessage("Room updated successfully!");
                } else {
                    setSuccess(false);
                    setMessage("Error updating room...");
                }
                props.updateCallback();
            });
    }

    function renderCreateButtons() {
        return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>Create A Room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={ Link }>Back</Button>
            </Grid>
        </Grid>
    )
    }

    function renderUpdateButtons() {
        return (
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={handleUpdateButtonPressed}>Update Room</Button>
                </Grid>
        )
    
    }
    
    // grid is standard in material ui to align things vertically/horizontally xs=12 is the largest
    return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Collapse in={message !== ""}>
                {sucess ? (<Alert severity="success" onClose={() => {setMessage(""); setSuccess(null)}}>{message}</Alert>) : (<Alert severity="error" onClose={() => {setMessage(""); setSuccess(null)}}>{message}</Alert>)}
            </Collapse>  
        </Grid> 
        <Grid item xs={12} align="center">
            <Typography component={'h4'} variant='h4' >
                {title}
            </Typography>    
        </Grid> 
        <Grid item xs={12} align="center">
            <FormControl component="fieldset">
                <FormHelperText>
                    <div align='center' class="inp">
                        Guest Control of Playback State
                    </div>
                </FormHelperText>
                <RadioGroup row value={guestCanPause.toString()} onChange={handleGuestCanPauseChange}>
                    <FormControlLabel 
                    value='true' 
                    control={<Radio color="primary"></Radio>}
                    label="Play/Pause"
                    labelPlacement="bottom"
                    />
                    <FormControlLabel 
                    value='false' 
                    control={<Radio color="secondary"></Radio>}
                    label="No Control"
                    labelPlacement="bottom"
                    />
                </RadioGroup>
            </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
            <FormControl>
                <TextField 
                id='inp'
                required={true} 
                type="number" 
                defaultValue={votesToSkip}
                inputProps={{ 
                    min:1, 
                    style: { textAlign: "center" },    
                }}
                onChange={handleVotesChange}
                />
                <FormHelperText>
                    <div align="center" class="inp">
                        Votes Required To Skip Song
                    </div>
                </FormHelperText>
            </FormControl>
        </Grid>
        {props.update ? renderUpdateButtons() : renderCreateButtons()}
    </Grid>
    );
    }

