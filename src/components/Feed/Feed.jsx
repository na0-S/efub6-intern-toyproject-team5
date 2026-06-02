import React, { useState } from "react";
import TweetCard from "../TweetCard/TweetCard"; 
import * as S from "./Feed.style"; 

// 아이콘 임포트 구역
import { RiImageLine, RiFileGifLine, RiEmotionLine, RiCalendarTodoLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { CgPoll } from "react-icons/cg";

// 💡 부모(App.jsx)가 관리하는 데이터와 함수를 Props로 깔끔하게 받아옵니다.
function Feed({ tweets, onAddTweet, onDeleteTweet, onAddReply, onDeleteReply }) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // 💡 App.jsx의 axios 트윗 작성 API 함수 가동
    onAddTweet(inputText); 
    setInputText(""); // 입력창 리셋
  };

  return (
    <S.FeedContainer>
      <S.FeedHeader>Home</S.FeedHeader>

      {/* 트윗 입력 상자 */}
      <S.TweetBox onSubmit={handleSubmit}>
        <S.Avatar />
        <S.FormWrapper>
          <S.TextArea
            placeholder="What is happening?!"
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <S.ActionRow>
            <S.IconGroup>
              <S.IconButton type="button"><RiImageLine size={19} /></S.IconButton>
              <S.IconButton type="button"><RiFileGifLine size={19} /></S.IconButton>
              <S.IconButton type="button"><CgPoll size={21} /></S.IconButton>
              <S.IconButton type="button"><RiEmotionLine size={19} /></S.IconButton>
              <S.IconButton type="button"><RiCalendarTodoLine size={19} /></S.IconButton>
              <S.IconButton type="button"><IoLocationOutline size={19} /></S.IconButton>
            </S.IconGroup>

            <S.RightControls>
              {inputText.trim() && (
                <>
                  <S.ProgressCircle />
                  <S.VerticalDivider />
                  <S.CirclePlusButton type="button">+</S.CirclePlusButton>
                </>
              )}
              <S.PostButton type="submit" disabled={!inputText.trim()}>
                Post
              </S.PostButton>
            </S.RightControls>
          </S.ActionRow>
        </S.FormWrapper>
      </S.TweetBox>

      {/* 💡 백엔드 데이터베이스에서 불러온 진짜 트윗 목록 실시간 바인딩 */}
      {Array.isArray(tweets) ? (
        tweets.map((tweet) => (
          <TweetCard
            key={tweet.tweetId}
            tweet={tweet}
            onDeleteTweet={onDeleteTweet}
            onAddReply={onAddReply}
            onDeleteReply={onDeleteReply}
            isExpanded={false}
          />
        ))
    ) : (
    <div style={{ padding: '20px', color: '#536471' }}>트윗 데이터를 불러오는 중이거나 데이터 형식이 올바르지 않습니다.</div>
    )}


    </S.FeedContainer>
  );
}

export default Feed;
