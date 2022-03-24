import React, { Component, useEffect, useState } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import RenderHomePage from "./RenderHomePage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

export default function HomePage(props) {

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
    <Router>
        <Routes>
        <Route exact path="/" element={roomCode ? (navigateToRoom()) : (RenderHomePage())} />
        <Route path="/join" element={<RoomJoinPage/>} />
        <Route path="/create" element={<CreateRoomPage/>} />
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