import { Routes } from "@angular/router";
import { DefaultLayoutComponent } from "./layout/default-layout/default-layout.component";
import { LoginLayoutComponent } from "./layout/login-layout/login-layout.component";
import { AuthGuard } from "./services/auth/auth.guard";
import { SignComponent } from "./components/sign/sign.component";
import { MessagesComponent } from "./components/chat/messages.component";
import { AccountManagmentComponent } from "./components/account-managment/account-managment.component";
import { GlobalMessagesComponent } from "./components/global-messages/global-messages.component";
import { ThesisComponent } from "./components/thesis/thesis.component";
import { ThesisPromoterViewComponent } from "./components/thesis/thesis-view/thesis-promoter-view/thesis-promoter-view.component";

export const appRoutes : Routes = [
    { 
      path: '', 
      canActivate: [AuthGuard],
      component: DefaultLayoutComponent,
      children: [
        {
          path: 'main',
          component: GlobalMessagesComponent
        },
        {
          path: 'thesis',
          component: ThesisComponent
        },
        {
          path: 'thesis/:id',
          component: ThesisPromoterViewComponent
        },
        {
          path: 'messages',
          component: MessagesComponent
        },
        {
          path: 'account',
          component: AccountManagmentComponent
        }
      ]
    },
    {
      path: '', 
      component: LoginLayoutComponent,
      children: [
        {
          path: 'sign',
          component: SignComponent
        }
      ]
    },
    { 
      path: '**', 
      redirectTo: 'sign' 
    }
  ]