import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Language, TemplateStatus, WhatsAppTemplate } from '../models/whatsapp-template';
import { WhatsappTemplatesService } from '../core/whatsapp-templates.service';
import { LocaleService } from '../core/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { ErrorHandlerService } from '../core/error-handler.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { EditWhatsappTemplateComponent } from '../edit-whatsapp-template/edit-whatsapp-template.component';

@Component({
  selector: 'app-queues',
  templateUrl: './whatsapp-templates.component.html',
  styleUrls: ['./whatsapp-templates.component.scss'],
})
export class WhatsappTemplatesComponent implements OnInit, AfterViewInit {

  constructor(
    public dialog: MatDialog,
    private translate: TranslateService,
    private localeService: LocaleService,
    private errorHandler: ErrorHandlerService,
    private whatsappTemplatesService: WhatsappTemplatesService,
    ) {}
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;

  loading = false;
  templates: WhatsAppTemplate[] = [];
  displayedColumns: string[] = ['name', 'language', 'status', 'actions'];

  dataSource = new MatTableDataSource<WhatsAppTemplate>([]);
  languages: Language[] = [];
  selectedLanguage = 'en';

  protected readonly TemplateStatus = TemplateStatus;

  ngOnInit(): void {
    this.fetchLanguages();
    this.loadTemplates();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadTemplates() {
    this.loading = true;
    const params = {
      language: this.selectedLanguage,
    }
    this.whatsappTemplatesService.loadTemplates(params).subscribe(
      (res) => {
        this.templates = res;
        this.loading = false;
        this.dataSource.data = this.templates;
      },
      (err) => {
        this.errorHandler.showError(err);
        this.loading = false;
      }
    );
  }

  pageChange(event: PageEvent) {
    console.log(event, 'page changed ');
  }

  fetchLanguages() {
    this.localeService.getSupportedLanguages().subscribe({
      next: (res) => {
        this.languages = res.map(l => {
          return {
            value: l,
            text: this.translate.instant('whatsappTemplates.' + l),
          };
        });
      }, error: (err) => {
        this.errorHandler.showError(err);
      }
    });
  }

  deleteTemplate(id: string) {
    const body = {
      id
    };
    this.whatsappTemplatesService.deleteTemplate(body).subscribe({
      next: (res) => {
        this.loadTemplates();
      },
      error: err => {
        this.errorHandler.showError(err);
      }
    });
  }

  openEdit(template: WhatsAppTemplate) {

    const dialogRef = this.dialog.open(EditWhatsappTemplateComponent, {
      data: template,
    });
    console.log(template, 'template');
  }


  submitTemplate(id: string) {
    const body = {
      id
    };
    this.whatsappTemplatesService.submitTemplate(body).subscribe({
      next: (res) => {
        this.loadTemplates();
      }, error: (err) => {
        console.log(err, 'err');
        const error = err?.error?.error?.details?.cause?.name || 'Failed to submit template';
        this.errorHandler.showError(error);
      }
    });

  }

  onLanguageChange(language: string) {
    this.selectedLanguage = language;
    this.loadTemplates();
  }

  refreshStatus(id: string) {
    const body = {
      id
    };
    this.whatsappTemplatesService.refreshStatus(body).subscribe({
      next: (res) => {
        this.loadTemplates();
      }, error: (err) => {
        const error = err?.error?.error?.details?.cause?.name || 'Failed to refresh status';
        this.errorHandler.showError(error);
      }
    });
  }

}
