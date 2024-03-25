import React, { useEffect, useState } from "react";
import DashboardBox from "./DashboardBox";
import { Box, TextField, Typography, useMediaQuery, useTheme, MenuItem, FormControl, Select, SelectChangeEvent, InputLabel, InputAdornment } from "@mui/material";
import { DataGrid, GridCellParams, DataGridProps, GridRow, GridRowsProp, GridColDef, GridRowId } from "@mui/x-data-grid";
import BoxHeader from "./BoxHeader";
import "../styles/data-grid.css";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';


type Props = {};

interface Applications {
    assembly_constituency: string;
    id: GridRowId;
    application_number: string;
    applicant_name: string;
    grievance_type: string;
    application_status: string;
    district: string;
    taluka: string;
}

const FetchApplications: React.FC = () => {
    const [applicationsdata, setApplicationsData] = useState<Applications[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");
    const [selectedTaluka, setSelectedTaluka] = useState<string>("");
    const [selectedAssemblyConstituency, setSelectedAssemblyConstituency] = useState<string>("");
    const theme = useTheme();
    const { palette } = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const filteredApplicationsColumns: GridColDef[] = [
        { field: "application_number", headerName: "Application Number", flex: 0.5,
        renderCell: (params: GridCellParams) => (
            <Link to={`/applications/${params.value}`} style={{color:palette.grey[500]}}>
                {String(params.value)}
            </Link>
          ),
        },
        { field: "applicant_name", headerName: "Applicant Name", flex: 0.5 },
        { field: "grievance_type", headerName: "Grievance Type", flex: 1 },
        { field: "application_status", headerName: "Application Status", flex: 1 },
        { field: "district", headerName: "District", flex: 1 },
        { field: "taluka", headerName: "Taluka/Mandal", flex: 1 },
        { field: "assembly_constituency", headerName: "Assembly Constituency", flex: 1 }
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

    const handleDistrictChange = (event: SelectChangeEvent<string>) => {
        setSelectedDistrict(event.target.value);

        setSelectedTaluka("");
        setSelectedAssemblyConstituency("");
      };
    
      const handleTalukaChange = (event: SelectChangeEvent<string>) => {
        setSelectedTaluka(event.target.value);
      };
    
      const handleAssemblyConstituencyChange = (event: SelectChangeEvent<string>) => {
        setSelectedAssemblyConstituency(event.target.value);
      };

      const filteredApplications = applicationsdata.filter(app => {
        const searchTermMatches =
          !searchTerm ||
          app.application_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.grievance_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.application_status.toLowerCase().includes(searchTerm.toLowerCase());
      
        const districtMatches = !selectedDistrict || app.district.toLowerCase() === selectedDistrict.toLowerCase();
        const talukaMatches = !selectedTaluka || app.taluka.toLowerCase() === selectedTaluka.toLowerCase();
        const assemblyConstituencyMatches =
          !selectedAssemblyConstituency || app.assembly_constituency.toLowerCase() === selectedAssemblyConstituency.toLowerCase();
      
        return searchTermMatches && districtMatches && talukaMatches && assemblyConstituencyMatches;
      });
      

      // Filter the unique taluka options based on the selected district
    const talukaOptions = Array.from(new Set(filteredApplications.map((app) => app.taluka)));

    // Filter the unique assembly constituency options based on the selected district
    const assemblyConstituencyOptions = Array.from(new Set(filteredApplications.map((app) => app.assembly_constituency)));



    return (
        <>
            <DashboardBox>
                <Box mt="0.5rem" p="0 0.5rem">
                    <Box display="flex" justifyContent="space-between">
                        <Box>
                        <TextField
                            label="Search Applications..."
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearch}
                            margin="normal"
                            InputLabelProps={{ sx: { color: theme.palette.grey[400] } }}
                            InputProps={{ sx: { color: theme.palette.grey[400] }, 
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{color:palette.grey[400]}}/>
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: theme.palette.grey[400], // Border color when not focused
                                    },
                                    "&:hover fieldset": {
                                        borderColor: theme.palette.grey[600], // Border color when hovered
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: theme.palette.primary.main, // Border color when focused
                                    },
                                },
                                width: "150%",
                            }}
                        />
                         </Box>
                        <Box display="flex" justifyContent="flex-end" alignItems="center">
                            <Box display="flex" alignItems="center">
                            <FormControl variant="outlined" sx={{ marginLeft: '0.25rem', width:"200px", color: palette.grey[400]}}>
                                <Select
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Filter by District' }}
                                    sx={{ backgroundColor: palette.background.paper}}
                                >
                                    <MenuItem value="">
                                        <Typography sx={{ color: "black" }}>Filter by District</Typography>
                                    </MenuItem>
                                    {Array.from(
                                    new Set(applicationsdata.map((app) => app.district))
                                    ).map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            </Box>
                            <Box display="flex" alignItems="center">
                            <FormControl variant="outlined" sx={{ marginLeft: '0.25rem', width:"200px" }}>
                                <Select
                                    value={selectedTaluka}
                                    onChange={handleTalukaChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Filter by Taluka/Mandal' }}
                                    sx={{ backgroundColor: palette.background.paper}}
                                >
                                    <MenuItem value="">
                                        <Typography sx={{ color: "black" }}>Filter by Taluka/Mandal</Typography>
                                    </MenuItem>
                                    {Array.from(
                                    new Set(applicationsdata.map((app) => app.taluka))
                                    ).map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            </Box>
                            <Box display="flex" alignItems="center">
                            <FormControl variant="outlined" sx={{ marginLeft: '0.25rem', width:"250px"}}>
                                <Select
                                    value={selectedAssemblyConstituency}
                                    onChange={handleAssemblyConstituencyChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Filter by Assembly Constituency'}}
                                    sx={{ backgroundColor: palette.background.paper}}
                                >
                                    <MenuItem value="">
                                        <Typography sx={{ color: "black" }}>Filter by Assembly Constituency</Typography>
                                    </MenuItem>
                                    {Array.from(
                                    new Set(applicationsdata.map((app) => app.assembly_constituency))
                                    ).map((assembly_constituency) => (
                                    <MenuItem key={assembly_constituency} value={assembly_constituency}>
                                        {assembly_constituency}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            </Box>
                        </Box>
                    </Box>
                    <DataGrid
                        columns={filteredApplicationsColumns}
                        rows={filteredApplications}
                        pagination
                        pageSizeOptions={[5, 10, 10]}
                        getRowId={(row) => row.id}
                        sx={{
                            '& .MuiDataGrid-columnHeader': {
                                color: "#11FEFE",
                            },
                            color: palette.grey[400],
                        }}
                    />
                </Box>
            </DashboardBox>
        </>
    );
}

export default FetchApplications;
