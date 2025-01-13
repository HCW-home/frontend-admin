import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WhatsAppTemplate } from '../models/whatsapp-template';

@Component({
  selector: 'app-edit-whatsapp-template',
  templateUrl: './edit-whatsapp-template.component.html',
  styleUrls: ['./edit-whatsapp-template.component.scss']
})
export class EditWhatsappTemplateComponent {

  constructor(
    public dialogRef: MatDialogRef<EditWhatsappTemplateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: WhatsAppTemplate) {
  }

  doAction(){
    this.dialogRef.close();
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
