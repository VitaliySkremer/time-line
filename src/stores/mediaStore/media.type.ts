export interface ITimeRange {
  hours: number,
  minutes: number,
  seconds: number
}

export interface IMedia {
  name: string,
  color: string;
  url: string;
  timeStart: Date;
  timeRange: ITimeRange;
}

export interface IMediaFull extends IMedia {
  id: string;
  timeEnd: Date;
}