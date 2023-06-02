import axios from 'axios';
import {API_HOST} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import Toast from 'react-native-root-toast';
import {closeGlobalLoading, showGlobalLoading} from './toast';

/**
 * 初始化 axios 配置
 */

axios.defaults.baseURL = API_HOST;
axios.defaults.timeout = 10000;

axios.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token').catch();
  config.headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: token ? `Bearer ${token}` : '',
    'Client-ID': 'xxxx',
    'Client-Type': Platform.OS.toUpperCase(),
    ...config.headers,
  };

  // GET 请求，如果没有 data 值，axios 不会添加 Content-Type header
  if (config.method === 'get' && !config.data) {
    config.data = undefined;
  }

  // loading
  if (config.showLoading) {
    showGlobalLoading();
  }

  return config;
});

axios.interceptors.response.use(
  response => {
    const {
      data,
      config: {
        errMsg = true, // 错误提示信息（用于覆盖接口返回的提示信息）
        successMsg = false, // 成功提示信息（用于覆盖接口返回的提示信息）
        meta = false, // 是否返回完整响应体（用于需要自己判断成功失败的情况）
        showLoading, // 是否展示 loading
      },
    } = response;

    // 关闭 loading
    if (showLoading) {
      closeGlobalLoading();
    }

    // 返回完整响应体
    if (meta) {
      return data;
    }

    // 业务逻辑错误
    if (data.code !== 0) {
      if (errMsg) {
        Toast.show(
          typeof errMsg === 'string' ? errMsg : data.msg || '系统繁忙',
        );
      }

      throw new Error(data.msg);
    }

    if (successMsg) {
      Toast.show(
        typeof successMsg === 'string' ? successMsg : data.msg || '操作成功',
      );
    }

    return data.data;
  },
  err => {
    // 登录态校验失败
    if (err?.response?.status === 401) {
      // 如果配置了跳转登录，则跳转登录页
      if (err.response?.config?.redirectLogin) {
        // myHistory.push('/login');
      }
    } else {
      !err?.response?.config?.errMsg
        ? Toast.show(`网络异常（${err?.response?.status}）`, {
            position: Toast.positions.CENTER,
          })
        : '';
    }

    throw new Error(err);
  },
);

export default axios;
