import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxStripeModule } from 'ngx-stripe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { StoreModule } from '@ngrx/store';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { EffectsModule } from '@ngrx/effects';
import { matterTabsReducer } from './store/matter-tabs/matter-tabs.reducer';
import { currentUserReducer } from './store/current-user/current-user.reducer';
import { MatterActivityInterceptor } from './core/interceptors/matter-activity.interceptor';
import { extModules } from 'src/environments/development/modules.dev';
import { InputMaskModule } from '@ngneat/input-mask';
import { popperVariation, TippyModule, withContextMenuVariation } from '@ngneat/helipopper';
import { TippyProps } from '@ngneat/helipopper/lib/tippy.types';
import { DialogModule } from '@ngneat/dialog';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { QuillConfig, QuillModule, QuillToolbarConfig } from 'ngx-quill';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: '/api',
  timeout: 50000, // request timeout
};

const tooltipConfig: Partial<TippyProps> = {
  theme: 'tooltip-dark',
  trigger: 'mouseenter focus',
  arrow: false,
  animation: 'shift-away-subtle',
  offset: [0, 5],
  duration: [150, 100]
};

const dropdownConfig: Partial<TippyProps> = {
  theme: 'dropdown-light',
  trigger: 'click focus',
  interactive: true,
  arrow: false,
  animation: 'shift-away-subtle',
  offset: [0, 5],
  duration: [150, 100],
  placement: 'bottom'
};

const quillConfig = [
  ['bold', 'italic', 'underline'],
  ['blockquote'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  ['image']
]

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
    QuillModule.forRoot({
      modules: {
        toolbar: quillConfig
      },
      format: 'json'
    }),
    extModules,
    InputMaskModule,
    TippyModule.forRoot({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipConfig,
        popper: popperVariation,
        dropdown: {
          ...dropdownConfig,
          appendTo: "parent",
        }
      }
    }),
    DialogModule.forRoot({
      closeButton: false,
      confirm: {
        component: ConfirmDialogComponent
      },
      sizes: {
        sm: {
          width: '24rem'
        },
        md: {
          width: '36rem'
        },
        lg: {
          width: '56rem'
        },
        fullScreen: {
          height: '100vh',
          width: '100vw'
        },
        slideOver: {
          height: '100vh',
          width: '28rem'
        },
        lgSlideOver: {
          height: '100vh',
          width: '42rem'
        }
      }
    }),
    PdfJsViewerModule
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
