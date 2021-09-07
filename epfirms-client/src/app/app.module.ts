import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxStripeModule } from 'ngx-stripe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './shared/_interceptors/auth.interceptor';
import { ErrorInterceptor } from './shared/_interceptors/error.interceptor';
import { StoreModule } from '@ngrx/store';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { matterTabsReducer } from './store/matter-tabs/matter-tabs.reducer';
import { currentUserReducer } from './store/current-user/current-user.reducer';
import { MatterActivityInterceptor } from './shared/_interceptors/matter-activity.interceptor';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: '/api',
  timeout: 3000, // request timeout
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_NaQ0K78jrNRGyacbblmpM2RW00mvwDjEh6'),
    StoreModule.forRoot({matterTabs: matterTabsReducer, currentUser: currentUserReducer}, {}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MatterActivityInterceptor, multi: true },
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
