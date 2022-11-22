import React, { useContext, useState } from "react";
import {GameApiContext} from "./gameApiContext.jsx";
import {useLoader} from "./useLoader.jsx";

function GameCard( { game: { title, plot, year } }) {
    return(
        <>
            <h3> {title} - {year} </h3>
            <div> {plot} </div>
        </>
    );
}


export function ListGames() {
    const { listGames } = useContext(GameApiContext);
    const [titleSearch, setTitleSearch] = useState("in");
    const [titleInput, setTitleInput] = useState("");
    const { loading, error, data } = useLoader(
        async () => await listGames( titleSearch ),
        [titleSearch]
    );

    function handleSubmit(e){
        e.preventDefault();
        setTitleSearch(titleInput);
    }

    if(loading) {
        return <div className="loading-indicator"> Still Loading... </div>;
    }

    if(error) {
        return (
            <div>
                <h1> Error </h1>
                <div className="error-message"> {error.toString()} </div>
            </div>
        );
    }

    return (
        <div>
            <h1> Games to come back to: </h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label> Search by title:
                    <input
                        id="search-spot"
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                    />
                    <button> Search </button>
                    </label>
                </form>
            </div>
            {data.map((game) => (
                <GameCard key={game.title} game={game} />
            ))}
        </div>
    );
}