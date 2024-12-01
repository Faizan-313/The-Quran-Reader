import express from "express";
import router from './routes/auth.js';
import session from 'express-session';
import env from "dotenv";
import bodyParser from "body-parser";
import seedDatabase from "./seed.js";
import db from "./models/db.js";

// const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const { createClient } = require('redis');


env.config();

const app = express();
const port = 3000;

seedDatabase();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');



const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.connected().catch(console.error);

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000 
        }
    })
);





app.get("/login",(req, res)=>{
    const message = req.query.message || null;
    res.render("pages/login.ejs",{message});
});

app.get("/register",(req,res)=>{
    const message = req.query.message || null;
    res.render("pages/registration.ejs",{message});
});

app.use('/auth', router);

let show = true;



app.get("/", async (req, res) => {
    if (req.session.user) {
        try {
            const result = await db.query("SELECT surah_name, no_of_ayah FROM quran"); 
            const surahs = result.rows;
            
            res.render("pages/index.ejs", { surahs ,show}); // Pass data to index.ejs
        } catch (error) {
            console.error(error);
            res.status(500).send("Error loading surahs");
        }
    } else {
        res.redirect("/login");
    }
});


app.get("/surah/:surahName", async (req,res)=>{
    const surahname = req.params.surahName;
    try{
        const content = await db.query("SELECT surah_id, no_of_ayah, surah_content FROM quran WHERE surah_name = $1",
            [surahname]);
            if (content.rows.length > 0) {
                const surah = content.rows[0];
                const surahContent = (surah.surah_content).split("◌");
                res.render("pages/surah.ejs", {
                    surahName: surahname,
                    noOfAyahs: surah.no_of_ayah,
                    surahContent: surahContent,
                    surahId: surah.surah_id,
                });
            } else {
                res.status(404).send("Surah not found");
            }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

app.get("/index",(req,res)=>{
    res.redirect("/");
});

app.get("/saved", async (req,res)=>{
    const user_id = req.session.user?.id;
    try{
        const result = await db.query("select quran.surah_name, quran.no_of_ayah from quran inner join user_saved on quran.surah_id=user_saved.surah_id where user_saved.user_id = $1",[user_id]);
        if(result.rows.length > 0){
            res.render("pages/saved",{surahs: result.rows, message: null});
        }else{
            res.render("pages/saved",{surahs: [],message: "No saved data"});
        }
    }catch(err){
        console.log(err);
        res.status(500).send("An error occurred while retrieving saved Surahs.");
    }
});



app.post("/saveSurah",async (req,res)=>{
    const {surahId,noOfAyahs} = req.body;
    const userId = req.session.user?.id;
    if (!userId) {
        return res.redirect('/login'); 
    }
    try{
        const existing = await db.query("select * from user_saved where user_id = $1 and surah_id=$2",[userId,surahId]);
        if(existing.rows.length>0){
            return res.send(`
                <html>
                <head>
                    <title>Surah Already Saved</title>
                    <link rel="stylesheet" href="/style/message.css">
                </head>
                <body>
                    <div class="message-container">
                        <h1>This Surah is already saved.</h1>
                        <a href="/saved">Go to Saved</a>
                    </div>
                </body>
                </html>
            `);        }else{
            await db.query(
                'INSERT INTO user_saved (user_id, surah_id, no_of_ayah) VALUES ($1, $2, $3)',
                [userId, surahId, noOfAyahs]
            );
    
            res.redirect('/saved');
        }

    }catch(err){
        console.log(err);
        res.status(500).send("an error occurred while saving data");
    }
});




app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});