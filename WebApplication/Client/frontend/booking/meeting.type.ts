import * as $ from 'jquery';
import * as Mustache from 'mustache';
import StepBase from './step.base';
import { appSettings } from '../main';

enum EMeetingType {
    faceToFace = 1,
    videoConference = 2,
    teleconference = 3
}

export default class MeetingType extends StepBase {

    private isRender: Boolean = false;
    private $containerID: JQuery;
    private $meetingTypeItems: JQuery;
    private lastActiveMeetingTypeIndex: number;
    private meetingTypeResult: number;
    private defaultSelectedMeetingType: number = $.isArray(appSettings.enabledTypeOfMeeting) && appSettings.enabledTypeOfMeeting.length > 0 ? appSettings.enabledTypeOfMeeting[0] : 0;

    constructor(containerID: string) {

        super();
        if (!containerID || containerID == undefined) {
            throw 'ContainerID is not empty';
        }

        this.$containerID = $(containerID);
        this.lastActiveMeetingTypeIndex = -1;
        //this.bindMeetingType(2);
        this.render();
        this.$meetingTypeItems = this.$containerID.find('.button-meetingType .meeting-type');
        this.selectedMeetingTypeEvent();
        this.getFormData();
    }

    render(): void {
        this.isRender = true;
        var template = $('.template').find('#meeting-type-content').html();
        Mustache.parse(template);

        var meetingTypesResult = [];
        var meetingTypes = appSettings.enabledTypeOfMeeting;
        meetingTypesResult = this.normalizesObject(meetingTypes)
        var rendered = Mustache.render(template, { meetingTypes: meetingTypesResult });
        this.$containerID.html(rendered);
        this.setSelectedMeetingType();
    }

    normalizesObject(meetingTypes: Array<number>): Array<object> {
        let lengOfMeetingTypes = meetingTypes.length;
        var meetingTypesResult = [];
        if (lengOfMeetingTypes > 0) {
            var that = this;
            $.each(meetingTypes, function (i, v) {
                let typeId: number;
                let typeName: string;
                let control: string;
                let cssClassType: string;
                let cssClassActive: string;
                let textNote: string;
                let cssClassTextNoteActive: string;

                if (v == EMeetingType.faceToFace) {
                    typeId = v;
                    typeName = 'Face to face';
                    control = 'note-faceToFace';
                    cssClassType = 'face-to-face';
                    textNote = "Note: Face-to-Face meeting will take place at Haberdashers'Hall (18 West Smithfield, London EC1A 9HQ).";
                }

                if (v == EMeetingType.videoConference) {
                    typeId = v;
                    typeName = 'Video Conference';
                    control = 'note-videoConference';
                    cssClassType = 'video-conference';
                    textNote = "Note: Choosing Video Conference and Teleconference will download a software that will be used in the meeting.If this is not workable for you , please choose another type for meeting.";
                }

                if (v == EMeetingType.teleconference) {
                    typeId = v;
                    typeName = 'Teleconference';
                    control = 'note-teleconference';
                    cssClassType = 'teleconference';
                    textNote = 'Note: Teleconference.';
                }

                if (that.defaultSelectedMeetingType == v) {
                    cssClassActive = 'meetingType-active';
                    cssClassTextNoteActive = 'cssClassTextNoteActive';
                } else {
                    cssClassActive = '';
                    cssClassTextNoteActive = '';
                }

                meetingTypesResult.push({ typeId: typeId, typeName: typeName, control: control, cssClassType: cssClassType, cssClassActive: cssClassActive, textNote: textNote, cssClassTextNoteActive: cssClassTextNoteActive });

            });
        }
        return meetingTypesResult;
    }


    setSelectedMeetingType(): void {
        this.$containerID.off('click').on('click', '.button-meetingType .meeting-type', event => {

            let $target = $(event.target);

            this.removeAllActiveMeetingType($target);

            if ($target.hasClass('face-to-face')) {

                this.addActiveMeetingType($target);

            }

            if ($target.hasClass('video-conference')) {

                this.addActiveMeetingType($target);

            }

            if ($target.hasClass('teleconference')) {

                this.addActiveMeetingType($target);

            }

        })
    }

    removeAllActiveMeetingType($target: JQuery) {
        $target.siblings().removeClass('meetingType-active');
        this.$containerID.find('.text-note').hide();
    }

    addActiveMeetingType($target: JQuery) {
        $target.addClass('meetingType-active');
        $("#" + $target.attr('aria-controls')).show();
    }

    selectedMeetingTypeEvent() {
        var that = this;
        $('body').on('keydown', function (evt) {
            var keyCode = evt.keyCode || evt.which;
            switch (keyCode) {
                case 37:
                case 38:
                    if (that.lastActiveMeetingTypeIndex >= 0) {
                        that.moveToLeft();
                    }
                    break;
                case 39:
                case 40:
                    if (that.lastActiveMeetingTypeIndex >= 0) {
                        that.moveToRight();
                    }
                    break;
            }
        });

        this.$meetingTypeItems.off('click').on('click', function (evt) {

            if (evt.isDefaultPrevented())
                return;

            that.lastActiveMeetingTypeIndex = that.$meetingTypeItems.index($(this));
        });

    }

    moveToLeft() {
        var index = this.lastActiveMeetingTypeIndex - 1;
        if (index < 0)
            index = 0;

        this.$containerID.find('.button-meetingType .meeting-type').removeClass('meetingType-active').eq(index).addClass('meetingType-active').focus();
        this.$containerID.find('.content-note .text-note').hide().eq(index).show();
        this.lastActiveMeetingTypeIndex = index;
    }

    moveToRight() {
        var index = this.lastActiveMeetingTypeIndex + 1;
        if (index >= $('.button-meetingType .meeting-type').length)
            index = $('.button-meetingType .meeting-type').length - 1;

        this.$containerID.find('.button-meetingType .meeting-type').removeClass('meetingType-active').eq(index).addClass('meetingType-active').focus();
        //risk
        this.$containerID.find('.content-note .text-note').hide().eq(index).show();

        this.lastActiveMeetingTypeIndex = index;
    }

    getFormData() {
        this.meetingTypeResult = parseInt(this.$containerID.find('.button-meetingType .meetingType-active').attr('type-id'));
    }

    bindMeetingType(meetingTypeID: number) {

        if (meetingTypeID != undefined) {
            this.defaultSelectedMeetingType = meetingTypeID;
        } else {
            this.defaultSelectedMeetingType = this.defaultSelectedMeetingType;
        }
    }

    show(): void {
        if (this.isRender == false) {
            this.render();
            this.$containerID.show();
        } else {
            this.$containerID.show();
        }
    }

    hide(): void {
        this.$containerID.hide();
    }

    validate(): boolean {
        return false;
    }
    

}
