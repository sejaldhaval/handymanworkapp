import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceServiceStatusComponent } from './maintenance-service-status.component';

describe('MaintenanceServiceStatusComponent', () => {
  let component: MaintenanceServiceStatusComponent;
  let fixture: ComponentFixture<MaintenanceServiceStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceServiceStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceServiceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
