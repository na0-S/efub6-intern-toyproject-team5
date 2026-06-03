import styled from 'styled-components';

export const DetailContainer = styled.div`
  flex: 1;
  max-width: 600px;
  min-height: 100vh;
  border-right: 1px solid #eff3f4; 
  background-color: #ffffff; 
  color: #0f1419; 
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 15px;
  border-bottom: 1px solid #eff3f4;
  font-size: 20px;
  font-weight: bold;
  color: #0f1419;
`;

export const BackButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #0f1419;
`;

export const MainPost = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eff3f4;
`;

export const UserRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  gap: 12px;
`;

export const BigAvatar = styled.div`
  width: ${props => props.$mini ? '40px' : '48px'};
  height: ${props => props.$mini ? '40px' : '48px'};
  border-radius: 50%;
  background-color: #cfd9de; 
  flex-shrink: 0;
`;

export const NameGroup = styled.div`
  display: flex;
  flex-direction: column;
  .name { font-weight: bold; font-size: 16px; color: #0f1419; }
  .handler { color: #536471; font-size: 15px; } 
`;

export const LargeContent = styled.div`
  font-size: 22px; 
  line-height: 30px;
  margin-top: 20px;
  white-space: pre-wrap;
  color: #0f1419;
`;

export const TimeStamp = styled.div`
  padding: 15px 0;
  color: #536471; 
  font-size: 15px;
  border-bottom: 1px solid #eff3f4;
  margin-top: 15px;
`;

export const ReplyBox = styled.form` 
  display: flex;
  padding: 15px;
  gap: 12px;
  border-bottom: 1px solid #eff3f4;
  align-items: center;
`;

export const ReplyInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: #0f1419;
  font-size: 18px;
  
  &::placeholder {
    color: #536471;
  }
`;

export const ReplyButton = styled.button`
  background-color: #1d9bf0; 
  color: white;
  border: none;
  padding: 8px 16px;
  font-weight: bold;
  border-radius: 20px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #1a8cd8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const ReplyListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReplyItem = styled.div`
  display: flex;
  padding: 15px;
  gap: 12px;
  border-bottom: 1px solid #eff3f4;
  position: relative;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const ReplyText = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #0f1419;
`;

export const MiniDeleteButton = styled.button`
  background: none;
  border: none;
  color: #536471;
  font-size: 13px;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;

  &:hover {
    color: #f4212e;
    text-decoration: underline;
  }
`;

export const IconGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  width: 100%;
  color: #536471;   
`;

export const IconItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s ease;

  svg {
    padding: 6px;
    border-radius: 50%;
    box-sizing: content-box;
    transition: background-color 0.2s ease;
  }

  &:hover {
    color: #1d9bf0; 
    svg { background-color: rgba(29, 155, 240, 0.1); }
  }
  &:nth-child(2):hover {
    color: #00ba7c;
    svg { background-color: rgba(0, 186, 124, 0.1); }
  }
  &:nth-child(3):hover {
    color: #f91880;
    svg { background-color: rgba(249, 24, 128, 0.1); }
  }
`;

export const RightIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  
  div:hover {
    color: #1d9bf0;
    svg { background-color: rgba(29, 155, 240, 0.1); }
  }
`;