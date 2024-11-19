import './Frame.css';
import './Altitude.css'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,ResponsiveContainer
} from 'recharts';


function Altitude(props){
    return (
      <div className="Frame">
        <div className = "FrameTitle">Altitude</div>
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
            <Line type="monotone" dataKey="altitude" stroke="#84b6d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </div>
    );
  }
  
export default Altitude;