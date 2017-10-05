


export interface ITimeZone {
    timeZoneName: string;
    timeZoneID: string;
}

export interface ICalendarHeader {
    selectedDate: Date,
    timeZones: ITimeZone[],
    selectedTimeZone: ITimeZone
    //canNext: boolean;
    //canPrevious: boolean;
}

export interface ICalendarBody {
    header: ICalendarCell[];
    body: ICalendarRow[];
    footer: IFCType[];
}

export interface ICalendarRow {
    row: ICalendarCell[];
}
export interface ICalendarCell {
    date: Date;
    isToday: boolean;
    isPast: boolean;
    isFuture: boolean;
    isWeekend: boolean;
    inMonth: boolean;
    schedules: IScheduleEvent[];
    fCEvents: IFcEvent[];
}

export interface IScheduleEvent {
    id: number;
    companyCode: string;
    startTime: Date;
    duration: number;
    isDeleted: boolean;
    isAvailable: boolean;
}

export interface IFcEvent extends IFCType {
    id: number;
    startDate: Date;
    title: string;
}

export interface IFCType {
    typeName: string;
    typeColor: string;
}


export interface ISmallCalendarBody {
    body: ICalendarCell[];
    footer: IFCType[];
}