import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatAppComponent } from './chats/chat-app/chat-app.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ChatAppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
