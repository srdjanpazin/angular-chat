import { Injectable } from '@angular/core';

declare const Pusher: any;

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;

  constructor() {
    this.pusher = new Pusher('<app_key>', {
      cluster: 'eu',
      encrypted: true
      // authEndpoint: './pusher/auth.php'
    });
  }
}
