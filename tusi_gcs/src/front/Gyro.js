import './Frame.css';
import './Gyro.css'

import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,ResponsiveContainer
} from 'recharts';


function Gyro(props) {
  return (
    <div className="Frame">
      <div className="FrameTitle">Gyro</div>
      <div>
        <ResponsiveContainer width='100%' height={400}>
          <LineChart
            data={props.state}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            isAnimationActive={false}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="roll" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="pitch" stroke="#82ca9d" />
            <Line type="monotone" dataKey="yaw" stroke="#caab82" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Gyro;