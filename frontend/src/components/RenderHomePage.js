import React, { useState } from 'react';
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function RenderHomePage(props) {

    return(
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant='h3' compact='h3'>
                    Music Party
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup variant="contained">
                    <Button color="primary" to='/join' component={ Link }>
                        Join a Room
                    </Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup variant="contained">
                    <Button color="secondary" to='/create' component={ Link }>
                        Create a Room
                    </Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="" to='/' component={ Link }>
                    Home
                </Button>
            </Grid>
        </Grid>
    );
}