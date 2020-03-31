import React from 'react';
import styles from './led.css'

export default class Led extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      container_state: props.props.container.State
    };
  };
  
  render() {
    if ( this.state.container_state === "running" ) {
      return (
        <div className='led-outer-circle' style={{styles}}>
          <div className='led-inner-circle-active'></div>
        </div>
      )
    } else {
      return (
        <div className='led-outer-circle' style={{styles}}>
          <div className='led-inner-circle-inactive'></div>
        </div>
      )
    }
  }
}