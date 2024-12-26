import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { QueueService } from '../queue.service';
import { Queue } from '../queue';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Language } from '../models/whatsapp-template';

@Component({
  selector: 'app-queues',
  templateUrl: './whatsapp-templates.component.html',
  styleUrls: ['./whatsapp-templates.component.scss'],
})
export class WhatsappTemplatesComponent implements OnInit, AfterViewInit {
  queues: Queue[] = [];
  loading = false;
  error;
  displayedColumns: string[] = ['name', 'disableFeedback', 'action'];
  dataSource = new MatTableDataSource<Queue>(this.queues);
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
  languages: Language[] = [
    {value: 'en', viewValue: 'English'},
    {value: 'fr', viewValue: 'French'},
  ];

  constructor(private queueService: QueueService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getQueues();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getQueues() {
    this.loading = true;
    const params = {
      viewAllQueues: true
    };
    this.queueService.find(params).subscribe(
      (res) => {
        this.queues = res;
        this.dataSource.data = this.queues;
        // this.count = res.totalCount;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.error = err;
      }
    );
  }

  pageChange(event: Event) {
    console.log('page changed ');
  }



  deleteTemplate(template) {

  }


  createTemplate() {

  }
}
