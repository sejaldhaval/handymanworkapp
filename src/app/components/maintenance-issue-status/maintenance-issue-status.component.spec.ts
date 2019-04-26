import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceIssueStatusComponent } from './maintenance-issue-status.component';

describe('MaintenanceIssueStatusComponent', () => {
  let component: MaintenanceIssueStatusComponent;
  let fixture: ComponentFixture<MaintenanceIssueStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceIssueStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceIssueStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
