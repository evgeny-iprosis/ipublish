import { Schedule } from './../models/schedule';
import { AppserviceService } from './../appservice.service';
import { PostJobService } from './../post-job.service';
import { Component, OnInit } from '@angular/core';
import { TransFormService } from '../trans-form.service';
import { OneApp } from '../models/application';
import { ForgroundControllerService } from '../forground-controller.service';

@Component({
  selector: 'mainform',
  templateUrl: './mainform.component.html',
  styleUrls: ['./mainform.component.css']
})
export class MainformComponent implements OnInit {
  currSchedule = {} as Schedule;
  isSecure: boolean;
  apps: OneApp[];
  currentApp = {} as OneApp;
  resolutions = ['800x600', '640x480', '1024x768', '1600x900', '1920x1080'];
  currentResolution = 0;
  topHeader = 'Set Report Schedule';
  isParams = false;
  intervalUnits = [
    {
      value: 60000,
      name: 'minutes'
    },
    {
      value: 3600000,
      name: 'hours'
    },
    {
      value: 86400000,
      name: 'days'
    }
  ];

  constructor(
    private service: PostJobService,
    private transform: TransFormService,
    private appService: AppserviceService,
    private fgController: ForgroundControllerService
  ) {}

  createPost() {
    const postData: any = {};
    Object.assign(postData, this.currSchedule);
    postData.url = this.currentApp.url;
    postData.cuid = this.currentApp.cuid;
    postData.name = this.currentApp.name;

    this.service.createSchedule(postData).subscribe(
      response => {
        console.log('Got response : ');
        console.log(response);
      },
      error => {
        console.log('Error is response : ', error);
      }
    );
  }

  isSecureGet() {
    return this.isSecure;
  }

  isSecureToggle() {
    this.isSecure = !this.isSecure;
    if (this.isSecure) {
      this.currSchedule.isSecure = 1;
    } else {
      this.currSchedule.isSecure = 0;
    }
  }

  setSendInterval(event) {
    this.currSchedule.interval = event.target.value;
  }

  setCurrentAppByEvent(event) {
    const id = event.target.value;
    this.setCurrentApp(id);
  }

  setCurrentApp(id) {
    this.currentApp = this.apps.filter(appById)[0];
    this.currSchedule.appId = this.currentApp.id;
    function appById(app) {
      return app.id === parseInt(id, 10);
    }
  }

  setStartingDate(event) {
    this.currSchedule.start = '' + event.target.valueAsDate;
    console.log('Date event : ');
    console.log(event);
  }

  setResolution(event) {
    const res = this.resolutions[this.currentResolution].split('x');
    this.currSchedule.width = parseInt(res[0], 10);
    this.currSchedule.height = parseInt(res[1], 10);
  }

  updateList() {
    this.appService.getApps().subscribe(
      response => {
        console.log('Mainform apps: ');
        console.log(response);
        this.apps = response;
        this.currentApp = this.apps[0];
        if (this.currSchedule.appId > 0) {
          // not default - real value
          this.setCurrentApp(this.currSchedule.appId);
        }
        console.log('Mainform current app: ');
        console.log(this.currentApp);

        // Update current schedule :
        this.isSecure = this.currSchedule.isSecure > 0;
        this.currSchedule.appId = this.currentApp.id;
        const res = this.currSchedule.width + 'x' + this.currSchedule.height;
        this.currentResolution = this.resolutions.indexOf(res);
        if (!this.currentResolution) {
          this.currentResolution = 0;
        }
        console.log('Init current schedule : ');
        console.log(this.currSchedule);
      },
      error => {
        console.log('Error in getApps response : ', error);
      }
    );
  }

  showCreate() {
    if (this.currSchedule.id > 0) {
      return false;
    } else {
      return true;
    }
  }

  appLegend() {
    if (this.currentApp.url) {
      return this.currentApp.url;
    } else {
      return 'CUID: ' + this.currentApp.cuid;
    }
  }

  ngOnInit() {
    Object.assign(this.currSchedule, this.transform.getFormData()); // data coming from other components thru servise. say. on click.
    this.updateList();
    this.fgController.setTopHeader(this.topHeader);
    this.fgController.requestTopHeader();
  }
}
