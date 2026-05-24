import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // 👈 1. 라우터 부품 임포트
import LeftSidebar from './components/LeftSidebar';
import Feed from './components/Feed';
import ProfilePage from './components/ProfilePage'; // 👈 2. 프로필 페이지 임포트
import RightSidebar from './components/RightSidebar';

const MainLayout = styled.div`
  display: flex;
  max-width: 1250px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #ffffff; /* 라이트 모드 보장 */
`;

function App() {
  return (
    <Router> {/* 전체를 Router로 감싸주기 */}
      <MainLayout>
        {/* 왼쪽 사이드바는 주소가 바뀌어도 늘 고정 */}
        <LeftSidebar />
        
        {/* 👈 4. 기존 <Feed /> 자리에 Routes를 넣고 주소에 따라 화면을 스위칭 */}
        <Routes>
          {/* 기본 주소(/)로 들어오면 자동으로 /home으로 리다이렉트 */}
          <Route path="/" element={<Navigate to="/home" />} />
          
          {/* /home 일 때는 기존 홈 피드 화면 */}
          <Route path="/home" element={<Feed />} />
          
          {/* /profile 일 때는 내 프로필 조회 화면 */}
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        
        {/* 오른쪽 사이드바도 주소가 바뀌어도 늘 고정 */}
        <RightSidebar />
      </MainLayout>
    </Router>
  );
}

export default App;