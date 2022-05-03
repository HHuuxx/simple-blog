import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Modal, Row } from "rsuite";
import { faWarning } from "@fortawesome/free-solid-svg-icons"
import cls from "./Alert.module.scss"
const Alert = ({
    open,
    onSubmit,
    onCancel,
    onClose
}) => {
    return (
        <div className="modal-container">
            <Modal backdrop="static" role="alertdialog" open={open} onClose={() => onClose()} size="xs">
                <Modal.Body>
                    <Row style={{ maxWidth: "360px" }}>
                        <Col xs="24" md="4" className={cls.warningIconContainer}>
                            <FontAwesomeIcon
                                icon={faWarning}
                                style={{
                                    color: '#ffb300',
                                    fontSize: 24
                                }}
                            />
                        </Col>
                        <Col xs="24" md="15">
                            Post will be removed, Are you sure you want to proceed?
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => onSubmit()} appearance="primary">
                        Ok
                    </Button>
                    <Button onClick={() => onCancel()} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default Alert;