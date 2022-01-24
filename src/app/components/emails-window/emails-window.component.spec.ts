import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsWindowComponent } from './emails-window.component';

describe('EmailsWindowComponent', () => {
  let component: EmailsWindowComponent;
  let fixture: ComponentFixture<EmailsWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailsWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
