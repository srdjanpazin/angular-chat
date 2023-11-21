import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  template: `
    <form class="chat-bottom" (submit)="handleSubmit($event)">
      <input #input type="text" id="msg" name="msg" autocomplete="off">
      <button type="submit">
        <img src="/assets/send-button.svg" />
      </button>
    </form>
  `,
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  @Output() submitEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit(e) {
    e.preventDefault();
    const msg = e.target['msg'].value;
    if (msg === '') return;
    e.target['msg'].value = '';

    this.submitEvent.emit(msg);
  }
}
