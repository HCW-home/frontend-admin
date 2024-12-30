import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WhatsappTemplatesService } from '../core/whatsapp-templates.service';
import { ContentType, Language } from '../models/whatsapp-template';
import { CategoryEnum, categoryOption } from '../constants/whatsapp-templates';
import { ErrorHandlerService } from '../core/error-handler.service';

@Component({
  selector: 'app-create-whatsapp-template',
  templateUrl: './create-whatsapp-template.component.html',
  styleUrls: ['./create-whatsapp-template.component.scss']
})
export class CreateWhatsappTemplateComponent implements OnInit {
  protected readonly categoryOption = categoryOption;
  templateForm!: FormGroup;
  contentTypes: ContentType[] = [];
  languages: Language[] = [];

  constructor(
    private fb: FormBuilder,
    private errorHandlerService: ErrorHandlerService,
    private whatsappTemplatesService: WhatsappTemplatesService,
    @Inject(MAT_DIALOG_DATA) public data: {languages: Language[]},
    public dialogRef: MatDialogRef<CreateWhatsappTemplateComponent>,
  ) {}

  ngOnInit() {
    this.languages = this.data.languages;
    this.fetchContentTypes();
    this.createForm();
  }

  get variables(): FormArray {
    return this.templateForm.get('variables') as FormArray;
  }
  createForm() {
    this.templateForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-z0-9_]+$/)]],
      language: [null, Validators.required],
      contentType: [null, Validators.required],
      category: [{value: CategoryEnum.MARKETING, disabled: true }, Validators.required],
      body: ['', Validators.required],
      variables: this.fb.array([])
    });
  }

  createTemplate() {
    const  value = this.templateForm.getRawValue();
    const body = {
      name: value.name,
      language: value.language,
      contentType: value.contentType,
      category: value.category,
      body: value.body,
      variables: value.variables.map((v: { key: string }) => v.key),
    };
    this.whatsappTemplatesService.createTemplate(body).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
      }, error: (err) => {
        console.log(err, 'error');
        this.errorHandlerService.showError(err?.error?.error || 'An error occurred');
      }
    });
  }

  fetchContentTypes() {
    this.whatsappTemplatesService.fetchContentTypes().subscribe({
      next: (res) => {
        this.contentTypes = res;
      }, error: (err) => {
        this.errorHandlerService.showError(err);
      }
    });
  }

  addVariable(textarea: HTMLTextAreaElement) {
    const cursorPos = textarea.selectionStart || 0;
    const currentValue = textarea.value;
    const variable = `{{${currentValue.split('{{').length}}}`;

    const newValue =
      currentValue.slice(0, cursorPos) +
      variable +
      currentValue.slice(cursorPos);

    this.templateForm.patchValue({ body: newValue });
    this.variables.push(
      this.fb.group({
        key: ['', Validators.required],
      })
    );
  }

  removeVariable(index: number) {
    this.variables.removeAt(index);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
