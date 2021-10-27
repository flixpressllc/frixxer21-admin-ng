import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GoogleApiModule, NgGapiClientConfig, NG_GAPI_CONFIG } from 'ng-gapi';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FrixxerWidgetsModule } from './frixxer-widgets/frixxer-widgets.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BlockDefsComponent } from './pages/block-defs/block-defs.component';
import { CreateBlockDefComponent } from './pages/create-block-def/create-block-def.component';
import { UpdateBlockDefComponent } from './pages/update-block-def/update-block-def.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { PopupService } from './frixxer-widgets/popups/popup.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RequiresSignedInDirective } from './directives/requires-signed-in.directive';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: environment.clientId,
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: [
    'https://www.googleapis.com/auth/spreadsheets'
  ].join(' ')
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    BlockDefsComponent,
    CreateBlockDefComponent,
    UpdateBlockDefComponent,
    ToolbarComponent,
    RequiresSignedInDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    FrixxerWidgetsModule
  ],
  providers: [
    AuthService,
    PopupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
