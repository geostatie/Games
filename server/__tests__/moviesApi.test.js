import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { GamesApi } from "../gamesApi.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";


const app = express();
app.use(bodyParser.json());
let mongoClient;

beforeAll(async () => {
    dotenv.config();
    mongoClient = new MongoClient(process.env.MONGODB_URL);
    await mongoClient.connect();
    const database = mongoClient.db("unit_tests");
    await database.collection("games").deleteMany({});
    app.use("/api/games", GamesApi(database));
});

afterAll(() => {
    mongoClient.close();
});

describe("games api test suite", () => {
    it("does something", async () => {
       const agent = request.agent(app);
       const response = await agent
           .get("/api/games");

       expect(response.status).toEqual(200);
    });
});