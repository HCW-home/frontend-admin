import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserNewComponent } from './user-new.component';

describe('UserNewComponent', () => {
  let component: UserNewComponent;
  let fixture: ComponentFixture<UserNewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
