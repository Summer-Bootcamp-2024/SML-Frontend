import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

/**
 * Zustand 상태 관리를 위한 store를 생성합니다.
 * 이 store는 `apiUrl` 상태와 `setApiUrl` 액션을 관리합니다.
 * 
 * `apiUrl`은 API 요청을 보낼 기본 URL을 저장합니다.
 * `setApiUrl`은 `apiUrl` 상태를 업데이트하는 함수입니다.
 */
//api 주소
export const useApiUrlStore = create((set) => ({
  apiUrl: 'http://localhost:8000/api/v1',
  setApiUrl: (url) => set((state) => ({ ...state, apiUrl: url })),
}));

export const useUserIdStore = create(
  persist(
    (set) => ({
      user_id: 0,
      setUserId: (id) => set({ user_id: id }),
      logout: () => set({ user_id: 0 }), // 로그아웃 함수 추가
    }),
    {
      name: 'user_id', // 로컬 스토리지에 저장될 키 이름
      getStorage: () => localStorage, // 사용할 스토리지: localStorage
    }
  )
);

export const useIntroductionRequestStore = create((set, get) => ({
  introductionRequests: [],
  createIntroductionRequest: async (user_id, target_user_id, intermediary_user_id) => {
    const apiUrl = useApiUrlStore.getState().apiUrl;

    try {
      const response = await axios.post(`${apiUrl}/introduction_request/`, {
        user_id,
        target_user_id,
        intermediary_user_id
      });

      set((state) => ({
        introductionRequests: [...state.introductionRequests, response.data],
      }));
    } catch (err) {
      console.log(err.response.data);
      alert('소개 요청 실패');
    }
  }
    
}));
