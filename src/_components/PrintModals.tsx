import { QRCodeCanvas } from "qrcode.react";
import { Modal, Row, Col } from "react-bootstrap";

<><Modal
    ref={modalRef}
    className="printModal2"
    style={{
        display: "block",
        width: "6in",
        height: "4in",
        padding: "10px",
        border: "1px solid #000",
    }}
>
        <Modal.Dialog>
            <Modal.Header>Container ID:</Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={4} md={4}>
                        <QRCodeCanvas value="SEA_1694795018375-8704" />
                    </Col>
                    <Col xs={8} md={8}>
                        <h5>SEA_1694795018375-8704</h5>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal.Dialog>
    </Modal></>