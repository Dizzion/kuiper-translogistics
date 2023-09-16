import { QRCodeCanvas } from "qrcode.react";
import { Modal, Row, Col } from "react-bootstrap";

<><Modal
    show={showModal}
    className="printModal"
    style={{
        width: "4in",
        height: "6in",
        border: "1px solid #000",
    }}
>
    <Modal.Header>Received Date: 9/15/2023 10:53 AM</Modal.Header>
    <Modal.Body className="justify-content-center">
        <h3>Requestor:</h3>
        <h2>Reuqestors Name</h2>
        <p>Building Location</p>
        <h5>Jira:</h5>
        <p>PUR-XXXX</p>
        <Row>
            <Col>
                <h6>Freight:</h6>
                <p>Yes/No</p>
            </Col>
            <Col>
                <h6>SAP:</h6>
                <p>Yes/No</p>
            </Col>
        </Row>
        <h3>Tracking Number:</h3>
        <p>1Z103456789091</p>
        <QRCodeCanvas size={89} value="1Z103456789091" />
    </Modal.Body>
</Modal><Modal
    show={showModal2}
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
    </Modal><Modal
        show={showModal3}
        className="printModal3"
        style={{
            display: "block",
            width: "6in",
            height: "4in",
            padding: "10px",
            border: "1px solid #000",
        }}
    >
        <Modal.Header>SAP Tote ID: SAP_1694795018375-8704</Modal.Header>

        <Modal.Body>
            <Row>
                <Col sm={2}>
                    <QRCodeCanvas size={60} value="SAP_1694795018375-8704" />
                </Col>
                <Col sm={8}>
                    <div className="grid-container">
                        <a className="grid-item">
                            199XXXXXXXX <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                        <a className="grid-item">
                            199XXXXXXXX
                            <QRCodeCanvas size={10} value="199XXXXXXXX" />
                        </a>
                    </div>
                </Col>
            </Row>
        </Modal.Body>
    </Modal></>