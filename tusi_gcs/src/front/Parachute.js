
import './Frame.css';
import './Parachute.css'

function Parachute(){
  const handleConnect = async () => {
    try {
      const response = await fetch('/injection');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };
    return (
      <div className="Frame">
        <div className = "FrameTitle">Parachute emergency injection</div>
        <div className = "InjectionBtnDiv">
            <button className = "InjectionBtn" onClick={handleConnect}>Inject</button>
        </div>
      </div>
    );
  }
 
export default Parachute;


