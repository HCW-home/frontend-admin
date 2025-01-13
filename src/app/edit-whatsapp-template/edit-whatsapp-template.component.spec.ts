import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWhatsappTemplateComponent } from './edit-whatsapp-template.component';

describe('EditWhatsappTemplateComponent', () => {
  let component: EditWhatsappTemplateComponent;
  let fixture: ComponentFixture<EditWhatsappTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditWhatsappTemplateComponent]
    });
    fixture = TestBed.createComponent(EditWhatsappTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
