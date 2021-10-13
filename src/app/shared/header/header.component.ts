import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { logOutUser } from '../../state/actions/user.actions';
import { UserState } from '../../state/reducers/user.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userFirstName: string = '';
  userImage: string;
  
  constructor(private store: Store<{ user: UserState }>) { }

  ngOnInit(): void {
    this.store.select('user').pipe(take(1))
      .subscribe(data => {
        this.userFirstName = data.userFirstName;
        this.userImage = data.userImage;
      });
  }

  logOut() {
    this.store.dispatch(logOutUser());
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userFirstName');
    sessionStorage.removeItem('userImage');

    location.assign('/login');
  }
}
