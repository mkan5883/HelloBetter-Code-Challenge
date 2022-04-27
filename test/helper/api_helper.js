import testData from "../data/data.json";
import supertest from 'supertest';
import { assert } from "chai";
const requestV1 = supertest(testData.API_BASE_URL_V1);
const expectChai = require('chai').expect;
const { createAccessToken
} = require('../utilities/api_utills');


/**
* a method to delete All journal for a user
* 
*/
export const deleteAllJournals = async () => {
    console.log("------------------deleting journals-----------------")
    let diaryId, uniqueEntryId;
    let ACCESSTOKEN;
    ACCESSTOKEN = await createAccessToken();
    const res1 = await requestV1
        .get('diaries/details')
        .set("Authorization", ACCESSTOKEN)
        .set("Content-Type", "application/json");
    diaryId = res1.body.diary._id;
    const res2 = await requestV1
        .get(`diaries/list?diaryId=${diaryId}&page=1&per=10`)
        .set("Authorization", ACCESSTOKEN)
        .set("Content-Type", "application/json");
    for (const res of res2.body.diaries) {
        uniqueEntryId = res.id;
        const res3 = await requestV1
            .delete(`diaries/${uniqueEntryId}`)
            .set("Authorization", ACCESSTOKEN)
            .set("Content-Type", "application/json");
        console.log("------------------" + res3.body.message + "------------------");
    }

};


/**
* a method to verify journal values
* 
*/
export const verifyJournalresponse = async (requestData, ACCESSTOKEN, diaryId) => {
    console.log("------------------verifying journal-----------------")
    let uniqueEntryId;
    const tempDiaryId = diaryId;
    const tempRequestData = requestData;

    const res2 = await requestV1
        .get(`diaries/list?diaryId=${tempDiaryId}&page=1&per=10`)
        .set("Authorization", ACCESSTOKEN)
        .set("Content-Type", "application/json");

    uniqueEntryId = res2.body.diaries[0].id;
    const diaries = res2.body.diaries;
    for (const diary of diaries) {
        if (diary.id == uniqueEntryId) {
            expectChai(diary.id).to.equal(uniqueEntryId);
            expectChai(diary.date.split("T")[0]).to.equal(tempRequestData.date)
            expectChai(diary.diaryEntry).to.deep.equal(tempRequestData.diaryEntry);
        }
    }


};