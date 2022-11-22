import * as React from "react"
import {createRoot} from "react-dom/client";
import { act } from "react-dom/test-utils";
import { GameApiContext } from "../gameApiContext.jsx";

import { ListGames } from "../Games.jsx";

const games = [
    {
        title: "Test game 1",
        plot: "We test stuff",
        year: "2022"
    },
    {
        title: "Test game 2",
        plot: "we test more stuff",
        year: "2022"
    }
]

async function renderListGames(listGames) {
    const element = document.createElement("div");
    const root = createRoot(element);

    await act(async () =>
        root.render(
            <GameApiContext.Provider value={{ listGames }}>
                <ListGames />
            </GameApiContext.Provider>
        )
    );
    return element;
}

describe("client test suite", () => {

    it("show loading screen", async () => {
        const element = await renderListGames(() => new Promise(() => {}));

        expect(element.querySelector(".loading-indicator")).not.toBeNull();
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("shows games list", async () => {
        const element = await renderListGames(async () => games);

        expect(element.querySelector("h3").innerHTML).toEqual(` ${games[0].title} - ${games[0].year} `);
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("shows error message", async () => {
        const element = await renderListGames(async () => {
           throw new Error("Failed to fetch");
        });

        expect(element.querySelector(".error-message").innerHTML)
            .toContain("Failed to fetch");
        expect(element.innerHTML).toMatchSnapshot();

    });
});