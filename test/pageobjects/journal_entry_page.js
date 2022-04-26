

const Page = require('./page');
const DateUtills = require('../utilities/date_utills').default;

/**
 * sub page containing specific selectors and methods for a specific page
 */
class NewEntryPage extends Page {
    /**
     * define selectors using getter methods
     */
    get txtWellDone () {
        return $('//*[local-name()="svg" and @viewBox="0 0 664 175"]/following-sibling::h1');
    }

    get howIsYourMoodPage () {
        return $('//p[text()= "How is your mood?"]');
    }

    get howWasYourStressPage () {
        return $('//p[text()= "How was your stress?"]');
    }

    get btnDelete () {
        return $('//div[contains(@class,"components__Footer")]/button');
    }

    get btnClose () {
        return $('//h1[text()="Edit Entry"]/parent::div/button[2]');
    }

    get txtMoodOrStress () {
        return $('//*[local-name()="svg" and @viewBox="0 0 592 325"]/following-sibling::span');
    }

    get btnJournalEntryForToday () {
        return $('button[aria-label="diaries.entry.new.title today"]');
    }

    get btnEditJournalEntryForToday () {
        return $('//button[contains(@aria-label,"diaries.entry.edit.title")]');
    }

    get monthYearValue () {
        return $('//div[@class= "DayPicker-Caption"]/div');
    }

    date (exDay) {
        return $('//div[text()="'+exDay+'" and @aria-disabled="false"]');
    }
    getMoodAndStressIndex (index) {
        return $('//span[contains(@class,"MuiSlider-markLabel") and @data-index="'+index+'"]'); 
    }

    get btnNext () {
        return $('//button[text()="Next"]');
    }

    get btnComplete () {
        return $('//button[text()="Complete"]');
    }

    get btnBack () {
        return $('//p[text()="Back"]/parent::button');
    }

    get btnPreviousMonth () {
        return $('span[aria-label= "Previous Month"]');
    }

    /**
     * a method to select past date from journal calendar
     * TODO: optimize the logic using current date
     */
    async selectDate (date) {
        date = DateUtills.splitDate(date);
        const exDay = date[0];
        const exMonth = date[1];
        const exYear = date[2];

        if(exMonth === "February" && parseInt(exDay)>29) {
            console.log('-----------Invalid Date--------------');
            return;
        }
        var monthYear = await this.monthYearValue.getText();

        while(!(DateUtills.getMonthYear(monthYear)[0] === exMonth && DateUtills.getMonthYear(monthYear)[1] === exYear)){
            await this.btnPreviousMonth.click();
            monthYear = await this.monthYearValue.getText();
    
        }
        await this.date(exDay).click();
    }

    /**
     * a common method to create a journal
     */
    async createJournal (date, moodIndex, stressIndex){
        await this.btnJournalEntryForToday.click();
        await this.selectDate(date);
        await this.selectMoodIndex(moodIndex);
        await this.btnNext.click();
        await this.selectStressIndex(stressIndex);
        await this.btnNext.click();
        await this.clickConfirm();
    }

    /**
     * a method select index for mood in journal
     */
    async selectMoodIndex (index) {
        await this.getMoodAndStressIndex(index).click();
        return this.txtMoodOrStress.getText();
    }

    /**
     * a method select index for stress in journal
     */
    async selectStressIndex (index) {
        await this.getMoodAndStressIndex(index).click();
        return this.txtMoodOrStress.getText();
    }

    async clickConfirm () {
        await this.btnComplete.waitForClickable({timeout: 60000})
        await this.btnComplete.click();
    }

}

module.exports = new NewEntryPage();
