import './Frame.css';
import './LaunchState.css'
import React, { useEffect, useState } from 'react';

function LaunchState(){
  const [launchstate, setStage] = useState('LOADING');
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('/stage');
            const responseData = await response.json();
            //setDataFromServer(responseData.data);
            console.log('Data from server:', responseData.state);

            setStage(responseData.state[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // 초기 로딩 시 데이터 가져오기
        fetchData();

        // 5초마다 데이터를 가져오도록 설정
        const interval = setInterval(fetchData, 1000); // 5000ms = 5초

        // 컴포넌트가 언마운트 될 때 clearInterval로 interval 정리
        return () => clearInterval(interval);
    }, []);

    const handleConnect = async () => {
      try {
        const response = await fetch('/nextStage');
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };
   
    return (
      <div className="Frame">
        <div className = "FrameTitle">Launch State</div>
        <div className = "Launch_State">
            {launchstate}
        </div>
        <div className="NextStageBtnDiv">
          <button className="NextStageBtn" onClick={handleConnect}>Next Stage</button>
        </div>
      </div>
    );
  }
 
export default LaunchState;