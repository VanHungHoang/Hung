
import * as $ from 'jquery';
import { IScheduleEvent } from "./calendar.model";
import Calendar from "./calendar";

export default class PopupCalendar{

    parent: any;

    selector: string;

    date: Date;
    constructor(strSelector: string, date?: Date, parent?: any) {
        this.selector = strSelector;

        if (parent) {
            this.parent = parent;
        }

        if (date) {
            this.date = date;
        }

        this.init();
    }

    init() {
        new Calendar(this.selector, this.date, this)
    }

    calendarCallBack(schedule: IScheduleEvent) {
        if (this.parent) {
            this.parent.calendarCallBack();
        }
        else {

        }
    }

}
