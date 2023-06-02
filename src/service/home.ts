import axios from 'axios';

export const getPapers = (params: any) =>
  axios.get('/api/may_auth/papers/get_papers', {params});
