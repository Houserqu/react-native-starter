import {ParamListBase, RouteProp} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';

type Props = {
  focused: boolean;
  route: RouteProp<ParamListBase, string>;
};

const RouteIcon: Record<string, any> = {
  Home: {
    active: require('../image/icon/home_active.png'),
    default: require('../image/icon/home.png'),
  },
  Shop: {
    active: require('../image/icon/shop_active.png'),
    default: require('../image/icon/shop.png'),
  },
  Me: {
    active: require('../image/icon/me_active.png'),
    default: require('../image/icon/me.png'),
  },
};

export default function TabBarIcon({route, focused}: Props) {
  return (
    <Image
      alt="Question"
      style={{width: 26, height: 26}}
      source={RouteIcon[route.name][focused ? 'active' : 'default']}
    />
  );
}
