import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: 'e247d685-ec14-40c6-aa18-aead0c560c61',
  clientId: 'f3a8d078-d439-4d03-94ac-17734cba22a3',
  endpoints: {
    api: 'https://sstackmay.crm.dynamics.com/',
  },
  cacheLocation: 'localStorage',
}

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
console.log(authContext);