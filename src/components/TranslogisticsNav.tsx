"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Nav } from "react-bootstrap";

const TranslogisticsNav = () => {
  const pathname = usePathname();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const handleMouseEnter = (linkName: string) => {
    setHoveredLink(linkName);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const links = [
    { name: "Warehouse Metrics Dashboard", href: "/Translogistics/Dashboard" },
    { name: "Transportation", href: "/Translogistics/Transportation" },
    { name: "Outbound", href: "/Translogistics/Outbound" },
    { name: "Inbound", href: "/Translogistics/Inbound" },
    { name: "Receiving", href: "/Translogistics/Receiving" },
    { name: "SapTote", href: "/Translogistics/SapTote" },
    { name: "Delivery", href: "/Translogistics/Delivery" },
    { name: "SAP Bin Labels", href: "/Translogistics/SAPBinLabels" },
  ];
  return (
    <Nav
      variant="pills"
      className="text-center flex-column"
      style={{ backgroundColor: "#5d5f63" }}
    >
      {links.map((link) => (
        <Nav.Item
          key={link.name}
          onMouseEnter={() => handleMouseEnter(link.name)}
          onMouseLeave={handleMouseLeave}
        >
          <Nav.Link
            href={link.href}
            className={pathname == link.href ? "active" : "non-active"}
            style={{
              backgroundColor: hoveredLink === link.name ? "#007bff" : "",
              color: "white",
            }}
          >
            {link.name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default TranslogisticsNav;
