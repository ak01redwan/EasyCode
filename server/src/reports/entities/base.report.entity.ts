export class BaseReport {
    fromDate: Date | string = 'the time before the website creation';
    toDate: Date | string = 'current time => '+ new Date().toDateString();
    reportDate = new Date().toDateString();
}
