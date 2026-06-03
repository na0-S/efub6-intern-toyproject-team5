import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import * as S from './LeftSidebar.style'; // 👈 짝꿍 스타일 임포트

// 이미지 및 아이콘 임포트
import TwitterLogoImg from '../../assets/X-logo.png'; // 👈 폴더가 한 단계 깊어졌으므로 ../../로 경로 수정!
import { FiMoreHorizontal } from 'react-icons/fi'; 
import { RiHome7Fill, RiSearchLine, RiNotification3Line, RiMailLine, RiFileList2Line, RiBookmarkLine, RiUser3Line, RiTwitterXFill } from 'react-icons/ri';
import { BiNavigation, BiGroup } from 'react-icons/bi';
import { CgMoreO } from 'react-icons/cg';

function LeftSidebar() {
  const location = useLocation(); // 현재 주소창의 상태 수집

  return (
    <S.SidebarContainer>
      <S.TopMenuWrapper>
        {/* 로고 영역 */}
        <Link to="/home" style={{ display: 'inline-block', width: 'fit-content' }}>
          <img 
            src={TwitterLogoImg} 
            alt="Twitter Logo" 
            style={{ 
              width: '28px',       
              height: '28px', 
              marginBottom: '12px', 
              paddingLeft: '14px', 
              cursor: 'pointer',
              objectFit: 'contain' 
            }} 
          />
        </Link>
        
        {/* Home: 주소가 '/home'일 때만 활성화 */}
        <S.MenuButton to="/home" $active={location.pathname === '/home'}>
          <RiHome7Fill size={26} />
          <span>Home</span>
        </S.MenuButton>
        
        <S.MenuButton to="#" $active={false}>
          <RiSearchLine size={26} />
          <span>Explore</span>
        </S.MenuButton>
        
        <S.MenuButton to="#" $active={false}>
          <RiNotification3Line size={26} />
          <span>Notifications</span>
        </S.MenuButton>
        
        <S.MenuButton to="#" $active={false}>
          <RiMailLine size={26} />
          <span>Messages</span>
        </S.MenuButton>
        
        <S.MenuButton to="#" $active={false}>
          <BiNavigation size={26} />
          <span>Grok</span>
        </S.MenuButton>
        
        <S.MenuButton to="#" $active={false}>
          <RiFileList2Line size={26} />
          <span>Lists</span>
        </S.MenuButton>
        
        <S.MenuButton to="#" $active={false}>
          <RiBookmarkLine size={26} />
          <span>Bookmarks</span>
        </S.MenuButton>
        
        <S.MenuButton to="#" $active={false}>
          <BiGroup size={26} />
          <span>Communities</span>
        </S.MenuButton>
        
        <S.MenuButton to="#" $active={false}>
          <RiTwitterXFill size={24} /> 
          <span>Premium</span>
        </S.MenuButton>
        
        {/* Profile: 주소가 '/profile'일 때만 활성화 */}
        <S.MenuButton to="/profile" $active={location.pathname === '/profile'}>
          <RiUser3Line size={26} />
          <span>Profile</span>
        </S.MenuButton>
        
        <S.MenuButton to="#" $active={false}>
          <CgMoreO size={26} />
          <span>More</span>
        </S.MenuButton>

        <S.SidebarPostButton>Post</S.SidebarPostButton>
      </S.TopMenuWrapper>

      <S.ProfileCard>
        <S.ProfileInfo>
          <S.Avatar />
          <S.TextGroup>
            <S.UserName>나영</S.UserName>
            <S.UserHandler>@luxen0</S.UserHandler>
          </S.TextGroup>
        </S.ProfileInfo>
        <FiMoreHorizontal size={18} color="#0f1419" />
      </S.ProfileCard>
    </S.SidebarContainer>
  );
}

export default LeftSidebar;