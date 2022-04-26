
import testData from "../data/data.json";
const requestV2 = supertest(testData.API_BASE_URL_V2);
import supertest from 'supertest';



/**
* a method to create API token for user session
* TODO: optimize logic to work with when token is expired
*/
export const createAccessToken = async () => {
    const data = {
        email: testData.email,
        password: testData.password
    };
    const res = await requestV2
        .post('login')
        .send(data)
        .set("Content-Type", "application/json");

  return res.body.accessToken;
};