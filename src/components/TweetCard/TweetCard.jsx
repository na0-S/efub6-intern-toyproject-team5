import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 1. 라우터 이동 기능을 위해 임포트
import * as S from './TweetCard.style'; 
import { FiMoreHorizontal } from 'react-icons/fi';

import { AiOutlineMessage, AiOutlineRetweet, AiOutlineHeart } from 'react-icons/ai';
import { BiBookmark, BiBarChartAlt2 } from 'react-icons/bi';
import { FiUpload } from 'react-icons/fi';

// 💡 부모 컴포넌트 구조 변경에 맞추어 필요 없어진 onSelect는 과감히 걷어냅니다.
function TweetCard({ tweet, onDeleteTweet, onAddReply, onDeleteReply, isExpanded }) {
  const navigate = useNavigate(); // 👈 2. 내비게이션 훅 선언
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onAddReply(tweet.tweetId, replyText);
    setReplyText("");
  };

  return (
    <S.Wrapper> 
      {/* 👈 3. 카드 클릭 시 상태 변경 대신 고유 ID 주소로 내비게이션 튕겨주기 */}
      <S.CardContainer onClick={() => navigate(`/post/${tweet.tweetId}`)}>
        <S.Avatar />
        <S.ContentWrapper>
          <S.UserInfo>
            {/* 백엔드 API 명세서 구조에 프로필 유저 정보 필드가 비어있거나 다를 경우를 대비한 예외 처리 내장 */}
            <span className="name">{tweet.author?.username || "익명"}</span>
            <span className="handler">{tweet.author?.handle || "@user"}</span>
            <S.TimeText> · {tweet.timeText || "Just now"}</S.TimeText>
          </S.UserInfo>
          <S.Text>{tweet.content}</S.Text>
          <S.IconGroup>
            {/* 답글 (Reply) */}
            <S.IconItem onClick={(e) => e.stopPropagation()}>
              <AiOutlineMessage size={18} />
              <span>{tweet.replyCount ?? 0}</span>
            </S.IconItem>

            {/* 리트윗 (Retweet) */}
            <S.IconItem onClick={(e) => e.stopPropagation()}>
              <AiOutlineRetweet size={18} />
              <span>{tweet.retweetCount ?? 0}</span>
            </S.IconItem>

            {/* 좋아요 (Like) */}
            <S.IconItem onClick={(e) => e.stopPropagation()}>
              <AiOutlineHeart size={18} />
              <span>{tweet.likeCount ?? 0}</span>
            </S.IconItem>

            {/* 조회수 (View) */}
            <S.IconItem onClick={(e) => e.stopPropagation()}>
              <BiBarChartAlt2 size={18} style={{ transform: 'rotate(0deg)' }} /> 
              <span>{tweet.viewCount ?? 0}</span>
            </S.IconItem>

            {/* 북마크 및 공유하기 (우측 정렬용 서브 그룹) */}
            <S.RightIcons>
              <S.IconItem onClick={(e) => e.stopPropagation()}>
                <BiBookmark size={18} />
              </S.IconItem>
              <S.IconItem onClick={(e) => e.stopPropagation()}>
                <FiUpload size={18} />
              </S.IconItem>
            </S.RightIcons>
          </S.IconGroup>
        </S.ContentWrapper>

        {/* 우측 상단 점 3개 옵션 아이콘 */}
        <S.MoreIconButton onClick={(e) => {
          e.stopPropagation(); // 모달 오픈 시 상세페이지 주소로 튕기는 현상(버블링) 완벽 차단
          setIsModalOpen(!isModalOpen);
        }}>
          <FiMoreHorizontal color="#71767b" size={18} />
        </S.MoreIconButton>

        {/* 대형 팝업 삭제 모달 */}
        {isModalOpen && (
          <S.ModalOverlay onClick={(e) => {
            e.stopPropagation(); 
            setIsModalOpen(false);
          }}>
            <S.DeleteConfirmModalBox onClick={(e) => e.stopPropagation()}>
              <S.ModalTextGroup>
                <S.ModalTitle>Delete post?</S.ModalTitle>
                <S.ModalDescription>
                  This can't be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results.
                </S.ModalDescription>
              </S.ModalTextGroup>

              <S.ModalButtonGroup>
                <S.PrimaryDeleteButton onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTweet(tweet.tweetId);    // 💡 App.jsx의 axios 트윗 삭제 API 가동
                  setIsModalOpen(false);  
                }}>
                  Delete
                </S.PrimaryDeleteButton>

                <S.SecondaryCancelButton onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}>
                  Cancel
                </S.SecondaryCancelButton>
              </S.ModalButtonGroup>
            </S.DeleteConfirmModalBox>
          </S.ModalOverlay>
        )}
      </S.CardContainer>

      {/* 받아온 isExpanded 값에 따라 조건부 렌더링 정상 작동 */}
      {isExpanded && (
        <S.ReplySection onClick={(e) => e.stopPropagation()}>
          {/* [조회] 답글 목록 */}
          {tweet.replies && tweet.replies.map((reply) => (
            <S.ReplyItem key={reply.replyId}>
              <S.Avatar $mini />
              <S.ContentWrapper>
                <S.UserInfo style={{ gap: '6px' }}>
                  <span className="name" style={{ fontSize: '14px' }}>{reply.author?.username || "익명"}</span>
                  <span className="handler" style={{ fontSize: '14px' }}>{reply.author?.handle || "@user"}</span>
                  <span style={{ color: '#536471', fontSize: '14px' }}> · {reply.createdAt || "Just now"}</span>
                </S.UserInfo>
                <S.Text style={{ fontSize: '14px', marginTop: '2px' }}>{reply.content}</S.Text>
              </S.ContentWrapper>

              {/* [삭제] 답글 삭제 버튼 */}
              <S.MiniDeleteButton onClick={(e) => {
                e.stopPropagation(); 
                onDeleteReply(tweet.tweetId, reply.replyId); // 💡 App.jsx의 axios 답글 삭제 API 가동
              }}>
                Delete
              </S.MiniDeleteButton>
            </S.ReplyItem>
          ))}

          {/* [작성] 답글 입력 폼 */}
          <S.ReplyInputForm onSubmit={handleReplySubmit} onClick={(e) => e.stopPropagation()}>
            <S.Avatar $mini />
            <S.ReplyInput
              type="text"
              placeholder="Post your reply"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <S.ReplySubmitButton type="submit" disabled={!replyText.trim()}>
              Reply
            </S.ReplySubmitButton>
          </S.ReplyInputForm>
        </S.ReplySection>
      )}
    </S.Wrapper>
  );
}

export default TweetCard;