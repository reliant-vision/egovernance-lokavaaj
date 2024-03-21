import React, { useEffect, useState } from "react";
import DashboardBox from "./DashboardBox";
import { Box, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, GridCellParams, DataGridProps } from "@mui/x-data-grid";
import BoxHeader from "./BoxHeader";
import "../styles/data-grid.css";

type Props = {};

interface Applications {
    id: number;
    application_number: string;
    applicant_name: string;
    grievance_type: string;
    application_status: string;
}

interface ApplicationsStats {
    id: number;
    grievance_type: string;
    open: number;
    pending_review: number;
    resolved: number;
    total_count: number
}

const DashboardRow2: React.FC = () => {
    const [applicationsdata, setApplicationsData] = useState<Applications[]>([]);
    const [applicationsStatsdata, setApplicationsStatsData] = useState<ApplicationsStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const theme = useTheme();
    const {palette} = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const filteredApplicationsColumns = [
        { field: "application_number", headerName: "Application Number", flex: 0.5},
        { field: "applicant_name", headerName: "Applicant Name", flex: 0.5 },
        { field: "grievance_type", headerName: "Grievance Type", flex: 1 },
        { field: "application_status", headerName: "Application Status", flex: 1 }
    ];

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch('/applications');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setApplicationsData(data.map((app: Applications, index: number) => ({ ...app, id: index })));
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch data');
                setLoading(false);
            }

            try {
                const response = await fetch('/applications/appstats');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setApplicationsStatsData(data[2].map((app: ApplicationsStats, index: number) => ({ ...app, id: index })));
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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredApplications = applicationsdata.filter(app =>
        (app.application_number && app.application_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (app.applicant_name && app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (app.grievance_type && app.grievance_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (app.application_status && app.application_status.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const rowHeight = 35; // Set the desired row height
    const headerHeight = 25; // Set the header height
    const paginationHeight = 56; // Set the height of pagination component
    const rowsPerPage = 7; // Set the number of rows per page
    const gridHeight = Math.min(filteredApplications.length * rowHeight + headerHeight + paginationHeight, rowsPerPage * rowHeight + headerHeight + paginationHeight);


    return (
        <>
            <DashboardBox gridArea="d">
                <BoxHeader title={"Grievance Statistics By Type"} sidetext={``} />
                <Box ml="2rem" mt="2rem">
                    <table>
                        <thead className="table-header">
                            <tr>
                                <th></th>
                                <th className="th-total-count">Total</th>
                                <th className="th-open">New</th>
                                <th className="th-pending-review">Pending</th>
                                <th className="th-resolved">Resolved</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {applicationsStatsdata.map((item, index) => (
                                <tr key={index}>
                                    <td className="td-grievance-type">{item.grievance_type}</td>
                                    <td className="td-total-count">{item.total_count}</td>
                                    <td className="td-open">{item.open}</td>
                                    <td className="td-pending-review">{item.pending_review}</td>
                                    <td className="td-resolved">{item.resolved}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>
            </DashboardBox>
            <DashboardBox gridArea="e">
                <BoxHeader title={"List of Grievance Applications"} sidetext={`${filteredApplications?.length} Total Applications`} />
                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height={`${gridHeight}px`}
                >
                    <TextField
                        label="Search Applications..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearch}
                        margin="normal"
                        InputLabelProps={{sx: {color:palette.grey[400]}}}
                        InputProps={{sx:{color:palette.grey[400]}}}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: palette.grey[400], // Border color when not focused
                                },
                                "&:hover fieldset": {
                                    borderColor: palette.grey[600], // Border color when hovered
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: palette.primary.main, // Border color when focused
                                },
                            },
                            width: "33%"
                        }}
                    />
                    <DataGrid
                        columns={filteredApplicationsColumns} 
                        rows={filteredApplications || []}
                        hideFooter
                        getRowId={(row) => row.id}
                        sx={{
                            '& .MuiDataGrid-columnHeader':{
                                color: "#11FEFE",
                            },
                            color: palette.grey[400]
                        }}
                    />
                </Box>
            </DashboardBox>
            <DashboardBox gridArea="f" />
        </>
    );
}

export default DashboardRow2;
