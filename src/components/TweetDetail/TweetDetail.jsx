import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 👈 직접 통신하기 위해 추가!
import * as S from './TweetDetail.style'; 
import { IoArrowBackOutline } from 'react-icons/io5'; 
import { FiMoreHorizontal } from 'react-icons/fi';

const BASE_URL = 'https://efub-6th-toy.p-e.kr';
const AUTH_HEADERS = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': '1',
    'Auth-id': '1',
  }
};

function TweetDetail({ tweet, onBack, onAddReply, onDeleteReply }) {
  const [replyText, setReplyText] = useState(""); 
  const [replies, setReplies] = useState([]); // 👈 답글만 따로 관리하는 상태 상자 생성!

  // 1. 상세 페이지가 켜지면, 이 트윗에 달린 답글만 쏙 긁어옵니다.
  const fetchReplies = () => {
    if (!tweet?.tweetId) return;
    axios.get(`${BASE_URL}/tweets/${tweet.tweetId}/replies`, AUTH_HEADERS)
      .then((res) => {
        setReplies(res.data.replies || []);
      })
      .catch((err) => console.error("답글 로드 실패:", err));
  };

  useEffect(() => {
    fetchReplies();
  }, [tweet?.tweetId]);

  // 2. 답글 등록할 때
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    onAddReply(tweet.tweetId, replyText).then(() => {
      fetchReplies(); // 등록 성공하면 답글 목록만 새로고침!
      setReplyText(""); 
    });
  };

  if (!tweet) return <div style={{ padding: '20px', color: '#536471' }}>Loading...</div>;

  // 💡 ISO 시간 문자열을 "2026년 6월 2일 오후 8:28" 형태로 바꿔주는 예쁜 함수
const formatDetailTime = (isoString) => {
  if (!isoString) return "Just now";
  
  const date = new Date(isoString);
  
  // 한국 시간 및 원하는 표기 스타일에 맞게 옵션 설정
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true // 오후/오전 표시
  });
};

  return (
    <S.DetailContainer>
      {/* ... 상단 헤더 및 본문 영역 (기존과 동일) ... */}
      <S.Header>
        <S.BackButton onClick={onBack}><IoArrowBackOutline size={22} /></S.BackButton>
        <span>Post</span>
      </S.Header>

      <S.MainPost>
        <S.UserRow>
          <S.UserInfo>
            <S.BigAvatar />
            <S.NameGroup>
              <span className="name">{tweet.author?.username || "익명"}</span>
              <span className="handler">{tweet.author?.handle || "@user"}</span>
            </S.NameGroup>
          </S.UserInfo>
          <FiMoreHorizontal color="#536471" size={20} />
        </S.UserRow>
        <S.LargeContent>{tweet.content}</S.LargeContent>
        <S.TimeStamp>{formatDetailTime(tweet.createdAt)}</S.TimeStamp>
      </S.MainPost>

      {/* 답글 입력창 */}
      <S.ReplyBox onSubmit={handleReplySubmit}>
        <S.BigAvatar $mini />
        <S.ReplyInput 
          placeholder="Post your reply" 
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <S.ReplyButton type="submit" disabled={!replyText.trim()}>Reply</S.ReplyButton>
      </S.ReplyBox>

      {/* 🌟 이제 tweet.replies 대신, 방금 따로 불러온 'replies' 변수로 화면을 그립니다! */}
      <S.ReplyListContainer>
        {replies.map((reply) => (
          <S.ReplyItem key={reply.replyId}>
            <S.BigAvatar $mini />
            <S.ContentWrapper>
              <S.UserInfo style={{ gap: '8px' }}>
                <span className="name" style={{ fontWeight: 'bold' }}>{reply.author?.username || "익명"}</span>
                <span className="handler" style={{ color: '#536471' }}>{reply.author?.handle || "@user"}</span>
                <span style={{ color: '#536471', fontSize: '15px' }}> · {formatDetailTime(reply.createdAt)}</span>
              </S.UserInfo>
              <S.ReplyText>{reply.content}</S.ReplyText>
            </S.ContentWrapper>

            <S.MiniDeleteButton onClick={() => onDeleteReply(tweet.tweetId, reply.replyId).then(() => fetchReplies())}>
              Delete
            </S.MiniDeleteButton>
          </S.ReplyItem>
        ))}
      </S.ReplyListContainer>
    </S.DetailContainer>
  );
}

export default TweetDetail;