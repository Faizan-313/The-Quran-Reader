import axios from "axios";
import db from "./models/db.js";

//fetching data from api and inserting it to the database according to the surah name
async function seedDatabase(){
    try{
        // // for surah details only
        // const response = await axios.get("https://api.quran.com/api/v4/chapters");
        // const surahs = response.data.chapters;
        // for(const surah of surahs)  {
        //     const englishName = surah.name_complex; 
        //     const arabicName = surah.name_arabic;
        //     const no_of_ayats = surah.verses_count;
        //     const surahNo = surah.id;
        //     await db.query("insert into quran (surah_no,surah_english_name,surah_arabic_name,no_of_ayah) values($1,$2,$3,$4)",[surahNo,englishName,arabicName,no_of_ayats]);
        // };
        // console.log("surah details added successufully")

        // for surah content
        for(let i = 1; i<=114;i++){
            const response = await axios.get(`https://quranapi.pages.dev/api/${i}.json`);
            const result = await db.query("select surah_english_name from quran where surah_no = $1",[i]);
            const surahName = result.rows[0]?.surah_english_name;
            // const contentString = (response.data.arabic1).join(",");
            const contentString2 = (response.data.arabic2).join(",");

            await db.query("insert into surah_font(surah_no,surah_arabic1) values($1,$2)",[i,contentString2]);
            // await db.query("insert into surah(surah_no,surah_english_name,surah_content) values($1,$2,$3)",[i,surahName,contentString]);
            console.log(`${i} ${surahName} added successufully`);
            
        }
        console.log("surah content added to database successufully");
    
    }
    catch(err){
        console.log(err);
    }


}

export default seedDatabase;
