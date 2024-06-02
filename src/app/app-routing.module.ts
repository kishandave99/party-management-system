import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';

const routes: Routes = [
  {path: '', component: LoginComponent, resolve: { resolveValue: LoginService }},
  {path: 'party', canActivate: [AuthGuard], loadChildren: () => import('./party-management/party-management.module').then(m => m.PartyManagementModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
