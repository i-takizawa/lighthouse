import React, { Component, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import Led from './LED/Led';
import axios from 'axios';


const PORT = process.env.LIGHTHOUSE_BACKEND_PORT || 5000;

const Container = (props) => (
  <Card>
  <Card.Header as="h5" style={{textOverflow: "ellipsis", width: "100%"}}><Led props={props}/>{props.container.name}</Card.Header>
  <Card.Body bg="light" text="black">
    <StopButton props={props}/>
    <RemoveButton props={props}/>
  </Card.Body>
  <Card.Footer style={{textAlign: 'right'}}>
    <small className="text-muted">{props.container.Status}</small>
  </Card.Footer>
  </Card>
)

function StopButton(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{margin:5}}>
        Stop
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to stop the container?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" 
                  onClick={() => 
                    {props.props.stopContainer(props.props.container.Id)
                    handleClose()}}>
            Stop the container
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function RemoveButton(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow} style={{margin:5}}>
        Remove
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to stop and remove the container?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" 
                  onClick={() => 
                    {props.props.removeContainer(props.props.container.Id)
                    handleClose()}}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Nope
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default class ContainersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containers: []
    };
  };

  componentDidMount() {
    axios.get(`http://localhost:${PORT}/containers/all`)
    .then(res => {
      this.setState({
        containers: res.data
      })
    });
  }

  containerList() {
    return this.state.containers.map(container => {
      container.name = container.Names[0].replace('/', '');
      return (
        <div className="docker-container-card" key={container.Id}>
          <Container container={container} stopContainer={this.stopContainer}/>
        </div>
        )
      })
    }

  stopContainer(id) {
    console.log('stopContainer function called. ID: ' + id);
    axios.post(`http://localhost:${PORT}/containers/${id}/stop`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  removeContainer(id) {
    console.log(`removeContainer called. ID: ${id}`);
  }

  render () {
    return (
      <div style={{margin: '25px'}}>
        <h3>
        <span style={{fontSize: '2rem', color: 'Skyblue'}}>
          <i className="fab fa-docker fa-fw"></i>
        </span>
        Containers
        </h3>
        <div id="containersListBox">
        { this.containerList() }
        </div>
      </div>
    );
  };
};