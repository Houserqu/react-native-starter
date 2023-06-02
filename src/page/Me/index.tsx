import React from 'react';
import {Button, Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {LoginInfoState} from '../../model/user';

export default function Me() {
  const [loginInfo, setLoginInfo] = useRecoilState(LoginInfoState);

  return (
    <View>
      {loginInfo ? (
        <Text>{loginInfo.nickname}</Text>
      ) : (
        <Button onPress={() => setLoginInfo({nickname: 'tom'})} title="登录" />
      )}
    </View>
  );
}
