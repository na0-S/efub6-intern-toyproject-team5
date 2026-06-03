import styled from 'styled-components';

export const Wrapper = styled.div`
  border-bottom: 1px solid #eff3f4;
`;

export const CardContainer = styled.div`
  padding: 15px;
  display: flex;
  gap: 12px;
  position: relative;
  cursor: pointer;
`;

export const Avatar = styled.div`
  width: ${props => props.$mini ? '32px' : '40px'};
  height: ${props => props.$mini ? '32px' : '40px'};
  border-radius: 50%;
  background-color: #ccc;
  flex-shrink: 0;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const UserInfo = styled.div`
  display: flex;
  gap: 8px;
  span.name { font-weight: bold; }
  span.handler { color: #536471; }
`;

export const Text = styled.p`
  line-height: 20px;
  margin: 0;
`;

export const TimeText = styled.span`
  color: #536471;
  font-size: 15px;
`;

export const MoreIconButton = styled.div`
  cursor: pointer;
  padding: 4px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(91, 112, 131, 0.4);
  backdrop-filter: blur(2px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DeleteConfirmModalBox = styled.div`
  background-color: #000000;
  width: 320px;
  padding: 32px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ModalTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #f7f9f9;
  margin: 0;
`;

export const ModalDescription = styled.p`
  font-size: 15px;
  line-height: 20px;
  color: #71767b;
  margin: 0;
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const BaseModalButton = styled.button`
  width: 100%;
  padding: 12px 0;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
`;

export const PrimaryDeleteButton = styled(BaseModalButton)`
  background-color: #f4212e;
  color: #ffffff;
  &:hover { background-color: #d11e28; }
`;

export const SecondaryCancelButton = styled(BaseModalButton)`
  background-color: #000000;
  color: #ffffff;
  border: 1px solid #536471;
  &:hover { background-color: #16181c; }
`;

export const ReplySection = styled.div`
  background-color: #f7f9f9;
  border-top: 1px solid #eff3f4;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ReplyItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f1f3f4;
  position: relative;
  &:last-child { border-bottom: none; }
`;

/* 🌟 [추가] 답글창 전용 우측 콘텐츠 영역 (유령 레이아웃 파괴용 핵심 처방) */
export const ReplyContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0; /* 자식 아이콘 그룹이 자리를 잡을 수 있게 가로 공간을 강제로 확장합니다 */
`;

export const ReplyInputForm = styled.form`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

export const ReplyInput = styled.input`
  flex: 1;
  border: 1px solid #cfd9de;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 15px;
  outline: none;
  background-color: #ffffff;
  &:focus { border-color: #1d9bf0; }
`;

export const ReplySubmitButton = styled.button`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const MiniDeleteButton = styled.button`
  background: none;
  border: none;
  color: #536471;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 0;
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
  max-width: 425px; 
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
    padding: 8px;
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