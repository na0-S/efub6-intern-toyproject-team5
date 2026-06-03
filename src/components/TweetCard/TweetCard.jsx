import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./TweetCard.style";
import { FiMoreHorizontal } from "react-icons/fi";

import {
  AiOutlineMessage,
  AiOutlineRetweet,
  AiOutlineHeart,
} from "react-icons/ai";
import { BiBookmark, BiBarChartAlt2 } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";

function TweetCard({
  tweet,
  onDeleteTweet,
  onAddReply,
  onDeleteReply,
  isExpanded,
}) {
  const navigate = useNavigate();
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
      <S.CardContainer onClick={() => navigate(`/post/${tweet.tweetId}`)}>
        <S.Avatar />
        <S.ContentWrapper>
          <S.UserInfo>
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
              <BiBarChartAlt2 size={18} />
              <span>{tweet.viewCount ?? 0}</span>
            </S.IconItem>

            {/* 북마크 및 공유하기 */}
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

        <S.MoreIconButton
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(!isModalOpen);
          }}
        >
          <FiMoreHorizontal color="#71767b" size={18} />
        </S.MoreIconButton>

        {isModalOpen && (
          <S.ModalOverlay
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            <S.DeleteConfirmModalBox onClick={(e) => e.stopPropagation()}>
              <S.ModalTextGroup>
                <S.ModalTitle>Delete post?</S.ModalTitle>
                <S.ModalDescription>
                  This can't be undone and it will be removed from your profile,
                  the timeline of any accounts that follow you, and from search
                  results.
                </S.ModalDescription>
              </S.ModalTextGroup>

              <S.ModalButtonGroup>
                <S.PrimaryDeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTweet(tweet.tweetId);
                    setIsModalOpen(false);
                  }}
                >
                  Delete
                </S.PrimaryDeleteButton>

                <S.SecondaryCancelButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </S.SecondaryCancelButton>
              </S.ModalButtonGroup>
            </S.DeleteConfirmModalBox>
          </S.ModalOverlay>
        )}
      </S.CardContainer>

      {isExpanded && (
        <S.ReplySection onClick={(e) => e.stopPropagation()}>
          {/* [조회] 답글 목록 */}
          {tweet.replies &&
            tweet.replies.map((reply) => (
              <S.ReplyItem key={reply.replyId}>
                <S.Avatar $mini />

                {/* ⭕ [변경] S.ContentWrapper 대신 전용 레이아웃인 S.ReplyContent 가동 */}
                <S.ReplyContent>
                  <S.UserInfo style={{ gap: "6px" }}>
                    <span className="name" style={{ fontSize: "14px" }}>
                      {reply.author?.username || "익명"}
                    </span>
                    <span className="handler" style={{ fontSize: "14px" }}>
                      {reply.author?.handle || "@user"}
                    </span>
                    <span style={{ color: "#536471", fontSize: "14px" }}>
                      {` · ${reply.createdAt || "Just now"}`}
                    </span>
                  </S.UserInfo>
                  <S.Text style={{ fontSize: "14px", marginTop: "2px" }}>
                    {reply.content}
                  </S.Text>

                  <S.IconGroup style={{ maxWidth: "380px", marginTop: "8px" }}>
                    {/* 답글 아이콘 */}
                    <S.IconItem onClick={(e) => e.stopPropagation()}>
                      <AiOutlineMessage size={16} />
                      <span>{reply.replyCount ?? 0}</span>
                    </S.IconItem>

                    {/* 리트윗 아이콘 */}
                    <S.IconItem onClick={(e) => e.stopPropagation()}>
                      <AiOutlineRetweet size={16} />
                      <span>{reply.retweetCount ?? 0}</span>
                    </S.IconItem>

                    {/* 좋아요 아이콘 */}
                    <S.IconItem onClick={(e) => e.stopPropagation()}>
                      <AiOutlineHeart size={16} />
                      <span>{reply.likeCount ?? 0}</span>
                    </S.IconItem>

                    {/* 조회수 아이콘 */}
                    <S.IconItem onClick={(e) => e.stopPropagation()}>
                      <BiBarChartAlt2 size={16} />
                      <span>{reply.viewCount ?? 0}</span>
                    </S.IconItem>

                    {/* 북마크 및 공유 */}
                    <S.RightIcons>
                      <S.IconItem onClick={(e) => e.stopPropagation()}>
                        <BiBookmark size={16} />
                      </S.IconItem>
                      <S.IconItem onClick={(e) => e.stopPropagation()}>
                        <FiUpload size={16} />
                      </S.IconItem>
                    </S.RightIcons>
                  </S.IconGroup>
                </S.ReplyContent>

                <S.MiniDeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteReply(tweet.tweetId, reply.replyId);
                  }}
                >
                  Delete
                </S.MiniDeleteButton>
              </S.ReplyItem>
            ))}

          {/* [작성] 답글 입력 폼 */}
          <S.ReplyInputForm
            onSubmit={handleReplySubmit}
            onClick={(e) => e.stopPropagation()}
          >
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
