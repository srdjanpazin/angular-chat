import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface ChatData {
  chatId: string;
  contactName: string;
  imgSrc: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private contactClickSubject = new Subject<ChatData>();

  contactClickObservable() {
    return this.contactClickSubject.asObservable();
  }

  emitContactClickEvent(payload: ChatData) {
    this.contactClickSubject.next(payload);
  }
}
