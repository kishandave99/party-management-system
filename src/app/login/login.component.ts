import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginSvc: LoginService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }
    this.loginSvc.doLogin(this.loginForm.value).subscribe({
      next: (response: any)=> {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/party/list')
      },
      error: (error)=>{
        this.toastr.error(error.detail);
        console.error(error.message);
      }
    })
  }
}
