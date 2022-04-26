import testData from "../data/data.json";
const requestV1 = supertest(testData.API_BASE_URL_V1);
import supertest from 'supertest';
const {createAccessToken 
} = require('../utilities/api_utills');

let diaryId,uniqueEntryId;
let ACCESSTOKEN;


/**
* a method to delete All journal for a user
* 
*/
export const deleteAllJournals = async () => {
    ACCESSTOKEN = await createAccessToken();
    const res1 = await requestV1
        .get('diaries/details')
        .set("Authorization", ACCESSTOKEN)
        .set("Content-Type", "application/json");
        diaryId = res1.body.diary._id;
    console.log(diaryId);
    const res2 = await requestV1
        .get(`diaries/list?diaryId=${diaryId}&page=1&per=10`)
        .set("Authorization", ACCESSTOKEN)
        .set("Content-Type", "application/json");
    console.log(res2.body);

    for (const res of res2.body.diaries) {
        uniqueEntryId = res.id;
        const res3 = await requestV1
            .delete(`diaries/${uniqueEntryId}`)
            .set("Authorization", ACCESSTOKEN)
            .set("Content-Type", "application/json");
        console.log(res3.body.message);
    }
    
};