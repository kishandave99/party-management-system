import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Party } from 'src/app/interface';
import { PartyManagementService } from 'src/app/party-management.service';

@Component({
  selector: 'app-party-view',
  templateUrl: './party-view.component.html',
  styleUrls: ['./party-view.component.css']
})
export class PartyViewComponent implements OnInit {

  @Input() id: string = '';
  partyView!: Party;

  constructor(private partyManagementSvc: PartyManagementService, private router: Router){
  }

  ngOnInit(): void {
    if(this.id){
      this.doGet(this.id)
    }else{
      this.router.navigateByUrl('/party/list')
    }
  }

  doGet(id: any){
    this.partyManagementSvc.doGet(id).subscribe({
      next: (response: any)=> {
        this.partyView = response;
      },
      error: (error)=>{
        console.error(error.message);
      }
    })
  }

}
