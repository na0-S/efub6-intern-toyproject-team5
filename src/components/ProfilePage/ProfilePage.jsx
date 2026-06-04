import React from 'react';
import TweetCard from '../TweetCard/TweetCard'; 
import * as S from './ProfilePage.style'; 

//부모(App.jsx)로부터 실시간 트윗 전체 상태와 삭제 함수를 넘겨받음.
function ProfilePage({ tweets = [], onDeleteTweet }) {
  
  // 전체 트윗 중 "내가 작성한 트윗"만 자바스크립트 filter 함수로 추출
  // 백엔드에서 오는 데이터의 핸들 명칭에 맞춰 검사
  const myTweets = Array.isArray(tweets) 
    ? tweets.filter((tweet) => 
        tweet.author?.handle === "luxen0" || 
        tweet.author?.handle === "@luxen0" || 
        tweet.author?.username === "나영"
      ) 
    : [];

  return (
    <S.ProfileContainer>
      <S.Header>
        <S.HeaderTitle>
          <h2>나영</h2>
          {/* 내가 작성한 진짜 트윗 개수가 실시간으로 상단에 표기*/}
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
          <h1>나영</h1>
          <p className="handler">@luxen0</p>
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

      <S.TweetListContainer>
        {myTweets.length === 0 ? (
          // 💡 명세서 조건: 작성한 트윗이 0개일 때 띄워줄 예쁜 안내창
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#536471' }}>
            <h3 style={{ color: '#0f1419', marginBottom: '8px' }}>작성한 트윗이 없습니다</h3>
            <p>나만의 이야기를 트윗으로 공유해 보세요!</p>
          </div>
        ) : (
          // 💡 내가 쓴 트윗이 있다면 홈 피드처럼 한 칸씩 뿌려줍니다!
          myTweets.map((tweet) => (
            <TweetCard 
              key={tweet.tweetId} 
              tweet={tweet} 
              onDeleteTweet={onDeleteTweet} 
            />
          ))
        )}
      </S.TweetListContainer>
    </S.ProfileContainer>
  );
}

export default ProfilePage;