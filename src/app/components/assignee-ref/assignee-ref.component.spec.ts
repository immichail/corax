import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigneeRefComponent } from './assignee-ref.component';

describe('AssigneeRefComponent', () => {
  let component: AssigneeRefComponent;
  let fixture: ComponentFixture<AssigneeRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigneeRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigneeRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
