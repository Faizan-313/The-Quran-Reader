import express from "express";
import router from './routes/auth.js';
import savedRouter from './routes/saved.js';
import session from 'express-session';
import env from "dotenv";
import bodyParser from "body-parser";
// import seedDatabase from "./seed.js";
import db from "./models/db.js";


env.config();

const app = express();
const port = 3000;

// seedDatabase();              //insert whole quran to the database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.json());

//to save the session 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24,
    }
}));

//for navbar to only show saved or all as per the current page
let show = true;


app.get("/login",(req, res)=>{
    const message = req.query.message || null;
    res.render("pages/login.ejs",{message});
});

app.get("/register",(req,res)=>{
    const message = req.query.message || null;
    res.render("pages/registration.ejs",{message});
});

//routes for authenticating the login and registration
app.use('/auth', router);



//show the index page to the user if already login
app.get("/", async (req, res) => {
    if (req.session.user) {
        try {
            show = true;
            const result = await db.query("SELECT surah_english_name, surah_arabic_name FROM quran"); 
            const surahs = result.rows;
            
            res.render("pages/index.ejs", { surahs ,show}); // Pass data to index.ejs
        } catch (error) {
            // console.error(error);
            res.status(500).send("Error loading surahs");
        }
    } else {
        res.redirect("/login");
    }
});



//display the surah to the user when clicked on a particular surah
app.get("/surah/:surahName", async (req,res)=>{
    const surahname = req.params.surahName;
    const userId = req.session.user?.id;
    try{
        const content = await db.query("SELECT surah_no, surah_english_name, surah_content FROM surah WHERE surah_english_name = $1",
            [surahname]);
            if (content.rows.length > 0) {
                const surah = content.rows[0];
                
                const surahContent = (surah.surah_content).split(",");
                //for already saved surah
                let added = false;
                try{
                    const present = await db.query("select * from user_saved where surah_no = $1 and user_id = $2",[surah.surah_no,userId]);
                    if(present.rows.length > 0){
                        added = true;
                    }
                    const ayats = await db.query("SELECT no_of_ayah FROM quran WHERE surah_no = $1", [surah.surah_no]);
                    const no_of_ayah = ayats.rows[0]?.no_of_ayah;
                    res.render("pages/surah.ejs", {
                        surahName: surahname,
                        noOfAyahs: no_of_ayah,
                        surahContent: surahContent,
                        surahId: surah.surah_no,
                        marked: added,
                        show: "both",
                    });
                }catch(error){
                    res.status(500).send('An error occurred while loading the Surah.');
            }
            } else {
                res.status(404).send("Surah not found");
            }
    } catch (err) {
        // console.error(err);
        res.status(500).send("Server error");
    }
});


//get request for the index page when all is clicked
app.get("/index",(req,res)=>{
    res.redirect("/");
});

//get request for the saved page  when saved is clicked
app.get("/saved", async (req,res)=>{
    const user_id = req.session.user?.id;
    show = false;
    try{
        const result = await db.query("select quran.surah_english_name, quran.no_of_ayah from quran inner join user_saved on quran.surah_no=user_saved.surah_no where user_saved.user_id = $1",[user_id]);
        if(result.rows.length > 0){
            res.render("pages/saved",{surahs: result.rows, message: null,show});
        }else{
            res.render("pages/saved",{surahs: [],message: "No saved data",show});
        }
    }catch(err){
        // console.log(err);
        res.status(500).send("An error occurred while retrieving saved Surahs.");
    }
});

app.use('/savedSurah', savedRouter);


app.get("/logout",(req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.send("Error logging out");
        }
        res.redirect("/login");
    });
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});