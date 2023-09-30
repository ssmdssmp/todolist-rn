/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useAppSelector} from './App/store/types';
import store from './App/store/store';
import {Provider} from 'react-redux';
import {getTasksSelector} from './App/store/modules/tasks/selector';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [tasks, setTasks] = useState([]);
  const tasksRef = useRef(null);
  tasksRef.current = tasks;
  useEffect(() => {
    if (Platform.OS === 'ios') {
      auth()
        .createUserWithEmailAndPassword('test44@gmail.com', '123123132')
        .then(res => console.log('ios', res))
        .catch(err => console.log(err));
    } else {
      auth()
        .createUserWithEmailAndPassword('test220@gmail.com', '123123132')
        .then(res => console.log('android', res))
        .catch(err => console.log(err));
    }
    firestore()
      .collection('tasks')
      .get()
      .then(res => {
        res.docs.map(item => {
          setTasks(prev => [item.data(), ...prev]);
          console.log(tasksRef.current);
        });
      });
  }, []);
  const ReduxExample = () => {
    const {tasks} = useAppSelector(getTasksSelector);
    return (
      <View>
        <Text>{tasks.length}</Text>
      </View>
    );
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {tasks.length > 0 &&
            tasks.map(item => {
              return <Text>{item.title}</Text>;
            })}
        </View>
        <ReduxExample />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
