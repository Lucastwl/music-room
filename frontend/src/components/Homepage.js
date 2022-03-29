import React, { Component, useEffect, useState } from "react";
import MusicHome from "./MusicHome";
import About from "./About";
import MainHome from "./MainHome";
import Room from "./Room";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import TicTacToe from "./TicTacToe";
import FplPoints from "./FplPoints";
import { Grid, Button, ButtonGroup, Typography, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

export default function HomePage(props) {

    return (
    <Router>
        <Routes>
        <Route exact path="/" element={<MainHome/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/home" element={<MusicHome />} />
        <Route path="/join" element={<RoomJoinPage/>} />
        <Route path="/create" element={<CreateRoomPage/>} />
        <Route path="/tictactoe" element={<TicTacToe/>} />
        <Route path="/fplpoints" element={<FplPoints/>} />
        <Route path="/room/:roomCode"
            render={
                (props) => {
                    return <Room {...props}/>;
                }
            }
             element={<Room/>} />
        </Routes>
    </Router>
    );
   
}