import styled from "styled-components";

export const FeedContainer = styled.main`
  flex: 1;
  max-width: 600px;
  border-right: 1px solid #eff3f4;
  background-color: #ffffff;
`;

export const FeedHeader = styled.div`
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

export const TweetBox = styled.form`
  display: flex;
  padding: 15px;
  gap: 12px;
  border-bottom: 1px solid #eff3f4;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #cfd9de;
  flex-shrink: 0;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
`;

export const TextArea = styled.textarea`
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

export const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eff3f4;
  padding-top: 12px;
`;

export const IconGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const IconButton = styled.div`
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

export const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProgressCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #eff3f4;
  border-top: 2px solid #0f1419;
`;

export const VerticalDivider = styled.div`
  width: 1px;
  height: 24px;
  background-color: #cfd9de;
`;

export const CirclePlusButton = styled.div`
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

export const PostButton = styled.button`
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