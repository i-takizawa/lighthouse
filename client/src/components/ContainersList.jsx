import React, { Component } from 'react';
import DockerContainer from './DockerContainer'
import DismissableAlert from './DismissableAlert'
import axios from 'axios';

const PORT = process.env.LIGHTHOUSE_BACKEND_PORT || 5000;

export default class ContainersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containers: [],
      showAlreadyStoppedAlert: false
    };
  };

  componentDidMount() {
    axios.get(`http://localhost:${PORT}/containers/all`)
    .then(res => {
      this.setState({
        containers: res.data.map(container => {
          container.name = container.Names[0].replace('/', '');
          return container;
        })
      });
    });
  }

  containerList = () => this.state.containers.map(container => {
    return (
      <div className="docker-container-card" key={container.Id}>
        <DockerContainer
          container={container}
          stopContainer={this.stopContainer}
          removeContainer={this.removeContainer}/>
      </div>
    )
  });

  stopContainer = (id) => {
    console.log('stopContainer function called. ID: ' + id);
    axios.post(`http://localhost:${PORT}/containers/${id}/stop`)
      .then(res => {
        if (res.data.alreadyStopped) {
          this.setState({showAlreadyStoppedAlert: true});
        }
      })
      .catch(err => console.log(err));
  };

  removeContainer = (id) => {
    console.log(`removeContainer called. ID: ${id}`);
  }

  dismissAlert = () => {
    this.setState({ showAlreadyStoppedAlert: false });
  }

  render () {
    let stoppedAlert = null;
    if (this.state.showAlreadyStoppedAlert) {
      stoppedAlert = <DismissableAlert dismiss={this.dismissAlert} msg={`Container is already stopped.`}/>
    }
    return (
      <div style={{margin: '25px'}}>
        {stoppedAlert}
        <h3>
          <span style={{fontSize: '2rem', color: 'Skyblue'}}>
            <i className="fab fa-docker fa-fw"></i>
          </span>
          Containers
        </h3>
        <div id="containersListBox">{ this.containerList() }</div>
      </div>
    );
  };
};