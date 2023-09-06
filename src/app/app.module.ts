import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

export function kcFactory(kcService: KeycloakService){
    return () => kcService.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'test-realm',
        clientId: 'test-client'
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: true
      },
    }
    );
}
@NgModule({
  declarations: [
    AppComponent,
    UserComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [ 
    { 
      provide: APP_INITIALIZER, 
      useFactory: kcFactory,
      deps: [KeycloakService], 
      multi: true 
    }
  ],
  bootstrap: [ AppComponent],
  //entryComponents: [AppComponent, UserComponent]
})
export class AppModule { 
  constructor(private injctor: Injector){
    
  }
  ngDoBootstrap(){
    const userElement = createCustomElement(UserComponent, {injector: this.injctor});
    const appElement = createCustomElement(AppComponent, {injector: this.injctor});
    customElements.define('app-mfe-user', userElement);
    customElements.define('app-mfe', appElement);
  }
}
