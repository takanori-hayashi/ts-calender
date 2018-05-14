"use strict";
var myCalender = /** @class */ (function () {
    function myCalender(element) {
        var date = new Date();
        myCalender.count += 1;
        this.target = element;
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.render(element, myCalender.count);
    }
    myCalender.prototype.render = function (element, id) {
        var header = this.createCalenderHeader();
        var table = this.createCalender(id);
        var div = myCalender.createMyElement('div', ['my-calender']);
        div.id = "my-calender-id" + id;
        div.appendChild(header);
        div.appendChild(table);
        element.appendChild(div);
    };
    myCalender.prototype.createCalenderHeader = function () {
        var _this = this;
        var header = myCalender.createMyElement('div', ['my-calender__header']);
        var prev = myCalender.createMyElement('button', ['my-calender__prev']);
        var next = myCalender.createMyElement('button', ['my-calender__next']);
        var years = myCalender.createMyElement('div', ['my-calender__years']);
        var year = myCalender.createMyElement('span', ['my-calender__year']);
        var month = myCalender.createMyElement('span', ['my-calender__month']);
        year.innerText = this.year.toString();
        month.innerText = this.month.toString();
        next.addEventListener('click', function () {
            _this.onNextMonth(year, month);
        }, false);
        prev.addEventListener('click', function () {
            _this.onPrevMonth(year, month);
        }, false);
        years.appendChild(month);
        years.appendChild(year);
        header.appendChild(prev);
        header.appendChild(years);
        header.appendChild(next);
        return header;
    };
    myCalender.prototype.onNextMonth = function (year, month) {
        var target = this.target;
        var cal = target.childNodes;
        for (var i = 0; i < cal.length; i++) {
            cal[i].remove();
        }
        if (this.month === 12) {
            this.month = 1;
            this.year += 1;
        }
        else {
            this.month += 1;
        }
        var date = new Date(this.year, this.month);
        this.render(target, myCalender.count);
    };
    myCalender.prototype.onPrevMonth = function (year, month) {
        var target = this.target;
        var cal = target.childNodes;
        for (var i = 0; i < cal.length; i++) {
            cal[i].remove();
        }
        if (this.month === 1) {
            this.month = 12;
            this.year -= 1;
        }
        else {
            this.month -= 1;
        }
        var date = new Date(this.year, this.month);
        this.render(target, myCalender.count);
    };
    myCalender.prototype.createCalender = function (id) {
        var table = myCalender.createMyElement('table', ['my-calender__table', "my-calender__table--id" + id]);
        var thead = myCalender.createCalenderHead();
        var tbody = this.createCalenderBody();
        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
    };
    myCalender.prototype.createCalenderBody = function () {
        var monthEndList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var year = this.year;
        var month = this.month - 1;
        var date = new Date(year, month);
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth();
        var tbody = myCalender.createMyElement('tbody', ['my-calender__body']);
        var rows = document.createDocumentFragment();
        var today = 0;
        if (year === currentYear && month === currentMonth) {
            today = currentDate.getDate();
        }
        if (myCalender.isLeapYear(year)) {
            monthEndList[1] = 29;
        }
        date.setDate(1);
        var startDay = date.getDay();
        var monthEnd = monthEndList[month];
        date.setDate(monthEnd);
        var endDay = date.getDay();
        var weekLength = Math.ceil((startDay + monthEndList[month]) / 7);
        var dates = Array(weekLength * 7);
        for (var i = 0; i < monthEndList[month]; i++) {
            dates[i + startDay] = i + 1;
        }
        for (var i = 0; i < weekLength; i++) {
            var tr = myCalender.createMyElement('tr', ['my-calender__date-row']);
            tr.setAttribute('data-calender-low', (i + 1).toString());
            tr.classList.add('row');
            for (var j = 0; j < 7; j++) {
                var td = myCalender.createMyElement('td', ['my-calender__date']);
                var index = j + i * 7;
                if (today && dates[index] === today) {
                    td.classList.add('my-calender__date--today');
                }
                td.innerText = dates[index] ? dates[index].toString() : ' ';
                tr.appendChild(td);
            }
            rows.appendChild(tr);
        }
        tbody.appendChild(rows);
        return tbody;
    };
    myCalender.createCalenderHead = function () {
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var thead = myCalender.createMyElement('thead', ['my-calender__head']);
        var headRow = myCalender.createMyElement('tr', ['my-calender__days']);
        var headCells = document.createDocumentFragment();
        for (var _i = 0, days_1 = days; _i < days_1.length; _i++) {
            var day = days_1[_i];
            var th = myCalender.createMyElement('th', ['my-calender__day']);
            th.classList.add('my-calender__day');
            th.innerText = day;
            headCells.appendChild(th);
        }
        headRow.appendChild(headCells);
        thead.appendChild(headRow);
        return thead;
    };
    myCalender.createMyElement = function (element, className) {
        var htmlElement = document.createElement(element);
        if (className) {
            (_a = htmlElement.classList).add.apply(_a, className);
        }
        return htmlElement;
        var _a;
    };
    myCalender.isLeapYear = function (year) {
        return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    };
    myCalender.count = 0;
    return myCalender;
}());
//# sourceMappingURL=main.js.map