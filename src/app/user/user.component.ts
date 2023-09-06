import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../service/security-service';
import { KeycloakService } from 'keycloak-angular';
import { BackendService } from '../service/backend-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userData: string = '';

  constructor(
    public securityService: SecurityService,
    private kcService: KeycloakService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    // Listen for postMessage events from AngullarApp
    /*window.addEventListener('message', (event) => {
      if (event.origin === 'http://localhost:4200' && event.data.type === 'auth_token') {
        const token = event.data.token;

        // Initialize Keycloak with the received token
        this.kcService
          .init({
            config: {
              url: 'http://localhost:8080',
              realm: 'test-realm',
              clientId: 'test-client'
            },
            initOptions: {
              onLoad: 'check-sso',
              checkLoginIframe: true,
              token // Pass the token for initialization
            },
          })
          .then((authenticated) => {
            if (authenticated) {
              console.log('User is authenticated in Microfrontend');
            } else {
              console.log('User not authenticated in Microfrontend');
            }
          });
      }
    });*/

    this.backendService.getMicroserviceUser().subscribe(data => {
      this.userData = data;
    });
  }

  userRoles: string[] = this.securityService.kcService.getUserRoles(true);
}
