import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { ContactsSidebarComponent }
from './contacts/contacts-sidebar/contacts-sidebar.component';
import { ChatAppComponent } from './chats/chat-app/chat-app.component';
import { ChatComponent } from './chats/chat/chat.component';
import { ChatInputComponent } from './chats/chat-input/chat-input.component';
import { ChatInfoComponent } from './chats/chat-info/chat-info.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { ContactDirective } from './contacts/contact.directive';
import { ChatDirective } from './chats/chat.directive';
import { popupsReducer } from './state/reducers/popups.reducer';
import { chatReducer} from './state/reducers/chats.reducer';
import { panelReducer } from './state/reducers/panels.reducer';
import { userReducer } from './state/reducers/user.reducer';
import { ChatMessageComponent } from './chats/chat-message/chat-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsSidebarComponent,
    ChatComponent,
    ChatInfoComponent,
    ContactDirective,
    ContactComponent,
    ChatDirective,
    ChatInputComponent,
    HeaderComponent,
    ChatAppComponent,
    LoginComponent,
    LoginFormComponent,
    ChatMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      chats: chatReducer,
      user: userReducer,
      popups: popupsReducer,
      panels: panelReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 30,
      autoPause: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
