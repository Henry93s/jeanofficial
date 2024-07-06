import axios from 'axios';

const axiosCustom = axios.create({
  baseURL: 'http://localhost:3002',
  timeout: 10000,
});

// axios 에서 발생하는 에러를 프론트에서 따로 Alert 알림으로 처리하기 위함 -> interceptors
axiosCustom.interceptors.response.use(
  (response) => {
    return response;
  },
  (e) => {
    return e.response;
  }
);

export default axiosCustom;