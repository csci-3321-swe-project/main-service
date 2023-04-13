/**
 * A time range is valid if the start time is before the end time.
 * @param params - The start and end times.
 * @param {string} params.startTime - The start time must be before the end time.
 * @param {string} params.endTime - The end time must be after the start time.
 * @property {boolean} isValid - True if the start time is before the end time.
 * @example new TimeRange({ startTime: "8:00 AM", endTime: "9:00 AM" }).isValid
 */
export class TimeRange {
  readonly isValid: boolean;

  constructor(params: { startTime: string; endTime: string }) {
    const dummyDate = "1/1/1990";
    const start = Date.parse(`${dummyDate} ${params.startTime}`);
    const end = Date.parse(`${dummyDate} ${params.endTime}`);
    this.isValid = start < end ? true : false;
  }
}
