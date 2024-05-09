import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faClose } from '@fortawesome/free-solid-svg-icons';
import { Button , Container, Col, Row} from 'react-bootstrap';
import  '../styles/PopupWindow.css'

class PopupWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    };
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleConfirm() {
    this.props.onConfirm();
    this.setState({ showPopup: false });
  }

  handleCancel() {
    this.setState({ showPopup: false });
  }

  render() {
    return (
      <div>
        <Button variant="dark" className="me-2" onClick={() => this.setState({ showPopup: true })}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        {this.state.showPopup && (
          <div className="popup-window pop-up">
            <Button variant="dark" className="mb-2 close-popup" onClick={this.handleCancel}>
              <FontAwesomeIcon icon={faClose} />
            </Button>
            <Container className='w-50'>
                <p className="popup-message text-center small">{this.props.message}</p>
                <Row>
                    <Col>
                        <Button variant="success" className="mb-2 small" onClick={this.handleConfirm}>Confirm</Button>
                    </Col>
                    <Col>
                        <Button variant="danger" className="small" onClick={this.handleCancel}>Cancel</Button>
                    </Col>
                </Row>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default PopupWindow;