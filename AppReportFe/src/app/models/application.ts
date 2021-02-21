export class OneApp {
  constructor(
    public id: number,
    public name: string,
    public url: string,
    public cuid: string
  ) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.cuid = cuid;
  }
}
