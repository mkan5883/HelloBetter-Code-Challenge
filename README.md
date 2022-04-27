# HelloBetter-Code-Challenge

Overview
---

This project is for Web and API Test Automation framework to test the journal functionality using WebdriverIO.
**You can find the manual test cases for journal functionality [here](https://docs.google.com/spreadsheets/d/1CVPcvkPmY_bAgl0-ccWWKEoQYcqf1ESj/edit?usp=sharing&ouid=103270360893057387291&rtpof=true&sd=true).**
Even though webdriver is not the ideal tool to automate API tests, in this project you can find the both WEB and API test cases in same framework as per the requirement.

Scope
----
Project is mainly focusing on the functional features of HelloBetter journal page.
As this is a case study, automation frame work is not covering the all test cases as in manual testcases.
Manily test cases cover the happy paths. Negative test cases should be created going foward.

Assumptions
----
Framework should be developed to integrate both UI and API functionalities.
As this is a case study there may be arear code can optimize futher.

Limitations
----
Browser is getting up when running API test.

Technologies
----
1. Node.js
2. WebdriverIO
3. JavaScript
4. Mocha framework
5. chai
6. babel
7. supertest

Configuration
----
1. Install Node.js
2. run `npm install` in root folder

Test Execution
----
1. To run API testcases run: `npx wdio run ./wdio.conf.js  --spec journalApiTest.js`
2. To run Web testcases run: `npx wdio run ./wdio.conf.js  --spec journalWebTest.js`
