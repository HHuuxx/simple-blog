import { Button, Modal } from "rsuite";

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
                    {/* <RemindIcon
                        style={{
                            color: '#ffb300',
                            fontSize: 24
                        }}
                    /> */}
                    Post will be removed, Are you sure you want to proceed?
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