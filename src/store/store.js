import { create } from 'zustand';

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
  userId: null,
  setUserId: (id) => set({userId:id}),
}));