import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartyManagementAddEditComponent } from './party-management-add-edit/party-management-add-edit.component';
import { PartyManagementListComponent } from './party-management-list/party-management-list.component';
import { PartyViewComponent } from './party-view/party-view.component';

const routes: Routes = [
  {path: 'list', component: PartyManagementListComponent},
  {path: 'add', component: PartyManagementAddEditComponent},
  {path: 'edit/:id', component: PartyManagementAddEditComponent},
  {path: 'view/:id', component: PartyViewComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartyManagementRoutingModule { }
