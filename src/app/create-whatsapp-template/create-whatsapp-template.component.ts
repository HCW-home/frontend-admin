import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WhatsappTemplatesService } from '../core/whatsapp-templates.service';

@Component({
  selector: 'app-create-whatsapp-template',
  templateUrl: './create-whatsapp-template.component.html',
  styleUrls: ['./create-whatsapp-template.component.scss']
})
export class CreateWhatsappTemplateComponent implements OnInit {
  templateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private whatsappTemplatesService: WhatsappTemplatesService,
    public dialogRef: MatDialogRef<CreateWhatsappTemplateComponent>,
  ) {}

  ngOnInit() {
    this.templateForm = this.fb.group({
      name: ['', Validators.required, Validators.pattern(/^[a-z0-9_]+$/)],
      language: ['', Validators.required],
      body: ['', Validators.required],
      category: ['', Validators.required],
      contentType: ['', Validators.required],
    });
  }

  createTemplate() {
    const  {value} = this.templateForm;
    const body = {
        name: value.name,
      language: value.language,
      body: value.body,
      category: value.category,
      contentType: value.contentType,
    };
    this.whatsappTemplatesService.createTemplate(body).subscribe({
      next: (res) => {
        console.log(res, 'res');
        this.dialogRef.close(res);
      }, error: (err) => {
        console.log(err, 'err');
      }
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
