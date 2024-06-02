import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Party } from 'src/app/interface';
import { LoginService } from 'src/app/login.service';
import { PartyManagementService } from 'src/app/party-management.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-party-management-list',
  templateUrl: './party-management-list.component.html',
  styleUrls: ['./party-management-list.component.css']
})
export class PartyManagementListComponent implements OnInit {
  parties: Party[] = [];

  constructor(private partyManagementSvc: PartyManagementService, private router: Router,
    private loginSvc: LoginService, private toastr: ToastrService,
  ){}

  ngOnInit(): void {
    this.doGetList();
  }

  doGetList(){
    this.partyManagementSvc.doGetList().subscribe({
      next: (response: any)=> {
        this.parties = response;
        console.log(response)
      },
      error: (error)=>{
        console.error(error.message);
      }
    })
  }

  doView(id: string){
    this.router.navigateByUrl('/party/view/' + id);
  }

  doEdit(id: string){
    this.router.navigateByUrl('/party/edit/' + id);
  }

  doDelete(party: Party){
    Swal.fire({
      title: 'Do you want to delete -' + party.name,
      text: 'All data related to this Party Data will be deleted',
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then((sweetAlertResult: SweetAlertResult) => {
      if (sweetAlertResult?.value) {
        this.partyManagementSvc.doDelete(party.id).subscribe({
          next: (response: any)=> {
            if(response.success){
              this.toastr.success(response.msg);
            }else {
              this.toastr.error(response.msg);
            }
            this.doGetList();
          },
          error: (error)=>{
            console.error(error.message);
          }
        })        
      }
  })
  }

  doLogout() {
    this.loginSvc.doLogout().subscribe({
      next: (response: any) => {
        this.toastr.success(response.status);
        localStorage.removeItem('token')
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error(error.message);
      }
    })
  }

}
