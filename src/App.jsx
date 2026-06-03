import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// 컴포넌트 임포트 구역
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import Feed from './components/Feed/Feed';
import ProfilePage from './components/ProfilePage/ProfilePage';
import RightSidebar from './components/RightSidebar/RightSidebar';
import TweetDetail from './components/TweetDetail/TweetDetail';

const MainLayout = styled.div`
  display: flex;
  max-width: 1250px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #ffffff;
`;

// 백엔드 서버 Base URL 설정
const BASE_URL = 'https://efub-6th-toy.p-e.kr';

const AUTH_HEADERS = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': '1', 
    'Auth-id': '1',
  }
};

// 💡 [수정] TweetDetailWrapper: 이제 여기서 답글을 병합할 필요가 전혀 없습니다!
function TweetDetailWrapper({ onAddReply, onDeleteReply }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tweet, setTweet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${BASE_URL}/tweets/${id}`, AUTH_HEADERS)
      .then((res) => {
        // 본문 데이터만 깔끔하게 받아서 넣어줍니다.
        const tweetData = res.data.tweet || res.data.data || res.data;
        setTweet(tweetData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("상세 트윗 로드 실패:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: '20px', color: '#536471' }}>Loading...</div>;
  if (!tweet) return <div style={{ padding: '20px', color: '#536471' }}>Post not found.</div>;

  // 💡 자식(TweetDetail)에게 부모의 함수들을 가감 없이 그대로 패스해 줍니다.
  return (
    <TweetDetail 
      tweet={tweet}
      onBack={() => navigate('/home')}
      onAddReply={onAddReply}
      onDeleteReply={onDeleteReply}
    />
  );
}

function App() {
  const [tweets, setTweets] = useState([]); 
  const [myTweets, setMyTweets] = useState([]);


  // 1. [트윗 전체 조회] (GET /tweets)
  const fetchTweets = () => {
    axios.get(`${BASE_URL}/tweets`, AUTH_HEADERS)
      .then((res) => {
        setTweets(res.data.tweets || res.data);
      })
      .catch((err) => console.error("트윗 리스트 로드 실패:", err));
  };

  // 1-2. [내 트윗 전용 조회 함수]
  const fetchMyTweets = () => {
    // 현재 나영님의 가상 Auth-id가 '1'번이므로 주소창에 1을 고정해서 찌릅니다!
    axios.get(`${BASE_URL}/users/1/tweets`, AUTH_HEADERS)
      .then((res) => {
        // 알맹이인 tweets 배열만 쏙 골라내서 상자에 저장 (없으면 빈 배열)
        setMyTweets(res.data.tweets || []);
      })
      .catch((err) => console.error("내 트윗 로드 실패:", err));
  };

  useEffect(() => {
    fetchTweets();
    fetchMyTweets();
  }, []);



  // 2. [트윗 작성] (POST /tweets)
  const handleAddTweet = (content) => {
    axios.post(`${BASE_URL}/tweets`, { content: content }, AUTH_HEADERS)
      .then(() => {
        fetchTweets(); 
        fetchMyTweets();
      })
      .catch((err) => console.error("트윗 작성 에러:", err));
  };

  // 3. [트윗 삭제] (DELETE /tweets/{tweetId})
  const handleDeleteTweet = (tweetId) => {
    axios.delete(`${BASE_URL}/tweets/${tweetId}`, AUTH_HEADERS)
      .then(() => {
        fetchTweets();   // 메인 피드 새로고침
        fetchMyTweets(); // 프로필 피드 새로고침
      })
      .catch((err) => console.error("트윗 삭제 에러:", err));
  };

  // 4. [답글 작성] (POST /tweets/{tweetId}/replies)
  const handleAddReply = async (tweetId, replyContent) => {
    try {
      const response = await axios.post(`${BASE_URL}/tweets/${tweetId}/replies`, { content: replyContent }, AUTH_HEADERS);
      fetchTweets(); // 메인 피드 갱신
      return response; // 💡 TweetDetail 컴포넌트가 .then()을 이어서 쓸 수 있도록 무조건 리턴!
    } catch (err) {
      console.error("답글 추가 실패:", err);
      throw err;
    }
  };

  // 5. [답글 삭제] (DELETE /replies/{replyId})
  // 🚨 [404 해결 핵심] 명세서 구조상 단독 삭제 주소인 `/replies/{replyId}`일 확률이 매우 높습니다!
  const handleDeleteReply = async (tweetId, replyId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/replies/${replyId}`, AUTH_HEADERS);
      fetchTweets(); // 메인 피드 갱신
      return response; // 💡 자식이 삭제 완료 신호를 받고 화면을 새로고침할 수 있게 리턴!
    } catch (err) {
      console.error("답글 삭제 실패:", err);
      throw err;
    }
  };

  return (
    <Router>
      <MainLayout>
        <LeftSidebar />
        
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          
          <Route path="/home" element={
            <Feed 
              tweets={tweets}
              onAddTweet={handleAddTweet}
              onDeleteTweet={handleDeleteTweet}
              onAddReply={handleAddReply}
              onDeleteReply={handleDeleteReply}
            />
          } />
          
          <Route path="/profile" element={
            <ProfilePage 
            tweets={tweets} 
            onDeleteTweet={handleDeleteTweet} />
          } />

          <Route path="/post/:id" element={
            <TweetDetailWrapper 
              onAddReply={handleAddReply}
              onDeleteReply={handleDeleteReply}
            />
          } />
        </Routes>
        
        <RightSidebar />
      </MainLayout>
    </Router>
  );
}

export default App;