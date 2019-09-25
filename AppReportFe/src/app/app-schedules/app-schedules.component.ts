import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'appschedules',
  templateUrl: './app-schedules.component.html',
  styleUrls: ['./app-schedules.component.css']
})
export class AppSchedulesComponent implements OnInit {

  @Input() appData: any = {};
  @Output() scheduleClick = new EventEmitter();

  isExpanded: boolean = false;

  constructor(private datepipe: DatePipe) {}

  ngOnInit() {
    console.log('app-scheduleData : ');
    console.log(this.appData);
  }

  expandToggle() {
    this.isExpanded = !this.isExpanded;
  }

  scheduleGetDate(schedule) {
    const date = new Date(schedule.start);
    return this.datepipe.transform(date, 'MM-dd-yyyy hh:mm');
  }

  onScheduleClick(schedule) {
    this.scheduleClick.emit(schedule);
  }
}
