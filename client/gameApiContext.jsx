import React from "react";
import { fetchJSON } from "./fetchJSON.jsx";

export const GameApiContext = React.createContext({
  async register(user){
    fetch("/api/games/register", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "content-type": "application/json",
        }
    });
  },
  async listGames(title){
        return await fetchJSON(`/api/games?titleSearch=${title}`);
    },
    async createGame(game){
      fetch("/api/games", {
          method: "post",
          body: JSON.stringify(game),
          headers: {
            "content-type": "application/json",
          },
      });
    }
});