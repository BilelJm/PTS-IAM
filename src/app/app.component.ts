import { Component } from '@angular/core';
import { SecurityService } from './service/security-service';
import { BackendService } from './service/backend-service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-app';
  constructor(public securityService: SecurityService) { }

  public async ngOnInit() {

  }

  onLogout() {
    this.securityService.kcService.logout(window.location.origin);
  }
 
  public async getToken() {
  }

  async login(){
    await this.securityService.kcService.login({
      redirectUri : window.location.origin
    })
    console.log("login");
  }
}
