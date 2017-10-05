


export class ViewCell{
    date: Date;
    dateNumber: number;
    dateString: string;
    isToday: boolean;
    inMonth: boolean;
    isWeekend: boolean;
}


export function addDays(
    dirtyDate: Date,
    amount: number
): Date {
    let date = new Date(dirtyDate);
    date.setDate(date.getDate() + amount);
    return date;
}

export function startOfWeek(
    dirtyDate: Date,
    dirtyOptions?: {
        weekStartsOn?: number
    }
): Date {
    let weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0;

    let date = new Date(dirtyDate);
    let day = date.getDay();
    let diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

    date.setDate(date.getDate() - diff);
    date.setHours(0, 0, 0, 0);
    return date;
}

export function startOfMonth(
    dirtyDate: Date
): Date {
    let date = new Date(dirtyDate);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
}

export function endOfWeek(
    dirtyDate: Date,
    dirtyOptions?: {
        weekStartsOn?: number
    }
): Date {
    let weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0

    let date = new Date(dirtyDate);
    let day = date.getDay();
    let diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

    date.setDate(date.getDate() + diff);
    date.setHours(23, 59, 59, 999);
    return date;
}

export function endOfMonth(
    dirtyDate: Date
): Date {
    let date = new Date(dirtyDate);
    let month = date.getMonth();
    date.setFullYear(date.getFullYear(), month + 1, 0);
    date.setHours(23, 59, 59, 999);
    return date;
}

export function startOfDay(
    dirtyDate: Date
): Date {
    let date = new Date(dirtyDate);
    date.setHours(0, 0, 0, 0);
    return date;
}

export function isSameDay(
    dirtyDateLeft: Date,
    dirtyDateRight: Date
): boolean {
    let dateLeft = startOfDay(new Date(dirtyDateLeft));
    let dateRight = startOfDay(new Date(dirtyDateRight));
    return dateLeft.getTime() === dateRight.getTime();
}

export function compareAsc(
    dirtyDateLeft: Date,
    dirtyDateRight: Date
): number {
    let dateLeft = new Date(dirtyDateLeft);
    let timeLeft = dateLeft.getTime();
    let dateRight = new Date(dirtyDateRight);
    let timeRight = dateRight.getTime();

    if (timeLeft < timeRight) {
        return -1;
    } else if (timeLeft > timeRight) {
        return 1;
    } else {
        return 0;
    }
}

export function differenceInDays(
    dirtyDateLeft: Date,
    dirtyDateRight: Date
): number {
    let dateLeft = new Date(dirtyDateLeft);
    let dateRight = new Date(dirtyDateRight);

    let sign = compareAsc(dateLeft, dateRight);
    let difference = Math.abs(differenceInCalendarDays(dateLeft, dateRight));
    dateLeft.setDate(dateLeft.getDate() - sign * difference);

    // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
    // If so, result must be decreased by 1 in absolute value
    let isLastDayNotFull = (compareAsc(dateLeft, dateRight) === -sign) ? 1 : 0;
    return sign * (difference - isLastDayNotFull);
}

export function differenceInCalendarDays(
    dateLeft: Date,
    dateRight: Date
): number {
    let MILLISECONDS_IN_MINUTE = 60000;
    let MILLISECONDS_IN_DAY = 86400000;
    let startOfDayLeft = startOfDay(dateLeft)
    let startOfDayRight = startOfDay(dateRight)

    let timestampLeft = startOfDayLeft.getTime() -
        startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE
    let timestampRight = startOfDayRight.getTime() -
        startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE

    // Round the number of days to the nearest integer
    // because the number of milliseconds in a day is not constant
    // (e.g. it's different in the day of the daylight saving time clock shift)
    return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

export function isSameMonth(
    dirtyDateLeft: Date,
    dirtyDateRight: Date
): boolean {
    let dateLeft = new Date(dirtyDateLeft);
    let dateRight = new Date(dirtyDateRight);
    let u = (dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth())
    return u;
}



export interface GetViewCellArgs {
    viewDate: Date;
    weekStartsOn: number;
    viewStart?: Date;
    viewEnd?: Date;
    weekendDays?: number[];
}


export function getViewCell({
    viewDate,
    weekStartsOn,
    viewStart = startOfMonth(viewDate),
    viewEnd = endOfMonth(viewDate),
    weekendDays=[]
}: GetViewCellArgs): ViewCell[] {

    
    const start: Date = startOfWeek(viewStart, { weekStartsOn });
    const end: Date = endOfWeek(viewEnd, { weekStartsOn });
    
    const initialViewCell: ViewCell[] = [];
    let previousDate: Date;
    let numberDay: number = differenceInDays(end, start) + 1;
    for (let i: number = 0; i < numberDay; i++) {
        let date: Date = addDays(start, i);
        let cell: ViewCell = new ViewCell();
        cell.inMonth = isSameMonth(date, viewDate);
        cell.date = date;
        cell.dateNumber = date.getDate();
        cell.dateString = date.getFullYear()+ "-"+ date.getMonth() + "-"+date.getDate();
        cell.isToday = isSameDay(date, viewDate);
        if(weekendDays.some( w=> w == date.getDay())){
            cell.isWeekend = true;
        }
        else {
            cell.isWeekend = false;
        }
        initialViewCell.push(cell);
    }
    
    return initialViewCell;
}

export function getSmallViewRow({
    viewDate,
    weekendDays
}: {
        viewDate: Date,
        weekendDays?: number[]
    }): ViewCell[] {


    const start: Date = startOfMonth(viewDate);
    const end: Date = endOfMonth(viewDate);

    const initialViewCell: ViewCell[] = [];
    let previousDate: Date;
    let numberDay: number = differenceInDays(end, start) + 1;
    for (let i: number = 0; i < numberDay; i++) {
        let date: Date = addDays(start, i);
        let cell: ViewCell = new ViewCell();
        cell.inMonth = isSameMonth(date, viewDate);
        cell.date = date;
        cell.dateNumber = date.getDate();
        cell.dateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
        cell.isToday = isSameDay(date, viewDate);
        if (weekendDays.some(w => w == date.getDay())) {
            cell.isWeekend = true;
        }
        else {
            cell.isWeekend = false;
        }
        initialViewCell.push(cell);
    }

    return initialViewCell;
}