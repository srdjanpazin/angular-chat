import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Renderer2,
  ElementRef,
  Input,
  HostBinding
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ChatService } from '../shared/chat.service';
import { PusherService } from 'src/app/shared/pusher.service';
import { ChatState } from '../../state/reducers/chats.reducer';
import { Subscription } from 'rxjs';
import { toggleChatInfo } from '../../state/actions/panels.actions';
import { selectCurrentChatId } from '../../state/selectors/chats.selectors';
import { take } from 'rxjs/operators';

export interface ChatMessage {
  message: string;
  user: string;
  time: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @HostBinding('hidden') isHidden: boolean = false;
  @Input() currentUser: string;
  @Input() contactName: string;
  @Input() chatId: string;
  @Input() imgSrc: string;
  public currentChatId: string;
  public infoActive: boolean = false;
  private lastMsgId: number | null = null;
  private messagesChannel: any;
  @ViewChild('body') body: ElementRef;
  @ViewChild('infoBtn') infoBtn: ElementRef;
  private stateSubscription: Subscription;
  public messages: any = [];

  constructor(
    private chatService: ChatService,
    private renderer: Renderer2,
    private store: Store<{ chats: ChatState }>,
    private pusherService: PusherService
  ) {}
  
  ngOnInit(): void {
    this.messagesChannel = this.pusherService.pusher.subscribe(`${this.chatId}`);

    this.messagesChannel.bind('new-message', (data: ChatMessage) => {
      // If the incoming message is from this user, return
      if (data.user === this.currentUser)
        return;

      const markup = `
        <div class="msg-cont">
          <div class="msg-left msg">${data.message}
            <div class="time-tooltip">${data.time}</div>
          </div>
        </div>`;

      const msgEl = this.renderer.createElement('div');
      this.renderer.setAttribute(msgEl, 'id', `m${++this.lastMsgId}`);
      this.renderer.setProperty(msgEl, 'innerHTML', markup);
      this.renderer.appendChild(this.body.nativeElement, msgEl);
      msgEl.scrollIntoView();
    });

    this.stateSubscription = this.store.select(selectCurrentChatId)
      .subscribe(currentChatId => {
        this.currentChatId = currentChatId;
      });

    // Get chat messages
    this.chatService.getMessages(this.chatId)
      .pipe(take(1))
      .subscribe({
        next: data => {
          this.messages = data;
        },
        // complete: () => { this.chatLoadedSubject.next(); }       
      });
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  toggleChatInfo() {
    if (this.infoActive)
      this.renderer.removeClass(this.infoBtn.nativeElement, 'active');
    else
      this.renderer.addClass(this.infoBtn.nativeElement, 'active');
    
    this.infoActive = !this.infoActive;
    this.store.dispatch(toggleChatInfo());
  }
}
