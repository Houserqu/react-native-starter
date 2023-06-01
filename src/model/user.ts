import {atom} from 'recoil';

export const LoginInfoState = atom<LoginInfo | null>({
  key: 'LoginInfo',
  default: null,
});
