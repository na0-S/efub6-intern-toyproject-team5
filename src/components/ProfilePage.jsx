import React from 'react';
import styled from 'styled-components';
import TweetCard from './TweetCard'; // 기존에 만든 트윗 카드 재사용

const ProfileContainer = styled.div`
  width: 600px;
  border-right: 1px solid #eff3f4;
  background-color: #ffffff;
`;

// 1. 헤더 (이름, 트윗 수)
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  height: 53px;
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  z-index: 10;
  gap: 30px;
`;

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  h2 { font-size: 19px; font-weight: 800; margin: 0; }
  span { font-size: 13px; color: #536471; }
`;

// 2. 배너 및 프로필 이미지
const Banner = styled.div`
  height: 200px;
  background-color: #cfd9de; /* 라이트 모드 기본 배너 색 */
`;

const ProfileImageArea = styled.div`
  padding: 12px 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  height: 70px;
`;

const LargeAvatar = styled.div`
  width: 134px;
  height: 134px;
  border-radius: 50%;
  background-color: #ccc;
  border: 4px solid #ffffff; /* 라이트 모드 배경과 구분선 */
  position: absolute;
  top: -70px;
  background-image: url('https://via.placeholder.com/150');
  background-size: cover;
`;

const EditButton = styled.button`
  background: none;
  border: 1px solid #cfd9de;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  margin-left: auto;
  &:hover { background-color: #eff3f4; }
`;

// 3. 유저 상세 정보
const UserInfo = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  h1 { font-size: 20px; font-weight: 800; margin: 0; }
  p.handler { color: #536471; margin: 0; }
  div.joined { color: #536471; font-size: 15px; }
`;

const FollowInfo = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #536471;
  span { color: #0f1419; font-weight: bold; }
`;

// 4. 탭 바 (Posts, Replies...)
const TabBar = styled.div`
  display: flex;
  border-bottom: 1px solid #eff3f4;
`;

const TabItem = styled.div`
  flex: 1;
  text-align: center;
  padding: 15px 0;
  font-weight: bold;
  color: ${props => props.$active ? '#0f1419' : '#536471'};
  cursor: pointer;
  position: relative;
  &:hover { background-color: #eff3f4; }
  ${props => props.$active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 56px;
      height: 4px;
      background-color: #1d9bf0;
      border-radius: 2px;
    }
  `}
`;

function ProfilePage() {
  // 내 데이터 샘플
  const myTweets = [
    { id: 101, userName: "송나영", userHandler: "@efub_6th_toy", content: "프로필 화면 구현 완료! ✌️" },
    { id: 102, userName: "송나영", userHandler: "@efub_6th_toy", content: "라이트 모드." }
  ];

  return (
    <ProfileContainer>
      <Header>
        <HeaderTitle>
          <h2>송나영</h2>
          <span>{myTweets.length} posts</span>
        </HeaderTitle>
      </Header>

      <Banner />

      <ProfileImageArea>
        <LargeAvatar />
        <EditButton>Edit profile</EditButton>
      </ProfileImageArea>

      <UserInfo>
        <div>
          <h1>송나영</h1>
          <p className="handler">@efub_6th_toy</p>
        </div>
        <div className="joined">📅 Joined January 2024</div>
        <FollowInfo>
          <div><span>0</span> Following</div>
          <div><span>0</span> Followers</div>
        </FollowInfo>
      </UserInfo>

      <TabBar>
        <TabItem $active>Posts</TabItem>
        <TabItem>Replies</TabItem>
        <TabItem>Highlights</TabItem>
        <TabItem>Media</TabItem>
        <TabItem>Likes</TabItem>
      </TabBar>

      {/* 내가 쓴 트윗 목록 출력 */}
      {myTweets.map(tweet => (
        <TweetCard key={tweet.id} tweet={tweet} onDelete={() => {}} />
      ))}
    </ProfileContainer>
  );
}

export default ProfilePage;