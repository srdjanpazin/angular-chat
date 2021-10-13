import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChatState } from '../../state/reducers/chats.reducer';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.css']
})
export class ChatInfoComponent implements OnInit, OnDestroy {
  public contactName: string;
  public contactImage: string;
  private stateSubscription: Subscription;

  constructor(private store: Store<{ chats: ChatState }>) { }

  ngOnInit(): void {
    this.stateSubscription = this.store.select('chats')
      .subscribe(chats => {
        const chat = chats.loadedChats[chats.currentChatId];
        if (chat === undefined) return;
        
        this.contactName = chat.contactName;
        this.contactImage = chat.contactImage;
      });
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
}
