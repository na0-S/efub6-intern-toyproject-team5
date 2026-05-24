import React, { useState } from 'react'; 
import styled from 'styled-components';
import { IoArrowBackOutline } from 'react-icons/io5'; 
import { FiMoreHorizontal } from 'react-icons/fi';

const DetailContainer = styled.div`
  flex: 1;
  max-width: 600px;
  min-height: 100vh;
  border-right: 1px solid #eff3f4; 
  background-color: #ffffff; 
  color: #0f1419; 
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 15px;
  border-bottom: 1px solid #eff3f4;
  font-size: 20px;
  font-weight: bold;
  color: #0f1419;
`;

const BackButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #0f1419;
`;

const MainPost = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eff3f4;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 12px;
`;

const BigAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #cfd9de; 
`;

const NameGroup = styled.div`
  display: flex;
  flex-direction: column;
  .name { font-weight: bold; font-size: 16px; color: #0f1419; }
  .handler { color: #536471; font-size: 15px; } 
`;

const LargeContent = styled.div`
  font-size: 22px; 
  line-height: 30px;
  margin-top: 20px;
  white-space: pre-wrap;
  color: #0f1419;
`;

const TimeStamp = styled.div`
  padding: 15px 0;
  color: #536471; 
  font-size: 15px;
  border-bottom: 1px solid #eff3f4;
  margin-top: 15px;
`;

/* 댓글 작성 구역 (Post your reply) */
const ReplyBox = styled.form` 
  display: flex;
  padding: 15px;
  gap: 12px;
  border-bottom: 1px solid #eff3f4;
  align-items: center;
`;

const ReplyInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: #0f1419;
  font-size: 18px;
  
  &::placeholder {
    color: #536471;
  }
`;

const ReplyButton = styled.button`
  background-color: #1d9bf0; 
  color: white;
  border: none;
  padding: 8px 16px;
  font-weight: bold;
  border-radius: 20px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #1a8cd8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const ReplyListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReplyItem = styled.div`
  display: flex;
  padding: 15px;
  gap: 12px;
  border-bottom: 1px solid #eff3f4;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const MiniDeleteButton = styled.button`
  background: none;
  border: none;
  color: #536471;
  font-size: 13px;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;

  &:hover {
    color: #f4212e;
    text-decoration: underline;
  }
`;


function TweetDetail({ tweet, onBack, onAddReply, onDeleteReply }) {
  const [replyText, setReplyText] = useState(""); 

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    onAddReply(tweet.id, replyText); 
    setReplyText(""); 
  };

  return (
    <DetailContainer>
      {/* 상단 네비게이션 헤더 */}
      <Header>
        <BackButton onClick={onBack}>
          <IoArrowBackOutline size={22} />
        </BackButton>
        <span>Post</span>
      </Header>

      {/* 본문 상세 내용 */}
      <MainPost>
        <UserRow>
          <UserInfo>
            <BigAvatar />
            <NameGroup>
              <span className="name">{tweet.userName}</span>
              <span className="handler">{tweet.userHandler}</span>
            </NameGroup>
          </UserInfo>
          <FiMoreHorizontal color="#536471" size={20} />
        </UserRow>

        <LargeContent>{tweet.content}</LargeContent>
        
        <TimeStamp>12:52 AM · May 11, 2026</TimeStamp>
      </MainPost>

      {/* 답글 입력창 영역 */}
      <ReplyBox onSubmit={handleReplySubmit}>
        <BigAvatar style={{ width: '40px', height: '40px' }} />
        <ReplyInput 
          placeholder="Post your reply" 
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <ReplyButton type="submit" disabled={!replyText.trim()}>
          Reply
        </ReplyButton>
      </ReplyBox>

      {/* 답글 리스트 실시간 조회 및 삭제 기능 */}
      <ReplyListContainer>
        {tweet.replies && tweet.replies.map((reply) => (
          <ReplyItem key={reply.id}>
            <BigAvatar style={{ width: '40px', height: '40px' }} />
            <ContentWrapper>
              <UserInfo style={{ gap: '8px' }}>
                <span className="name" style={{ fontWeight: 'bold' }}>{reply.userName}</span>
                <span className="handler" style={{ color: '#536471' }}>{reply.userHandler}</span>
              </UserInfo>
              <div style={{ fontSize: '16px', lineHeight: '22px', color: '#0f1419' }}>
                {reply.content}
              </div>
            </ContentWrapper>

            <MiniDeleteButton onClick={() => onDeleteReply(tweet.id, reply.id)}>
              Delete
            </MiniDeleteButton>
          </ReplyItem>
        ))}
      </ReplyListContainer>
    </DetailContainer>
  );
}

export default TweetDetail;