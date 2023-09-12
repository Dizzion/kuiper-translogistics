import React from "react";
import TranslogisticsNav from "../_components/TranslogisticsNav";

export default function TranslogisticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <TranslogisticsNav />
      {children}
    </section>
  );
}
