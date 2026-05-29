import React, { useState } from "react";
import TweetCard from "../TweetCard/TweetCard";     // 👈 기존의 '/TweetCard' 뒤를 지우고 이렇게 수정
import TweetDetail from "../TweetDetail/TweetDetail"; // 👈 기존의 '/TweetDetail' 뒤를 지우고 이렇게 수정
import * as S from "./Feed.style";                  // 👈 짝꿍 스타일 파일 임포트

// 아이콘 임포트
import { RiImageLine, RiFileGifLine, RiEmotionLine, RiCalendarTodoLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { CgPoll } from "react-icons/cg";

function Feed() {
  const [tweets, setTweets] = useState([
    {
      id: 1,
      userName: "나영",
      userHandler: "@luxen0_",
      content: "안녕하세요",
      timeText: "12:52 AM",
      replies: [
        { id: 1001, userName: "퍼비", userHandler: "@pubpub", content: "안녕하세요!." },
      ],
    },
    {
      id: 2,
      userName: "이펍",
      userHandler: "@efub",
      content: "화이팅!",
      replies: [],
      timeText: "11:30 PM",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [selectedTweet, setSelectedTweet] = useState(null);

  const handleAddReply = (tweetId, replyContent) => {
    const newReply = {
      id: Date.now(),
      userName: "송나영",
      userHandler: "@efub_6th_toy",
      content: replyContent,
      timeText: "· 12:52 AM",
    };

    setTweets(
      tweets.map((tweet) => {
        if (tweet.id === tweetId) return { ...tweet, replies: [...(tweet.replies || []), newReply] };
        return tweet;
      })
    );

    if (selectedTweet && selectedTweet.id === tweetId) {
      setSelectedTweet((prev) => ({
        ...prev,
        replies: [...(prev.replies || []), newReply],
      }));
    }
  };

  const handleDeleteReply = (tweetId, replyId) => {
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === tweetId) {
        return {
          ...tweet,
          replies: (tweet.replies || []).filter((reply) => reply.id !== replyId),
        };
      }
      return tweet;
    });

    setTweets(updatedTweets);

    if (selectedTweet && selectedTweet.id === tweetId) {
      setSelectedTweet((prev) => ({
        ...prev,
        replies: (prev.replies || []).filter((reply) => reply.id !== replyId),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newTweet = {
      id: Date.now(),
      userName: "송나영",
      userHandler: "@efub_6th_toy",
      content: inputText,
      replies: [],
    };

    setTweets([newTweet, ...tweets]);
    setInputText("");
  };

  const handleDeleteTweet = (id) => {
    const filteredTweets = tweets.filter((tweet) => tweet.id !== id);
    setTweets(filteredTweets);
    if (selectedTweet && selectedTweet.id === id) setSelectedTweet(null);
  };

  if (selectedTweet) {
    return (
      <TweetDetail
        tweet={selectedTweet}
        onBack={() => setSelectedTweet(null)}
        onDelete={handleDeleteTweet}
        onAddReply={handleAddReply}
        onDeleteReply={handleDeleteReply}
      />
    );
  }

  return (
    <S.FeedContainer>
      <S.FeedHeader>Home</S.FeedHeader>

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
              <S.IconButton><RiImageLine size={19} /></S.IconButton>
              <S.IconButton><RiFileGifLine size={19} /></S.IconButton>
              <S.IconButton><CgPoll size={21} /></S.IconButton>
              <S.IconButton><RiEmotionLine size={19} /></S.IconButton>
              <S.IconButton><RiCalendarTodoLine size={19} /></S.IconButton>
              <S.IconButton><IoLocationOutline size={19} /></S.IconButton>
            </S.IconGroup>

            <S.RightControls>
              {inputText.trim() && (
                <>
                  <S.ProgressCircle />
                  <S.VerticalDivider />
                  <S.CirclePlusButton>+</S.CirclePlusButton>
                </>
              )}
              <S.PostButton type="submit" disabled={!inputText.trim()}>
                Post
              </S.PostButton>
            </S.RightControls>
          </S.ActionRow>
        </S.FormWrapper>
      </S.TweetBox>

      {tweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          onDelete={handleDeleteTweet}
          onSelect={(selected) => setSelectedTweet(selected)}
          onAddReply={handleAddReply}
          onDeleteReply={handleDeleteReply}
          isExpanded={false}
        />
      ))}
    </S.FeedContainer>
  );
}

export default Feed;
