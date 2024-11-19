import './Frame.css';
import './Radio.css'
import React, { useEffect, useState } from 'react';


function Radio() {
    const [ports, setPorts] = useState([]);
    const [selectedPort, setSelectedPort] = useState('');
    const [baudRate, setBaudRate] = useState('9600'); // 기본값으로 9600 설정
  
    useEffect(() => {
      // 서버에서 사용 가능한 포트 목록을 가져오는 함수
      fetch("/getAvaliablePorts")
        .then(res => res.json())
        .then(data => {
          // 서버에서 받은 데이터를 상태로 설정
          setPorts(data.ports);
          console.log(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    const handleConnect = async () => {
      console.log('Selected Port:', selectedPort);  // 디버깅용 콘솔 출력
      console.log('Selected Baud Rate:', baudRate);
      try {
        const response = await fetch('/connectPort', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ port: selectedPort, baudRate: baudRate })
        });
        const responseData = await response.json();
        console.log('Server response:', responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div className="Frame">
        <div className="FrameTitle">Radio Setting</div>
        <div className="PortSetting">
          <div className="settingParam">Port:</div>
          <div>
            <select
              className="ComboBox"
              value={selectedPort}
              onChange={(e) => {
                console.log('Selected port2:', e.target.value);
                setSelectedPort(e.target.value)}}
            >
              {ports.map(port => (
                <option key={port} value={port}>{port}</option>
              ))}
            </select>
          </div>
          <div className="settingParam">Baud Rate:</div>
          <div>
            <select
              className="ComboBox"
              value={baudRate}
              onChange={(e) => setBaudRate(e.target.value)}
            >
              <option value="9600">9600</option>
              <option value="115200">115200</option>
            </select>
          </div>
        </div>
        <div className="ConnectBtnDiv">
          <button className="ConnectBtn" onClick={handleConnect}>Connect</button>
        </div>
      </div>
    );
  }
  
  export default Radio