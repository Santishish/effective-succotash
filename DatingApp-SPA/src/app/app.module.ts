import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import {AlertifyService} from './_services/alertify.service';
import {BsDatepickerModule, BsDropdownModule, ButtonsModule, PaginationModule, TabsModule} from 'ngx-bootstrap';
import {NgxGalleryModule} from 'ngx-gallery';
import {FileUploadModule} from 'ng2-file-upload';
import {TimeAgoPipe} from 'time-ago-pipe';

import {ErrorInterceptorProvider} from './_services/error.interceptor';
import {AppRoutingModule} from './app-routing.module';
import {appRoutes} from './routes';
import {AuthService} from './_services/auth.service';
import {UserService} from './_services/user.service';
import {AuthGuard} from './_guards/auth.guard';
import {PreventUnsavedChangesGuard} from './_guards/prevent-unsaved-changes.guard';
import {MemberDetailResolver} from './_resolvers/member-detail.resolver';
import {MemberListResolver} from './_resolvers/member-list.resolver';
import {MemberEditResolver} from './_resolvers/member-edit.resolver';

import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {MemberListComponent} from './members/member-list/member-list.component';
import {ListsComponent} from './lists/lists.component';
import {MessagesComponent} from './messages/messages.component';
import {MemberCardComponent} from './members/member-card/member-card.component';
import {MemberDetailComponent} from './members/member-detail/member-detail.component';
import {MemberEditComponent} from './members/member-edit/member-edit.component';
import {PhotoEditorComponent} from './members/photo-editor/photo-editor.component';
import {ListsResolver} from './_resolvers/lists.resolver';
import {MessagesResolver} from "./_resolvers/messages.resolver";
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    TimeAgoPipe,
    PhotoEditorComponent,
    MemberMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
    RouterModule.forRoot(appRoutes),
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChangesGuard,
    ListsResolver,
    MessagesResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
