import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFullWindowComponent } from './task-full-window.component';

describe('TaskFullWindowComponent', () => {
  let component: TaskFullWindowComponent;
  let fixture: ComponentFixture<TaskFullWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFullWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFullWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
