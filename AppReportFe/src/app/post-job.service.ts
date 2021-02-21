import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Schedule } from "./models/schedule";
import { Run } from "./models/runs";

@Injectable({
  providedIn: "root",
})
export class PostJobService {
  private postJobUrl = "http://localhost:3000/newcshedule";
  private listSchedulesUrl = "http://localhost:3000/listschedules";
  private listLogsUrl = "http://localhost:3000/listlogs";

  constructor(private http: HttpClient) {}

  createSchedule(postData) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    return this.http.post(
      this.postJobUrl,
      JSON.stringify(postData),
      httpOptions
    );
  }

  getSchedules() {
    return this.http.get<Schedule[]>(this.listSchedulesUrl);
  }

  getLogs() {
    return this.http.get<Run[]>(this.listLogsUrl);
  }
}
