import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Language, WhatsAppTemplate } from '../models/whatsapp-template';
import { CreateWhatsappTemplateComponent } from '../create-whatsapp-template/create-whatsapp-template.component';
import { WhatsappTemplatesService } from '../core/whatsapp-templates.service';

@Component({
  selector: 'app-queues',
  templateUrl: './whatsapp-templates.component.html',
  styleUrls: ['./whatsapp-templates.component.scss'],
})
export class WhatsappTemplatesComponent implements OnInit, AfterViewInit {
  templates: WhatsAppTemplate[] = [];
  loading = false;
  displayedColumns: string[] = ['name', 'language', 'category', 'contentType', 'status', 'actions'];

  dataSource = new MatTableDataSource<WhatsAppTemplate>([]);
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
  languages: Language[] = [
    {value: 'en', viewValue: 'English'},
    {value: 'fr', viewValue: 'French'},
  ];

  constructor(
    private whatsappTemplatesService: WhatsappTemplatesService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadTemplates() {
    this.loading = true;
    this.whatsappTemplatesService.loadTemplates({  }).subscribe(
      (res) => {
        console.log(res, 'res');
        this.templates = res;
        this.loading = false;
        this.dataSource.data = this.templates;
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  pageChange(event: PageEvent) {
    console.log(event, 'page changed ');
  }

  deleteTemplate(id: string) {
    const body = {
      id
    };
    this.whatsappTemplatesService.deleteTemplate(body).subscribe({
      next: (res) => {
        console.log(res, 'res');
        this.loadTemplates();
      },
      error: err => {
        console.log(err, 'err');
      }
    });
  }


  submitTemplate(id: string) {
    const body = {
      id
    };
    this.whatsappTemplatesService.submitTemplate(body).subscribe({
      next: (res) => {
        console.log(res, 'res');
        this.loadTemplates();
      }, error: (err) => {
        console.log(err, 'err');
      }
    });

  }

  createTemplate() {
    const dialogRef = this.dialog.open(CreateWhatsappTemplateComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTemplates();
      }
      console.log('The dialog was closed');
    });
  }
}
