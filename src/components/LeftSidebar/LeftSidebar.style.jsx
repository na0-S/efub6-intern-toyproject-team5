import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarContainer = styled.nav`
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

export const TopMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MenuButton = styled(Link)`
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

  /* 활성화($active가 true)되면 800(완전 굵게), 아니면 500(보통 두께) */
  font-weight: ${props => props.$active ? '800' : '500'}; 

  &:hover {
    background-color: #e7e7e8;
  }

  span {
    margin-right: 8px;
  }
`;

export const SidebarPostButton = styled.button`
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

export const ProfileCard = styled.div`
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

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #cfd9de;
  flex-shrink: 0;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.3;
`;

export const UserName = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: #0f1419;
`;

export const UserHandler = styled.span`
  font-size: 15px;
  color: #9b9b9b;
`;