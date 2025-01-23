import { QueueService } from '../core/queue.service';
import { Queue } from '../models/queue';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-queues',
  templateUrl: './queues.component.html',
  styleUrls: ['./queues.component.scss'],
})
export class QueuesComponent implements OnInit, AfterViewInit {
  queues: Queue[] = [];
  loading = false;
  error;
  displayedColumns: string[] = ['name', 'disableFeedback', 'action'];
  dataSource = new MatTableDataSource<Queue>(this.queues);
  newQueueName = '';
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private queueService: QueueService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getQueues();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
  selectQueue(queue) {
    console.log(queue);
  }
  pageChange(event: Event) {
    console.log('page changed ');
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onToggle(event: MatSlideToggleChange, queue: Queue) {
    const { checked } = event;
    const body = {
      disableFeedback: checked
    };
    this.queueService.updateQueue(queue.id, body).subscribe(
      (res) => {
        this.getQueues();
      },
      (err) => {}
    );
  }

  deleteQueue(queue) {
    if (confirm('Etes-vous sûr de vouloir la supprimer ?')) {
      this.queueService.delete(queue).subscribe(
        (res) => {
          this.getQueues();
        },
        (err) => {
          this.error = err;
        }
      );
    }
  }

  deleteRowData(row_obj) {
    this.queues = this.queues.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }

  createQueue() {
    if (this.newQueueName.trim()) {
      this.queueService.create({ name: this.newQueueName }).subscribe(
        (res) => {
          this.newQueueName = '';
          this.getQueues();
        },
        (err) => {
          this.error = err;
        }
      );
    }
  }
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Update') {
        const body = {
          name: result.data.name
        };
        this.queueService.updateQueue(result.data.id, body).subscribe(
          (res) => {
            this.getQueues();
          },
          (err) => {}
        );
      }
    });
  }
}
