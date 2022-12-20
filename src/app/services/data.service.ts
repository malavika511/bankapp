import { HttpClient } from '@angular/common/http';
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

  constructor(private http:HttpClient) { 
    this.getDetails() //function call
  }

  //saveDetails() -To store data in the local storage

  saveDetails(){
    if(this.userDetails){
      localStorage.setItem('dataBase',JSON.stringify(this.userDetails));
    }
    if(this.currentAcno){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno));
    }
    if(this.currentUser){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
    }
  }

  //getDetails() - to get data  from the local storage

  getDetails(){
   if(localStorage.getItem('dataBase')){
    this.userDetails = JSON.parse(localStorage.getItem('dataBase') || '');
   }
  }

  getcurrentUser(){
    if(localStorage.getItem('currentUser')){
       this.userDetails = JSON.parse(localStorage.getItem('currentUser') || '');
    }
  }
      
  getcurrentAcno(){
    if(localStorage.getItem('currentAcno')){
       this.userDetails = JSON.parse(localStorage.getItem('currentAcno') || '');
     }
  }
  

  //register API request
    register(acno: any, username: any, password: any) {
      const data={
        acno,
        password,
        username
      }
     return this.http.post('http://localhost:3000/register',data)
  }

  login(acno: any, pswd: any) {
   const data={
    acno,
    pswd
   }
   return this.http.post('http://localhost:3000/login',data)
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
        this.saveDetails();//function call
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
          this.saveDetails();//function call
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
