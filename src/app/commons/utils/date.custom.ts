export class DateCustom {
    /**
     * Returns a new Date object that is 10 minutes from the current time.
     * @returns {Date} A new Date object that is 10 minutes from the current time.
     */
    public static getTodayDatePlusTenMinute(): Date {
        const today: Date = new Date();
        today.setMinutes(today.getMinutes() + 10);
        return today;
    }

    /**
     * Returns a new Date object that represents midnight.
     * @returns {Date} A new Date object that represents midnight.
     */
    public static getMidnightDate(): Date {
        const midnight: Date = new Date();
        midnight.setHours(24, 0, 0, 0);
        return midnight;
    }

    /**
     * Returns a new Date object that is 2 weeks from the current time.
     * @returns {Date} A new Date object that is 2 weeks from the current time.
     */
    public static getToWeeks(): Date {
        const toWeeks: Date = new Date();
        return new Date(toWeeks.setDate(toWeeks.getDate() + 14));
    }
}
