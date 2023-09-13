"use client";
import React, { useState } from "react";
import { Nav } from "react-bootstrap";

const TranslogisticsNav = () => {
  const [navMemory, setNavMemory] = useState("/Translogistics");
  return (
    <Nav
      variant="pills"
      className="text-center flex-column"
      defaultActiveKey={navMemory}
    >
      <Nav.Item>
        <Nav.Link
          href="/Translogistics"
          eventKey="/Translogistics"
          onClick={() => setNavMemory("/Translogistics")}
          className="text-white"
        >
          Warehouse Metrics Dashboard
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/Translogistics/Transportation"
          eventKey="/Translogistics/Transportation"
          onClick={() => setNavMemory("/Translogistics/Transportation")}
          className="text-white"
        >
          Transportation
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/Translogistics/Outbound"
          eventKey="/Translogistics/Outbound"
          onClick={() => setNavMemory("/Translogistics/Outbound")}
          className="text-white"
        >
          Outbound
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/Translogistics/Inbound"
          eventKey="/Translogistics/Inbound"
          onClick={() => setNavMemory("/Translogistics/Inbound")}
          className="text-white"
        >
          Inbound
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/Translogistics/Receiving"
          eventKey="/Translogistics/Receiving"
          onClick={() => setNavMemory("/Translogistics/Receiving")}
          className="text-white"
        >
          Receiving
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/Translogistics/SapTote"
          eventKey="/Translogistics/SapTote"
          onClick={() => setNavMemory("/Translogistics/SapTote")}
          className="text-white"
        >
          SAP Tote
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/Translogistics/Delivery"
          eventKey="/Translogistics/Delivery"
          onClick={() => setNavMemory("/Translogistics/Delivery")}
          className="text-white"
        >
          Delivery
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default TranslogisticsNav;
