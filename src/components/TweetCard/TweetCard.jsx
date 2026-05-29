import React, { useState } from 'react';
import * as S from './TweetCard.style'; // 👈 짝꿍 스타일 임포트
import { FiMoreHorizontal } from 'react-icons/fi';

function TweetCard({ tweet, onDelete, onSelect, onAddReply, onDeleteReply, isExpanded }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onAddReply(tweet.id, replyText);
    setReplyText("");
  };

  return (
    <S.Wrapper> 
      {/* 카드 전체 클릭 시 상세조회 가동 */}
      <S.CardContainer onClick={() => onSelect(tweet)}>
        <S.Avatar />
        <S.ContentWrapper>
          <S.UserInfo>
            <span className="name">{tweet.userName}</span>
            <span className="handler">{tweet.userHandler}</span>
            <S.TimeText> · {tweet.timeText}</S.TimeText>
          </S.UserInfo>
          <S.Text>{tweet.content}</S.Text>
        </S.ContentWrapper>

        {/* 우측 상단 점 3개 옵션 아이콘 */}
        <S.MoreIconButton onClick={(e) => {
          e.stopPropagation(); // 모달 오픈 시 상세페이지 이동 차단
          setIsModalOpen(!isModalOpen);
        }}>
          <FiMoreHorizontal color="#71767b" size={18} />
        </S.MoreIconButton>

        {/* 대형 팝업 삭제 모달 */}
        {isModalOpen && (
          <S.ModalOverlay onClick={(e) => {
            e.stopPropagation(); // 백드롭 클릭 시 버그 방지
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
                  onDelete(tweet.id);    
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
        <S.ReplySection onClick={(e) => e.stopPropagation()}> {/* 중복 처리 버블링 차단 */}
          {/* [조회] 답글 목록 */}
          {tweet.replies && tweet.replies.map((reply) => (
            <S.ReplyItem key={reply.id}>
              <S.Avatar $mini />
              <S.ContentWrapper>
                <S.UserInfo style={{ gap: '6px' }}>
                  <span className="name" style={{ fontSize: '14px' }}>{reply.userName}</span>
                  <span className="handler" style={{ fontSize: '14px' }}>{reply.userHandler}</span>
                </S.UserInfo>
                <S.Text style={{ fontSize: '14px', marginTop: '2px' }}>{reply.content}</S.Text>
              </S.ContentWrapper>

              {/* [삭제] 답글 삭제 버튼 */}
              <S.MiniDeleteButton onClick={(e) => {
                e.stopPropagation(); 
                onDeleteReply(tweet.id, reply.id);
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