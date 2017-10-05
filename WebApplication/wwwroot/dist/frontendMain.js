var frontendMain_lib =
webpackJsonp_name__lib([2],{

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ViewCell = (function () {
    function ViewCell() {
    }
    return ViewCell;
}());
exports.ViewCell = ViewCell;
function addDays(dirtyDate, amount) {
    var date = new Date(dirtyDate);
    date.setDate(date.getDate() + amount);
    return date;
}
exports.addDays = addDays;
function startOfWeek(dirtyDate, dirtyOptions) {
    var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0;
    var date = new Date(dirtyDate);
    var day = date.getDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setDate(date.getDate() - diff);
    date.setHours(0, 0, 0, 0);
    return date;
}
exports.startOfWeek = startOfWeek;
function startOfMonth(dirtyDate) {
    var date = new Date(dirtyDate);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
}
exports.startOfMonth = startOfMonth;
function endOfWeek(dirtyDate, dirtyOptions) {
    var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0;
    var date = new Date(dirtyDate);
    var day = date.getDay();
    var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
    date.setDate(date.getDate() + diff);
    date.setHours(23, 59, 59, 999);
    return date;
}
exports.endOfWeek = endOfWeek;
function endOfMonth(dirtyDate) {
    var date = new Date(dirtyDate);
    var month = date.getMonth();
    date.setFullYear(date.getFullYear(), month + 1, 0);
    date.setHours(23, 59, 59, 999);
    return date;
}
exports.endOfMonth = endOfMonth;
function startOfDay(dirtyDate) {
    var date = new Date(dirtyDate);
    date.setHours(0, 0, 0, 0);
    return date;
}
exports.startOfDay = startOfDay;
function isSameDay(dirtyDateLeft, dirtyDateRight) {
    var dateLeft = startOfDay(new Date(dirtyDateLeft));
    var dateRight = startOfDay(new Date(dirtyDateRight));
    return dateLeft.getTime() === dateRight.getTime();
}
exports.isSameDay = isSameDay;
function compareAsc(dirtyDateLeft, dirtyDateRight) {
    var dateLeft = new Date(dirtyDateLeft);
    var timeLeft = dateLeft.getTime();
    var dateRight = new Date(dirtyDateRight);
    var timeRight = dateRight.getTime();
    if (timeLeft < timeRight) {
        return -1;
    }
    else if (timeLeft > timeRight) {
        return 1;
    }
    else {
        return 0;
    }
}
exports.compareAsc = compareAsc;
function differenceInDays(dirtyDateLeft, dirtyDateRight) {
    var dateLeft = new Date(dirtyDateLeft);
    var dateRight = new Date(dirtyDateRight);
    var sign = compareAsc(dateLeft, dateRight);
    var difference = Math.abs(differenceInCalendarDays(dateLeft, dateRight));
    dateLeft.setDate(dateLeft.getDate() - sign * difference);
    // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
    // If so, result must be decreased by 1 in absolute value
    var isLastDayNotFull = (compareAsc(dateLeft, dateRight) === -sign) ? 1 : 0;
    return sign * (difference - isLastDayNotFull);
}
exports.differenceInDays = differenceInDays;
function differenceInCalendarDays(dateLeft, dateRight) {
    var MILLISECONDS_IN_MINUTE = 60000;
    var MILLISECONDS_IN_DAY = 86400000;
    var startOfDayLeft = startOfDay(dateLeft);
    var startOfDayRight = startOfDay(dateRight);
    var timestampLeft = startOfDayLeft.getTime() -
        startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
    var timestampRight = startOfDayRight.getTime() -
        startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
    // Round the number of days to the nearest integer
    // because the number of milliseconds in a day is not constant
    // (e.g. it's different in the day of the daylight saving time clock shift)
    return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}
exports.differenceInCalendarDays = differenceInCalendarDays;
function isSameMonth(dirtyDateLeft, dirtyDateRight) {
    var dateLeft = new Date(dirtyDateLeft);
    var dateRight = new Date(dirtyDateRight);
    var u = (dateLeft.getFullYear() === dateRight.getFullYear() &&
        dateLeft.getMonth() === dateRight.getMonth());
    return u;
}
exports.isSameMonth = isSameMonth;
function getViewCell(_a) {
    var viewDate = _a.viewDate, weekStartsOn = _a.weekStartsOn, _b = _a.viewStart, viewStart = _b === void 0 ? startOfMonth(viewDate) : _b, _c = _a.viewEnd, viewEnd = _c === void 0 ? endOfMonth(viewDate) : _c, _d = _a.weekendDays, weekendDays = _d === void 0 ? [] : _d;
    var start = startOfWeek(viewStart, { weekStartsOn: weekStartsOn });
    var end = endOfWeek(viewEnd, { weekStartsOn: weekStartsOn });
    var initialViewCell = [];
    var previousDate;
    var numberDay = differenceInDays(end, start) + 1;
    var _loop_1 = function (i) {
        var date = addDays(start, i);
        var cell = new ViewCell();
        cell.inMonth = isSameMonth(date, viewDate);
        cell.date = date;
        cell.dateNumber = date.getDate();
        cell.dateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
        cell.isToday = isSameDay(date, viewDate);
        if (weekendDays.some(function (w) { return w == date.getDay(); })) {
            cell.isWeekend = true;
        }
        else {
            cell.isWeekend = false;
        }
        initialViewCell.push(cell);
    };
    for (var i = 0; i < numberDay; i++) {
        _loop_1(i);
    }
    return initialViewCell;
}
exports.getViewCell = getViewCell;
function getSmallViewRow(_a) {
    var viewDate = _a.viewDate, weekendDays = _a.weekendDays;
    var start = startOfMonth(viewDate);
    var end = endOfMonth(viewDate);
    var initialViewCell = [];
    var previousDate;
    var numberDay = differenceInDays(end, start) + 1;
    var _loop_2 = function (i) {
        var date = addDays(start, i);
        var cell = new ViewCell();
        cell.inMonth = isSameMonth(date, viewDate);
        cell.date = date;
        cell.dateNumber = date.getDate();
        cell.dateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
        cell.isToday = isSameDay(date, viewDate);
        if (weekendDays.some(function (w) { return w == date.getDay(); })) {
            cell.isWeekend = true;
        }
        else {
            cell.isWeekend = false;
        }
        initialViewCell.push(cell);
    };
    for (var i = 0; i < numberDay; i++) {
        _loop_2(i);
    }
    return initialViewCell;
}
exports.getSmallViewRow = getSmallViewRow;


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/Client/frontend/assets/prev-512.a64133a3450d58ad6067.png";

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/Client/frontend/assets/next-512.d02ea12d65ac06c8e75e.png";

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/Client/frontend/images/icons/file_icon@1x.7228bd1a2409ced345fd.png";

/***/ }),

/***/ 520:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34);
module.exports = __webpack_require__(521);


/***/ }),

/***/ 521:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Imports global styles
__webpack_require__(522);
__webpack_require__(523);
var $ = __webpack_require__(33);
__webpack_require__(76);
__webpack_require__(524);
var calendar_1 = __webpack_require__(525);
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
    new calendar_1.default('.calendar .calendar-wrapper');
});


/***/ }),

/***/ 522:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 525:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(33);
var calendar_header_1 = __webpack_require__(526);
var calendar_body_1 = __webpack_require__(527);
var calendar_body_small_1 = __webpack_require__(528);
var Calendar = (function () {
    function Calendar(selector, date, parent) {
        this.canNext = true;
        this.isSmallView = true;
        this.dayOfWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];
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
    Calendar.prototype.generateHtml = function () {
        var header = document.createElement('div');
        header.className = 'calendar-header direction';
        this.$container.append(header);
        var body = document.createElement('div');
        body.className = 'calendar-body view';
        this.$container.append(body);
        this.$header = $(header);
        this.$body = $(body);
    };
    Calendar.prototype.init = function () {
        var _this = this;
        this.generateHtml();
        this.getCalendarData();
        this.header = new calendar_header_1.default(this.$header, this);
        $(window).width() <= 768 ? this.isSmallView = true : this.isSmallView = false;
        this.renderBody();
        $(window).on('resize', function () { return _this.windowOnRezie(); });
    };
    Calendar.prototype.windowOnRezie = function () {
        this.getCalendarData();
        var isSmallView = false;
        if ($(window).width() <= 768) {
            isSmallView = true;
        }
        if (isSmallView != this.isSmallView) {
            this.isSmallView = isSmallView;
            this.renderBody();
        }
    };
    Calendar.prototype.renderBody = function () {
        if (this.isSmallView)
            this.body = new calendar_body_small_1.default(this.$body, this);
        else {
            this.body = new calendar_body_1.default(this.$body, this);
        }
    };
    /**********************************************************************/
    /* change date after press next button or previous button
    /**********************************************************************/
    Calendar.prototype.changeDate = function (date) {
        this.date = date;
        this.getCalendarData();
        this.renderBody();
        this.header.addEventListenersAfterChangeDate();
    };
    Calendar.prototype.changeTimeZone = function (timeZoneId) {
        console.log('new-timezone');
    };
    Calendar.prototype.getCalendarData = function () {
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
            }, {
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
                startDate: new Date(2017, 9, 6),
                title: 'fc event abc',
                typeColor: 'blue',
                typeName: 'Financial Broad'
            },
            {
                id: 2,
                startDate: new Date(2017, 9, 6),
                title: 'fc event abc',
                typeColor: 'yellow',
                typeName: 'Financial New'
            },
            {
                id: 3,
                startDate: new Date(2017, 9, 6),
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
        ];
        this.canNext = true;
    };
    Calendar.prototype.selectedSchedule = function (schedule) {
        if (this.parent) {
            this.parent.calendarCallBack(schedule);
        }
    };
    return Calendar;
}());
exports.default = Calendar;


/***/ }),

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(33);
var Mustache = __webpack_require__(76);
var LabelDate = (function () {
    function LabelDate() {
        this.longMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octorber", "December"];
        this.sortMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Dec"];
    }
    return LabelDate;
}());
var CalendarHeader = (function () {
    function CalendarHeader($container, parent) {
        this.$container = $container;
        this.parent = parent;
        this.timeZones = parent.timeZones;
        //this.fullDateFormat = appSettings.fullDateFormat;
        this.date = parent.date || new Date();
        this.init();
    }
    CalendarHeader.prototype.init = function () {
        this.display();
        this.addEventListeners();
    };
    CalendarHeader.prototype.display = function () {
        var template = $('#fullCalendarHeader').html();
        Mustache.parse(template);
        var header = {
            selectedDate: this.date,
            timeZones: this.timeZones,
            selectedTimeZone: this.timeZones[0]
        };
        var html = Mustache.to_html(template, header);
        this.$container.append(html);
    };
    CalendarHeader.prototype.changeTimeZone = function () {
    };
    /**********************************************************************/
    /*
    /**********************************************************************/
    CalendarHeader.prototype.nextClick = function () {
        var _this = this;
        var desiredMonth = this.date.getMonth() + 1;
        var dateWithDesiredMonth = new Date(this.date.getFullYear(), desiredMonth, 1);
        this.date = dateWithDesiredMonth;
        this.changeDate();
        var $btnPrev = $('.btn-prev', this.$container);
        if ($btnPrev.hasClass('disable')) {
            $btnPrev.removeClass('disable').bind('click', function (e) { return _this.previousClick(e); });
        }
    };
    CalendarHeader.prototype.previousClick = function (e) {
        var $btnPrev = $(e.target).parents('.btn-prev');
        var dateToday = new Date();
        var desiredMonth = this.date.getMonth() - 1;
        var dateWithDesiredMonth = new Date(this.date.getFullYear(), desiredMonth, 1);
        this.date = dateWithDesiredMonth;
        this.changeDate();
        if (dateToday.getMonth() == desiredMonth) {
            $btnPrev.addClass('disable');
            $btnPrev.unbind('click');
        }
    };
    CalendarHeader.prototype.changeDate = function () {
        this.parent.changeDate(this.date);
        $('.selected-date', this.$container).html(this.date.toString());
    };
    CalendarHeader.prototype.timeZoneClick = function () {
        var $parent = $(this).parents('.timezone-dropdown');
        if ($parent.hasClass('show-dropdown')) {
            $parent.removeClass('show-dropdown');
        }
        else {
            $parent.addClass('show-dropdown');
        }
    };
    CalendarHeader.prototype.selectTimeZone = function () {
        var $this = $(this);
        var $parent = $this.parents('.timezone-dropdown');
        var timeZoneID = $this.attr('time-zone');
        var timeZoneName = $this.text();
        var $btnTimeZone = $('.btn-timezone', $parent);
        $btnTimeZone.text(timeZoneName);
        $btnTimeZone.attr('time-zone', timeZoneID);
        $parent.removeClass('show-dropdown');
    };
    /**********************************************************************/
    /* Check can next status
    /* if it is false, unbind click event of the button next
    /**********************************************************************/
    CalendarHeader.prototype.addEventListenersAfterChangeDate = function () {
        if (!this.parent.canNext) {
            var $btnNext = $('.btn-next', this.$container);
            $btnNext.unbind('click');
            $btnNext.addClass('disable');
        }
    };
    /**********************************************************************/
    /* Add event after render html
    /**********************************************************************/
    CalendarHeader.prototype.addEventListeners = function () {
        var _this = this;
        var btnNext = $('.btn-next', this.$container);
        if (btnNext != undefined && this.parent.canNext) {
            btnNext.bind('click', function () { return _this.nextClick(); });
        }
        else {
            throw new Error("Method not implemented.");
        }
        var btnPrev = $('.btn-prev', this.$container);
        if (btnPrev != undefined) {
            var currDate = new Date();
            if (currDate.getFullYear() == this.date.getFullYear() && currDate.getMonth() == this.date.getMonth()) {
                if (!btnPrev.hasClass('disable'))
                    btnPrev.addClass('disable');
            }
            else {
                btnPrev.removeClass('disable');
                btnPrev.bind('click', function (e) { return _this.previousClick(e); });
            }
        }
        else {
            throw new Error("Method not implemented.");
        }
        $('.btn-timezone', this.$container).bind('click', this.timeZoneClick);
        $('a.timezone-item', this.$container).bind('click', this.selectTimeZone);
    };
    CalendarHeader.prototype.formatDate = function (date, format) {
    };
    return CalendarHeader;
}());
exports.default = CalendarHeader;


/***/ }),

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(33);
var Mustache = __webpack_require__(76);
var calendar_utils_1 = __webpack_require__(178);
var CalendarBody = (function () {
    function CalendarBody($container, parent) {
        this.startOfWeek = 0;
        this.weekendDays = [0, 6];
        this.$container = $container;
        this.parent = parent;
        this.init();
    }
    CalendarBody.prototype.init = function () {
        this.generateHtml();
        this.displayCalendar();
    };
    CalendarBody.prototype.generateHtml = function () {
        this.$container.html($('#fullCalendarBody').html());
        this.$header = $('.view-header', this.$container);
        this.$body = $('.view-body', this.$container);
        this.$footer = $('.view-footer', this.$container);
    };
    CalendarBody.prototype.displayCalendar = function () {
        this.renderHeader();
        this.renderBody();
        this.applyScheduleEvent();
        this.applyFcEvents();
    };
    CalendarBody.prototype.renderHeader = function () {
        var rowHeader = document.createElement('div');
        rowHeader.className = 'view-row view-header-row';
        var start = this.startOfWeek;
        var dayOfWeeks = this.parent.dayOfWeeks;
        var _loop_1 = function (i) {
            var viewCell = document.createElement('div');
            var item = (start + i >= 7) ? (start + i - 7) : (start + i);
            viewCell.innerText = dayOfWeeks[item];
            if (this_1.weekendDays.some(function (e) { return e == item; }))
                viewCell.className = 'view-row-cell cal-weekend';
            else
                viewCell.className = 'view-row-cell';
            rowHeader.appendChild(viewCell);
        };
        var this_1 = this;
        for (var i = 0; i < 7; i++) {
            _loop_1(i);
        }
        this.$header.html('');
        this.$header.append(rowHeader);
    };
    CalendarBody.prototype.renderBody = function () {
        this.getViewCell(this.parent.date);
        var numberWeekInView = Math.round(this.viewCells.length / 7);
        var _loop_2 = function (i) {
            var bodyRow = document.createElement('div');
            bodyRow.className = 'view-row';
            bodyRow.innerHTML = this_2.renderBodyRow(i);
            this_2.$body.append(bodyRow);
            var listItem = $('.view-row-cell', bodyRow);
            $('.view-row-cell', bodyRow).each(function () {
                console.log($(this).index(listItem));
            });
        };
        var this_2 = this;
        for (var i = 0; i < numberWeekInView; i++) {
            _loop_2(i);
        }
    };
    CalendarBody.prototype.renderBodyRow = function (start) {
        var itemStart = start * 7;
        var html = '';
        var template = $('#fullCalendarCell').html();
        for (var i = itemStart; i < itemStart + 7; i++) {
            Mustache.parse(template);
            html += Mustache.to_html(template, this.viewCells[i]);
        }
        return html;
    };
    CalendarBody.prototype.getViewCell = function (viewDate) {
        var date = new Date();
        if (date.getFullYear() == viewDate.getFullYear() && date.getMonth() == viewDate.getMonth()) {
            this.viewCells = calendar_utils_1.getViewCell({
                viewDate: date,
                weekStartsOn: this.startOfWeek,
                weekendDays: this.weekendDays
            });
        }
        else {
            this.viewCells = calendar_utils_1.getViewCell({
                viewDate: this.parent.date,
                weekStartsOn: this.startOfWeek,
                weekendDays: this.weekendDays
            });
        }
    };
    CalendarBody.prototype.applyScheduleEvent = function () {
        var _this = this;
        var $schedule;
        var $scheduleBottom;
        var scheduleLength = this.parent.schedules.length;
        var $divMoreSchedule = document.createElement('div');
        $divMoreSchedule.className = 'schedule-more';
        var $divArrowSchedule = document.createElement('div');
        $divArrowSchedule.className = 'schedule-arrow-down';
        $divMoreSchedule.appendChild($divArrowSchedule);
        if (scheduleLength > 3) {
            var _loop_3 = function (i) {
                var getMonth = this_3.parent.schedules[i].startTime.getMonth();
                var stringDate = this_3.parent.schedules[i].startTime.getFullYear() + "-" + getMonth + "-" + this_3.parent.schedules[i].startTime.getDate();
                var stringSelector = '.view-body .view-row .view-row-cell[date="' + stringDate + '"]';
                var $selectCell = $(stringSelector);
                $scheduleBottom = $('.view-cell-bottom', $selectCell);
                $schedule = $('.view-cell-bottom .schedule-events', $selectCell);
                $scheduleBottom.addClass('has-schedule-more');
                $schedule.addClass(' has-schedule-events');
                var div = void 0;
                if ($schedule.length == 1) {
                    var $item = document.createElement('div');
                    $item.className = 'schedule-events-item' + (this_3.parent.schedules[i].isAvailable ? ' schedule-available' : '');
                    $item.setAttribute('schedule-id', this_3.parent.schedules[i].id.toString());
                    var displayHourstartTime = this_3.parent.schedules[i].startTime.getHours();
                    var displayMinutesstartTime = this_3.parent.schedules[i].startTime.getMinutes().toString();
                    if (displayHourstartTime > 12) {
                        displayHourstartTime = displayHourstartTime - 12;
                    }
                    $item.innerText += displayHourstartTime.toString() + ':' + displayMinutesstartTime;
                    if (this_3.parent.schedules[i].isAvailable) {
                        $item.innerText += " Available";
                    }
                    else {
                        $item.innerText += " Reserved";
                    }
                    $schedule.append($item);
                    if (i > 2) {
                        $item.className += ' item-more';
                        $($item).hide();
                        // $schedule.append($divMoreSchedule);
                        $scheduleBottom.append($divMoreSchedule);
                    }
                    if (this_3.parent.schedules[i].isAvailable)
                        $item.addEventListener('click', function () { return _this.scheduleAvailableClick(_this.parent.schedules[i]); });
                }
            };
            var this_3 = this;
            for (var i = 0; i < scheduleLength; i++) {
                _loop_3(i);
            }
        }
        else {
            this.parent.schedules.forEach(function (event) {
                var getMonth = event.startTime.getMonth();
                var stringDate = event.startTime.getFullYear() + "-" + getMonth + "-" + event.startTime.getDate();
                var stringSelector = '.view-body .view-row .view-row-cell[date="' + stringDate + '"]';
                var $selectCell = $(stringSelector);
                $schedule = $('.view-cell-bottom .schedule-events', $selectCell);
                $schedule.addClass(' has-schedule-events');
                if ($schedule.length == 1) {
                    var $item = document.createElement('div');
                    $item.className = 'schedule-events-item' + (event.isAvailable ? ' schedule-available' : '');
                    $item.setAttribute('schedule-id', event.id.toString());
                    var displayHourstartTime = event.startTime.getHours();
                    var displayMinutesstartTime = event.startTime.getMinutes().toString();
                    if (displayHourstartTime > 12) {
                        displayHourstartTime = displayHourstartTime - 12;
                    }
                    $item.innerText += displayHourstartTime.toString() + ':' + displayMinutesstartTime;
                    if (event.isAvailable) {
                        $item.innerText += " Available";
                    }
                    else {
                        $item.innerText += " Reserved";
                    }
                    $schedule.append($item);
                    if (event.isAvailable)
                        $item.addEventListener('click', function () { return _this.scheduleAvailableClick(event); });
                }
            });
        }
        $('.schedule-more .schedule-arrow-down').mouseover(/*when hover will display PopUp Fincalendars*/ function () {
            $('.schedule-events-item').show();
            $('.has-schedule-events').css({ 'box-shadow': '5px 2px 2px 2px #888888', 'text-align': 'center' });
            $(this).hide();
        });
        $('.schedule-events.has-schedule-events').mouseleave(function () {
            $('.item-more').hide();
            $('.has-schedule-events').css({ 'box-shadow': '0px 0px 0px 0px #888888' });
            $('.schedule-more .schedule-arrow-down').show();
        });
    };
    CalendarBody.prototype.applyFcEvents = function () {
        var $arrowPopup = document.createElement('div');
        $arrowPopup.className = "arrowPopup";
        var $popupFc = document.createElement('div');
        $popupFc.className = "list-fc-events";
        var $ulPopupFc = document.createElement('ul');
        $popupFc.appendChild($ulPopupFc);
        var $fincalendar;
        var $liPopupFc;
        var fcEventlength = this.parent.fcEvents.length;
        if (fcEventlength > 3) {
            for (var i = 0; i < 3; i++) {
                var getMonth = this.parent.fcEvents[i].startDate.getMonth();
                var stringDate = this.parent.fcEvents[i].startDate.getFullYear() + "-" + getMonth + "-" + this.parent.fcEvents[i].startDate.getDate();
                var stringSelector = '.view-body .view-row .view-row-cell[date="' + stringDate + '"]';
                var $selectCell = $(stringSelector);
                $fincalendar = $('.view-cell-top .fc-events', $selectCell);
                if ($fincalendar.length == 1) {
                    var $item = document.createElement('div');
                    $item.className = 'list-type-fc-event-item';
                    $($item).css("background-color", this.parent.fcEvents[i].typeColor);
                    $item.setAttribute('fc-id', this.parent.fcEvents[i].id.toString());
                    $fincalendar.append($item);
                    $liPopupFc = document.createElement('li');
                    $liPopupFc.className = "list-fc-events-item";
                    var $divfcEventPopupTop = document.createElement('div');
                    $divfcEventPopupTop.className = "fc-event-top";
                    var $divfcEventType = document.createElement('div');
                    $divfcEventType.className = "fc-event-type";
                    $($divfcEventType).css("background-color", this.parent.fcEvents[i].typeColor);
                    var $divfcEventStartDate = document.createElement('div');
                    $divfcEventStartDate.className = "fc-event-start-date";
                    $divfcEventStartDate.innerText = this.parent.fcEvents[i].startDate.toString();
                    $divfcEventPopupTop.appendChild($divfcEventType);
                    $divfcEventPopupTop.appendChild($divfcEventStartDate);
                    var $divfcEventPopupBottom = document.createElement('div');
                    $divfcEventPopupBottom.className = "fc-event-bottom";
                    var $divfcEventTitle = document.createElement('div');
                    $divfcEventTitle.className = "fc-event-title";
                    $divfcEventTitle.innerText = this.parent.fcEvents[i].title;
                    $divfcEventPopupBottom.appendChild($divfcEventTitle);
                    $liPopupFc.appendChild($divfcEventPopupTop);
                    $liPopupFc.appendChild($divfcEventPopupBottom);
                    $ulPopupFc.appendChild($liPopupFc);
                    $popupFc.appendChild($ulPopupFc);
                }
            }
            $(".fc-events").hover(/*when hover will display PopUp Fincalendars*/ function (e) {
                $($fincalendar).append($arrowPopup);
                $($fincalendar).append($popupFc);
            }
            // , function () {
            //     $(this).find(".list-fc-events").remove();
            //     $(this).find(".arrowPopup").remove();
            // }
            );
            var $popupViewMore = document.createElement('div');
            $popupViewMore.className = 'view-more';
            $popupViewMore.innerText = 'view more>>';
            $ulPopupFc.appendChild($popupViewMore);
        }
        else {
            this.parent.fcEvents.forEach(function (event) {
                var getMonth = event.startDate.getMonth();
                var stringDate = event.startDate.getFullYear() + "-" + getMonth + "-" + event.startDate.getDate();
                var stringSelector = '.view-body .view-row .view-row-cell[date="' + stringDate + '"]';
                var $selectCell = $(stringSelector);
                var $fincalendar = $('.view-cell-top .fc-events', $selectCell);
                if ($fincalendar.length == 1) {
                    var $item = document.createElement('div');
                    $item.className = 'list-type-fc-event-item';
                    $($item).css("background-color", event.typeColor);
                    $item.setAttribute('fc-id', event.id.toString());
                    $fincalendar.append($item);
                    var $liPopupFc_1 = document.createElement('li');
                    $liPopupFc_1.className = "list-fc-events-item";
                    var $divfcEventPopupTop = document.createElement('div');
                    $divfcEventPopupTop.className = "fc-event-top";
                    var $divfcEventType = document.createElement('div');
                    $divfcEventType.className = "fc-event-type";
                    $($divfcEventType).css("background-color", event.typeColor);
                    var $divfcEventStartDate = document.createElement('div');
                    $divfcEventStartDate.className = "fc-event-start-date";
                    $divfcEventStartDate.innerText = event.startDate.toString();
                    $divfcEventPopupTop.appendChild($divfcEventType);
                    $divfcEventPopupTop.appendChild($divfcEventStartDate);
                    var $divfcEventPopupBottom = document.createElement('div');
                    $divfcEventPopupBottom.className = "fc-event-bottom";
                    var $divfcEventTitle = document.createElement('div');
                    $divfcEventTitle.className = "fc-event-title";
                    $divfcEventTitle.innerText = event.title;
                    $divfcEventPopupBottom.appendChild($divfcEventTitle);
                    $liPopupFc_1.appendChild($divfcEventPopupTop);
                    $liPopupFc_1.appendChild($divfcEventPopupBottom);
                    $(".fc-events").hover(function () {
                        $ulPopupFc.appendChild($liPopupFc_1);
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
                }
                ;
            });
        }
    };
    CalendarBody.prototype.scheduleAvailableClick = function (event) {
        //this.checkScheduleStatus(event.id);
        console.log(event);
    };
    return CalendarBody;
}());
exports.default = CalendarBody;


/***/ }),

/***/ 528:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(33);
var Mustache = __webpack_require__(76);
var calendar_utils_1 = __webpack_require__(178);
var CalendarBodySmall = (function () {
    function CalendarBodySmall($container, parent) {
        this.startOfWeek = 0;
        this.weekendDays = [0, 6];
        this.dateShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        this.fcTypes = [];
        this.$container = $container;
        this.parent = parent;
        this.init();
    }
    CalendarBodySmall.prototype.init = function () {
        this.generateHtml();
        this.displayCalendar();
    };
    CalendarBodySmall.prototype.generateHtml = function () {
        this.$container.html($('#smallCalendarBody').html());
        this.$body = $('.view-body', this.$container);
        this.$footer = $('.view-footer', this.$container);
    };
    CalendarBodySmall.prototype.displayCalendar = function () {
        this.renderBody();
        this.renderFooter();
        this.applySchedules();
        //this.applyFCEventTypes();
    };
    CalendarBodySmall.prototype.renderBody = function () {
        this.getViewCell();
        var numberDayInMonth = this.viewCells.length;
        var template = $('#smallCalendarBodyRow').html();
        if (numberDayInMonth > 0) {
            this.$body.html('');
            for (var i = 0; i < numberDayInMonth; i++) {
                var cell = this.viewCells[i];
                Mustache.parse(template);
                var htmlRow = Mustache.to_html(template, {
                    isToday: cell.isToday,
                    isWeekend: cell.isWeekend,
                    dateString: cell.dateString,
                    dateNumber: cell.date.getDate(),
                    dateShortString: this.dateShortName[cell.date.getDay()]
                });
                this.$body.append(htmlRow);
            }
        }
        else {
            //do something
        }
    };
    CalendarBodySmall.prototype.renderFooter = function () {
        this.getFCEventType();
        if (this.fcTypes.length > 0) {
            var $ul_1 = document.createElement('ul');
            this.fcTypes.forEach(function (fctype) {
                var $li = document.createElement('li');
                $li.className = "fc-type-item";
                var $divColor = document.createElement('div');
                $divColor.setAttribute('style', "background-color: " + fctype.typeColor);
                $divColor.className = "fc-type-item-color";
                $li.appendChild($divColor);
                var $divName = document.createElement('div');
                $divName.className = "fc-type-item-name";
                $divName.innerText = fctype.typeName;
                $li.appendChild($divName);
                $ul_1.appendChild($li);
            });
            this.$footer.append($ul_1);
        }
    };
    /**********************************************************************/
    /* add schedules into cell of body
    /**********************************************************************/
    CalendarBodySmall.prototype.applySchedules = function () {
        var _this = this;
        this.parent.schedules.forEach(function (schedule) {
            var stringDate = schedule.startTime.getFullYear() + "-" + schedule.startTime.getMonth() + "-" + schedule.startTime.getDate();
            var strSelector = '.view-body .view-body-row[date="' + stringDate + '"]';
            var $selectCell = $(strSelector);
            var $schedule = $('.col-schedule-inner', $selectCell);
            var item = document.createElement('div');
            item.className = 'schedule-item' + (schedule.isAvailable ? ' schedule-available' : ' schedule-reserved');
            item.innerText = schedule.startTime.getHours() + ':' + schedule.startTime.getMinutes();
            $schedule.append(item);
            if (schedule.isAvailable) {
                item.addEventListener('click', function () { return _this.selectScheduleAvailable(schedule); });
            }
        });
    };
    CalendarBodySmall.prototype.applyFCEventTypes = function () {
        if (this.parent.fcEvents.length > 0) {
            this.parent.fcEvents.forEach(function (event) {
                var stringDate = event.startDate.getFullYear() + "-" + event.startDate.getMonth() + "-" + event.startDate.getDate();
                var strSelector = '.view-body .view-body-row[date="' + stringDate + '"]';
                var $selectRow = $(strSelector);
            });
        }
    };
    /**********************************************************************/
    /* get types in list FCEvents
    /**********************************************************************/
    CalendarBodySmall.prototype.getFCEventType = function () {
        var _this = this;
        this.parent.fcEvents.forEach(function (event) {
            if (!_this.fcTypes.some(function (fct) { return fct.typeColor === event.typeColor; })) {
                console.log(event.typeColor);
                _this.fcTypes.push({
                    typeName: event.typeName,
                    typeColor: event.typeColor
                });
            }
        });
    };
    CalendarBodySmall.prototype.getViewCell = function () {
        this.viewCells = calendar_utils_1.getSmallViewRow({
            viewDate: this.parent.date,
            weekendDays: this.weekendDays
        });
    };
    /**********************************************************************/
    /* event when select schedule in calendar
    /**********************************************************************/
    CalendarBodySmall.prototype.selectScheduleAvailable = function (schedule) {
        this.parent.selectedSchedule(schedule);
    };
    return CalendarBodySmall;
}());
exports.default = CalendarBodySmall;


/***/ })

},[520]);
//# sourceMappingURL=frontendMain.js.map