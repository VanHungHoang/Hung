import * as $ from 'jquery';
import { IFcEvent, IScheduleEvent } from "./calendar.model";
import Calendar from "./calendar";

import * as Mustache from 'mustache';
import { ViewCell, getViewCell } from "./calendar.utils";

export default class CalendarBody {

    startOfWeek: number = 0;

    weekendDays: number[] = [0, 6];

    $container: JQuery;

    date: Date;

    parent: Calendar;

    $header: JQuery;

    $body: JQuery;

    $footer: JQuery;

    viewCells: ViewCell[];

    constructor($container: JQuery, parent: Calendar) {
        this.$container = $container;
        this.parent = parent;
        this.init();
    }
    init() {
        this.generateHtml();
        this.displayCalendar();
    }

    generateHtml(): void {         /*Generate Html for CalendarBody */
        this.$container.html($('#fullCalendarBody').html());
        this.$header = $('.view-header', this.$container);
        this.$body = $('.view-body', this.$container);
        this.$footer = $('.view-footer', this.$container);
    }

    displayCalendar() {   /* display Calendar and add Event into CalendarBody */
        this.renderHeader();
        this.renderBody();
        this.applyScheduleEvent();
        this.applyFcEvents();
    }

    renderHeader() {    /* Render part Header of CalendarBody */
        let rowHeader = document.createElement('div');
        rowHeader.className = 'view-row view-header-row';
        let start: number = this.startOfWeek;
        let dayOfWeeks: string[] = this.parent.dayOfWeeks;

        for (let i: number = 0; i < 7; i++) {
            let viewCell = document.createElement('div');
            let item: number = (start + i >= 7) ? (start + i - 7) : (start + i);
            viewCell.innerText = dayOfWeeks[item];
            if (this.weekendDays.some(e => e == item))
                viewCell.className = 'view-row-cell cal-weekend';
            else
                viewCell.className = 'view-row-cell';

            rowHeader.appendChild(viewCell);
        }
        this.$header.html('');
        this.$header.append(rowHeader);
    }

    renderBody() {     /* Render part Body of CalendarBody */
        this.getViewCell(this.parent.date);
        let numberWeekInView = Math.round(this.viewCells.length / 7);
        for (let i: number = 0; i < numberWeekInView; i++) {
            let bodyRow = document.createElement('div');
            bodyRow.className = 'view-row';
            bodyRow.innerHTML = this.renderBodyRow(i);
            this.$body.append(bodyRow);
            
            let listItem = $('.view-row-cell', bodyRow);
            $('.view-row-cell', bodyRow).each(function(){
                console.log($(this).index(listItem));
            })
        }
    }

    renderBodyRow(start: number): string {   /*Render rows of Body */
        let itemStart = start * 7;
        let html = '';
        let template = $('#fullCalendarCell').html();
        for (let i = itemStart; i < itemStart + 7; i++) {
            Mustache.parse(template);
            html += Mustache.to_html(template, this.viewCells[i]);
        }
        return html;
    }

    getViewCell(viewDate: Date) {
        let date: Date = new Date();
        if (date.getFullYear() == viewDate.getFullYear() && date.getMonth() == viewDate.getMonth()) {
            this.viewCells = getViewCell({
                viewDate: date,
                weekStartsOn: this.startOfWeek,
                weekendDays: this.weekendDays
            });
        } else{
            this.viewCells = getViewCell({
                viewDate: this.parent.date,
                weekStartsOn: this.startOfWeek,
                weekendDays: this.weekendDays
            });
        }
    }

    applyScheduleEvent() {      /*Add Schedules data into cells of body*/
        let $schedule: JQuery;
        let $scheduleBottom: JQuery;
        
        let scheduleLength = this.parent.schedules.length;
        let $divMoreSchedule = document.createElement('div');
        $divMoreSchedule.className = 'schedule-more';
        let $divArrowSchedule = document.createElement('div');
        $divArrowSchedule.className = 'schedule-arrow-down';
        $divMoreSchedule.appendChild($divArrowSchedule);    
        if (scheduleLength > 3) {
            for(let i = 0; i< scheduleLength; i++){
                let getMonth = this.parent.schedules[i].startTime.getMonth();
                let stringDate = this.parent.schedules[i].startTime.getFullYear() + "-" + getMonth + "-" + this.parent.schedules[i].startTime.getDate();
                let stringSelector = '.view-body .view-row .view-row-cell[date="' + stringDate + '"]';
                let $selectCell: JQuery = $(stringSelector);
                $scheduleBottom = $('.view-cell-bottom', $selectCell);
                $schedule = $('.view-cell-bottom .schedule-events', $selectCell);
                $scheduleBottom.addClass('has-schedule-more');
                $schedule.addClass(' has-schedule-events');
                let div
                if ($schedule.length == 1) {                    
                                       
                    let $item = document.createElement('div');
                    $item.className = 'schedule-events-item' + (this.parent.schedules[i].isAvailable ? ' schedule-available' : '');
                    $item.setAttribute('schedule-id', this.parent.schedules[i].id.toString());
                    let displayHourstartTime = this.parent.schedules[i].startTime.getHours();
                    let displayMinutesstartTime = this.parent.schedules[i].startTime.getMinutes().toString();
                    if (displayHourstartTime > 12) {
                        displayHourstartTime = displayHourstartTime - 12;
                    }
                    $item.innerText += displayHourstartTime.toString() + ':' + displayMinutesstartTime;
                    if (this.parent.schedules[i].isAvailable) {
                        $item.innerText += " Available";
                    } else {
                        $item.innerText += " Reserved";
                    }   
                    
                    $schedule.append($item); 
                    if(i>2){
                        $item.className +=' item-more'; 
                        $($item).hide();
                        // $schedule.append($divMoreSchedule);
                        $scheduleBottom.append($divMoreSchedule);
                    }
                    if (this.parent.schedules[i].isAvailable)
                        $item.addEventListener('click', () => this.scheduleAvailableClick(this.parent.schedules[i]))
                }
            }
        } 
        else {
            this.parent.schedules.forEach(event => {
            let getMonth = event.startTime.getMonth();
            let stringDate = event.startTime.getFullYear() + "-" + getMonth + "-" + event.startTime.getDate();
            let stringSelector = '.view-body .view-row .view-row-cell[date="' + stringDate + '"]';
            let $selectCell: JQuery = $(stringSelector);
            $schedule = $('.view-cell-bottom .schedule-events', $selectCell);
            $schedule.addClass(' has-schedule-events');
            if ($schedule.length == 1) {
                let $item = document.createElement('div');
                $item.className = 'schedule-events-item' + (event.isAvailable ? ' schedule-available' : '');
                $item.setAttribute('schedule-id', event.id.toString());
                let displayHourstartTime = event.startTime.getHours();
                let displayMinutesstartTime = event.startTime.getMinutes().toString();
                if (displayHourstartTime > 12) {
                    displayHourstartTime = displayHourstartTime - 12;
                }
                $item.innerText += displayHourstartTime.toString() + ':' + displayMinutesstartTime;
                if (event.isAvailable) {
                    $item.innerText += " Available";
                } else {
                    $item.innerText += " Reserved";
                }
                $schedule.append($item);
                if (event.isAvailable)
                    $item.addEventListener('click', () => this.scheduleAvailableClick(event))
            }
            });
        }
        $('.schedule-more .schedule-arrow-down').mouseover(   /*when hover will display PopUp Fincalendars*/
            function () {       
                $('.schedule-events-item').show();
                $('.has-schedule-events').css({'box-shadow': '5px 2px 2px 2px #888888','text-align':'center'})
                $(this).hide();
            }            
        );  
        $('.schedule-events.has-schedule-events').mouseleave(
             function () {
                $('.item-more').hide()
                $('.has-schedule-events').css({'box-shadow': '0px 0px 0px 0px #888888'})
                $('.schedule-more .schedule-arrow-down').show();
            }
        )
    }

    applyFcEvents() {   /*Add Fincalendars data into cells of body*/
        let $arrowPopup = document.createElement('div');
        $arrowPopup.className = "arrowPopup";
        let $popupFc = document.createElement('div');
        $popupFc.className = "list-fc-events";
        let $ulPopupFc = document.createElement('ul');
        $popupFc.appendChild($ulPopupFc);
        var $fincalendar: JQuery;
        var $liPopupFc;
        let fcEventlength = this.parent.fcEvents.length;
        if (fcEventlength > 3) {
            for (let i = 0; i < 3; i++) {
                let getMonth = this.parent.fcEvents[i].startDate.getMonth();
                let stringDate = this.parent.fcEvents[i].startDate.getFullYear() + "-" + getMonth + "-" + this.parent.fcEvents[i].startDate.getDate();
                let stringSelector = '.view-body .view-row .view-row-cell[date="' + stringDate + '"]';
                let $selectCell: JQuery = $(stringSelector);
                $fincalendar = $('.view-cell-top .fc-events', $selectCell);
                if ($fincalendar.length == 1) {
                    let $item = document.createElement('div');
                    $item.className = 'list-type-fc-event-item';
                    $($item).css("background-color", this.parent.fcEvents[i].typeColor);
                    $item.setAttribute('fc-id', this.parent.fcEvents[i].id.toString());
                    $fincalendar.append($item);

                    $liPopupFc = document.createElement('li');
                    $liPopupFc.className = "list-fc-events-item";
                    let $divfcEventPopupTop = document.createElement('div');
                    $divfcEventPopupTop.className = "fc-event-top";
                    let $divfcEventType = document.createElement('div');
                    $divfcEventType.className = "fc-event-type";
                    $($divfcEventType).css("background-color", this.parent.fcEvents[i].typeColor);
                    let $divfcEventStartDate = document.createElement('div');
                    $divfcEventStartDate.className = "fc-event-start-date";
                    $divfcEventStartDate.innerText = this.parent.fcEvents[i].startDate.toString();
                    $divfcEventPopupTop.appendChild($divfcEventType);
                    $divfcEventPopupTop.appendChild($divfcEventStartDate);
                    let $divfcEventPopupBottom = document.createElement('div');
                    $divfcEventPopupBottom.className = "fc-event-bottom";
                    let $divfcEventTitle = document.createElement('div');
                    $divfcEventTitle.className = "fc-event-title";
                    $divfcEventTitle.innerText = this.parent.fcEvents[i].title;

                    $divfcEventPopupBottom.appendChild($divfcEventTitle);
                    $liPopupFc.appendChild($divfcEventPopupTop);
                    $liPopupFc.appendChild($divfcEventPopupBottom);
                    $ulPopupFc.appendChild($liPopupFc);
                    $popupFc.appendChild($ulPopupFc);

                }
            }
            $(".fc-events").hover(   /*when hover will display PopUp Fincalendars*/
                function (e) {
                    $($fincalendar).append($arrowPopup);
                    $($fincalendar).append($popupFc);
                }
                // , function () {
                //     $(this).find(".list-fc-events").remove();
                //     $(this).find(".arrowPopup").remove();
                // }
            );
            let $popupViewMore = document.createElement('div');
            $popupViewMore.className = 'view-more';
            $popupViewMore.innerText = 'view more>>';
            $ulPopupFc.appendChild($popupViewMore);
        } else {
            this.parent.fcEvents.forEach(event => {
                let getMonth = event.startDate.getMonth();
                let stringDate = event.startDate.getFullYear() + "-" + getMonth + "-" + event.startDate.getDate();
                let stringSelector = '.view-body .view-row .view-row-cell[date="' + stringDate + '"]';
                let $selectCell: JQuery = $(stringSelector);
                let $fincalendar: JQuery = $('.view-cell-top .fc-events', $selectCell);
                if ($fincalendar.length == 1) {
                    let $item = document.createElement('div');
                    $item.className = 'list-type-fc-event-item';
                    $($item).css("background-color", event.typeColor);
                    $item.setAttribute('fc-id', event.id.toString());
                    $fincalendar.append($item);

                    let $liPopupFc = document.createElement('li');
                    $liPopupFc.className = "list-fc-events-item";
                    let $divfcEventPopupTop = document.createElement('div');
                    $divfcEventPopupTop.className = "fc-event-top";
                    let $divfcEventType = document.createElement('div');
                    $divfcEventType.className = "fc-event-type";
                    $($divfcEventType).css("background-color", event.typeColor);
                    let $divfcEventStartDate = document.createElement('div');
                    $divfcEventStartDate.className = "fc-event-start-date";
                    $divfcEventStartDate.innerText = event.startDate.toString();
                    $divfcEventPopupTop.appendChild($divfcEventType);
                    $divfcEventPopupTop.appendChild($divfcEventStartDate);
                    let $divfcEventPopupBottom = document.createElement('div');
                    $divfcEventPopupBottom.className = "fc-event-bottom";
                    let $divfcEventTitle = document.createElement('div');
                    $divfcEventTitle.className = "fc-event-title";
                    $divfcEventTitle.innerText = event.title;

                    $divfcEventPopupBottom.appendChild($divfcEventTitle);
                    $liPopupFc.appendChild($divfcEventPopupTop);
                    $liPopupFc.appendChild($divfcEventPopupBottom);

                    $(".fc-events").hover(
                        function () {
                            $ulPopupFc.appendChild($liPopupFc);
                            $popupFc.appendChild($ulPopupFc);
                            $($popupFc).css("top", "50px");
                            $($fincalendar).append($arrowPopup);
                            $($fincalendar).append($popupFc);
                        }
                        // , function () {
                        //     $(this).find(".list-fc-events").remove();
                        //     $(this).find(".arrowPopup").remove();
                        // }
                    );
                };
            })
        }
    }

    scheduleAvailableClick(event: IScheduleEvent) {
        //this.checkScheduleStatus(event.id);
        console.log(event);
    }


}

