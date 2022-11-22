import express from "express";
import * as path from "path";
import  { GamesApi } from "./gamesApi.js";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(bodyParser.json());

// app.use(cors({ 
//     origin: '*',
//     methods: ["GET", "POST","PUT", "DELETE"],
//     credentials: true
// }));
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(session({
//     key: "userId",
//     secret:"qwertyuiop",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 60 * 60 * 24,
//     },
// }))

// const mongodburl = process.env.MONGODB_URL;
const mongodburl = "mongodb+srv://geotest1:geotest1@cluster0.xvvhdrg.mongodb.net/?retryWrites=true&w=majority";




if(mongodburl){
    const client = new MongoClient(mongodburl);

    client
        .connect()
        .then((conn) => {
        app.use("/api/games",GamesApi(conn.db(process.env.MONGODB_DATABASE || "games-example")));
        // console.log(conn.db(process.env.MONGODB_DATABASE || "games-example"));
        }
            ).catch(e => console.log(e));

}


app.use(express.static("../client/dist"));

// app.use("/api/games", GamesApi);

app.use((req, res, next) => {
   if(req.method === "GET" && !req.path.startsWith("/api")){
       return res.sendFile(path.resolve("../client/dist/index.html"));
   }  else {
       next();
   }
});

const server = app.listen(process.env.PORT || 4000,
    () => {console.log(`Server started on: http://localhost:${server.address().port}`)});