import { Component, OnInit } from "@angular/core";
import { PostJobService } from "./../post-job.service";
import { TransFormService } from "../trans-form.service";
import { ForgroundControllerService } from "../forground-controller.service";
import { AppserviceService } from "../appservice.service";
import { OneApp } from "../models/application";
import { Schedule } from "../models/schedule";
import { forkJoin } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"],
})
export class ReportsComponent implements OnInit {
  apps: OneApp[];
  schedules: Schedule[];
  appSchedules: any;
  allAppSchedules: any[] = [];
  topHeader = "Schedules Browser";

  constructor(
    private service: PostJobService,
    private transform: TransFormService,
    private fgController: ForgroundControllerService,
    private appService: AppserviceService,
    private router: Router
  ) {}

  onScheduleClick(event) {
    this.transform.setFormData(event);
  }

  ngOnInit() {
    // forkJoin operator - similar to Promise.all()
    forkJoin([
      this.appService.getApps(),
      this.service.getSchedules(),
    ]).subscribe(
      (results) => {
        this.apps = results[0];
        this.schedules = results[1];
        // build app -> [schedules] structure
        for (let i = 0; i < this.apps.length; i++) {
          let item = {};
          item["app"] = this.apps[i];
          item["schedules"] = [];
          for (let j = 0; j < this.schedules.length; j++) {
            if (this.schedules[j].appId === this.apps[i].id) {
              item["schedules"].push(this.schedules[j]);
            }
          }
          this.allAppSchedules.push(item);
        }
      },
      (error) => {
        //TODO better handle error
        console.log("Error in getting apps and schedules : ", error);
      }
    );
    this.fgController.setTopHeader(this.topHeader);
    this.fgController.requestTopHeader();
  }
}
