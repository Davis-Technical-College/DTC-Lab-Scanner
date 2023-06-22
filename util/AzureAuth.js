import { useContext } from 'react';
import { AzureInstance, AzureLoginView } from '@shedaltd/react-native-azure-ad-2';

import { AuthContext } from '../store/auth-context';

const CREDENTIALS = {
  client_id: '3bbf6b84-2d32-4341-a6d7-d24b0280bed8',
  client_secret: '0b7ed205-1dbb-4701-bd20-ea2b51887efe',
  redirect_uri: 'https://login.microsoftonline.com/common/oauth2/nativeclient',
  scope: 'User.Read',
};

const Instance = new AzureInstance(CREDENTIALS);

function AzureAuth () {
  const authCtx = useContext(AuthContext);

  function onLoginSuccess() {
    Instance.getUserInfo().then(result => {
      console.log(result);
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
      onFailure={console.log('failure')}
    />
  );
}

export default AzureAuth;
