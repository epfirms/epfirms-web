import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
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
import { popperVariation, TippyModule } from '@ngneat/helipopper';
import { TippyProps } from '@ngneat/helipopper/lib/tippy.types';
import { DialogModule } from '@ngneat/dialog';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { QuillModule } from 'ngx-quill';
import { AutocompleteModule } from './shared/autocomplete/autocomplete.module';
import { HotToastModule } from '@ngneat/hot-toast';
import ImageCompress from 'quill-image-compress';
import { ModalModule } from './shared/modal/modal.module';
import { MatterTabsEffects } from './store/matter-tabs/matter-tabs.effects';
import { CurrentUserEffects } from './store/current-user/current-user.effects';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: '/api',
  timeout: 50000, // request timeout
};

const tooltipConfig: Partial<TippyProps> = {
  theme: 'tooltip-dark',
  trigger: 'mouseenter focus',
  arrow: false,
  animation: 'shift-away-subtle',
  offset: [0, 0],
  duration: [50, 25],
  delay: [500, 0]
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
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AutocompleteModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_NaQ0K78jrNRGyacbblmpM2RW00mvwDjEh6'),
    StoreModule.forRoot({matterTabs: matterTabsReducer, currentUser: currentUserReducer}, {}),
    EffectsModule.forRoot([MatterTabsEffects, CurrentUserEffects]),
    EntityDataModule.forRoot(entityConfig),
    QuillModule.forRoot({
      modules: {
        toolbar: quillConfig,
        imageCompress: {
          quality: 0.7
        }
      },
      customModules: [
        {
          implementation: ImageCompress,
          path: 'modules/imageCompress'
        }
      ],
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
      enableClose: false,
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
    HotToastModule.forRoot({
      position: 'top-right',
      className: 'duration-300 ease-out hot-toast-w',
      style: {
        'color': 'rgb(15, 23, 42)',
        'font-weight': '500',
        'font-size': '0.875rem',
        'background-color': 'rgb(255, 255, 255)',
        'border-radius': '0.5rem',
        'overflow': 'hidden',
        'width': '24rem',
        'max-width': '24rem',
        'padding': '1rem',
        'box-shadow': '0 0 0 0px #fff, 0 0 0 1px rgba(0, 0, 0, .05), 0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      },
      iconTheme: {
        'primary': 'rgb(255, 255, 255)',
        'secondary': 'rgb(52,211,153)'
      },
      dismissible: true,
    }),
    ModalModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MatterActivityInterceptor, multi: true },
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
