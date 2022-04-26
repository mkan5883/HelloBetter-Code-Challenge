import supertest from 'supertest';
import testData from "../data/data.json";
const expectChai = require('chai').expect;

const requestV1 = supertest(testData.API_BASE_URL_V1);
const {createAccessToken 
} = require('../utilities/api_utills');

const {deleteAllJournals
} = require('../helper/helper')

let diaryId,uniqueEntryId;
let ACCESSTOKEN;


describe('Journal', () => {

    before(async () => {
        /**
        * Api call for Delete All journals before the test
        */
        await deleteAllJournals();
        
        ACCESSTOKEN = await createAccessToken();
        console.log(ACCESSTOKEN);
      });

    it('GET /Generate Journal diary id', async () => {
        const res = await requestV1
            .get('diaries/details')
            .set("Authorization", ACCESSTOKEN)
            .set("Content-Type", "application/json");
            diaryId = res.body.diary._id;
        console.log(diaryId);
        expectChai(res.statusCode).eq(200)
        });

    it('POST /Create Journal', async () => {
        const data = {
                id:null,
                date:"2022-04-26",
                diaryEntry:{
                   "dayEntry.moodLevel":5,
                   "dayEntry.stressLevel":5
                },
                diaryId:diaryId

         }
        const res = await requestV1
            .post('diaries/save')
            .send(data)
            .set("Content-Type", "application/json")
            .set("Authorization", ACCESSTOKEN);
        console.log(res.body);
        expectChai(res.statusCode).to.eq(201);
        expectChai(res.body.message).to.eql('Saved successfully');

    });

    it('GET /Generate Journal entry unique id', async () => {
        const res = await requestV1
            .get(`diaries/list?diaryId=${diaryId}&page=1&per=10`)
            .set("Authorization", ACCESSTOKEN)
            .set("Content-Type", "application/json");
            uniqueEntryId = res.body.diaries[0].id;
        console.log(uniqueEntryId);
        expectChai(res.statusCode).to.eq(200);
        });

    it('POST /Edit Journal', async () => {
        const data = {
                id:uniqueEntryId,
                date:"2022-05-26",
                diaryEntry:{
                   "dayEntry.moodLevel":6,
                   "dayEntry.stressLevel":6
                },
                diaryId:diaryId

         }
        const res = await requestV1
            .post('diaries/save')
            .send(data)
            .set("Content-Type", "application/json")
            .set("Authorization", ACCESSTOKEN);
        console.log(res.body);
        expectChai(res.statusCode).to.eq(201);
        expectChai(res.body.message).to.eql('Saved successfully');

    });

    it('DELETE /Delete Journal', async () => {
        const res = await requestV1
        .delete(`diaries/${uniqueEntryId}`)
        .set("Authorization", ACCESSTOKEN)
        .set("Content-Type", "application/json");
    console.log(res.body);    
    expectChai(res.statusCode).to.eq(201);
    expectChai(res.body.message).to.eql('Deleted successfully');
    });

});