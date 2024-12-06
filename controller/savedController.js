import db from "../models/db.js";


export const addBookmark = async (req,res)=>{
    const {surahId,noOfAyahs} = req.body;
    const userId = req.session.user?.id;
    if (!userId) {
        return res.redirect('/login'); 
    }
    try{
        await db.query(
            'INSERT INTO user_saved (user_id, surah_no, no_of_ayah) VALUES ($1, $2, $3)',
            [userId, surahId, noOfAyahs]
        );
        res.status(200).end();
    }catch(err){
        console.log(err);
        res.status(500).send("an error occurred while saving data");
    }
};

export const deleteSaved = async (req, res)=>{
    const {surahId, noOfAyahs} = req.body;
    const userId = req.session.user?.id;
    if (!userId) {
        return res.redirect('/login'); 
    }
    try{
        await db.query(
            'delete from user_saved where surah_no = $1 and no_of_ayah = $2 and user_id = $3',
            [surahId,noOfAyahs,userId]
        );
        res.status(200).end();
    }catch(error){
        console.log(error);
        res.status(500).send("An error occurred while deleting the data");
    }
}
