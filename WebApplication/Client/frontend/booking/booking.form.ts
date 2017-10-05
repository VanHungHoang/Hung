import * as $ from 'jquery';
import * as Mustache from 'mustache';
import MeetingType from './meeting.type';
import Applicant from './applicant';
import Agenda from './agenda';
import Attendees from './attendees';
import StepBase from './step.base';

export default class MeetingBooking {

    $containerId: JQuery;

    allSteps: Array<StepBase>;
    tabActive: any = 0;

    constructor(containerId) {
        if (!containerId || containerId == undefined)
            return;

        this.$containerId = $(containerId);        
        this.allSteps = [new MeetingType(".meeting-type-wrapper"), new Applicant(".applicant-wrapper"), new Agenda(".agenda-wrapper"), new Attendees(".attendees-wrapper")];
        this.init();
    }

    init(): void {        
        this.allSteps[this.tabActive].show();
        this.bindActions();
    }

    getMeetingDetails(): any {

    }

    checkMultipleBooking(): boolean {
        return false;
    }

    saveBooking(): boolean {
        return false;
    }

    bindActions() {
        var me = this;



        $('.button-wrapper').on('click', function (event) {            
            if ($(event.target).hasClass("btn-next")) {
                $('.btn-back').show();
                if (++me.tabActive == 3) {
                    $('.btn-next').html("Submit");                    
                }                
            }

            if ($(event.target).hasClass("btn-back")) {
                $('.btn-next').html("Next");
                if (--me.tabActive == 0) {
                    $('.btn-back').hide();
                }
            }

            if (me.tabActive < 4) me.changeStepState();
            else me.tabActive = 3;
            
        })
    }

    changeStepState() {
        this.removeAllActiveBackground();
        for (var i = 0; i < 4; i++) {
            this.allSteps[i].hide();
        }
        $("li[step-index='" + this.tabActive + "']").addClass("active");
        this.allSteps[this.tabActive].show();
    }

    removeAllActiveBackground() {
        $('.navigation').find('.active').removeClass('active');
        $('.navigation').find('.active-background').removeClass('active-background');
    }
}
