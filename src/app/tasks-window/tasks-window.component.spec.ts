import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksWindowComponent } from './tasks-window.component';

describe('TasksWindowComponent', () => {
  let component: TasksWindowComponent;
  let fixture: ComponentFixture<TasksWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
