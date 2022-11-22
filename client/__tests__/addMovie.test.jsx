import * as React from "react";
import {createRoot} from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { AddGame } from "../addGame.jsx";
import { MemoryRouter } from "react-router-dom";
import { GameApiContext } from "../gameApiContext.jsx";

describe("add game tests", () => {
    it("shows form", async () => {
       const element = document.createElement("div");
       const root = createRoot(element);

       await act(async () => {
           root.render(
            <MemoryRouter>
                <AddGame />
            </MemoryRouter>
           );
       });
       expect(element.innerHTML).toMatchSnapshot();

       const inputLabels = Array.from(
           element.querySelectorAll("form label strong")
       ).map((label) => label.innerHTML);
       expect(inputLabels).toEqual(["Title: ", "Year: ", "Plot: "]);
    });

    it("submits form", async () => {
        const createGame = jest.fn();

       const element = document.createElement("div");
       const root = createRoot(element);

       await act( async () =>
            root.render(
            <MemoryRouter>
                <GameApiContext.Provider value={{ createGame }}>
                    <AddGame />
                </GameApiContext.Provider>
            </MemoryRouter>
            )
       );

       act ( () =>
       Simulate.change(element.querySelector("form div:nth-of-type(1) input"), {
          target: { value: "Game Title" },
       }));

       act( () =>
        Simulate.change(element.querySelector("form div:nth-of-type(2) input"), {
            target: { value: "2022" },
        }));

        act ( () =>
            Simulate.submit(element.querySelector("form"))
        );

       expect(createGame).toBeCalledWith({
          title: "Game Title",
          year: 2022,
          plot: "",
       });

    });
});