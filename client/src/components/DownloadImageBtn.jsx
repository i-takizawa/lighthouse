import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';



// function PullButton(props) {
//   const [isLoading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isLoading) {
//       pullImage(props).then(() => {
//         console.log('pull')
//         setLoading(false);
//       });
//     }
//   }, [isLoading]);

//   const handleClick = () => setLoading(true);

//   return (
//     <Button
//       variant='primary'
//       disabled={isLoading}
//       onClick={!isLoading ? handleClick : null}
//     >
//       {isLoading ? 'Pulling image...': 'Pull'}
//     </Button>
//   );
// }

function DownloadBtn(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const pullImage = () => {
    return new Promise(res => setTimeout(res, 2000))
      .then(handleClose)
      .catch(err => console.log(err))
  }

  return (
    <>
    <Button variant="primary" onClick={handleShow} style={{float: 'right', marginRight: '20px'}}>
      Pull New Image
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Pull New Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formImageName">
            <Form.Label>Image Name</Form.Label>
            <Form.Control type="text" placeholder="ex) alpine" />
            <Form.Text className="text-muted">
              Specify the name of an image you want to download.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formImageTag">
            <Form.Label>Image Tag (version)</Form.Label>
            <Form.Control type="text" placeholder="ex) 3.9" />
            <Form.Text className="text-muted">
              Defaults to latest if not specified.
            </Form.Text>
          </Form.Group>
          {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          <div className="formButtons" style={{float: "right"}}>
          	<Button variant="secondary" onClick={handleClose} style={{margin:5}}>
          	Cancel
          	</Button>
          	<Button variant="primary" onClick={pullImage}>
              Pull
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  </>
  )
}

export default class DownloadImageBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    };
  };

  
  

  render() {
    return (
      <DownloadBtn />
    )
  }
}