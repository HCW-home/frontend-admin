import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

export interface DialogData {
  question: string;
  yesText?: string;
  noText?: string;
  title?: string;
}
@Component({
  selector: 'app-confirmation-dialog',
  standalone: false,
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  question = '';
  yesText = '';
  noText = '';
  title = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public translate: TranslateService

  ) {
    this.question = data.question;
    this.yesText = data.yesText;
    this.noText = data.noText;
    this.title = data.title;

  }

  ngOnInit() {
  }

}
