/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import store from './store/store';
import {Provider} from 'react-redux';

import {RootNavigator} from './navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {IOS_CLIENT_ID} from '@env';
function App(): JSX.Element {
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: IOS_CLIENT_ID,
    });
  }, []);

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
