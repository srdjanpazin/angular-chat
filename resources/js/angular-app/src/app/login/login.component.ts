import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logInUser } from '../state/actions/user.actions';
import { AuthService } from './auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(
		private authService: AuthService,
		private store: Store
	) { }

	ngOnInit(): void {
		this.authService.initCsrfCookie().subscribe({
			error: (err) => {
				// Log error
			}
		});
	}

	quickLogin(userId: string, password: string) {

		this.authService.logInUser(userId, password).subscribe({

			next: (data) => {
				if (data.authenticated === false) {
					console.warn('Invalid username of password');
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
