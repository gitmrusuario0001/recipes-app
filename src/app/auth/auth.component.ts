import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [
  ]
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;



  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm){
    console.log(form);
    if (!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode){
      authObs = this.authService.login(email, password);
    } else{
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe( resData => {
      console.log('response', resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },
    errorMessage => {
      console.log('error', errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    });

    form.reset();
  }
}
