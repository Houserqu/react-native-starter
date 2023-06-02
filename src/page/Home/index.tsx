import {Link} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {LoginInfoState} from '../../model/user';
import {useQuery} from '@tanstack/react-query';
import {useRefreshOnFocus} from '../../hook/query';
import {getPapers} from '../../service/home';
import * as SplashScreen from 'expo-splash-screen';

export default function Home() {
  const [loginInfo] = useRecoilState(LoginInfoState);

  const baidu = useQuery({
    queryKey: [getPapers.name],
    queryFn: () => getPapers({}),
    onSuccess() {
      // 关闭启动屏
      SplashScreen.hideAsync();
    },
  });

  // screen 切换到激活状态时触发
  useRefreshOnFocus(baidu.refetch);

  return (
    <View>
      <Text>{loginInfo?.nickname}</Text>
      <Text>{JSON.stringify(baidu.data)}</Text>
      <Link to="/Me">to me</Link>
    </View>
  );
}
