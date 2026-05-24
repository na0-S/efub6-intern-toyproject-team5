import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import TwitterLogoImg from '../assets/X-logo.png';
import { FiMoreHorizontal } from 'react-icons/fi'; 
import { RiHome7Fill, RiSearchLine, RiNotification3Line, RiMailLine, RiFileList2Line, RiBookmarkLine, RiUser3Line, RiTwitterXFill } from 'react-icons/ri';
import { BiNavigation, BiGroup } from 'react-icons/bi';
import { CgMoreO } from 'react-icons/cg';

const SidebarContainer = styled.nav`
  width: 275px;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #eff3f4;
  height: 100vh;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  box-sizing: border-box;
`;

const TopMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// 💡 여기서 $active 속성(Prop)을 받아서 스타일을 동적으로 제어합니다!
const MenuButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 11px 16px;
  font-size: 19px;
  cursor: pointer;
  border-radius: 30px;
  margin: 2px 0;
  transition: background 0.2s;
  color: #0f1419;
  text-decoration: none;
  width: fit-content;

  /* 🎯 핵심 수정: 활성화($active가 true)되면 800(완전 굵게), 아니면 500(보통 두께) */
  font-weight: ${props => props.$active ? '800' : '500'}; 

  &:hover {
    background-color: #e7e7e8;
  }

  span {
    margin-right: 8px;
  }
`;

/* Post 버튼 스타일 */
const SidebarPostButton = styled.button`
  background-color: #1d9bf0;
  color: white;
  border: none;
  font-size: 17px;
  font-weight: 800;
  width: 90%;
  padding: 14px 0;
  border-radius: 30px;
  margin-top: 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #1a8cd8;
  }
`;

/* 👤 하단 유저 프로필 카드 스타일 */
const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: #eff3f4;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #cfd9de;
  flex-shrink: 0;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.3;
`;

const UserName = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: #0f1419;
`;

const UserHandler = styled.span`
  font-size: 15px;
  color: #9b9b9b;
`;


function LeftSidebar() {
  const location = useLocation(); // 현재 주소창의 상태 수집

  return (
    <SidebarContainer>
      <TopMenuWrapper>
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
        
        {/* 🏠 Home: 주소가 '/home'일 때만 글씨가 두꺼워짐 */}
        <MenuButton to="/home" $active={location.pathname === '/home'}>
          <RiHome7Fill size={26} />
          <span>Home</span>
        </MenuButton>
        
        {/* 다른 메뉴들은 주소가 없으므로 $active가 무조건 false가 되어 '보통 두께' 유지 */}
        <MenuButton to="#" $active={false}>
          <RiSearchLine size={26} />
          <span>Explore</span>
        </MenuButton>
        
        <MenuButton to="#" $active={false}>
          <RiNotification3Line size={26} />
          <span>Notifications</span>
        </MenuButton>
        
        <MenuButton to="#" $active={false}>
          <RiMailLine size={26} />
          <span>Messages</span>
        </MenuButton>
        
        <MenuButton to="#" $active={false}>
          <BiNavigation size={26} />
          <span>Grok</span>
        </MenuButton>
        
        <MenuButton to="#" $active={false}>
          <RiFileList2Line size={26} />
          <span>Lists</span>
        </MenuButton>
        
        <MenuButton to="#" $active={false}>
          <RiBookmarkLine size={26} />
          <span>Bookmarks</span>
        </MenuButton>
        
        <MenuButton to="#" $active={false}>
          <BiGroup size={26} />
          <span>Communities</span>
        </MenuButton>
        
        <MenuButton to="#" $active={false}>
          <RiTwitterXFill size={24} /> 
          <span>Premium</span>
        </MenuButton>
        
        {/* 👤 Profile: 주소가 '/profile'일 때만 글씨가 두꺼워짐 */}
        <MenuButton to="/profile" $active={location.pathname === '/profile'}>
          <RiUser3Line size={26} />
          <span>Profile</span>
        </MenuButton>
        
        <MenuButton to="#" $active={false}>
          <CgMoreO size={26} />
          <span>More</span>
        </MenuButton>

        <SidebarPostButton>Post</SidebarPostButton>
      </TopMenuWrapper>

      <ProfileCard>
        <ProfileInfo>
          <Avatar />
          <TextGroup>
            <UserName>송나영</UserName>
            <UserHandler>@efub_6th_toy</UserHandler>
          </TextGroup>
        </ProfileInfo>
        <FiMoreHorizontal size={18} color="#0f1419" />
      </ProfileCard>
    </SidebarContainer>
  );
}

export default LeftSidebar;