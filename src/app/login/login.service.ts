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
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  logInUser(userName: string, password: string) {
    const body = new HttpParams()
      .set('uname', userName)
      .set('pwd', password);

    return this.httpClient.post<AuthResult>('/api/auth-user.php', body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .pipe(take(1));
  }
}
