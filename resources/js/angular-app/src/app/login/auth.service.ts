import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { take } from 'rxjs/operators';

export interface UserData {
	id: string;
	fname: string;
	lname: string;
	profile_img: string;
}

export interface AuthResult {
	authenticated: boolean;
	user_data: UserData | null;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) {}

	initCsrfCookie() {
		return this.http.get('/sanctum/csrf-cookie');
	}

	logInUser(userName: string, password: string) {
		const body = new HttpParams()
			.set('uname', userName)
			.set('pwd', password);

		return this.http.post<AuthResult>('/login', body, {
			headers: new HttpHeaders()
				.set('Content-Type', 'application/x-www-form-urlencoded')
		})
			.pipe(take(1));
	}
}
