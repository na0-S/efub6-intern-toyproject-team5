import React from 'react';
import TweetCard from '../TweetCard/TweetCard'; 
import * as S from './ProfilePage.style'; 

// 💡 부모(App.jsx)로부터 실시간 트윗 전체 상태와 삭제 함수를 넘겨받습니다.
function ProfilePage({ tweets = [], onDeleteTweet }) {
  
  // 💡 전체 트윗 중 "내가 작성한 트윗"만 자바스크립트 filter 함수로 추출합니다.
  // 백엔드에서 오는 데이터의 핸들러 명칭에 맞춰 검사합니다.
  const myTweets = Array.isArray(tweets) ? tweets.filter((tweet) => tweet.userHandler === "@efub_6th_toy" || tweet.userName === "송나영") : [];

  return (
    <S.ProfileContainer>
      <S.Header>
        <S.HeaderTitle>
          <h2>송나영</h2>
          {/* 💡 내가 작성한 진짜 트윗 개수가 실시간으로 상단에 표기됩니다. */}
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

      {/* 💡 가짜 대신 내가 필터링한 진짜 트윗 목록 출력 및 삭제 API 연동 */}
      {myTweets.map(tweet => (
        <TweetCard 
          key={tweet.tweetId} 
          tweet={tweet} 
          onDelete={onDeleteTweet} // 내 프로필에서도 바로 삭제 가능하도록 전송!
          isExpanded={false}
        />
      ))}
    </S.ProfileContainer>
  );
}

export default ProfilePage;