import BaseDashBoard from "@/components/BaseDashBoard";
import DetailedSearch from "@/components/DetailedSearch";
import React from "react";

export default async function TranslogisticsTeam() {
  return (
    <>
      <DetailedSearch />
      <div style={{ backgroundColor: 'white', marginTop: "3rem"}}><BaseDashBoard /></div>
    </>
  );
}
