import React from 'react';
import {ScrollView} from 'react-native';

type Props = {
  children: React.ReactNode;
};

export default function Page({children}: Props) {
  return <ScrollView>{children}</ScrollView>;
}
