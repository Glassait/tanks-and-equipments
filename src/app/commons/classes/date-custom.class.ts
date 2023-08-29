export class DateCustomClass {
    public static getTodayDatePlusTenMinute(): Date {
        const today: Date = new Date();
        today.setMinutes(today.getMinutes() + 10);
        return today;
    }

    public static getMidnightDate(): Date {
        const midnight: Date = new Date();
        midnight.setHours(24, 0, 0, 0);
        return midnight;
    }
}
