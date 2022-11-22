import * as React from "react";
import {BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { AddGame } from "./addGame.jsx";
import { ListGames } from "./listGames.jsx";

export function FrontPage() {
    return(
        <div>
            <h1> Back to the games </h1>
            <ul>
                <li>
                    <Link to={"/games/list"}> List Games </Link>
                </li>
                <li>
                    <Link to={"/games/new"}> Add new Game </Link>
                </li>
            </ul>
        </div>
    );
}

export function Games(){
    return(
        <Routes>
            <Route path={"/list"} element={<ListGames />} />
            <Route path={"/new"} element={<AddGame />} />
        </Routes>
    );
}

export function Application() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage />} />
                <Route path={"/games/*"} element={<Games />}/>
            </Routes>
        </BrowserRouter>
    );
}