export class TimeRange {
  readonly isValid: boolean;

  constructor(params: {
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
  }) {
    const dummyDate = "1/1/1990";
    const start = Date.parse(
      `${dummyDate} ${params.startHour}:${params.startMinute}`
    );
    const end = Date.parse(
      `${dummyDate} ${params.endHour}:${params.endMinute}`
    );
    this.isValid = start < end ? true : false;
  }
}
