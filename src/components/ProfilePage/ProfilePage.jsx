import React from 'react';
import TweetCard from '../TweetCard/TweetCard'; // 👈 💡 패턴 B 구조에 맞게 폴더 경로 수정!
import * as S from './ProfilePage.style';       // 👈 짝꿍 스타일 파일 임포트

function ProfilePage() {
  // 내 데이터 샘플
  const myTweets = [
    { id: 101, userName: "송나영", userHandler: "@efub_6th_toy", content: "프로필 화면 구현 완료! ✌️", timeText: "12:52 AM" },
    { id: 102, userName: "송나영", userHandler: "@efub_6th_toy", content: "라이트 모드.", timeText: "11:30 PM" }
  ];

  return (
    <S.ProfileContainer>
      <S.Header>
        <S.HeaderTitle>
          <h2>송나영</h2>
          <span>{myTweets.length} posts</span>
        </S.HeaderTitle>
      </S.Header>

      <S.Banner />

      <S.ProfileImageArea>
        <S.LargeAvatar />
        <S.EditButton>Edit profile</S.EditButton>
      </S.ProfileImageArea>

      <S.UserInfo>
        <div>
          <h1>송나영</h1>
          <p className="handler">@efub_6th_toy</p>
        </div>
        <div className="joined">📅 Joined January 2024</div>
        <S.FollowInfo>
          <div><span>0</span> Following</div>
          <div><span>0</span> Followers</div>
        </S.FollowInfo>
      </S.UserInfo>

      <S.TabBar>
        <S.TabItem $active>Posts</S.TabItem>
        <S.TabItem>Replies</S.TabItem>
        <S.TabItem>Highlights</S.TabItem>
        <S.TabItem>Media</S.TabItem>
        <S.TabItem>Likes</S.TabItem>
      </S.TabBar>

      {/* 내가 쓴 트윗 목록 출력 */}
      {myTweets.map(tweet => (
        <TweetCard 
          key={tweet.id} 
          tweet={tweet} 
          onDelete={() => {}} 
          onSelect={() => {}} // 👈 TweetCard에 주입할 빈 함수 매핑 유지
        />
      ))}
    </S.ProfileContainer>
  );
}

export default ProfilePage;