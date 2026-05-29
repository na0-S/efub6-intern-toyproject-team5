import styled from 'styled-components';

// 전체 컨테이너
export const RightContainer = styled.aside`
  width: 350px;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
  background-color: #ffffff;
  color: #0f1419;
`;

// 1. 검색창 스타일 (라이트 모드 연회색)
export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #eff3f4;
  padding: 12px 16px;
  border-radius: 30px;
  
  input {
    background: none;
    border: none;
    color: #0f1419;
    font-size: 15px;
    width: 100%;
    outline: none;

    &::placeholder {
      color: #536471;
    }
  }
`;

// 위젯 공통 카드 스타일 (프리미엄, 실트 박스 배경)
export const WidgetCard = styled.div`
  background-color: #f7f9f9;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #eff3f4;

  h2 {
    font-size: 20px;
    font-weight: 800;
    color: #0f1419;
  }
`;

// 2. 프리미엄 구독 스타일
export const PremiumText = styled.p`
  font-size: 15px;
  line-height: 20px;
  font-weight: 700;
  color: #0f1419;
`;

export const SubscribeButton = styled.button`
  background-color: #0f1419;
  color: #ffffff;
  border: none;
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.2s;

  &:hover {
    background-color: #272c30;
  }
`;

// 3. 실시간 트렌드 아이템 스타일
export const TrendItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  padding: 6px 0;

  .category {
    font-size: 13px;
    color: #536471;
  }
  .title {
    font-size: 15px;
    font-weight: bold;
    color: #0f1419;
    margin-top: 2px;
  }
  .posts {
    font-size: 13px;
    color: #536471;
    margin-top: 4px;
  }
`;