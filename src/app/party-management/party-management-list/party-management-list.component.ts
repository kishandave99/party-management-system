import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Party } from 'src/app/interface';
import { PartyManagementService } from 'src/app/party-management.service';

@Component({
  selector: 'app-party-management-list',
  templateUrl: './party-management-list.component.html',
  styleUrls: ['./party-management-list.component.css']
})
export class PartyManagementListComponent implements OnInit {
  parties: Party[] = [];

  constructor(private partyManagementSvc: PartyManagementService, private router: Router){}

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

  doView(id: any){
    this.router.navigateByUrl('/party/view/' + id);
  }

  doEdit(id: any){
    this.router.navigateByUrl('/party/edit/' + id);
  }

  doDelete(id: any){
    this.partyManagementSvc.doDelete(id).subscribe({
      next: (response: any)=> {
        this.parties = response;
      },
      error: (error)=>{
        console.error(error.message);
      }
    })    
  }


}
