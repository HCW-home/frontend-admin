import { StatService } from './../stat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private statService: StatService) { }

  ngOnInit(): void {
  }
  downloadCSV() {
    console.log("downaloading CSV");

    this.statService.getCSV().subscribe(response => this.saveFile(response, "application/text"));
  }
  /**
   * Method is use to download file.
   * @param data - Array Buffer data
   * @param type - type of the document.
   */
  saveFile(data: any, type: string) {
    var hiddenElement = document.createElement('a');
    console.log(data);
    hiddenElement.href = 'data:text/csv,' + data;
    hiddenElement.target = '_blank';
    hiddenElement.download = (new Date()).toLocaleString() + ' consultations-stats.csv';
    hiddenElement.click();
  }
}
