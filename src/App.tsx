import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './page/Home';
import Me from './page/Me';
import {RecoilRoot} from 'recoil';
import NetInfo from '@react-native-community/netinfo';
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
  focusManager,
} from '@tanstack/react-query';
import {AppState, AppStateStatus, Platform} from 'react-native';
import './util/axios';
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootSiblingParent} from 'react-native-root-siblings';
import RecoilNexus from 'recoil-nexus';
import GlobalLoading from './component/GlobalLoading';
import * as SplashScreen from 'expo-splash-screen';

// @ts-ignore
Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

const Tab = createBottomTabNavigator();

// react query 相关
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
// 网络变化
onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

// 防止启动屏自动消失
SplashScreen.preventAutoHideAsync();

function App(): JSX.Element {
  // 监听 app focus，通知 react-query
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (status: AppStateStatus) => {
        if (Platform.OS !== 'web') {
          focusManager.setFocused(status === 'active');
        }
      },
    );
    return () => subscription.remove();
  }, []);

  return (
    <RecoilRoot>
      <RecoilNexus />
      <GlobalLoading />
      <RootSiblingParent>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Tab.Navigator initialRouteName="Home">
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Me" component={Me} />
            </Tab.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </RootSiblingParent>
    </RecoilRoot>
  );
}

export default App;
