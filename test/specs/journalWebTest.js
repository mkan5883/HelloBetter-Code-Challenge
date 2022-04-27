const LoginPage = require('../pageobjects/login.page');
const JournalPage = require('../pageobjects/journal_page');
const JournalEntryPage = require('../pageobjects/journal_entry_page');
import testData from "../data/data.json";
const { deleteAllJournals
} = require('../helper/api_helper')

//TODO: These test cases cover the main functinalities of the journal feature. We should improve the test cases with validation of page elements as well.
describe('My Journal Page', () => {
    before(async () => {
        /**
        * Api call for Delete All journals before the test
        */
        await deleteAllJournals();

        await LoginPage.open();
        await LoginPage.login(testData.email, testData.password);
        await JournalPage.btnJournal.click();
    })

    it('should able to create a journal by clicking Create journal entry Button', async () => {
        await JournalPage.btnCreateNewJournal.click();
        await JournalEntryPage.btnJournalEntryForToday.click();
        await JournalEntryPage.selectDate(testData.sample_test_date_1);
        var mood = await JournalEntryPage.selectMoodIndex(testData.sample_mood_index_1);
        await JournalEntryPage.btnNext.click();
        var stress = await JournalEntryPage.selectStressIndex(testData.sample_stress_index_1);
        await JournalEntryPage.btnNext.click();
        expect(await JournalEntryPage.txtWellDone).toHaveText("Well done, you did it!");
        await JournalEntryPage.clickConfirm();
        expect(await JournalPage.journalEntryBox(testData.sample_test_date_1)).toBeExisting();
        expect(await JournalPage.txtmood(testData.sample_test_date_1)).toHaveTextContaining(mood);
        expect(await JournalPage.txtstress(testData.sample_test_date_1)).toHaveTextContaining(stress);
        await JournalPage.btnEdit(testData.sample_test_date_1).click();
        await JournalEntryPage.btnDelete.click();

    });

    it('should able to create a journal by clicking Add New Button', async () => {
        await JournalPage.btnAddNew.click();
        await JournalEntryPage.btnJournalEntryForToday.click();
        await JournalEntryPage.selectDate(testData.sample_test_date_2);
        var mood = await JournalEntryPage.selectMoodIndex(testData.sample_mood_index_1);
        await JournalEntryPage.btnNext.click();
        var stress = await JournalEntryPage.selectStressIndex(testData.sample_stress_index_1);
        await JournalEntryPage.btnNext.click();
        expect(await JournalEntryPage.txtWellDone).toHaveText("Well done, you did it!");
        await JournalEntryPage.clickConfirm();
        expect(await JournalPage.journalEntryBox(testData.sample_test_date_2)).toBeExisting();
        expect(await JournalPage.txtmood(testData.sample_test_date_2)).toHaveTextContaining(mood);
        expect(await JournalPage.txtstress(testData.sample_test_date_2)).toHaveTextContaining(stress);
        await JournalPage.btnEdit(testData.sample_test_date_2).click();
        await JournalEntryPage.btnDelete.click();

    });

    it('should able to edit a journal', async () => {
        await JournalPage.btnAddNew.click();
        await JournalEntryPage.createJournal(testData.sample_test_date_3, testData.sample_mood_index_1, testData.sample_stress_index_1);
        await JournalPage.btnEdit(testData.sample_test_date_3).click();
        await JournalEntryPage.btnEditJournalEntryForToday.click();
        await JournalEntryPage.selectDate(testData.sample_test_date_5);
        var mood = await JournalEntryPage.selectMoodIndex(testData.sample_mood_index_2);
        await JournalEntryPage.btnNext.click();
        var stress = await JournalEntryPage.selectStressIndex(testData.sample_stress_index_2);
        await JournalEntryPage.btnNext.click();
        expect(await JournalEntryPage.txtWellDone).toHaveText("Well done, you did it!");
        await JournalEntryPage.clickConfirm();
        expect(await JournalPage.journalEntryBox(testData.sample_test_date_5)).toBeExisting();
        expect(await JournalPage.txtmood(testData.sample_test_date_5)).toHaveTextContaining(mood);
        expect(await JournalPage.txtstress(testData.sample_test_date_5)).toHaveTextContaining(stress);
        await JournalPage.btnEdit(testData.sample_test_date_5).click();
        await JournalEntryPage.btnDelete.click();

    });

    it('should able to delete a journal', async () => {
        await JournalPage.btnAddNew.click();
        await JournalEntryPage.createJournal(testData.sample_test_date_4, testData.sample_mood_index_1, testData.sample_stress_index_1);
        await JournalPage.btnEdit(testData.sample_test_date_4).click();
        await JournalEntryPage.btnDelete.click();
        expect(JournalPage.journalEntryBox(testData.sample_test_date_4)).not.toBeExisting();

    });
});



