import React, { useState } from 'react';
import { Grid, Button, ButtonGroup, Typography, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

export default function MainHome (props) {

    const classes = useStyles();

    return(
        <Container component="main" maxwidth="xs">
            <Typography align="center" variant="h2">
                LUCAS TEOH
            </Typography>
            <div className={classes.paper}>
                <Button to="/home" component={ Link }>Share Music Player</Button>
                <Button to="/tictactoe" component={ Link }>Q-Learning with TicTacToe</Button>
                <Button to="/fplpoints" component={ Link }>FPL points predictor</Button>
                <Button to="/about" component={ Link }>About Me</Button>
            </div>
        </Container>
    );
}