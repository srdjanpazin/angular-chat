import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { PopupState } from './state/reducers/popups.reducer';
import { PanelState } from './state/reducers/panels.reducer';
import { toggleChatOptions } from './state/actions/popups.actions';
import { logInUser } from './state/actions/user.actions';
import { UserState } from './state/reducers/user.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular Chat';
  public user: string;
  private popups: PopupState;
  public chatInfoShown: boolean;
  private popupStateSubs: Subscription;
  private userSubs: Subscription;
  
  constructor(
    private store: Store<{ 
      popups: PopupState,
      panels: PanelState,
      user: UserState
    }>,
  ) {}

  ngOnInit() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.store.dispatch(logInUser({
        userId: userId,
        userFirstName: sessionStorage.getItem('userFirstName'),
        userImage: sessionStorage.getItem('userImage')
      }));
    }

    this.userSubs = this.store.select('user').subscribe(data => {
      this.user = data.userId;
    });

    this.popupStateSubs = this.store.select('popups')
      .subscribe(state => {
        this.popups = state;
      });
  }

  ngOnDestroy() {
    this.popupStateSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }

  closePopups() {
    // Search 'popups' state for open popups and close them
    for (let key of Object.keys(this.popups)) {
      if (this.popups[key] === true) {
        switch (key) {
          case 'chatOptions':
            this.store.dispatch(toggleChatOptions());
            break;
          default:
            break;
        }
      }
    }
  }
}
