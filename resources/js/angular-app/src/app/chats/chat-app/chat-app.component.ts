import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { EventService } from 'src/app/shared/event.service';
import { addChat, changeChat } from 'src/app/state/actions/chats.actions';
import { PanelState } from 'src/app/state/reducers/panels.reducer';
import { PopupState } from 'src/app/state/reducers/popups.reducer';
import { selectUserId } from 'src/app/state/selectors/user.selectors';
import { ChatComponent } from '../chat/chat.component';
import { ChatDirective } from '../chat.directive';
import { ChatService } from '../shared/chat.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css']
})
export class ChatAppComponent implements OnInit {
  @ViewChild(ChatDirective, { static: true }) chatHost: ChatDirective;
  public currentUser: string;
  private currentChatId: string;
  private loadedChats: any = {};
  public chatInfoShown: boolean = true;
  private panelStateSubs: Subscription;
  private eventSubs: Subscription;
  
  constructor(
    public chatService: ChatService,
    private eventService: EventService,
    private renderer: Renderer2,
    private store: Store<{ popups: PopupState, panels: PanelState }>,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.store.select(selectUserId).pipe(take(1)).subscribe(userId => {
      this.currentUser = userId;
      if (!this.currentUser) {
        location.assign('/login');
        return;
      }
    });

    const componentFactory = this.cfr.resolveComponentFactory(ChatComponent);

    this.panelStateSubs = this.store.select('panels')
      .subscribe(data => {
        this.chatInfoShown = data.chatInfo;
      });

    this.eventSubs = this.eventService.contactClickObservable()
      .subscribe(data => {
        const { chatId, contactName, imgSrc } = data;
        if (this.currentChatId === chatId) {
          return;
        }
        this.loadedChats[this.currentChatId].instance.isHidden = true;
        
        // Redisplay the loaded component if there is one
        if (this.loadedChats.hasOwnProperty(chatId)) {
          const chat = this.loadedChats[chatId].instance;
          chat.isHidden = false;
          this.currentChatId = chatId;
          this.store.dispatch(changeChat({ chatId: chatId }));

          return;
        }

        // Else create a new component and add the chat to the loaded chats state
        this.store.dispatch(addChat({
          chatId: chatId,
          contactName: contactName,
          contactImage: imgSrc
        }));

        const componentRef = this.chatHost.viewContainerRef
          .createComponent<ChatComponent>(componentFactory);

        const instance = componentRef.instance;
        instance.currentUser = this.currentUser;
        instance.chatId = chatId;
        instance.contactName = contactName;
        instance.imgSrc = imgSrc;

        this.currentChatId = chatId;
        this.loadedChats[chatId] = componentRef;
      });
  }

  ngOnDestroy() {
    this.panelStateSubs.unsubscribe();
    this.eventSubs.unsubscribe();
  }

  loadInitialChat(data: any) {
    const componentFactory = this.cfr.resolveComponentFactory(ChatComponent);
    const componentRef = this.chatHost.viewContainerRef
    .createComponent<ChatComponent>(componentFactory);

    const instance = componentRef.instance;
    instance.currentUser = this.currentUser;
    instance.chatId = data.chatId;
    instance.contactName = data.contactName;
    instance.imgSrc = data.contactImage;

    this.currentChatId = data.chatId;
    this.loadedChats[data.chatId] = componentRef;
  }

  sendMessage(msg: any) {
    // Create a message element and append it to the chat
    const msgEl = this.renderer.createElement('div');
    this.renderer.addClass(msgEl, 'msg-cont');
    const markup = '<div class="flex-padding"></div><div class="msg-right msg">'
      + msg + '</div>'
    this.renderer.setProperty(msgEl, 'innerHTML', markup);

    this.renderer.appendChild(
      this.loadedChats[this.currentChatId].instance.body.nativeElement, msgEl);
    msgEl.scrollIntoView();

    this.chatService.sendMessage(msg, this.currentChatId)
      .subscribe(() => {});
  }
}
