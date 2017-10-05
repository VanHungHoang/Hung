
import * as $ from 'jquery';
import * as Mustache from 'mustache';
import Calendar from "./calendar";
import { ViewCell, getSmallViewRow } from "./calendar.utils";
import { IScheduleEvent, IFCType } from "./calendar.model";

export default class CalendarBodySmall {

    startOfWeek: number = 0;

    weekendDays: number[] = [0, 6];

    $container: JQuery;

    date: Date;

    parent: Calendar;

    $body: JQuery;

    $footer: JQuery;

    viewCells: ViewCell[];

    dateShortName: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    fcTypes: IFCType[] = [];

    constructor($container: JQuery, parent: Calendar) {
        this.$container = $container;
        this.parent = parent;
        this.init();
    }

    init() {
        this.generateHtml();
        this.displayCalendar();
    }

    generateHtml() {
        this.$container.html($('#smallCalendarBody').html());
        this.$body = $('.view-body', this.$container);
        this.$footer = $('.view-footer', this.$container);
    }
    displayCalendar() {
        this.renderBody();
        this.renderFooter();
        this.applySchedules();
        //this.applyFCEventTypes();
    }

    renderBody() {
        this.getViewCell();
        let numberDayInMonth = this.viewCells.length;
        let template = $('#smallCalendarBodyRow').html();
        if (numberDayInMonth > 0) {
            this.$body.html('');
            for (let i: number = 0; i < numberDayInMonth; i++) {
                let cell: ViewCell = this.viewCells[i];
                Mustache.parse(template);
                let htmlRow = Mustache.to_html(template, {
                    isToday: cell.isToday,
                    isWeekend: cell.isWeekend,
                    dateString: cell.dateString,
                    dateNumber: cell.date.getDate(),
                    dateShortString: this.dateShortName[cell.date.getDay()]
                })

                this.$body.append(htmlRow);
            }
        }
        else {
            //do something
        }
    }

    renderFooter(): void {
        this.getFCEventType();
        if(this.fcTypes.length > 0){
            let $ul = document.createElement('ul');
            this.fcTypes.forEach( fctype => {
                let $li = document.createElement('li');
                $li.className = "fc-type-item";

                let $divColor = document.createElement('div');
                $divColor.setAttribute('style', "background-color: "+fctype.typeColor);
                $divColor.className="fc-type-item-color";
                $li.appendChild($divColor);

                let $divName = document.createElement('div');
                $divName.className="fc-type-item-name";
                $divName.innerText = fctype.typeName;
                $li.appendChild($divName);

                $ul.appendChild($li);
            })
            this.$footer.append($ul);
        }
        
        
    }

    /**********************************************************************/
    /* add schedules into cell of body
    /**********************************************************************/
    applySchedules(): void {

        this.parent.schedules.forEach(schedule => {
            let stringDate = schedule.startTime.getFullYear() + "-" + schedule.startTime.getMonth() + "-" + schedule.startTime.getDate();
            let strSelector = '.view-body .view-body-row[date="' + stringDate + '"]';
            let $selectCell: JQuery = $(strSelector);
            let $schedule: JQuery = $('.col-schedule-inner', $selectCell);

            let item = document.createElement('div');
            item.className = 'schedule-item' + (schedule.isAvailable ? ' schedule-available' : ' schedule-reserved');
            item.innerText = schedule.startTime.getHours() + ':' + schedule.startTime.getMinutes();
            $schedule.append(item);
            if (schedule.isAvailable) {
                item.addEventListener('click', () => this.selectScheduleAvailable(schedule));
            }
        });
    }

    applyFCEventTypes(): void {
        if (this.parent.fcEvents.length > 0) {
            this.parent.fcEvents.forEach(event => {
                let stringDate = event.startDate.getFullYear() + "-" + event.startDate.getMonth() + "-" + event.startDate.getDate();
                let strSelector = '.view-body .view-body-row[date="' + stringDate + '"]';
                let $selectRow: JQuery = $(strSelector);
            })
        }
    }

    /**********************************************************************/
    /* get types in list FCEvents 
    /**********************************************************************/
    getFCEventType(): void {

        this.parent.fcEvents.forEach(event => {
            if (!this.fcTypes.some(fct => fct.typeColor === event.typeColor)) {
                console.log(event.typeColor);
                this.fcTypes.push({
                    typeName: event.typeName,
                    typeColor: event.typeColor
                })
            }
        })
    }



    getViewCell() {
        this.viewCells = getSmallViewRow({
            viewDate: this.parent.date,
            weekendDays: this.weekendDays
        });
    }

    /**********************************************************************/
    /* event when select schedule in calendar
    /**********************************************************************/
    selectScheduleAvailable(schedule: IScheduleEvent) {
        this.parent.selectedSchedule(schedule);
    }
}