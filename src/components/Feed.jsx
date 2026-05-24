import React, { useState } from "react";
import styled from "styled-components";
import TweetCard from "./TweetCard";
import TweetDetail from "./TweetDetail";

// react-icons에서 트위터 하단 바와 비슷한 아이콘들 임포트
import {
  RiImageLine,
  RiFileGifLine,
  RiEmotionLine,
  RiCalendarTodoLine,
} from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { CgPoll } from "react-icons/cg";

const FeedContainer = styled.main`
  flex: 1;
  max-width: 600px;
  border-right: 1px solid #eff3f4;
  background-color: #ffffff;
`;

const FeedHeader = styled.div`
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #eff3f4;
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  z-index: 10;
`;

const TweetBox = styled.form`
  display: flex;
  padding: 15px;
  gap: 12px;
  border-bottom: 1px solid #eff3f4;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #cfd9de;
  flex-shrink: 0;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  font-size: 20px;
  color: #0f1419;
  outline: none;
  font-family: inherit;
  padding-top: 4px;

  &::placeholder {
    color: #536471;
  }
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eff3f4;
  padding-top: 12px;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const IconButton = styled.div`
  color: #0f1419;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: background 0.2s;

  &:hover {
    background-color: #eff3f4;
  }
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProgressCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #eff3f4;
  border-top: 2px solid #0f1419;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 24px;
  background-color: #cfd9de;
`;

const CirclePlusButton = styled.div`
  border: 1px solid #cfd9de;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1d9bf0;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

const PostButton = styled.button`
  background-color: #0f1419;
  color: white;
  border: none;
  padding: 8px 18px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #9b9b9b;
  }

  &:disabled {
    background-color: #bcbcbc;
    cursor: default;
  }
`;

function Feed() {
  // 초기 데이터셋 생성 (새 트윗 등록 시에도 자동으로 빈 replies 배열 할당 보장)
  const [tweets, setTweets] = useState([
    {
      id: 1,
      userName: "나영",
      userHandler: "@luxen0_",
      content: "안녕하세요",
      timeText: "12:52 AM",
      replies: [
        {
          id: 1001,
          userName: "퍼비",
          userHandler: "@pubpub",
          content: "안녕하세요!.",
        },
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

  // 답글 작성 함수
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
        if (tweet.id === tweetId) {
          return { ...tweet, replies: [...(tweet.replies || []), newReply] };
        }
        return tweet;
      }),
    );

    // 만약 상세페이지가 켜져 있다면 상세페이지 데이터도 실시간 동기화
    if (selectedTweet && selectedTweet.id === tweetId) {
      setSelectedTweet((prev) => ({
        ...prev,
        replies: [...(prev.replies || []), newReply],
      }));
    }
  };

  // 답글 삭제 함수
  const handleDeleteReply = (tweetId, replyId) => {
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === tweetId) {
        return {
          ...tweet,
          replies: (tweet.replies || []).filter(
            (reply) => reply.id !== replyId,
          ),
        };
      }
      return tweet;
    });

    setTweets(updatedTweets);

    // 상세페이지가 켜져 있다면 삭제 상태도 실시간 업데이트
    if (selectedTweet && selectedTweet.id === tweetId) {
      setSelectedTweet((prev) => ({
        ...prev,
        replies: (prev.replies || []).filter((reply) => reply.id !== replyId),
      }));
    }
  };

  // 신규 트윗 게시 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newTweet = {
      id: Date.now(),
      userName: "송나영",
      userHandler: "@efub_6th_toy",
      content: inputText,
      replies: [], // 처음 만들 때 무조건 replies 배열을 초기화
    };

    setTweets([newTweet, ...tweets]);
    setInputText("");
  };

  // 트윗 삭제 함수
  const handleDeleteTweet = (id) => {
    const filteredTweets = tweets.filter((tweet) => tweet.id !== id);
    setTweets(filteredTweets);
    if (selectedTweet && selectedTweet.id === id) setSelectedTweet(null);
  };

  // 상세 트윗 보기(TweetDetail) 활성화 시 스위칭 구역
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
    <FeedContainer>
      <FeedHeader>Home</FeedHeader>

      <TweetBox onSubmit={handleSubmit}>
        <Avatar />
        <FormWrapper>
          <TextArea
            placeholder="What is happening?!"
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <ActionRow>
            <IconGroup>
              <IconButton>
                <RiImageLine size={19} />
              </IconButton>
              <IconButton>
                <RiFileGifLine size={19} />
              </IconButton>
              <IconButton>
                <CgPoll size={21} />
              </IconButton>
              <IconButton>
                <RiEmotionLine size={19} />
              </IconButton>
              <IconButton>
                <RiCalendarTodoLine size={19} />
              </IconButton>
              <IconButton>
                <IoLocationOutline size={19} />
              </IconButton>
            </IconGroup>

            <RightControls>
              {inputText.trim() && (
                <>
                  <ProgressCircle />
                  <VerticalDivider />
                  <CirclePlusButton>+</CirclePlusButton>
                </>
              )}
              <PostButton type="submit" disabled={!inputText.trim()}>
                Post
              </PostButton>
            </RightControls>
          </ActionRow>
        </FormWrapper>
      </TweetBox>

      {tweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          onDelete={handleDeleteTweet}
          onSelect={(selected) => setSelectedTweet(selected)}
          onAddReply={handleAddReply}
          onDeleteReply={handleDeleteReply}
          isExpanded={false} // 피드 메인에서는 댓글 박스를 상시 숨기고 클릭 시 넘어가도록 false 설정
        />
      ))}
    </FeedContainer>
  );
}

export default Feed;
