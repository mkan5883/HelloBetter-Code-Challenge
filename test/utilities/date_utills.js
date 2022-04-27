class DateUtills {
    /**
     * a method split a date from / symbol
     */
    splitDate(date) {
        return date.split("/");
    };

    /**
     * a method to split month + year value from " "
     */
    getMonthYear(value) {
        return value.split(" ");
    }

}

export default new DateUtills();


