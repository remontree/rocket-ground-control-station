import './Frame.css';
import './Orbit.css'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,ResponsiveContainer
} from 'recharts';


function Orbit(props){
    return (
      <div className="Frame">
        <div className = "FrameTitle">Orbit</div>
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
            <Line type="monotone" dataKey="x" stroke="#d88484" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="y" stroke="#c2d884" />
            <Line type="monotone" dataKey="z" stroke="#d584d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </div>
    );
  }
  
export default Orbit;