import React from "react";
import TranslogisticsNav from "../../_components/TranslogisticsNav";

export default function TranslogisticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="container" style={{ backgroundColor: "#5d5f63"}}>
      <div className="row">
        <div className="col-2"><TranslogisticsNav /></div>
        <div className="col-9">{children}</div>
      </div>
    </body>
  );
}
