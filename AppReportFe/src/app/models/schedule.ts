export class Schedule {
  constructor(
    public id: number,
    public appId: number,
    public email: string,
    public start: string,
    public interval: number,
    public intervalUnit: number,
    public login: string,
    public password: string,
    public isSecure: number,
    public width: number,
    public height: number,
    public user: string,
    public status: number
  ) {
    this.id = id;
    this.appId = appId;
    this.email = email;
    this.start = start;
    this.interval = interval;
    this.intervalUnit = intervalUnit;
    this.login = login;
    this.password = password;
    this.isSecure = isSecure;
    this.width = width;
    this.height = height;
    this.user = user;
    this.status = status; // 0 = disabled, 1 = enabled, 2 = paused
  }
}
