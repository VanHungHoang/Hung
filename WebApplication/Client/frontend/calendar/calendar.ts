import * as $ from 'jquery';
import CalendarHeader from "./calendar.header";
import CalendarBody from "./calendar.body";
import { ITimeZone, IFcEvent, IScheduleEvent } from "./calendar.model";
import CalendarBodySmall from "./calendar.body.small";

declare var timezones: Array<ITimeZone>;

export default class Calendar {
    $container: JQuery;

    $header: JQuery;

    $body: JQuery;

    header: CalendarHeader;

    body: any;

    date: Date;

    parent: any;

    timeZones: Array<ITimeZone>;

    fcEvents: IFcEvent[];

    schedules: IScheduleEvent[];

    canNext: boolean = true;

    isSmallView: boolean = true;

    dayOfWeeks: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];


    constructor(selector, date?: Date, parent?: any) {
        if (!selector || selector == undefined)
            return;
        if (parent) {
            this.parent = parent;
        }
        this.$container = $(selector);
        this.timeZones = timezones;
        this.date = date || new Date();
        this.init();

    }

    generateHtml(): void {
        let header = document.createElement('div');
        header.className = 'calendar-header direction';
        this.$container.append(header);
        let body = document.createElement('div');
        body.className = 'calendar-body view';
        this.$container.append(body);

        this.$header = $(header);
        this.$body = $(body);
    }

    init(): void {
        this.generateHtml();
        this.getCalendarData();
        this.header = new CalendarHeader(this.$header, this);
        $(window).width() <= 768 ? this.isSmallView = true : this.isSmallView = false;
        this.renderBody();
        $(window).on('resize', () => this.windowOnRezie());
    }

    windowOnRezie(): void {
        this.getCalendarData();
        let isSmallView: boolean = false;
        if ($(window).width() <= 768) {
            isSmallView = true;
        }
        if (isSmallView != this.isSmallView) {
            this.isSmallView = isSmallView;
            this.renderBody();
        }
    }

    renderBody(): void {
        if (this.isSmallView)
            this.body = new CalendarBodySmall(this.$body, this);
        else {
            this.body = new CalendarBody(this.$body, this);
        }
    }

    /**********************************************************************/
    /* change date after press next button or previous button
    /**********************************************************************/
    changeDate(date: Date) {
        this.date = date;
        this.getCalendarData();
        this.renderBody();
        this.header.addEventListenersAfterChangeDate();
    }

    changeTimeZone(timeZoneId: string) {
        console.log('new-timezone');
    }

    
    getCalendarData(): void {

        // let schedules;
        // $.ajax({
        //     url: '/api/',
        //     type: 'get',
        //     dataType: "json",
        //     data: {

        //     },
        //     success: function(result){
        //         schedules = result;
        //     }
        // });
        // this.schedules = schedules;

        this.schedules = [
            {
                id: 1,
                duration: 60,
                startTime: new Date(),
                isAvailable: true,
                isDeleted: false,
                companyCode: "test"
            },
            {
                id: 2,
                duration: 60,
                startTime: new Date(),
                isAvailable: false,
                isDeleted: false,
                companyCode: "test"
            },
            {
                id: 3,
                duration: 60,
                startTime: new Date(),
                isAvailable: true,
                isDeleted: false,
                companyCode: "test"
            },            {
                id: 4,
                duration: 60,
                startTime: new Date(),
                isAvailable: true,
                isDeleted: false,
                companyCode: "test"
            },
            {
                id: 5,
                duration: 60,
                startTime: new Date(),
                isAvailable: false,
                isDeleted: false,
                companyCode: "test"
            },
            {
                id: 6,
                duration: 60,
                startTime: new Date(),
                isAvailable: true,
                isDeleted: false,
                companyCode: "test"
            }
        ];

        this.fcEvents = [
            {
                id: 1,
                startDate: new Date(2017,9,6),
                title: 'fc event abc',
                typeColor: 'blue',
                typeName: 'Financial Broad'
            },
            {
                id: 2,
                startDate: new Date(2017,9,6),
                title: 'fc event abc',
                typeColor: 'yellow',
                typeName: 'Financial New'
            },
            {
                id: 3,
                startDate: new Date(2017,9,6),
                title: 'fc event abc',
                typeColor: 'blue',
                typeName: 'Financial Broad'
            },
            {
                id: 4,
                startDate: new Date(),
                title: 'fc event abc',
                typeColor: 'blue',
                typeName: 'Financial New'
            },
            {
                id: 5,
                startDate: new Date(),
                title: 'fc event abc',
                typeColor: 'yellow',
                typeName: 'Financial New'
            },
            {
                id: 6,
                startDate: new Date(),
                title: 'fc event abc',
                typeColor: 'green',
                typeName: 'Result'
            }
        ]

        this.canNext = true;
    }

    selectedSchedule(schedule: IScheduleEvent) {
        if (this.parent) {
            this.parent.calendarCallBack(schedule);
        }
    }

}

