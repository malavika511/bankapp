import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //login name display using string interpolation .. binding
  user = "";

  //deposit property
  // acno = "";
  // pswd = "";
  // amount = "";


  //withdraw property
  // acno1 = "";
  // pswd1 = "";
  // amount1 = "";


  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],


  })


  withdrawForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]],


  })
  acno: any;
  //router: any;
  SystemDate:any;


  constructor(private fb: FormBuilder, private ds: DataService, private router:Router) {
    this.user = this.ds.currentUser;      //login name display
    this.SystemDate=new Date();
    this.user=JSON.parse(localStorage.getItem('currentUser')||'')
    console.log(localStorage);
  }

  ngOnInit(): void {                      //after logout .. the code cant be go back 
    // if(!localStorage.getItem('currentAcno')){
    //   alert("Please login first ");
    //   this.router.navigateByUrl('');

    // }
  }

  deposit() {
    //alert('clicked')

    // var acno = this.acno;   
    //  var pswd = this.pswd; 
    //  var amount=this.amount;


    if (this.depositForm.valid) {          //validation  for submit button
      var acno = this.depositForm.value.acno;
      var pswd = this.depositForm.value.pswd;
      var amount = this.depositForm.value.amount;


      const result = this.ds.deposit(acno, pswd, amount);

      if (result) {
        alert(`${amount} is credited...  Balance : ${result}`)
      }
    }
    else {
      alert('input valid data');
      console.log(this.depositForm.get('acno')?.errors);

    }
  }


  withdraw() {
    // alert('clicked')

    // var acno = this.acno1;
    // var pswd = this.pswd1;
    // var amount = this.amount1;

    if (this.withdrawForm.valid) {          //validation  for submit button
      var acno = this.withdrawForm.value.acno1;
      var pswd = this.withdrawForm.value.pswd1;
      var amount = this.withdrawForm.value.amount1;

    const result = this.ds.withdraw(acno, pswd, amount);

    if (result) {
      alert(`${amount} is debited...  Balance : ${result}`)
    }

  }
  else {
    alert('input valid data');
    console.log(this.depositForm.get('acno')?.errors);

  }
}

logout(){
  //remove uname
localStorage.removeItem('currentuser');
localStorage.removeItem('currentAcno');

  //navigate to login page
  this.router.navigateByUrl('');

}
delete(){
  this.acno=JSON.parse(localStorage.getItem('currentAcno')||'');

}
onCancel(){
  this.acno="";
}
}