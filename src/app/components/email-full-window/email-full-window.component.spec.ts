import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFullWindowComponent } from './email-full-window.component';

describe('EmailFullWindowComponent', () => {
  let component: EmailFullWindowComponent;
  let fixture: ComponentFixture<EmailFullWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailFullWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailFullWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
