import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Language, TemplateStatus, WhatsAppTemplate } from '../models/whatsapp-template';
import { WhatsappTemplatesService } from '../core/whatsapp-templates.service';
import { LocaleService } from '../core/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { ErrorHandlerService } from '../core/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { EditWhatsappTemplateComponent } from '../edit-whatsapp-template/edit-whatsapp-template.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-queues',
  templateUrl: './whatsapp-templates.component.html',
  styleUrls: ['./whatsapp-templates.component.scss']
})
export class WhatsappTemplatesComponent implements OnInit {
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;

  loading = false;
  loadingSubmit = false;
  templates: WhatsAppTemplate[] = [];
  displayedColumns: string[] = ['name', 'language', 'status', 'actions'];
  dataSource = new MatTableDataSource<WhatsAppTemplate>([]);
  languages: Language[] = [];
  selectedLanguage = 'en';

  protected readonly TemplateStatus = TemplateStatus;

  constructor(
    public dialog: MatDialog,
    private translate: TranslateService,
    private localeService: LocaleService,
    private errorHandler: ErrorHandlerService,
    private whatsappTemplatesService: WhatsappTemplatesService
  ) {
  }

  ngOnInit(): void {
    this.fetchLanguages();
    this.loadTemplates();
  }

  loadTemplates() {
    this.loading = true;
    const params = {
      language: this.selectedLanguage
    };
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

  fetchLanguages() {
    this.localeService.getSupportedLanguages().subscribe({
      next: (res) => {
        this.languages = res.map(l => {
          return {
            value: l,
            text: this.translate.instant('whatsappTemplates.' + l)
          };
        });
      }, error: (err) => {
        this.errorHandler.showError(err);
      }
    });
  }

  deleteTemplate(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      id: 'confirmation_dialog',
      data: {
        question: 'Are you sure you want to delete template ?',
        yesText: 'Yes',
        noText: 'No',
        title: 'Delete template'
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
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
    });
  }

  openEdit(template: WhatsAppTemplate) {
    const dialogRef = this.dialog.open(EditWhatsappTemplateComponent, {
      data: template
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const body = {
          body: res
        };
        this.whatsappTemplatesService.updateTemplate(template.id, body).subscribe({
          next: () => {
            this.loadTemplates();
          }, error: err => {
            console.log(err, 'err');
            const error = err?.error?.error || 'Failed to submit template';
            this.errorHandler.showError(error);

          }
        });
      }
    });
  }


  submitTemplate(id: string) {
    this.loadingSubmit = true;
    const body = {
      id
    };
    this.whatsappTemplatesService.submitTemplate(body).subscribe({
      next: (res) => {
        this.loadingSubmit = false;
        this.loadTemplates();
      }, error: (err) => {
        console.log(err, 'err');
        this.loadingSubmit = false;
        const error = err?.error?.error?.details?.cause?.name || 'Failed to submit template';
        this.errorHandler.showError(error);
      }
    });

  }

  submitAllTemplates() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      id: 'confirmation_dialog',
      data: {
        question: 'Are you sure you want to submit for approval ?',
        yesText: 'Yes',
        noText: 'No',
        title: 'Submit for approval'
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.loadingSubmit = true;
        const ids = this.templates.map((t) => t.id);
        this.whatsappTemplatesService.bulkSubmitTemplate({ ids }).subscribe({
          next: (res) => {
            this.loadingSubmit = false;
            this.loadTemplates();
          }, error: (err) => {
            console.log(err, 'err');
            this.loadingSubmit = false;
            const error = err?.error?.error?.details?.cause?.name || 'Failed to submit template';
            this.errorHandler.showError(error);
          }
        });
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
