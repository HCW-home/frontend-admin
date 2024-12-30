import { StatService } from '../core/stat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = false;
  constructor(private statService: StatService) { }

  ngOnInit(): void {
  }
  downloadCSV() {
    this.loading = true;
    this.statService.getCSV().subscribe(response => {
      this.saveFile(response, 'application/text');
    });
  }
  /**
   * Method is use to download file.
   * @param data - Array Buffer data
   * @param type - type of the document.
   */
  saveFile(data: any, type: string) {
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(data);
    hiddenElement.target = '_blank';
    hiddenElement.download = (new Date()).toLocaleString() + ' consultations-stats.csv';
    hiddenElement.click();
    this.loading = false;
  }
}
