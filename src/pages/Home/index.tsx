import {Link} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {LoginInfoState} from '../../model/user';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {useRefreshOnFocus} from '../../hook/query';

export default function Home() {
  const [loginInfo] = useRecoilState(LoginInfoState);

  const baidu = useQuery({
    queryKey: ['Baidu'],
    queryFn: () => axios.get('https://www.baidu.com'),
    onSuccess() {
      console.log('request success');
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
