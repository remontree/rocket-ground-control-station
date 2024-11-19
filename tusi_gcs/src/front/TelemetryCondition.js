import './Frame.css';
import './TelemetryCondition.css'
import React, { useEffect, useState } from 'react';


function TelemetryCondition(){
    const [IMU_STATE, setImuState] = useState('LOS');
    const [GPS_STATE, setGpsState] = useState('LOS');
    const [ALTIMETER_STATE, setAltimeterState] = useState('LOS');
    const [XBEE_STATE, setXbeeState] = useState('LOS');

    const [IMU_color, setImuColor] = useState('#A352CC');
    const [GPS_color, setGpsColor] = useState('#A352CC');
    const [ALTIMETER_color, setAltimeterColor] = useState('#A352CC');
    const [XBEE_color, setXbeeColor] = useState('#A352CC');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/communicationState');
                const responseData = await response.json();
                //setDataFromServer(responseData.data);
                console.log('Data from server:', responseData.state);

                if(responseData.state[0] === false){
                    setImuState("LOS");
                    setImuColor("#A352CC");
                }
                else{
                    setImuState('ENABLE');
                    setImuColor("#3274D9");
                }

                if(responseData.state[1] === false){
                    setGpsState("LOS");
                    setGpsColor("#A352CC");
                }
                else{
                    setGpsState('ENABLE');
                    setGpsColor("#3274D9");
                }

                if(responseData.state[2] === false){
                    setAltimeterState("LOS");
                    setAltimeterColor("#A352CC");
                }
                else{
                    setAltimeterState('ENABLE');
                    setAltimeterColor("#3274D9");
                }

                if(responseData.state[3] === false){
                    setXbeeState("LOS");
                    setXbeeColor("#A352CC");
                }
                else{
                    setXbeeState('ENABLE');
                    setXbeeColor("#3274D9");
                }
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
    return(
        <div className="Frame">
            <div className = "FrameTitle">Telemetry Condition</div>
            <div className = "CodtionTableDiv">
                <table className = "ConditionTable">
                    <th className = "TableHeader" align ="left">sensor</th>
                    <th className = "TableHeader" align ="left">state</th>
                    <tr align ="left">
                        <td>IMU</td>
                        <td style={{ backgroundColor: IMU_color }}>{IMU_STATE}</td>
                    </tr>
                    <tr align ="left">
                        <td>GPS</td>
                        <td style={ {backgroundColor: GPS_color} }>{GPS_STATE}</td>
                    </tr>
                    <tr align ="left">
                        <td>ALTIMETER</td>
                        <td style={ {backgroundColor: ALTIMETER_color} }>{ALTIMETER_STATE}</td>
                    </tr>
                    <tr align ="left">
                        <td>XBEE</td>
                        <td style={ {backgroundColor: XBEE_color} }>{XBEE_STATE}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default TelemetryCondition;