import React, { useState } from 'react';
import styled from 'styled-components';
import { IoSearchOutline } from 'react-icons/io5'; 
import { FiMoreHorizontal } from 'react-icons/fi'; 

// 전체 컨테이너
const RightContainer = styled.aside`
  width: 350px;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
  background-color: #ffffff; /* 배경 흰색 */
  color: #0f1419; /* 글자색 검은색(X 오피셜 컬러) */
`;

// 1. 검색창 스타일 (라이트 모드 연회색)
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #eff3f4; /* 트위터 라이트 모드 검색창 배경 */
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
      color: #536471; /* 플레이스홀더 회색 */
    }
  }
`;

// 위젯 공통 카드 스타일 (프리미엄, 실트 박스 배경)
const WidgetCard = styled.div`
  background-color: #f7f9f9; /* 트위터 라이트 모드 박스 배경 */
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #eff3f4; /* 부드러운 테두리 선 */

  h2 {
    font-size: 20px;
    font-weight: 800;
    color: #0f1419;
  }
`;

// 2. 프리미엄 구독 스타일
const PremiumText = styled.p`
  font-size: 15px;
  line-height: 20px;
  font-weight: 700;
  color: #0f1419;
`;

const SubscribeButton = styled.button`
  background-color: #0f1419; /* 라이트 모드에서는 프리미엄 버튼이 검은색입니다! */
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
const TrendItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  padding: 6px 0;

  .category {
    font-size: 13px;
    color: #536471; /* 서브 텍스트 회색 */
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

function RightSidebar() {
  const [trends] = useState([
    { id: 1, category: "Music · Trending", title: "싱크로유", posts: "12.7K posts" },
    { id: 2, category: "Music · Trending", title: "#스트레이키즈", posts: "223K posts" },
    { id: 3, category: "Trending in South Korea", title: "티켓 양도", posts: "3,871 posts" },
    { id: 4, category: "Music · Trending", title: "#윤두준", posts: "8,094 posts" },
  ]);

  return (
    <RightContainer>
      {/* 검색 바 */}
      <SearchBox>
        <IoSearchOutline size={20} color="#536471" />
        <input type="text" placeholder="Search" />
      </SearchBox>

      {/* 프리미엄 구독 카드 */}
      <WidgetCard>
        <h2>Subscribe to Premium</h2>
        <PremiumText>
          Subscribe to unlock new features and if eligible, receive a share of ads revenue.
        </PremiumText>
        <SubscribeButton>Subscribe</SubscribeButton>
      </WidgetCard>

      {/* 실시간 트렌드 카드 */}
      <WidgetCard>
        <h2>Trends for you</h2>
        {trends.map((trend) => (
          <TrendItem key={trend.id}>
            <div>
              <div className="category">{trend.category}</div>
              <div className="title">{trend.title}</div>
              <div className="posts">{trend.posts}</div>
            </div>
            <FiMoreHorizontal color="#536471" size={18} />
          </TrendItem>
        ))}
      </WidgetCard>
    </RightContainer>
  );
}

export default RightSidebar;