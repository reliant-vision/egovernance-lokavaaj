import React from "react";
import DashboardBox from "./DashboardBox";

type Props = {};

const DashboardRow2: React.FC = () => {
    return (
        <>
        <DashboardBox  gridArea="d" ></DashboardBox>
        <DashboardBox  gridArea="e" ></DashboardBox>
        <DashboardBox  gridArea="f" ></DashboardBox>
        </>
    );
}

export default DashboardRow2;