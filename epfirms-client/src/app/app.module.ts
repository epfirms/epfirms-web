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
import { matterTabsReducer } from './store/matter-tabs/matter-tabs.reducer';
import { currentUserReducer } from './store/current-user/current-user.reducer';
import { MatterActivityInterceptor } from './shared/_interceptors/matter-activity.interceptor';
import { extModules } from 'src/environments/development/modules.dev';
import { InputMaskModule } from '@ngneat/input-mask';
import { popperVariation, TippyModule, withContextMenuVariation } from '@ngneat/helipopper';
import { TippyProps } from '@ngneat/helipopper/lib/tippy.types';
import { DialogModule } from '@ngneat/dialog';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: '/api',
  timeout: 50000, // request timeout
};

const tooltipConfig: Partial<TippyProps> = {
  theme: 'tomato',
  trigger: 'mouseenter focus',
  arrow: false,
  animation: 'shift-away-subtle',
  offset: [0, 5],
  duration: [150, 100]
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
    extModules,
    InputMaskModule,
    TippyModule.forRoot({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipConfig,
        popper: popperVariation,
        contextMenu: withContextMenuVariation(popperVariation)
      }
    }),
    DialogModule.forRoot()
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
