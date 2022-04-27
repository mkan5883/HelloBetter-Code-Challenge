import supertest from 'supertest';
import testData from "../data/data.json";
const expectChai = require('chai').expect;

const requestV1 = supertest(testData.API_BASE_URL_V1);
const { createAccessToken
} = require('../utilities/api_utills');

const { deleteAllJournals, verifyJournalresponse
} = require('../helper/api_helper')

let diaryId, uniqueEntryId;
let ACCESSTOKEN;


describe('Journal', () => {

    before(async () => {
        /**
        * Api call for Delete All journals before the test
        */
        await deleteAllJournals();

        ACCESSTOKEN = await createAccessToken();
    });

    it('GET /Generate Journal diary id', async () => {
        const res = await requestV1
            .get('diaries/details')
            .set("Authorization", ACCESSTOKEN)
            .set("Content-Type", "application/json");
        diaryId = res.body.diary._id;
        expectChai(res.statusCode).eq(200)
    });

    it('POST /Create Journal', async () => {
        const data = {
            id: null,
            date: testData.sample_test_date_for_api_1,
            diaryEntry: {
                "dayEntry.moodLevel": testData.sample_mood_index_1,
                "dayEntry.stressLevel": testData.sample_stress_index_1
            },
            diaryId: diaryId

        }
        const res = await requestV1
            .post('diaries/save')
            .send(data)
            .set("Content-Type", "application/json")
            .set("Authorization", ACCESSTOKEN);

        console.log("------------------" + res.body.message + "------------------");
        expectChai(res.statusCode).to.eq(201);
        expectChai(res.body.message).to.eql('Saved successfully');
        await verifyJournalresponse(data, ACCESSTOKEN, diaryId);

    });

    it('GET /Generate Journal entry unique id', async () => {
        const res = await requestV1
            .get(`diaries/list?diaryId=${diaryId}&page=1&per=10`)
            .set("Authorization", ACCESSTOKEN)
            .set("Content-Type", "application/json");
        uniqueEntryId = res.body.diaries[0].id;
        expectChai(res.statusCode).to.eq(200);
    });

    it('POST /Edit Journal', async () => {
        const data = {
            id: uniqueEntryId,
            date: testData.sample_test_date_for_api_2,
            diaryEntry: {
                "dayEntry.moodLevel": testData.sample_mood_index_2,
                "dayEntry.stressLevel": testData.sample_stress_index_2
            },
            diaryId: diaryId

        }
        const res = await requestV1
            .post('diaries/save')
            .send(data)
            .set("Content-Type", "application/json")
            .set("Authorization", ACCESSTOKEN);

        console.log("------------------" + res.body.message + "------------------");
        expectChai(res.statusCode).to.eq(201);
        expectChai(res.body.message).to.eql('Saved successfully');
        await verifyJournalresponse(data, ACCESSTOKEN, diaryId);


    });

    it('DELETE /Delete Journal', async () => {
        const res = await requestV1
            .delete(`diaries/${uniqueEntryId}`)
            .set("Authorization", ACCESSTOKEN)
            .set("Content-Type", "application/json");
        console.log("------------------" + res.body.message + "------------------");
        expectChai(res.statusCode).to.eq(201);
        expectChai(res.body.message).to.eql('Deleted successfully');
    });

})