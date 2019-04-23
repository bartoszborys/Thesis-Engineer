import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ng2-tooltip-directive';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DynamicFormPartComponent } from './components/sign/shared/dynamic-form-card/dynamic-form-part/dynamic-form-part.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { appRoutes } from './app.routes';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { RegistrationComponent } from './components/sign/sign-registration/registration.component';
import { LoginComponent } from './components/sign/sign-login/login.component';
import { DynamicFormCardComponent } from './components/sign/shared/dynamic-form-card/dynamic-form-card.component';
import { CookieService } from 'ngx-cookie-service';
import { SignComponent } from './components/sign/sign.component';
import { MessagesComponent } from './components/chat/messages.component';
import { ChatPersonTileComponent } from './components/chat/person/chat-person-tile/chat-person-tile.component';
import { ChatPersonSearchComponent } from './components/chat/person/chat-person-search/chat-person-search.component';
import { ChatMessagesComponent } from './components/chat/messages/chat-messages/chat-messages.component';
import { ChatMessagesHeaderComponent } from './components/chat/messages/chat-messages-header/chat-messages-header.component';
import { ChatMessagesTextWriteComponent } from './components/chat/messages/chat-messages-text-write/chat-messages-text-write.component';
import { ChatPersonContainerComponent } from './components/chat/person/chat-person-container/chat-person-container.component';
import { ChatMessagesContainerComponent } from './components/chat/messages/chat-messages-container/chat-messages-container.component';
import { HttpRequestInterceptorService } from './services/iterceptor/http-request-interceptor.service';
import { AccountManagmentComponent } from './components/account-managment/account-managment.component';
import { AccountManagmentUserDetailsComponent } from './components/account-managment/account-managment-windows/account-managment-user-details/account-managment-user-details.component';
import { AccountManagmentCardComponent } from './components/account-managment/account-managment-card/account-managment-card.component';
import { AccountManagmentChangePasswordComponent } from './components/account-managment/account-managment-windows/account-managment-change-password/account-managment-change-password.component';
import { AccountManagmentThesisComponent } from './components/account-managment/account-managment-windows/account-managment-thesis/account-managment-thesis.component';
import { GlobalMessagesComponent } from './components/global-messages/global-messages.component';
import { ThesisComponent } from './components/thesis/thesis.component';
import { AddGlobalMessageComponent } from './components/global-messages/add-global-message/add-global-message.component';
import { GlobalMessagesListComponent } from './components/global-messages/global-messages-list/global-messages-list.component';
import { AddGlobalMessageFormComponent } from './components/global-messages/add-global-message/add-global-message-form/add-global-message-form.component';
import { GradePipe } from './pipes/Grade/grade.pipe';
import { SafePipe } from './pipes/SafeUrl/safe-uri.pipe';
import { ThesisGraduateViewComponent } from './components/thesis/thesis-view/thesis-graduate-view/thesis-graduate-view.component';
import { ThesisListComponent } from './components/thesis/thesis-list/thesis-list.component';
import { ThesisPromoterViewComponent } from './components/thesis/thesis-view/thesis-promoter-view/thesis-promoter-view.component';
import { ThesisGradesComponent } from './components/thesis/thesis-view/shared/thesis-grades/thesis-grades.component';
import { ThesisPdfViewerComponent } from './components/thesis/thesis-view/shared/thesis-pdf-viewer/thesis-pdf-viewer.component';
import { ThesisChangeGradeComponent } from './components/thesis/thesis-view/thesis-promoter-view/thesis-change-grade/thesis-change-grade.component';
import { ThesisAddCommentComponent } from './components/thesis/thesis-view/thesis-promoter-view/thesis-add-comment/thesis-add-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MessagesComponent,
    ChatPersonTileComponent,
    ChatPersonSearchComponent,
    ChatMessagesComponent,
    ChatMessagesHeaderComponent,
    ChatMessagesTextWriteComponent,
    ChatPersonContainerComponent,
    ChatMessagesContainerComponent,
    DynamicFormPartComponent,
    DefaultLayoutComponent,
    LoginLayoutComponent,
    RegistrationComponent,
    LoginComponent,
    DynamicFormCardComponent,
    GlobalMessagesComponent,
    SignComponent,
    AccountManagmentComponent,
    AccountManagmentUserDetailsComponent,
    AccountManagmentCardComponent,
    AccountManagmentChangePasswordComponent,
    AccountManagmentThesisComponent,
    ThesisComponent,
    AddGlobalMessageComponent,
    GlobalMessagesComponent,
    AddGlobalMessageFormComponent,
    GlobalMessagesListComponent,
    GradePipe,
    SafePipe,
    ThesisGraduateViewComponent,
    ThesisListComponent,
    ThesisPromoterViewComponent,
    ThesisGradesComponent,
    ThesisPdfViewerComponent,
    ThesisChangeGradeComponent,
    ThesisAddCommentComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    TooltipModule ,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptorService,
      multi: true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
