import './Frame.css';
import './RocketState.css'


function RocketRotation(props) {
  return (
    <div>
      {props.title}
      <div className="RocketDisplay">
        <div className="Line"></div>
        <img
          className="image"
          src="rocket.png"
          alt="Rocket Image"
          style={{ transform: `rotate(${props.angle}deg)` }}
        />
      </div>
    </div>
  );
}

function RocketState(props){
    return (
      <div className="Frame">
        <div className = "FrameTitle">Rocket State</div>
        <div className = "Rocket_State">
            <RocketRotation title = {"pitch"} angle = {props.pitch}></RocketRotation>
            <RocketRotation title = {"yaw"} angle = {props.yaw}></RocketRotation>
        </div>
      </div>
    );
  }
  
export default RocketState;