import db from "../models/db.js";
import bcrypt from 'bcrypt';


db.connect((err) => {
    if (err) {
        console.error('Connection error:', err.stack);
    } else {
        console.log('Connected to the database!');
    }
});

const saltround = process.env.SALT_ROUND;

export const registerUser = async (req, res)=>{
    const {username, email, password} = req.body;
    const result = await db.query("select * from user_data where email = $1",[email]);
    if(result.rows.length > 0){
        res.redirect(`/login?message=${encodeURIComponent('User already registered')}`);
    }
    else{
        bcrypt.hash(password,saltround,async (err,hash)=>{
            if(err){
                return res.status(500).send("Unable to store the password");
            }else{
                await db.query("insert into user_data (username,email,password_hash) values ($1,$2,$3)",[username,email,hash]);
                res.redirect(`/login?message=${encodeURIComponent('User registered successfully')}`);
            }
        });
    } 
}

export const loginUser = async (req, res)=>{
    const {email,password} = req.body;
    const result = await db.query("select * from user_data where email = $1",[email]);
    if(result.rows.length == 0){
        res.redirect(`/login?message=${encodeURIComponent('Wrong email')}`);
    }else{
        const user = result.rows[0];
        const storedPassword = user.password_hash;
        bcrypt.compare(password, storedPassword, function(err, result) {
            if(!result){
                res.redirect(`/login?message=${encodeURIComponent('Invalid password')}`)
            }
            else{
                req.session.user = { id: user.user_id, email: user.email }; 
                res.redirect("/");
            }
        });
    }
}