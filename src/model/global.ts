import {atom} from 'recoil';

export const LoadingState = atom<boolean>({
  key: 'Loading',
  default: false,
});
