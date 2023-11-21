import { 
	Component,
	ViewChild,
	Input,
	Output,
	EventEmitter,
	ElementRef,
	ComponentFactoryResolver,
	OnInit,
	OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ContactComponent } from '../contact/contact.component';
import { ContactDirective } from '../contact.directive';
import { ChatService } from '../../chats/shared/chat.service';
import { toggleChatOptions } from '../../state/actions/popups.actions';
import { PopupState } from '../../state/reducers/popups.reducer';
import { addChat } from '../../state/actions/chats.actions';
import { ChatData } from '../../state/reducers/chats.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-contacts-sidebar',
  templateUrl: './contacts-sidebar.component.html',
  styleUrls: ['./contacts-sidebar.component.css']
})
export class ContactsSidebarComponent implements OnInit, OnDestroy {
	@Input() currentUser: string;
	@Output() contactsLoadedEvent: EventEmitter<ChatData> =
		new EventEmitter<ChatData>();
	@ViewChild(ContactDirective, {static: true}) contactHost: ContactDirective;
	@ViewChild('chatOptions') chatOptions: ElementRef;
	public chatOptionsActive: boolean = false;
	private stateSubscription: Subscription;

	constructor(
		private chatService: ChatService,
		private componentFactoryResolver: ComponentFactoryResolver,
		private store: Store<{ popups: PopupState }>
	) {}
	
	ngOnInit() {
		this.stateSubscription = this.store.select('popups')
			.subscribe(state => {
				this.chatOptionsActive = state.chatOptions
			});

		const componentFactory = 
			this.componentFactoryResolver.resolveComponentFactory(ContactComponent);
			
		this.chatService.getContactsInfo(this.currentUser).pipe(take(1))
			.subscribe(data => {
				const resultSet = data.result;
				for (let i = 0; i < resultSet.length; i++) {
					const [ userId, fName, lName, imgSrc, chatId ] = resultSet[i];
					
					if (i === 0) {
						let chatObj = {
							chatId: chatId,
							contactName: fName + ' ' + lName,
							contactImage: imgSrc
						};

						this.store.dispatch(addChat(chatObj));
						this.contactsLoadedEvent.emit(chatObj);
					}

					const componentRef = this.contactHost.viewContainerRef
						.createComponent<ContactComponent>(componentFactory);

					const instance = componentRef.instance;
					instance.userId = userId;
					instance.contactName = fName + ' ' + lName;
					instance.chatId = chatId;
					instance.imgSrc = imgSrc;
				}
			});
	}

	ngOnDestroy() {
		this.stateSubscription.unsubscribe();
	}

	toggleChatOptions(e) {
		e.stopPropagation();
		this.store.dispatch(toggleChatOptions());
	}
}