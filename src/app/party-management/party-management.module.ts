import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartyManagementListComponent } from './party-management-list/party-management-list.component';
import { PartyManagementAddEditComponent } from './party-management-add-edit/party-management-add-edit.component';
import { PartyManagementRoutingModule } from './party-management-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PartyViewComponent } from './party-view/party-view.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    PartyManagementListComponent,
    PartyManagementAddEditComponent,
    PartyViewComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PartyManagementRoutingModule,
    NgbModule,
    NgbDatepickerModule,
  ]
})
export class PartyManagementModule { }
