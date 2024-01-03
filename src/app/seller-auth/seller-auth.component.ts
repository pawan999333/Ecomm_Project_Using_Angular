import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import {Router} from '@angular/router';
import { signUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService, private router: Router) {}

  showLogin = false;
  authError:string = '';

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: signUp): void {
    this.seller.userSignUp(data);
  }

  login(data: signUp): void {
    this.authError="";
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
          this.authError="Email or Password is not correct";
      }
      console.log("this.authError",this.authError)
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }
}
