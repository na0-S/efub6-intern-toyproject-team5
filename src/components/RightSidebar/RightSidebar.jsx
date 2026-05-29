import React, { useState } from 'react';
import * as S from './RightSidebar.style'; // 👈 짝꿍 스타일 임포트

// 아이콘 임포트
import { IoSearchOutline } from 'react-icons/io5'; 
import { FiMoreHorizontal } from 'react-icons/fi'; 

function RightSidebar() {
  const [trends] = useState([
    { id: 1, category: "Music · Trending", title: "싱크로유", posts: "12.7K posts" },
    { id: 2, category: "Music · Trending", title: "#스트레이키즈", posts: "223K posts" },
    { id: 3, category: "Trending in South Korea", title: "티켓 양도", posts: "3,871 posts" },
    { id: 4, category: "Music · Trending", title: "#윤두준", posts: "8,094 posts" },
  ]);

  return (
    <S.RightContainer>
      {/* 검색 바 */}
      <S.SearchBox>
        <IoSearchOutline size={20} color="#536471" />
        <input type="text" placeholder="Search" />
      </S.SearchBox>

      {/* 프리미엄 구독 카드 */}
      <S.WidgetCard>
        <h2>Subscribe to Premium</h2>
        <S.PremiumText>
          Subscribe to unlock new features and if eligible, receive a share of ads revenue.
        </S.PremiumText>
        <S.SubscribeButton>Subscribe</S.SubscribeButton>
      </S.WidgetCard>

      {/* 실시간 트렌드 카드 */}
      <S.WidgetCard>
        <h2>Trends for you</h2>
        {trends.map((trend) => (
          <S.TrendItem key={trend.id}>
            <div>
              <div className="category">{trend.category}</div>
              <div className="title">{trend.title}</div>
              <div className="posts">{trend.posts}</div>
            </div>
            <FiMoreHorizontal color="#536471" size={18} />
          </S.TrendItem>
        ))}
      </S.WidgetCard>
    </S.RightContainer>
  );
}

export default RightSidebar;