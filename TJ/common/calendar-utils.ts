module CalendarUtilsModule {

    export class WeekDay {
        date: Date;
        isPast: boolean;
        isToday: boolean;
        isFuture: boolean;
        isWeekend: boolean;
        cssClass?: string;
    }
} 