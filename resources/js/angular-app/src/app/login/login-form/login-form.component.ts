import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { logInUser } from 'src/app/state/actions/user.actions';
import { LoginService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean = false;
  validCredentials: boolean;

  constructor(
    private loginService: LoginService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get userName() { return this.loginForm.get('userName'); }

  get password() { return this.loginForm.get('password'); }

  onSubmit(e) {
    e.preventDefault();
    this.isSubmitted = true;
    if (!this.userName.value || !this.password.value)
      return;
      
    this.loginService.logInUser(this.userName.value, this.password.value)
    .subscribe({
      next: data => {
        if (data.authenticated === false) {
          console.warn('Invalid username of password');
          this.userName.setErrors({ invalidCredentials: true });
          return;
        }

        const user = data.user_data;
        sessionStorage.setItem('userId', user.id);
        sessionStorage.setItem('userFirstName', user.fname);
        sessionStorage.setItem('userImage', user.profile_img);
        
        this.store.dispatch(logInUser({
          userId: user.id,
          userFirstName: user.fname,
          userImage: user.profile_img
        }));

        location.assign('/');
      },
      error: err => { 
        if (err.status === 0) {
          // A client-side or network error occured.
          console.error('Error:', err.error);
    
        } else if (err.status !== 200) {
          console.error(`${err.status}\nbody: ${err.error}`);
          console.error(err);
    
        } else {
          console.error(err);
        }
      }
    });
  }
}
