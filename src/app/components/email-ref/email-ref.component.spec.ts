import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRefComponent } from './email-ref.component';

describe('EmailRefComponent', () => {
  let component: EmailRefComponent;
  let fixture: ComponentFixture<EmailRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
