interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'JCRFycJUL7csrrOdHqo3W4R6hbYR8-U1',
  domain: 'ncoder13d.auth0.com',
  callbackURL: 'http://localhost:3000/callback'
};
