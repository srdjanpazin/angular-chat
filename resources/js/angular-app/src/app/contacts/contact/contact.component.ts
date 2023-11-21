import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../../shared/event.service';

@Component({
  selector: 'app-contact',
  template: `
    <div class="contact" id={{userId}} (click)="onClick()">
      <img class="contact-img" [attr.src]="imgSrc" width=40 height=40 />
	    <div>{{contactName}}</div>
    </div>
  `,
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
	@Input() contactName: string;
	@Input() userId: string;
	@Input() chatId: string;
  @Input() imgSrc: string;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  onClick() {
    const payload = {
      chatId: this.chatId,
      contactName: this.contactName,
      imgSrc: this.imgSrc
    };
    this.eventService.emitContactClickEvent(payload);
  }

}
