import Spinner from 'react-native-loading-spinner-overlay/lib';
import {useRecoilState} from 'recoil';
import {LoadingState} from '../model/global';
import React from 'react';

export default function GlobalLoading() {
  const [loading] = useRecoilState(LoadingState);

  return (
    <Spinner
      visible={loading}
      textContent="加载中"
      textStyle={{color: '#fff', fontSize: 13, marginTop: -50}}
    />
  );
}
