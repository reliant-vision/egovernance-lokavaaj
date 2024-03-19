import React, { useEffect, useState } from "react";
import DashboardBox from "./DashboardBox";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, useMediaQuery, useTheme } from "@mui/material";
import { ResponsiveContainer } from "recharts";
import FlexBetween from "./FlexBetween";

type Props = {};

interface Applications {
    id: number;
    application_number: string;
    applicant_name: string;
    grievance_type: string;
    application_status: string;
}

const DashboardRow2: React.FC = () => {
    const [applicationsdata, setApplicationsData] = useState<Applications[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const {palette} = useTheme();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    
  
    useEffect(() => {
      const fetchApplications = async () => {
        try {
          const response = await fetch('/applications');
          if (!response.ok) {
              throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setApplicationsData(data);
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

    const filteredApplications = applicationsdata.filter(app =>
        app.application_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.grievance_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.application_status.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return (
        <>
        <DashboardBox  gridArea="d" ></DashboardBox>
        <DashboardBox  gridArea="e" >
            <TextField label="Search" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            InputLabelProps={{
                sx:{color:palette.grey[700]}
            }}
            />
            <div style={{ maxHeight: "300px", overflowY: "auto", color: palette.grey[700] }}>
            <ResponsiveContainer width="100%" height={300}>
            <TableContainer style={{ backgroundColor: palette.grey[300]}}>
                <Table className={isSmallScreen?"table-small":"table"}>
                    <TableHead>
                        <TableRow>
                        <TableCell><b>Application Number</b></TableCell>
                        <TableCell><b>Applicant Name</b></TableCell>
                        <TableCell><b>Grievance Type</b></TableCell>
                        <TableCell><b>Status</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredApplications.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.application_number}</TableCell>
                            <TableCell>{row.applicant_name}</TableCell>
                            <TableCell>{row.grievance_type}</TableCell>
                            <TableCell>{row.application_status}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </ResponsiveContainer>
            </div>
        </DashboardBox>
        <DashboardBox  gridArea="f" ></DashboardBox>
        </>
    );
}

export default DashboardRow2;