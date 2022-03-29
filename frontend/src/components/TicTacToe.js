import React, { useState } from 'react';
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function TicTacToe(props) {

    return(
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant='h3' compact='h3'>
                    This is TicTacToe
                </Typography>
                <Button color="" to='/' component={ Link }>Home</Button>
            </Grid>
        </Grid>
    );
}