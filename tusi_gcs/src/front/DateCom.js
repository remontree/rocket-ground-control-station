import './Frame.css';
import './DateCom.css'
import React, { useEffect, useState } from 'react';

function DateCom(props){
    return (
      <div className="Frame">
        <div className = "FrameTitle">{props.title}</div>
        <div className = "DateLabel">{props.content}</div>
      </div>
    );
  }
  
export default DateCom;