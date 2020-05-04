import React from 'react';
import styles from './StatusLamp.css'

const statusLamp = props => {
  let innerCircleClass = 'led-inner-circle-inactive';
  if (props.containerStatus === 'running') {
    innerCircleClass = 'led-inner-circle-active';
  }
  return (
    <div className='led-outer-circle' style={{styles}}>
      <div className={innerCircleClass}></div>
    </div>
  )
}

export default statusLamp;
