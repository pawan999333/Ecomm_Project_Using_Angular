import { Injectable, OnInit } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }

  userSignUp(user:signUp){
    this.http.post('http://localhost:3000/users', user, {observe:'response'})
    .subscribe((result)=>{
      console.warn(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }


  userLogin(data:login){
    this.http.get<signUp[]>(
      `http://localhost:3000/users?email=${data.email}&password=${data.password}`, {observe:'response'}
    ).subscribe((result)=>{
      if(result && result.body){
        console.warn('result',result)
   localStorage.setItem('user', JSON.stringify(result.body));
   this.router.navigate(['/']);
 }      
    });
  }
}