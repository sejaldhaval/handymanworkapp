import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancePriorityComponent } from './maintenance-priority.component';

describe('MaintenancePriorityComponent', () => {
  let component: MaintenancePriorityComponent;
  let fixture: ComponentFixture<MaintenancePriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancePriorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancePriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
