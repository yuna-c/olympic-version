import { createContext, useContext } from 'react';

// 컨텍스트 객체 생성
export const OlympicContext = createContext();

// OlympicContext의 공급자 역할
export const OlympicProvider = ({ children }) => {
  return <OlympicContext.Provider value={{}}>{children}</OlympicContext.Provider>;
};

// Context를 쉽게 꺼내 쓰기 위한 헬퍼 함수(커스텀 훅)
export const useOlympicContext = useContext(OlympicContext);
