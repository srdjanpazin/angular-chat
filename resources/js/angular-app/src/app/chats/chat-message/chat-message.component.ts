import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: any;
  @Input() currentUser: string;
  public formattedDate: string;
  public isMyMessage: boolean;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.message.content = this.sanitizer.bypassSecurityTrustHtml(this.message.content);

    this.isMyMessage = this.message.sender_id === this.currentUser;

    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    this.formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(this.message.created_at));
  }

}
