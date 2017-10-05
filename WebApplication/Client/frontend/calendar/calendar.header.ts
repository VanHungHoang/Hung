
import * as $ from 'jquery';
import { ITimeZone } from "./calendar.model";
import * as Mustache from 'mustache';
import Calendar from "./calendar";
import { appSettings } from "../main";

class LabelDate {
    longMonth: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octorber", "December"];
    sortMonth: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Dec"];
}

export default class CalendarHeader {

    $container: JQuery;

    timeZones: ITimeZone[];

    date: Date;

    parent: Calendar;

    fullDateFormat: string;

    labelDate: LabelDate;

    constructor($container: JQuery, parent: Calendar) {
        this.$container = $container;
        this.parent = parent;
        this.timeZones = parent.timeZones;
        //this.fullDateFormat = appSettings.fullDateFormat;
        this.date = parent.date || new Date();
        this.init();
    }

    init(): void {
        this.display();
        this.addEventListeners();
    }

    display(): void {
        var template = $('#fullCalendarHeader').html();
        Mustache.parse(template);  
        let header = {
            selectedDate: this.date,
            timeZones: this.timeZones,
            selectedTimeZone: this.timeZones[0]
        }
        var html = Mustache.to_html(template, header);
        this.$container.append(html);
    }

    changeTimeZone(): void{

    }

    /**********************************************************************/
    /* 
    /**********************************************************************/
    nextClick(): void{
        let desiredMonth= this.date.getMonth() + 1;
        let dateWithDesiredMonth = new Date(this.date.getFullYear(), desiredMonth, 1);
        this.date = dateWithDesiredMonth;
        this.changeDate();
        let $btnPrev = $('.btn-prev', this.$container);
        if($btnPrev.hasClass('disable')){
            $btnPrev.removeClass('disable').bind('click', (e)=>this.previousClick(e));
        }
        
    }

    previousClick(e): void {
        let $btnPrev = $(e.target).parents('.btn-prev');
        let dateToday = new Date();
        let desiredMonth= this.date.getMonth() - 1;
        let dateWithDesiredMonth = new Date(this.date.getFullYear(), desiredMonth, 1);

        this.date = dateWithDesiredMonth;
        this.changeDate();

        if(dateToday.getMonth() == desiredMonth){
            $btnPrev.addClass('disable');
            $btnPrev.unbind('click');
        }
    }

    changeDate(){
        this.parent.changeDate(this.date);
        $('.selected-date', this.$container).html(this.date.toString());
    }

    timeZoneClick(): void {
        let $parent = $(this).parents('.timezone-dropdown');
        if ($parent.hasClass('show-dropdown')) {
            $parent.removeClass('show-dropdown');
        }
        else {
            $parent.addClass('show-dropdown');
        }
    }

    selectTimeZone(): void{
        let $this = $(this);
        let $parent = $this.parents('.timezone-dropdown');
        let timeZoneID = $this.attr('time-zone');
        let timeZoneName = $this.text();
        let $btnTimeZone= $('.btn-timezone', $parent);
        $btnTimeZone.text(timeZoneName);
        $btnTimeZone.attr('time-zone',timeZoneID)
        $parent.removeClass('show-dropdown');
    }

    /**********************************************************************/
    /* Check can next status
    /* if it is false, unbind click event of the button next
    /**********************************************************************/
    addEventListenersAfterChangeDate(){
        if(!this.parent.canNext){
            let $btnNext = $('.btn-next', this.$container);
            $btnNext.unbind('click');
            $btnNext.addClass('disable');
        }
    }

    /**********************************************************************/
    /* Add event after render html
    /**********************************************************************/
    addEventListeners(): void{
        let btnNext = $('.btn-next', this.$container);
        if (btnNext != undefined && this.parent.canNext) {
            btnNext.bind('click', ()=>this.nextClick());
        }
        else {
            throw new Error("Method not implemented.");
        }

        let btnPrev = $('.btn-prev', this.$container);
        if (btnPrev != undefined) {
            let currDate = new Date();
            if(currDate.getFullYear() == this.date.getFullYear() &&  currDate.getMonth() == this.date.getMonth()){
                if(!btnPrev.hasClass('disable'))
                    btnPrev.addClass('disable');
            }
            else {
                btnPrev.removeClass('disable');
                btnPrev.bind('click', (e)=>this.previousClick(e))
            }
            
        }
        else {
            throw new Error("Method not implemented.");
        }
        $('.btn-timezone', this.$container).bind('click', this.timeZoneClick);
        $('a.timezone-item', this.$container).bind('click', this.selectTimeZone);
        
    }

    formatDate(date: Date, format: string) {

    }
}