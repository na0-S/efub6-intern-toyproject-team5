import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMoreHorizontal } from 'react-icons/fi';

const CardContainer = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eff3f4;
  display: flex;
  gap: 12px;
  position: relative;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 8px;
  span.name { font-weight: bold; }
  span.handler { color: #536471; }
`;

const Text = styled.p`
  line-height: 20px;
`;



// 1. 화면 전체를 어둡고 투명하게 덮으면서 뒤쪽 피드를 흐리게 만드는 오버레이
const ModalOverlay = styled.div`
  position: fixed; /* 브라우저 화면 전체를 기준으로 고정 */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(91, 112, 131, 0.4);
  backdrop-filter: blur(2px); /* 뒤쪽 배경을 부드럽게 블러 처리 */
  z-index: 999; /* 화면 최상단에 띄우기 */
  display: flex;
  justify-content: center; /* 가로 가운데 정렬 */
  align-items: center; /* 세로 가운데 정렬 */
`;



// 중앙의 둥근 블랙 컨텐츠 박스

const DeleteConfirmModalBox = styled.div`
  background-color: #000000; /* 완전 블랙 배경 */
  width: 320px; /* 캡처본 비율에 맞춘 너비 */
  padding: 32px; /* 넉넉한 내부 여백 */
  border-radius: 16px; /* 둥근 모서리 */
  display: flex;
  flex-direction: column;
  gap: 24px; /* 텍스트와 버튼 집합 사이의 간격 */
`;



const ModalTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;



const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #f7f9f9; /* 캡처본 속 흰색 타이틀 */
  margin: 0;
`;



const ModalDescription = styled.p`
  font-size: 15px;
  line-height: 20px;
  color: #71767b; /* 캡처본 속 어두운 그레이 설명문 */
  margin: 0;
`;



// 3. 버튼 2개를 위아래로 배치하기 위한 묶음 박스

const ModalButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;



const BaseModalButton = styled.button`
  width: 100%;
  padding: 12px 0;
  border-radius: 9999px; /* 트위터 특유의 알약 모양 완전 둥근 버튼 */
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
`;



// 4. 선명한 빨간색 Delete 버튼

const PrimaryDeleteButton = styled(BaseModalButton)`
  background-color: #f4212e;
  color: #ffffff;

  &:hover {
    background-color: #d11e28;
  }

`;



// 5. 어두운 테두리가 있는 Cancel 버튼
const SecondaryCancelButton = styled(BaseModalButton)`
  background-color: #000000;
  color: #ffffff;
  border: 1px solid #536471; /* 어두운 그레이 테두리 */

  &:hover {
    background-color: #16181c;
  }

`;



// 답글 전체를 감싸는 구역

const ReplySection = styled.div`
  background-color: #f7f9f9;
  border-top: 1px solid #eff3f4;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;



// 개별 답글 하나하나의 디자인

const ReplyItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f1f3f4;
  position: relative;
 
  &:last-child {
    border-bottom: none;
  }

`;



// 답글 입력 폼
const ReplyInputForm = styled.form`
  display: flex;
  gap: 12px;
  margin-top: 8px;

`;

const ReplyInput = styled.input`
  flex: 1;
  border: 1px solid #cfd9de;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 15px;
  outline: none;
  background-color: #ffffff;

  &:focus {
    border-color: #1d9bf0;
  }

`;



const ReplySubmitButton = styled.button`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

`;



// 답글 우측 미니 삭제 버튼

const MiniDeleteButton = styled.button`
  background: none;
  border: none;
  color: #536471;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 0;

  &:hover {
    color: #f4212e;
    text-decoration: underline;
  }

`;
const TimeText = styled.span`
  color: #536471;
  font-size: 15px;
`;





// 'isExpanded'를 Props 받아오는 인자값에 꼭 추가해 주어야 에러가 나지 않음!

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
    <div style={{ borderBottom: '1px solid #eff3f4' }}>     
      {/* 카드 자체를 클릭했을 때 상세조회(onSelect)가 가동되도록 여기에 이벤트를 연결 */}
      <CardContainer onClick={() => onSelect(tweet)} style={{ borderBottom: 'none', cursor: 'pointer' }}>
        <Avatar />
        <ContentWrapper>
          <UserInfo>
            <span className="name">{tweet.userName}</span>
            <span className="handler">{tweet.userHandler}</span>
            <TimeText> · {tweet.timeText}</TimeText>
          </UserInfo>
          <Text>{tweet.content}</Text>
        </ContentWrapper>

       

        {/* 우측 상단 점 3개 아이콘 */}

        <div style={{ cursor: 'pointer', padding: '4px' }} onClick={(e) => {
          e.stopPropagation(); // 삭제 모달을 켤 때는 상세 조회창이 열리지 않도록 방지
          setIsModalOpen(!isModalOpen);
        }}>

          <FiMoreHorizontal color="#71767b" size={18} />

        </div>



        {/* 대형 팝업 삭제 모달 */}

        {isModalOpen && (
          <ModalOverlay onClick={(e) => {
            e.stopPropagation(); // 오버레이 클릭 시 부모 카드가 닫히거나 선택되는 버그 방지
            setIsModalOpen(false);
          }}>

            <DeleteConfirmModalBox onClick={(e) => e.stopPropagation()}>
              <ModalTextGroup>
                <ModalTitle>Delete post?</ModalTitle>
                <ModalDescription>
                  This can't be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results.
                </ModalDescription>
              </ModalTextGroup>



              <ModalButtonGroup>
                <PrimaryDeleteButton onClick={(e) => {
                  e.stopPropagation();
                  onDelete(tweet.id);    
                  setIsModalOpen(false);  
                }}>
                  Delete
                </PrimaryDeleteButton>

             

                <SecondaryCancelButton onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}>
                  Cancel
                </SecondaryCancelButton>
              </ModalButtonGroup>
            </DeleteConfirmModalBox>
          </ModalOverlay>
        )}
      </CardContainer>



      {/* 받아온 isExpanded 값에 따라 조건부 렌더링이 정상 작동 */}

      {isExpanded && (
        <ReplySection onClick={(e) => e.stopPropagation()}> {/* 답글창 영역 클릭 시 상세창이 중복 처리되지 않도록 버블링 방지 */}
          {/* [조회] 답글 목록 */}
          {tweet.replies && tweet.replies.map((reply) => (
            <ReplyItem key={reply.id}>
              <Avatar style={{ width: '32px', height: '32px' }} />
              <ContentWrapper>
                <UserInfo style={{ gap: '6px' }}>
                  <span className="name" style={{ fontSize: '14px' }}>{reply.userName}</span>
                  <span className="handler" style={{ fontSize: '14px' }}>{reply.userHandler}</span>
                </UserInfo>
                <Text style={{ fontSize: '14px', marginTop: '2px' }}>{reply.content}</Text>
              </ContentWrapper>

             

          {/* [삭제] 답글 삭제 버튼 */}

            <MiniDeleteButton onClick={(e) => {
              e.stopPropagation(); // 삭제 버튼 누를 때 딴 곳 안 눌리게 막기
              onDeleteReply(tweet.id, reply.id);
            }}>
              Delete
            </MiniDeleteButton>
          </ReplyItem>
        ))}

          {/* [작성] 답글 입력 폼 */}

          <ReplyInputForm onSubmit={handleReplySubmit} onClick={(e) => e.stopPropagation()}>
            <Avatar style={{ width: '32px', height: '32px' }} />
            <ReplyInput
              type="text"
              placeholder="Post your reply"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <ReplySubmitButton type="submit" disabled={!replyText.trim()}>
              Reply
            </ReplySubmitButton>
          </ReplyInputForm>
        </ReplySection>
      )}
    </div>
  );
}
export default TweetCard;