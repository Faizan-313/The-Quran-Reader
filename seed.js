import axios from "axios";
import db from "./models/db.js";


async function seedDatabase(){
    try{
        const response = await axios.get("http://api.alquran.cloud/v1/quran/quran-uthmani");
        const surahs = response.data.data.surahs;
        for(let i =0;i<114;i++){
            const name = surahs[i].englishName;
            const no_of_ayats = surahs[i].ayahs.length;
            const surah_content = surahs[i].ayahs.map(ayah=> ayah.text).join("◌");
            await db.query("insert into quran (surah_name,no_of_ayah,surah_content) values($1,$2,$3)",[name,no_of_ayats,surah_content]);
        }
        console.log("data feeded to database successufully");
    }
    catch(err){
        console.log(err);
    }


}

export default seedDatabase;
