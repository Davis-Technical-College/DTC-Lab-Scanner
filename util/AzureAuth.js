import { useContext } from 'react';
import { AzureInstance, AzureLoginView } from '@shedaltd/react-native-azure-ad-2';

import { AuthContext } from '../store/auth-context';

const CREDENTIALS = {
  client_id: '3bbf6b84-2d32-4341-a6d7-d24b0280bed8',
  client_secret: 'dt68Q~6YsImCMuIQZ12iLgiLPDXabxYWwMF~Sbxc',
  redirect_uri: 'https://login.microsoftonline.com/common/oauth2/nativeclient',
  scope: 'User.Read',
};

// Secret: dt68Q~6YsImCMuIQZ12iLgiLPDXabxYWwMF~Sbxc

const Instance = new AzureInstance(CREDENTIALS);

function AzureAuth () {
  const authCtx = useContext(AuthContext);

  function onLoginSuccess() {
    Instance.getUserInfo().then(result => {
      const username = `${result.givenName} ${result.surname}`;
      const token = Instance.getToken().accessToken;
      authCtx.authenticate(token, 'user', username);
    }).catch(err => {
      console.log(err);
    });
  }

  function onLoginCancel() {
    console.log('Cancelled');
  }

  return (
    <AzureLoginView
      azureInstance={Instance}
      loadingMessage="Requesting access token"
      onSuccess={onLoginSuccess}
      onCancel={onLoginCancel}
      onFailure={() => console.log('Login failed')}
    />
  );
}

export default AzureAuth;
