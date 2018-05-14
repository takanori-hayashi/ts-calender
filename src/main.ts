class myCalender {
  private static count:number = 0;
  private year:number;
  private month:number;
  private target:HTMLElement;

  constructor(element: HTMLElement) {
    const date:Date = new Date();
    myCalender.count += 1;
    this.target = element;
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.render(element, myCalender.count);
  }

  private render(element:HTMLElement, id:number):void {
    const header = this.createCalenderHeader();
    const table:HTMLElement = this.createCalender(id);
    const div = myCalender.createMyElement('div', ['my-calender']);
    div.id = `my-calender-id${id}`;
    div.appendChild(header);
    div.appendChild(table);
    element.appendChild(div);
  }

  private createCalenderHeader():HTMLElement {
    const header = myCalender.createMyElement('div', ['my-calender__header']);
    const prev = myCalender.createMyElement('button', ['my-calender__prev']);
    const next = myCalender.createMyElement('button', ['my-calender__next']);
    const years = myCalender.createMyElement('div', ['my-calender__years']);
    const year = myCalender.createMyElement('span', ['my-calender__year']);
    const month = myCalender.createMyElement('span', ['my-calender__month']);
    year.innerText = this.year.toString();
    month.innerText = this.month.toString();
    next.addEventListener('click', () => {
      this.onNextMonth(year, month);
    }, false);
    prev.addEventListener('click', () => {
      this.onPrevMonth(year, month);
    }, false);
    years.appendChild(month);
    years.appendChild(year);
    header.appendChild(prev);
    header.appendChild(years);
    header.appendChild(next);
    return header;
  }

  private onNextMonth(year:HTMLElement, month:HTMLElement) {
    const { target } = this;
    const cal = target.childNodes;
    for (let i = 0; i < cal.length; i++) {
      cal[i].remove();
    }

    if (this.month === 12) {
      this.month = 1;
      this.year += 1;
    } else {
      this.month += 1;
    }
    const date:Date = new Date(this.year, this.month); 
    this.render(target, myCalender.count);
  }

  private onPrevMonth(year:HTMLElement, month:HTMLElement) {
    const { target } = this;
    const cal = target.childNodes;
    for (let i = 0; i < cal.length; i++) {
      cal[i].remove();
    }

    if (this.month === 1) {
      this.month = 12;
      this.year -= 1;
    } else {
      this.month -= 1;
    }
    const date:Date = new Date(this.year, this.month); 
    this.render(target, myCalender.count);
  }

  private createCalender(id:number):HTMLElement {
    const table:HTMLElement = myCalender.createMyElement('table', ['my-calender__table', `my-calender__table--id${id}`]);
    const thead:HTMLElement = myCalender.createCalenderHead();
    const tbody:HTMLElement = this.createCalenderBody();
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
  }

  private createCalenderBody():HTMLElement {
    const monthEndList:number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const year: number = this.year;
    const month:number = this.month - 1;
    const date:Date = new Date(year, month);
    const currentDate:Date = new Date();
    const currentYear:number = currentDate.getFullYear();
    const currentMonth:number = currentDate.getMonth();
    const tbody:HTMLElement = myCalender.createMyElement('tbody', ['my-calender__body']);
    let rows:DocumentFragment = document.createDocumentFragment();
    let today:number = 0;

    if (year === currentYear && month === currentMonth) {
      today = currentDate.getDate();
    }

    if (myCalender.isLeapYear(year)) {
      monthEndList[1] = 29;
    }

    date.setDate(1);
    const startDay:number = date.getDay();

    const monthEnd: number = monthEndList[month];
    date.setDate(monthEnd);
    const endDay = date.getDay();

    const weekLength:number = Math.ceil((startDay + monthEndList[month]) / 7);
    const dates:number[] = Array(weekLength * 7);

    for (let i = 0; i < monthEndList[month]; i++) {
      dates[i + startDay] = i + 1;
    }

    for (let i = 0; i < weekLength; i++) {
      const tr:HTMLElement = myCalender.createMyElement('tr', ['my-calender__date-row']);
      tr.setAttribute('data-calender-low', (i + 1).toString());
      tr.classList.add('row');
    
      for (let j = 0; j < 7; j++) {
        const td:HTMLElement = myCalender.createMyElement('td', ['my-calender__date']);
        const index:number = j + i * 7;
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
  }

  private static createCalenderHead(): HTMLElement {
    const days:string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const thead:HTMLElement = myCalender.createMyElement('thead', ['my-calender__head']);
    const headRow:HTMLElement = myCalender.createMyElement('tr', ['my-calender__days']);
    let headCells:DocumentFragment = document.createDocumentFragment();
    for (let day of days) {
      const th:HTMLElement = myCalender.createMyElement('th', ['my-calender__day']);
      th.classList.add('my-calender__day');
      th.innerText = day;
      headCells.appendChild(th);
    }
    headRow.appendChild(headCells);
    thead.appendChild(headRow);
    return thead;
  }

  private static createMyElement(element:string, className?:string[]):HTMLElement {
    const htmlElement:HTMLElement = document.createElement(element);
    if (className) {
      htmlElement.classList.add(...className);
    }
    return htmlElement;
  }

  private static isLeapYear(year:number):boolean {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }
}

