import React, { useEffect, useState } from "react";
import DashboardBox from "./DashboardBox";
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
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

interface ApplicationsDataDistrictStats {
    id: number;
    district: string;
    total_count: number;
    open: number;
    pending_review: number;
    resolved: number;
}

interface ApplicationsDataOverallStats{
    id: number;
    total_count: number;
    open: number;
    pending_review: number;
    resolved: number;
}

const DashboardRow3: React.FC = () => {
    const [applicationsTalukaStats, setApplicationsTalukaStats] = useState<ApplicationsDataStats[]>([]);
    const [applicationsDistrictStats, setApplicationsDistrictStats] = useState<ApplicationsDataDistrictStats[]>([]);
    const [applicationsOverallStats, setApplicationsOverallStats] = useState<ApplicationsDataOverallStats[]>([]);
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
        setApplicationsTalukaStats(data[0]);
        setApplicationsDistrictStats(data[3]);
        setApplicationsOverallStats(data[1]);
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

    console.log(applicationsOverallStats)

    return (
        <>
        <DashboardBox  gridArea="e" >
        <BoxHeader title="District Wise Applications Report" subtitle="" sidetext="" />
            <ResponsiveContainer width="100%" height={300}>
                    <Box>
                        <ComposedChart width={900} height={280} data={applicationsDistrictStats}>
                            <XAxis dataKey="district" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid stroke="#ccc" strokeWidth={0.1} />
                            <Area type="monotone" dataKey="open" fill="#EFFAF4" stroke="#8884d8" />
                            <Bar dataKey="pending review" barSize={20} fill="#DFAF48" />
                            <Line type="monotone" dataKey="resolved" stroke="#2ECC71" />
                        </ComposedChart>
                    </Box>
            </ResponsiveContainer>
        </DashboardBox>
        {/* <DashboardBox  gridArea="h" ></DashboardBox> */}
        <DashboardBox  gridArea="f" >
            <BoxHeader title={"Grievances Overall Statistics"} sidetext={``} />
            <Box mt="6rem" display="flex" flexWrap="wrap" justifyContent="space-around">
            {applicationsOverallStats && applicationsOverallStats.length > 0 && (
                <>
                <Box ml="-0.7rem" textAlign="center" flexBasis="calc(25% - 0.7rem)">
                    <Typography variant="h4" color="#14FCFC">Total</Typography>
                    <Typography m="0.3rem 0" variant="h3" color="#14FCFC">
                        {applicationsOverallStats[0].total_count}
                    </Typography>
                </Box>
                <Box textAlign="center" flexBasis="calc(25% - 0.7rem)">
                    <Typography variant="h4" color="#FC3714">New</Typography>
                    <Typography m="0.3rem 0" variant="h3" color="#FC3714">
                        {applicationsOverallStats[0].open}
                    </Typography>
                </Box>
                <Box textAlign="center" flexBasis="calc(25% - 0.7rem)">
                    <Typography variant="h4" color="#F9D612">Pending</Typography>
                    <Typography m="0.3rem 0" variant="h3" color="#F9D612">
                        {applicationsOverallStats[0].pending_review}
                    </Typography>
                </Box>
                <Box textAlign="center" flexBasis="calc(25% - 0.7rem)">
                    <Typography variant="h4" color="#44E60B">Resolved</Typography>
                    <Typography m="0.3rem 0" variant="h3" color="#44E60B">
                        {applicationsOverallStats[0].resolved}
                    </Typography>
                </Box>
                </>
                )}
            </Box>
        </DashboardBox>
        {/* <DashboardBox  gridArea="j" ></DashboardBox> */}
        </>
    );
}

export default DashboardRow3;