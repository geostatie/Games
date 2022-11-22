import express from "express";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

export function GamesApi(db){
    const api = express.Router();

    api.get("/", async (req, res) => {
        console.log(req.query);
        // console.log(req);
        const { titleSearch } = req.query;
        let filter = {};
        //console.log(`year is ${year}`);

        if(titleSearch!=='undefined'
            && titleSearch!==''
            && titleSearch!==""
            && titleSearch){
            console.log("Title: " + titleSearch);
            //console.log(titleSearch!=='undefined');
            //filter.year = {year : { $gte: yearInt } };
            //filter.year = {$regex: /2.*/};
            //filter.title = {$regex: "(.*)" + input + "(.*)", $options: 'i'};
            filter = {
                "$or": [
                    {title: { '$regex': "(.*)" + titleSearch + "(.*)", '$options': 'i' }},
                    {plot: { '$regex': "(.*)" + titleSearch + "(.*)", '$options': 'i' }}
                ]
            }
        }

        console.log(filter);

        const games = await db
            .collection("games")
            .find(filter)
            .map(({ title, year, plot }) => ({ title, year, plot }))
            .limit(100)
            .toArray();
        res.json(games);
    });

    api.post("/", (req, res) => {
        const { title, year, plot } = req.body;

        db.collection("games").insertOne({ title, year, plot });

        res.sendStatus(204);
    });


    const saltRounds = 10;

    api.post("/register", (req, res) => {
        
        const username = req.body.username;
        const password = req.body.password;
        
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(err);
          }
      
        db.collection("users").insertOne({ username, hash });

        res.sendStatus(204);
        });
      });
      
      api.post("/login", async (req, res) => {
        const username = req.body.username;

        const password = req.body.password;

        const user = { username };

        const users = await db
        .collection("users")
        .find(user)
        .limit(1)
        .toArray();

        if (users.length > 0) {
            bcrypt.compare(password, users[0].hash, (error, response) => {
                if (response) {
//ceva
                  res.send(users[0]);
                } else {
                  res.send({ message: "Wrong username/password combination!" });
                }
              });
        } else {
            res.json({ message: "User doesn't exist" });
        }
      });


    return api;
}
