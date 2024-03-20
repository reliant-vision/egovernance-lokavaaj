import React, { useEffect, useState } from "react";
import DashboardBox from "./DashboardBox";
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import BoxHeader from "./BoxHeader";

type Props = {};

interface ApplicationsDataStats {
    id: number;
    taluka: string;
    total_count: number;
    open: number;
    pending_review: number;
    resolved: number;
}

const DashboardRow3: React.FC = () => {
    const [applicationsStats, setApplicationsStats] = useState<ApplicationsDataStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const {palette} = useTheme();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    
  
    useEffect(() => {
      const fetchApplications = async () => {
        try {
        const response = await fetch('/applications/appstats');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setApplicationsStats(data);
        setLoading(false);
        } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch data');
        setLoading(false);
        }
      };
  
          fetchApplications();
      }, []);

      if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <DashboardBox  gridArea="g" >
        <BoxHeader title="Taluka Wise Applications Report" subtitle="" sidetext="" />
            <ResponsiveContainer width="100%" height={300}>
                    <Box>
                        <ComposedChart width={900} height={280} data={applicationsStats}>
                            <XAxis dataKey="taluka" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid stroke="#ccc" strokeWidth={0.1} />
                            <Area type="monotone" dataKey="open" fill="#AED6F1" stroke="#8884d8" />
                            <Bar dataKey="pending review" barSize={20} fill="#F39C12" />
                            <Line type="monotone" dataKey="resolved" stroke="#2ECC71" />
                        </ComposedChart>
                    </Box>
            </ResponsiveContainer>
        </DashboardBox>
        <DashboardBox  gridArea="h" ></DashboardBox>
        <DashboardBox  gridArea="i" ></DashboardBox>
        <DashboardBox  gridArea="j" ></DashboardBox>
        </>
    );
}

export default DashboardRow3;