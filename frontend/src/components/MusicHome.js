import React, { Component, useEffect, useState } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import RenderHomePage from "./RenderHomePage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography, Container } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

export default function MusicHome(props) {

    const [roomCode, setRoomCode] = useState(null);

    useEffect(() => {

        setRoomCode(null);

        async function fetchData() {
            fetch('/api/user-in-room')
            .then((res) => res.json())
            .then((data) => {
                setRoomCode(data.code);
            });
        }
        fetchData();
    },[])

    function navigateToRoom() {
        const code = roomCode;
        // roomCode needs to be reset when navigating to avoid get loop after refreshing
        setRoomCode(null);
        return <Navigate replace to={`/room/${code}`} />
    }

    return (
        roomCode ? navigateToRoom() : RenderHomePage()
    );
   
}