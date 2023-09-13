"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Nav } from "react-bootstrap";

const TranslogisticsNav = () => {
  const pathname = usePathname();
  return (
    <Nav
      variant="pills"
      className="text-center flex-column"
      style={{ backgroundColor: "#5d5f63" }}
    >
      <Nav.Item>
        <Nav.Link
          href="/Translogistics"
          className={pathname == "/Translogistics" ? "active" : ""}
          style={{ color: "white" }}
        >
          Warehouse Metrics Dashboard
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/Translogistics/Transportation"
          style={{color: 'white'}}
          className={
            pathname == "/Translogistics/Transportation" ? "active" : ""
          }
        >
          Transportation
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/Translogistics/Outbound"
          style={{ color: "white" }}
          className={pathname == "/Translogistics/Outbound" ? "active" : ""}
        >
          Outbound
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/Translogistics/Inbound"
          style={{ color: "white" }}
          className={pathname == "/Translogistics/Inbound" ? "active" : ""}
        >
          Inbound
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/Translogistics/Receiving"
          style={{ color: "white" }}
          className={pathname == "/Translogistics/Receiving" ? "active" : ""}
        >
          Receiving
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/Translogistics/SapTote"
          style={{ color: "white" }}
          className={pathname == "/Translogistics/SapTote" ? "active" : ""}
        >
          SAP Tote
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/Translogistics/Delivery"
          style={{ color: "white" }}
          className={pathname == "/Translogistics/Delivery" ? "active" : ""}
        >
          Delivery
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default TranslogisticsNav;
