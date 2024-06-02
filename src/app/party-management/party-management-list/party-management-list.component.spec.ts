import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyManagementListComponent } from './party-management-list.component';

describe('PartyManagementListComponent', () => {
  let component: PartyManagementListComponent;
  let fixture: ComponentFixture<PartyManagementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyManagementListComponent]
    });
    fixture = TestBed.createComponent(PartyManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
