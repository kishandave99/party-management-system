import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartyManagementListComponent } from './party-management-list/party-management-list.component';
import { PartyManagementAddEditComponent } from './party-management-add-edit/party-management-add-edit.component';

const routes: Routes = [
  {path: 'list', component: PartyManagementListComponent},
  {path: 'add', component: PartyManagementAddEditComponent},
  {path: 'edit/:id', component: PartyManagementAddEditComponent},
  {path: 'add', component: PartyManagementAddEditComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartyManagementRoutingModule { }
