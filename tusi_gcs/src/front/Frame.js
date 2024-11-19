import './Frame.css';



function Frame(props){
    return (
      <div className="Frame">
        {props.name}
      </div>
    );
  }
  
export default Frame;