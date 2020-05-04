import React from 'react';
import { Alert } from 'react-bootstrap';

const DismissableAlert = (props) => {
  // const [visible, setVisible] = useState(props.showAlert);

  // const toggleVisible = () => setVisible(!visible);
    return (
      <Alert variant="info" onClose={() => props.dismiss()} dismissible>
        {props.msg}
      </Alert>
    );
}

export default DismissableAlert;
