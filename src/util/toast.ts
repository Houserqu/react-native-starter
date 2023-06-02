import {setRecoil} from 'recoil-nexus';
import {LoadingState} from '../model/global';

export const showGlobalLoading = () => {
  setRecoil(LoadingState, true);
};

export const closeGlobalLoading = () => {
  setRecoil(LoadingState, false);
};
