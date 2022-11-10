import { Injectable } from '@angular/core';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //login name display
  currentUser:any;

  //login accounts number display

  currentAcno:any;

  userDetails: any = { //object of objects
    1000: { acno: 1000, username: 'Jayden', password: 1000, balance: 30000 ,transaction:[]},
    1001: { acno: 1001, username: 'Jerald', password: 1001, balance: 20000 ,transaction:[]},
    1002: { acno: 1002, username: 'Isabel', password: 1002, balance: 10000 ,transaction:[]},

  }

  constructor() { }
  register(acno: any, username: any, password: any) {
    let userDetails = this.userDetails;
    if (acno in userDetails) {
      return false;
    }
    else {
      userDetails[acno] = {
        acno,
        username,
        password,
        balance:0,
        transaction:[]
      }
      console.log(userDetails)

      return true;
    }

  }

  login(acno: any, pswd: any) {
    let userDetails = this.userDetails;
    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        this.currentUser=this.userDetails[acno]['username']
        this.currentAcno=acno;
        return true;
      }
      else {
        alert('Incorrect Password');
        return false;
      }
    }
    else {
      alert('Invalid User')
      return false;
    }
  }
  deposit(acno: any, pswd: any, amt: any) {
    var userDetails = this.userDetails;
    var amount = parseInt(amt);
    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        userDetails[acno]['balance'] += amount;
        userDetails[acno]['transaction'].push({
          type:'Credit',
          amount
        })
        console.log(userDetails);
        return userDetails[acno]['balance'];
      }
      else {
        alert('incorrect password');
        return false;
      }
    }
    else {
      alert('invalid user');
      return false;
    }
  }
  withdraw(acno: any, pswd: any, amt: any) {
    var userDetails = this.userDetails;
    var amount = parseInt(amt);
    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        if (userDetails[acno]['balance'] > amount){
          userDetails[acno]['balance'] -= amount;
          userDetails[acno]['transaction'].push({
            type:'Dedit',
            amount
          })
          console.log(userDetails);
        return userDetails[acno]['balance'];
      }
      else {
        alert('incorrect password');
        return false;
      }

    }
  }
    else {
      alert('invalid user');
      return false;
    }
  }

  getTransaction(acno:any){
    return this.userDetails[acno]['transaction']

  }
}
