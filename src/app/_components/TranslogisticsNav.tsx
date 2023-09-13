import React from "react";
import { Nav } from "react-bootstrap";

const TranslogisticsNav = () => {
  return (
    <Nav variant="pills" className="tabs text-center flex-column" defaultActiveKey={'/Translogistics'}>
      <Nav.Item>
        <Nav.Link href="/Translogistics" className="text-white">
          Warehouse Metrics Dashboard
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Translogistics/Transportation" className="text-white">
          Transportation
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Translogistics/Outbound" className="text-white">
          Outbound
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Translogistics/Inbound" className="text-white">
          Inbound
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Translogistics/Receiving" className="text-white">
          Receiving
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Translogistics/SapTote" className="text-white">
          SAP Tote
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Translogistics/Delivery" className="text-white">
          Delivery
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default TranslogisticsNav;
