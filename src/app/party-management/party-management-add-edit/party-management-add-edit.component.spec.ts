import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyManagementAddEditComponent } from './party-management-add-edit.component';

describe('PartyManagementAddEditComponent', () => {
  let component: PartyManagementAddEditComponent;
  let fixture: ComponentFixture<PartyManagementAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyManagementAddEditComponent]
    });
    fixture = TestBed.createComponent(PartyManagementAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
