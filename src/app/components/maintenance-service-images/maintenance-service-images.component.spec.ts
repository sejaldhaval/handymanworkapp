import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceServiceImagesComponent } from './maintenance-service-images.component';

describe('MaintenanceServiceImagesComponent', () => {
  let component: MaintenanceServiceImagesComponent;
  let fixture: ComponentFixture<MaintenanceServiceImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceServiceImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceServiceImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
