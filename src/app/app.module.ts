import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { NewsComponent } from './news/news.component';
import { LoginComponent, RegisterDialog } from './login/login.component';

import { AdminComponent } from './admin/admin.component';
import { MensaComponent } from './mensa/mensa.component';
import { EventsComponent } from './events/events.component';
import { JwtGuard } from './jwt.guard';
import { SocketioService } from './socketio.service';


// Modules

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

// Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSidenavModule,
} from '@angular/material/sidenav';
import {
  MatListModule,
} from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateLoader, TranslateModule, TranslateService } from
  '@ngx-translate/core';
import { I18nModule } from './i18n/i18n.module';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    NewsComponent,
    LoginComponent,
    RegisterDialog,
    SelectLanguageComponent,
    AdminComponent,
    MensaComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: StartComponent },
      { path: 'news', component: NewsComponent },
     { path: 'admin', component: AdminComponent, canActivate: [JwtGuard] },
      { path: 'login', component: LoginComponent },
      {path: 'mensa', component: MensaComponent },
      {path: 'events', component: EventsComponent }
    ]),
    
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    I18nModule,
    MatPaginatorModule ],
  exports: [
    RouterModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [LoginComponent, RegisterDialog],
  providers: [SocketioService,], 
  bootstrap: [AppComponent,]
})
export class AppModule { }
