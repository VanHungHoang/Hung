// Imports global styles
import './styles.scss';
import 'dropzone/dist/dropzone.css';
import * as $ from 'jquery';
import 'mustache/mustache';
import 'dropzone/dist/dropzone';
import MeetingBooking from './booking/booking.form';
import Calendar from './calendar/calendar';
import { Settings, Labels } from './app';

declare var AppSetting: object;
export let appSettings: Settings;

declare var AllLabels: object;
export let allLabels: Labels;

//$(document).ready(function () {
//    let setting = new Settings();
//    $.extend(true, setting, AppSetting);
//    appSettings = setting;
//    new MeetingBooking('#main-app');
//});

$(function () {
    //let setting = new Settings();
    //$.extend(true, setting, AppSetting);
    //appSettings = setting;

    //let labels = new Labels();
    //$.extend(true, labels, AllLabels);
    //allLabels = labels;
     
    //new MeetingBooking('#main-app');
    new Calendar('.calendar .calendar-wrapper');
});


