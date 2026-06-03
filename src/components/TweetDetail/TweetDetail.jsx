import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import * as S from './TweetDetail.style'; 
import { IoArrowBackOutline } from 'react-icons/io5'; 
import { FiMoreHorizontal } from 'react-icons/fi';

// 🌟 [추가] 답글 아이콘 출력을 위해 아이콘 모듈 임포트
import {
  AiOutlineMessage,
  AiOutlineRetweet,
  AiOutlineHeart,
} from "react-icons/ai";
import { BiBookmark, BiBarChartAlt2 } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";

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
  const [replies, setReplies] = useState([]); 

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

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    onAddReply(tweet.tweetId, replyText).then(() => {
      fetchReplies(); 
      setReplyText(""); 
    });
  };

  if (!tweet) return <div style={{ padding: '20px', color: '#536471' }}>Loading...</div>;

  const formatDetailTime = (isoString) => {
    if (!isoString) return "Just now";
    const date = new Date(isoString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true 
    });
  };

  return (
    <S.DetailContainer>
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

      {/* 답글 목록 리스트 구역 */}
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

              {/* 🌟 [수정] 답글 텍스트 바로 하단에 아이콘 세트 대형 주입! */}
              <S.IconGroup style={{ maxWidth: "380px", marginTop: "8px" }}>
                <S.IconItem>
                  <AiOutlineMessage size={16} />
                  <span>{reply.replyCount ?? 0}</span>
                </S.IconItem>

                <S.IconItem>
                  <AiOutlineRetweet size={16} />
                  <span>{reply.retweetCount ?? 0}</span>
                </S.IconItem>

                <S.IconItem>
                  <AiOutlineHeart size={16} />
                  <span>{reply.likeCount ?? 0}</span>
                </S.IconItem>

                <S.IconItem>
                  <BiBarChartAlt2 size={16} />
                  <span>{reply.viewCount ?? 0}</span>
                </S.IconItem>

                <S.RightIcons>
                  <S.IconItem>
                    <BiBookmark size={16} />
                  </S.IconItem>
                  <S.IconItem>
                    <FiUpload size={16} />
                  </S.IconItem>
                </S.RightIcons>
              </S.IconGroup>

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