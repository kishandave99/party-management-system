import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private loginSvc: LoginService, private toastr: ToastrService, private router: Router) {

  }

  doLogout() {
    this.loginSvc.doLogout().subscribe({
      next: (response: any) => {
        this.toastr.success(response.status);
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error(error.message);
      }
    })
  }

}
