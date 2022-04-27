
const Page = require('./page');
const DateUtills = require('../utilities/date_utills').default;

/**
 * sub page containing specific selectors and methods for a specific page
 */
class JournalPage extends Page {
    /**
     * define selectors using getter methods
     */
    get btnJournal() {
        return $('a[aria-label="Navigate to Journal page"]');
    }

    get btnAddNew() {
        return $('//a[text()="Add new"]')
    }

    get btnCreateNewJournal() {
        return $('//a[text()= "Create journal entry"]')
    }

    journalEntryBox(date) {
        date = DateUtills.splitDate(date);
        const exDay = date[0];
        const exMonth = date[1];
        const exYear = date[2];
        return $('//p[contains(text(),"' + exMonth + '' + " " + '' + exDay + '") and contains(text(),"' + exYear + '") ]/parent::div');
    }

    txtmood(date) {
        date = DateUtills.splitDate(date);
        const exDay = date[0];
        const exMonth = date[1];
        const exYear = date[2];
        return $('//p[contains(text(),"' + exMonth + '' + " " + '' + exDay + '") and contains(text(),"' + exYear + '") ]/parent::div/following-sibling::div[1]/div/p')
    }

    txtstress(date) {
        date = DateUtills.splitDate(date);
        const exDay = date[0];
        const exMonth = date[1];
        const exYear = date[2];
        return $('//p[contains(text(),"' + exMonth + '' + " " + '' + exDay + '") and contains(text(),"' + exYear + '") ]/parent::div/following-sibling::div[2]/div/p')
    }

    btnEdit(date) {
        date = DateUtills.splitDate(date);
        const exDay = date[0];
        const exMonth = date[1];
        const exYear = date[2];
        return $('//p[contains(text(),"' + exMonth + '' + " " + '' + exDay + '") and contains(text(),"' + exYear + '") ]/parent::div/div/button')
    }

}

module.exports = new JournalPage();
