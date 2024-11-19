import './Frame.css';
import './GPSInfo.css';
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const initialCenter = {
    lat: 14.018000,
    lng: 120.835941
};

function GPSInfo() {
    const [location, setLocation] = useState(initialCenter);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/location'); // 서버의 위치 정보 API 엔드포인트
                const responseData = await response.json();
                console.log('Location data from server:', responseData);

                // 서버에서 위치 데이터를 받아오고 상태를 업데이트합니다.
                if (responseData && responseData.location) {
                    const { lat, lng } = responseData.location; // 위치 데이터의 구조에 따라 조정
                    setLocation({ lat, lng });
                }
            } catch (error) {
                console.error('Error fetching location data:', error);
            }
        };

        // 초기 로딩 시 데이터 가져오기
        fetchData();

        // 1초마다 데이터를 가져오도록 설정
        const interval = setInterval(fetchData, 1000); // 1000ms = 1초

        // 컴포넌트가 언마운트 될 때 clearInterval로 interval 정리
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="Frame">
            <div className="FrameTitle">GPS Info</div>
            <div className="GPSInformation">
                <LoadScript googleMapsApiKey="">
                    <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={17}>
                        {/* 마커가 위치에 따라 정상적으로 렌더링되도록 ensure your location is correctly formatted */}
                        <MarkerF position={location} />
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
}

export default GPSInfo;
