import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';

import StatusLamp from './StatusLamp/StatusLamp';

const StopButton = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return <>
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
                    {props.stopContainer(props.container.Id)
                    handleClose()}}>
            Stop the container
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>;
}

const RemoveButton = (props) => {
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
                    {props.removeContainer(props.container.Id)
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

const DockerContainer = (props) => {


  return <Card>
  <Card.Header as="h5" style={{textOverflow: "ellipsis", width: "100%"}}>
    <StatusLamp containerStatus={props.container.State}/>{props.container.name}
  </Card.Header>
  <Card.Body bg="light" text="black">
    <StopButton stopContainer={props.stopContainer} container={props.container}/>
    <RemoveButton removeContainer={props.removeContainer} container={props.container}/>
  </Card.Body>
  <Card.Footer style={{textAlign: 'right'}}>
    <small className="text-muted">{props.container.Status}</small>
  </Card.Footer>
  </Card>
}

export default DockerContainer;
