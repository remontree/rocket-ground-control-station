import './App.css';
import React, { useEffect, useState } from 'react';
import Radio from './front/Radio';
import TelemetryCondition from './front/TelemetryCondition';
import GPSInfo from './front/GPSInfo';
import DateCom from './front/DateCom';
import RocketState from './front/RocketState';
import LaunchState from './front/LaunchState';
import Parachute from './front/Parachute';
import Gyro from './front/Gyro';
import Altitude from './front/Altitude'
import Orbit from './front/Orbit';
import Velocity from './front/Velocity';

function Banner(){
  return (
    <div className="Banner">
     TUSI Rocket Ground Control Station
    </div>
  );
}

function App() {
  const [TodayDate, setTodayDate] = useState('');
  const [TodayTime, setTodayTime] = useState('');
  const [RocketStateVector, setRocketStateVector] = useState([[0,0,0],[0,0,0],[0],[0,0]]);

  const [GyroJson, setGyroJson] = useState([{ name: 0, roll: 0, pitch: 0, yaw: 0 }]);
  const [AltitudeJson, setAltitudeJson] = useState([{ name: 0, altitude:0 }]);
  const [AccJson, setAccJson] = useState([{ name: 0, x: 0, y: 0, z: 0 }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var dateinfo = new Date();
        setTodayDate(dateinfo.toLocaleDateString());
        setTodayTime(dateinfo.toLocaleTimeString());

        const response = await fetch('/getRocketState');
        const responseData = await response.json();
        setRocketStateVector(responseData.state);

        let newData = {
          name: 0,
          roll: responseData.state[0][0],
          pitch: responseData.state[0][1],
          yaw: responseData.state[0][2]
        };
        setGyroJson(prevData => {
          const newJson = [...prevData, newData];
          if (newJson.length > 100) {
            newJson.splice(0, newJson.length - 100);
          }
          return newJson;
        });

        let newDataAltitude = {
          name: 0,
          altitude: responseData.state[2]
        };
        setAltitudeJson(prevData => {
          const newJson = [...prevData, newDataAltitude];
          if (newJson.length > 100) {
            newJson.splice(0, newJson.length - 100);
          }
          return newJson;
        });

        let newDataAcc = {
          name: 0,
          x: responseData.state[1][0],
          y: responseData.state[1][1],
          z: responseData.state[1][2]
        };
        setAccJson(prevData => {
          const newJson = [...prevData, newDataAcc];
          if (newJson.length > 100) {
            newJson.splice(0, newJson.length - 100);
          }
          return newJson;
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // 초기 로딩 시 데이터 가져오기
    fetchData();

    // 100ms마다 데이터를 가져오도록 설정 (시뮬레이션을 위해 짧게 설정)
    const interval = setInterval(fetchData, 90);

    // 컴포넌트가 언마운트 될 때 clearInterval로 interval 정리
    return () => clearInterval(interval);
  }, [RocketStateVector]); // RocketStateVector가 변경될 때마다 useEffect가 다시 실행됨

  return (
    <div className="App">
      <Banner />
      <div className="contents">
        <div className="contents1">
          <Radio />
          <TelemetryCondition />
          <GPSInfo />
          <DateCom title="Date" content={TodayDate} />
          <DateCom title="Time" content={TodayTime} />
        </div>
        <div className="contents2">
          <RocketState pitch={RocketStateVector[0][1]} yaw={RocketStateVector[0][2]} />
          <LaunchState />
          <Parachute />
        </div>
        <div className="contents3">
          <Gyro state={GyroJson} />
          <Altitude state={AltitudeJson} />
          <div className="contents3_1">
            <Orbit state={AccJson}/>
            <Velocity state={AccJson} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
