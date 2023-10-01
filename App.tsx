/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef} from 'react';

import {Platform, Text, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from './App/store/types';
import store from './App/store/store';
import {Provider} from 'react-redux';
import {getTasksSelector} from './App/store/modules/tasks/selector';
import {tasksActions} from './App/store/modules';
import {RootNavigator} from './App/navigation';

function App(): JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'android') {
      firestore()
        .collection('tasks')
        .get()
        .then(res => {
          res.docs.map(item => {
            console.log(item.data());
            // dispatch(tasksActions.setTasks([item.data(), ...tasksRef.current]));
          });
        })
        .catch(err => console.log(err));
    }
  }, []);
  // useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     auth()
  //       .createUserWithEmailAndPassword('test44@gmail.com', '123123132')
  //       .then(res => console.log('ios', res))
  //       .catch(err => console.log(err));
  //   } else {
  //     auth()
  //       .createUserWithEmailAndPassword('test220@gmail.com', '123123132')
  //       .then(res => console.log('android', res))
  //       .catch(err => console.log(err));
  //   }
  // }, []);
  const ReduxExample = () => {
    const {tasks} = useAppSelector(getTasksSelector);
    const dispatch = useAppDispatch();
    const tasksRef = useRef(null);
    tasksRef.current = tasks;
    useEffect(() => {}, []);
    return (
      <View>
        {tasksRef.current &&
          tasksRef.current.length > 0 &&
          tasksRef.current.map(item => {
            return <Text>{item.title}</Text>;
          })}
      </View>
    );
  };

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
