import axios from 'axios';
/* fetch 와 다른 axios 가장 큰 특징
                1. 자동 json 데이터 변환
                    res => res.json() 으로 변환하는 작업을 추가로 할 필요없이 바로 res.data 로 사용
                2. 인스턴스 를 생성하여 요청, 응답의 전역 설정 지원
                    axioscustom 인스턴스를 생성하여 요청에 대한 timeout 등의 전역 설정을 함
                3. 인터셉터(interceptors) 적용
                    axioscustom 인스턴스에 인터셉터를 적용하여 실제 200번대 코드 외 axios 에서 오류로 
                    판정하는 경우에도 응답을 직접 컨트롤할 수 있도록 설정함
*/

// axios 인스턴스 생성 및 옵션 설정
const axiosCustom = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// axios 응답 시 인터셉터 적용 작업
// -> axios 에서 발생하는 에러를 promise then 으로 받아, 따로 만든 Alert 알림으로 처리하기 위함
axiosCustom.interceptors.response.use(
  (response) => {
    return response;
  },
  (e) => {
    return e.response;
  }
);

export default axiosCustom;