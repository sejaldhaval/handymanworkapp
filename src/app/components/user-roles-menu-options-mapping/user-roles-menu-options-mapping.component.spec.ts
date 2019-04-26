import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesMenuOptionsMappingComponent } from './user-roles-menu-options-mapping.component';

describe('UserRolesMenuOptionsMappingComponent', () => {
  let component: UserRolesMenuOptionsMappingComponent;
  let fixture: ComponentFixture<UserRolesMenuOptionsMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRolesMenuOptionsMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolesMenuOptionsMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
