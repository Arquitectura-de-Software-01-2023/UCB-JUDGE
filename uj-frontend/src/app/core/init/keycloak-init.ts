import { KeycloakService } from "keycloak-angular";
import { environment } from 'src/environments/environment';

export function initializer(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.KEYCLOAK_URL,
        realm: environment.KEYCLOAK_REALM,
        clientId: environment.KEYCLOAK_CLIENT_ID
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false
      }
    });
}

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8090',
        realm: 'ucb-judge',
        clientId: 'frontend',
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
      },
      bearerExcludedUrls: ['register', 'error'],
    });
}
