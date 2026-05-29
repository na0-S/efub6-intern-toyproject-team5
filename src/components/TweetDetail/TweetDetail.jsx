import React, { useState } from 'react';
import * as S from './TweetDetail.style'; // 👈 짝꿍 스타일 임포트
import { IoArrowBackOutline } from 'react-icons/io5'; 
import { FiMoreHorizontal } from 'react-icons/fi';

function TweetDetail({ tweet, onBack, onAddReply, onDeleteReply }) {
  const [replyText, setReplyText] = useState(""); 

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    onAddReply(tweet.id, replyText); 
    setReplyText(""); 
  };

  return (
    <S.DetailContainer>
      {/* 상단 네비게이션 헤더 */}
      <S.Header>
        <S.BackButton onClick={onBack}>
          <IoArrowBackOutline size={22} />
        </S.BackButton>
        <span>Post</span>
      </S.Header>

      {/* 본문 상세 내용 */}
      <S.MainPost>
        <S.UserRow>
          <S.UserInfo>
            <S.BigAvatar />
            <S.NameGroup>
              <span className="name">{tweet.userName}</span>
              <span className="handler">{tweet.userHandler}</span>
            </S.NameGroup>
          </S.UserInfo>
          <FiMoreHorizontal color="#536471" size={20} />
        </S.UserRow>

        <S.LargeContent>{tweet.content}</S.LargeContent>
        
        <S.TimeStamp>12:52 AM · May 11, 2026</S.TimeStamp>
      </S.MainPost>

      {/* 답글 입력창 영역 */}
      <S.ReplyBox onSubmit={handleReplySubmit}>
        <S.BigAvatar $mini />
        <S.ReplyInput 
          placeholder="Post your reply" 
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <S.ReplyButton type="submit" disabled={!replyText.trim()}>
          Reply
        </S.ReplyButton>
      </S.ReplyBox>

      {/* 답글 리스트 실시간 조회 및 삭제 기능 */}
      <S.ReplyListContainer>
        {tweet.replies && tweet.replies.map((reply) => (
          <S.ReplyItem key={reply.id}>
            <S.BigAvatar $mini />
            <S.ContentWrapper>
              <S.UserInfo style={{ gap: '8px' }}>
                <span className="name" style={{ fontWeight: 'bold' }}>{reply.userName}</span>
                <span className="handler" style={{ color: '#536471' }}>{reply.userHandler}</span>
                <span style={{ color: '#536471', fontSize: '15px' }}> · {reply.timeText || "12:52 AM"}</span>
              </S.UserInfo>
              <S.ReplyText>
                {reply.content}
              </S.ReplyText>
            </S.ContentWrapper>

            <S.MiniDeleteButton onClick={() => onDeleteReply(tweet.id, reply.id)}>
              Delete
            </S.MiniDeleteButton>
          </S.ReplyItem>
        ))}
      </S.ReplyListContainer>
    </S.DetailContainer>
  );
}

export default TweetDetail;