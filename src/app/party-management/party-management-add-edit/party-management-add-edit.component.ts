import { Component, Injectable, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PartyManagementService } from 'src/app/party-management.service';

@Component({
  selector: 'app-party-management-add-edit',
  templateUrl: './party-management-add-edit.component.html',
  styleUrls: ['./party-management-add-edit.component.css'],
})
export class PartyManagementAddEditComponent {
  @Input() id: string = '';
  addPartyForm!: FormGroup;
  editMode = false;
  imagePreview: string | ArrayBuffer | null = null;
	model1!: string;


  constructor(private formBuilder: FormBuilder, private partyManagementSvc: PartyManagementService,
    private toastr: ToastrService, private router: Router
  ) { }

  ngOnInit(): void {
    this.addPartyForm = this.formBuilder.group({
      id: [null],
      name: ['',],
      company_name: ['', Validators.required],
      mobile_no: ['', Validators.required],
      telephone_no: ['',],
      whatsapp_no: ['',],
      email: ['',],
      remark: ['',],
      login_access: [true],
      date_of_birth: ['',],
      anniversary_date: [''],
      gstin: [''],
      pan_no: [''],
      apply_tds: [false, Validators.required],
      credit_limit: [],
      address: this.formBuilder.array([]),
      bank: this.formBuilder.array([]),
      image: [null]
    });
    if(this.id){
      this.doGet(this.id)
    }
    this.addAddress();
    this.addBank();
  }

  doGet(id: any){
    this.partyManagementSvc.doGet(id).subscribe({
      next: (response: any)=> {
        this.addPartyForm.patchValue(response);
        if(response.anniversary_date){
          let date = response.anniversary_date.split('-');
          this.addPartyForm.controls['anniversary_date'].setValue({year: parseInt(date[0]), month: parseInt(date[1]), day: parseInt(date[2])});
        }
        if(response.date_of_birth){
          let date = response.date_of_birth.split('-');
          this.addPartyForm.controls['date_of_birth'].setValue({year: parseInt(date[0]), month: parseInt(date[1]), day: parseInt(date[2])});
        }
      },
      error: (error)=>{
        this.toastr.error(error.error.msg);
      }
    })
  }

  setAddresses(addresses: any[]) {
    const addressFGs = addresses.map(address => this.formBuilder.group(address));
    const addressFormArray = this.formBuilder.array(addressFGs);
    this.addPartyForm.setControl('addresses', addressFormArray);
  }

  get address(): FormArray {
    return this.addPartyForm.get('address') as FormArray;
  }

  addAddress() {
    this.address.push(this.formBuilder.group({
      address_line_1: [''],
      address_line_2: [''],
      country: [''],
      state: [''],
      city: [''],
      pincode: ['']
    }));
  }

  removeAddress(index: number) {
    this.address.removeAt(index);
  }

  setBank(bank: any[]) {
    const bankFGs = bank.map(bank => this.formBuilder.group(bank));
    const bankFormArray = this.formBuilder.array(bankFGs);
    this.addPartyForm.setControl('bank', bankFormArray);
  }

  get bank(): FormArray {
    return this.addPartyForm.get('bank') as FormArray;
  }

  addBank() {
    this.bank.push(this.formBuilder.group({
      bank_ifsc_code: [''],
      bank_name: [''],
      branch_name: [''],
      account_no: [''],
      account_holder_name: [''],
    }));
  }

  removeBank(index: number) {
    this.bank.removeAt(index);
  }

  onAddPartySubmit() {
    const birthdate = this.addPartyForm.value.date_of_birth;
    if(birthdate){
      this.addPartyForm.controls['date_of_birth'].setValue(birthdate.year + '-' + birthdate.month + '-' + birthdate.day);
    }else{
      this.addPartyForm.controls['date_of_birth'].setValue(null);
    }
    this.addPartyForm.controls['date_of_birth'].setErrors(null);
    const anniversary_date = this.addPartyForm.value.anniversary_date;
    if(anniversary_date){
      this.addPartyForm.controls['anniversary_date'].setValue(anniversary_date.year + '-' + anniversary_date.month + '-' + anniversary_date.day);
    }else{
      this.addPartyForm.controls['anniversary_date'].setValue(null);
    }
    this.addPartyForm.controls['anniversary_date'].setErrors(null);
    if (this.addPartyForm.invalid) {
      return;
    }

    if (this.addPartyForm.value['id']) {
      this.partyManagementSvc.doUpdate(this.id, this.addPartyForm.value).subscribe({
        next: (response: any)=> {
          if(response.success){
            this.toastr.success(response.msg);
            this.router.navigateByUrl('/party/list');  
          }else{
            this.toastr.error(response.msg);
          }
        },
        error: (error)=>{
          this.toastr.error(error.error.msg);
        }
      })
    } else {
      this.partyManagementSvc.doSave(this.addPartyForm.value).subscribe({
        next: (response: any)=> {
          if(response.success){
            this.toastr.success(response.msg);
            this.router.navigateByUrl('/party/list');  
          }else{
            this.toastr.error(response.msg);
          }
        },
        error: (error)=>{
          this.toastr.error(error.error.msg);
        }
      })
      }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('Only JPEG and PNG files are allowed.');
        return;
      }
      this.addPartyForm.controls['image'].setValue(file);
      console.log(this.addPartyForm.value['image']);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

}
