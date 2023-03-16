export class TimeRange {
  readonly isValid: boolean;

  constructor(params: { startTime: string; endTime: string }) {
    const dummyDate = "1/1/1990";
    const start = Date.parse(`${dummyDate} ${params.startTime}`);
    const end = Date.parse(`${dummyDate} ${params.endTime}`);
    this.isValid = start < end ? true : false;
  }
}
